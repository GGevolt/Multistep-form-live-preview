import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { resetStep2, updateStep2 } from "@/provider/reducer/Step2Slice"
import { useNavigate } from "react-router"


const schema = yup.object({
    country: yup.string().required("Country is required"),
    travelers: yup.number().min(1, "At least 1 traveler is required").required("Number of travelers is required"),
    activities: yup.array().min(1, "Please select at least one activity"),
    intensity: yup.string().required("Please select intensity level"),
    note: yup.string(),
})

const activityOptions = [
    { id: "hiking", label: "Hiking" },
    { id: "swimming", label: "Swimming" },
    { id: "sightseeing", label: "Sightseeing" },
    { id: "adventure", label: "Adventure Sports" },
    { id: "cultural", label: "Cultural Tours" },
    { id: "food", label: "Food Tours" },
]

const intensityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
]

const countryOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Japan",
    "Australia",
    "New Zealand",
    "Thailand",
    "Singapore",
    "South Korea",
    "Brazil",
    "Mexico",
    "India",
    "China",
    "Netherlands",
    "Switzerland",
    "Norway",
    "Sweden",
    "Denmark",
    "Greece",
    "Turkey",
    "Egypt",
    "South Africa",
    "Morocco",
    "UAE",
    "Indonesia",
    "Malaysia",
]


export default function SecondForm() {
    const step2 = useSelector((state) => state.step2);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            country: step2?.country || "",
            travelers: step2?.travelers || 1,
            activities: step2?.activities || [],
            intensity: step2?.intensity || "",
            note: step2?.note || "",
        },
    })

    const onSubmit = (data) => {
        data.isCompleted = true;
        dispatch(updateStep2(data));
        navigate("/step3");
    }

    const handleReset = () => {
        dispatch(resetStep2());
        reset({
            country: "",
            travelers: 1,
            activities: [],
            intensity: "",
            note: "",
        });
    }

    const handlePrevious = () => {
        navigate("/");
    }

    return (
        <Card className="w-full bg-neutral-50">
            <CardHeader className="">
                <CardTitle className="">Travel Details</CardTitle>
            </CardHeader>
            <CardContent className="">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="country" className="">
                            Country
                        </Label>
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className={`w-full bg-white ${errors.country ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent className="">
                                        {countryOptions.map((country) => (
                                            <SelectItem className="" key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="travelers" className="">
                            Number of Travelers
                        </Label>
                        <Input
                            type="number"
                            id="travelers"
                            min="1"
                            max="20"
                            {...register("travelers")}
                            className={`bg-white ${errors.travelers ? "border-red-500" : ""}`}
                        />
                        {errors.travelers && <p className="text-red-500 text-sm mt-1">{errors.travelers.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="">Activities</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {activityOptions.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-2">
                                    <Controller
                                        name="activities"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id={activity.id}
                                                className="bg-white"
                                                checked={field.value?.includes(activity.id)}
                                                onCheckedChange={(checked) => {
                                                    const updatedActivities = checked
                                                        ? [...(field.value || []), activity.id]
                                                        : (field.value || []).filter((item) => item !== activity.id)
                                                    field.onChange(updatedActivities)
                                                }}
                                            />
                                        )}
                                    />
                                    <Label htmlFor={activity.id} className="text-sm">
                                        {activity.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.activities && <p className="text-red-500 text-sm mt-1">{errors.activities.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="">Intensity Level</Label>
                        <Controller
                            name="intensity"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-2">
                                    {intensityOptions.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2 ">
                                            <RadioGroupItem className="bg-white" value={option.value} id={option.value} />
                                            <Label htmlFor={option.value} className="">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        {errors.intensity && <p className="text-red-500 text-sm mt-1">{errors.intensity.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="note" className="">
                            Notes (Optional)
                        </Label>
                        <Textarea
                            id="note"
                            placeholder="Any additional notes, places you want to go or preferences..."
                            {...register("note")}
                            className="mt-1 bg-white"
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            size="default"
                            onClick={handlePrevious}
                            className="flex-1 bg-white hover:bg-gray-300"
                        >
                            Previous
                        </Button>
                        <Button type="submit" variant="default" size="default" className="flex-1">
                            Continue
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="default"
                            onClick={handleReset}
                            className="flex-1 bg-white hover:bg-gray-300"
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}