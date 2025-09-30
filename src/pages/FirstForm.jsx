import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { resetStep1, updateStep1 } from "@/provider/reducer/Step1Slice"
import { useNavigate } from "react-router"

const schema = yup.object({
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string()
        .required("Phone number is required")
        .matches(/^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/, "Please enter a valid phone number"),
    birth: yup
        .date()
        .required("Birth date is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
})

export default function FirstForm() {
    const step1 = useSelector((state) => state.step1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: step1?.name || "",
            phoneNumber: step1?.phoneNumber || "",
            birth: step1?.birth || null,
            email: step1?.email || "",
        },
    })

    const onSubmit = (data) => {
        data.isCompleted = true;
        dispatch(updateStep1(data));
        navigate("/step2")
    }

    const onReset = () => {
        dispatch(resetStep1());
        reset({
            name: '',
            phoneNumber: '',
            birth: null,
            email: "",
        });
    }
    return (
        <Card className="w-full bg-neutral-50">
            <CardHeader className="">
                <CardTitle className="">User Information</CardTitle>
            </CardHeader>
            <CardContent className="">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="">
                            Name
                        </Label>
                        <Input id="name" type="text" {...register("name")} className={`bg-white ${errors.name ? "border-destructive" : ""}`} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="">
                            Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            type="tel"
                            {...register("phoneNumber")}
                            className={`bg-white ${errors.phoneNumber ? "border-destructive" : ""}`}
                        />
                        {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="birth" className="">
                            Birth Date
                        </Label>
                        <Controller
                            name="birth"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="default"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                                errors.birth && "border-destructive",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : "Pick your birth date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date >= new Date(Date.now() - 86400000) || date < new Date("1900-01-01")}
                                            initialFocus
                                            captionLayout="dropdown"
                                            className=""
                                            classNames={{}}
                                            formatters={{}}
                                            components={{}}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.birth && <p className="text-sm text-destructive">{errors.birth.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            className={`bg-white ${errors.email ? "border-destructive" : ""}`}
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" className="flex-1" variant="default" size="default">
                            Continue
                        </Button>
                        <Button type="button" onClick={() => onReset()} className="flex-1 bg-white hover:bg-gray-300" variant="outline" size="default">
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}