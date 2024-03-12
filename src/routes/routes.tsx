import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import ClientsRoute from "pages/route/clientsRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/rotas',
        element: <ClientsRoute></ClientsRoute>
    },
    {
        path: '*',
        element: <div>404</div>
    }
])

export default router;