import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { resetStep3, updateStep3 } from "@/provider/reducer/Step3Slice"


const schema = yup.object({
    budget: yup
        .number()
        .required("Budget is required")
        .min(200, "Budget must be at least $200")
        .max(3000, "Budget cannot exceed $3000"),
    wifi: yup.boolean(),
    accommodation: yup.string().required("Accommodation type is required"),
    transport: yup.array().of(yup.string()).min(1, "At least one transport method is required"),
})


const accommodationOptions = [
    "Hotel",
    "Hostel",
    "Airbnb",
    "Resort",
    "Guesthouse",
    "Apartment",
    "Villa",
    "Camping",
]

const transportOptions = [
    "Flight",
    "Train",
    "Bus",
    "Car Rental",
    "Taxi/Uber",
    "Ferry",
    "Motorcycle",
    "Walking",
    "Bicycle",
]

export default function ThirdForm() {
    const step3 = useSelector((state) => state.step3);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            budget: step3?.budget || 200,
            wifi: step3?.wifi || false,
            accommodation: step3?.accommodation || "",
            transport: step3?.transport || [],
        },
    })

    const onSubmit = (data) => {
        data.isCompleted = true
        dispatch(updateStep3(data))
    }

    const handleReset = () => {
        dispatch(resetStep3());
        reset({
            budget: 200,
            wifi: false,
            accommodation: "",
            transport: [],
        })
    }

    const handlePrevious = () => {
        navigate("/step2")
    }

    return (
        <Card className="w-full bg-neutral-50">
            <CardHeader className="">
                <CardTitle className="text-2xl font-bold text-center">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="budget" className="">
                            Budget{" "}
                        </Label>
                        <Controller
                            name="budget"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Slider
                                        defaultValue={field.value}
                                        value={[field.value]}
                                        onValueChange={(value) => field.onChange(value[0])}
                                        min={200}
                                        max={3000}
                                        step={50}
                                        className=""
                                    />
                                    <div className="text-center text-sm text-gray-600">${field.value}</div>
                                </div>
                            )}
                        />
                        {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="wifi"
                            control={control}
                            render={({ field }) => (
                                <Checkbox id="wifi" checked={field.value} onCheckedChange={field.onChange} className="bg-white" />
                            )}
                        />
                        <Label htmlFor="wifi" className="">
                            WiFi Required
                        </Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="accommodation" className="">
                            Accommodation Type
                        </Label>
                        <Controller
                            name="accommodation"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Select accommodation type" />
                                    </SelectTrigger>
                                    <SelectContent className="" position="popper">
                                        {accommodationOptions.map((option) => (
                                            <SelectItem key={option} value={option} className="">
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.accommodation && <p className="text-sm text-red-500">{errors.accommodation.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="">Transport Methods</Label>
                        <Controller
                            name="transport"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    {transportOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`transport-${option}`}
                                                checked={field.value.includes(option)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...field.value, option])
                                                    } else {
                                                        field.onChange(field.value.filter((item) => item !== option))
                                                    }
                                                }}
                                                className="bg-white"
                                            />
                                            <Label htmlFor={`transport-${option}`} className="text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.transport && <p className="text-sm text-red-500">{errors.transport.message}</p>}
                    </div>

                    <div className="flex space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handlePrevious}
                            className="flex-1 bg-white  hover:bg-gray-300"
                        >
                            Previous
                        </Button>
                        <Button type="submit" variant="default" size="default" className="flex-1">
                            Submit
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handleReset}
                            className="flex-1 bg-white  hover:bg-gray-300"
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}