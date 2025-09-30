import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import NotFound from "@pages/NotFound";
import FirstForm from "@/pages/FirstForm";
import SecondForm from "@/pages/SecondForm";
import Layout from "@/utils/Layout";
import ThirdForm from "@/pages/ThirdForm";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <FirstForm />,
                },
                {
                    path: "step2",
                    element: <SecondForm />
                },
                {
                    path: "step3",
                    element: <ThirdForm />
                }
            ],
        },
    ]
);

const RouteProvider = () => {
    return (
        <RouterProvider
            router={router}
        />
    );
};

export default RouteProvider;
