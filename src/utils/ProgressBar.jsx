import { useSelector } from "react-redux";

export default function ProgressBar() {
    const step1 = useSelector((state) => state.step1);
    const step2 = useSelector((state) => state.step2);
    const step3 = useSelector((state) => state.step3);

    const steps = [
        {
            completed: step1?.isCompleted || false,
        },
        {
            completed: step2?.isCompleted || false,
        },
        {
            completed: step3?.isCompleted || false,
        },
    ]

    return (
        <div className="w-full max-w-4xl mx-auto mb-6">
            <div className="mt-6 text-center">
                <div className="text-sm text-white">
                    {steps.filter((step) => step.completed).length} of {steps.length} steps completed
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(steps.filter((step) => step.completed).length / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}