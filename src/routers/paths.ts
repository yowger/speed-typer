export const PATHS = {
    home: "/",
    leaderboard: "/leaderboard",
    about: "/about",

    auth: {
        login: "/auth/login",
        register: "/auth/register",
    },

    user: {
        profile: (username: string) => `/u/${username}`,
    },
} as const
