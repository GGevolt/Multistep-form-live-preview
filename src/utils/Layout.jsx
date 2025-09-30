import { Outlet } from "react-router";
import PDFPrevier from "./PDFPreview";
import ProgressBar from "./ProgressBar";

export default function Layout() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex flex-col gap-8 lg:gap-0 lg:flex-row ">
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col  max-w-lg">
                    <ProgressBar />
                    <Outlet />
                </div>
            </div>
            <div className="flex-1"><PDFPrevier /></div>
        </div>
    )
}