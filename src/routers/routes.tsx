import { createBrowserRouter, type RouteObject } from "react-router"

import AppLayout from "../ui/layout/AppLayout"
import AuthLayout from "../ui/layout/AuthLayout"
import HomePage from "../pages/HomePage"
import { PATHS } from "./paths"

const routesConfig: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
            {
                index: true,
                path: PATHS.home,
                element: <HomePage />,
            },
            {
                path: PATHS.leaderboard,
                element: <div>Leaderboard</div>,
            },
            {
                path: PATHS.about,
                element: <div>About</div>,
            },
        ],
    },

    {
        element: <AuthLayout />,
        children: [
            {
                path: PATHS.auth.login,
                element: <div>Login</div>,
            },
            {
                path: PATHS.auth.register,
                element: <div>Register</div>,
            },
        ],
    },
]

export const router = createBrowserRouter(routesConfig)
