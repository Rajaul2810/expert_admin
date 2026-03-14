export { useGet } from "./use-get"

// // Typed response
// const { data, error, isLoading, refetch } = useGet<Expert[]>("/api/experts")

// // Optional request (e.g. when id is ready)
// const { data } = useGet<User>(userId ? `/api/users/${userId}` : null)

// // Disabled until needed
// const { data, refetch } = useGet<Profile>("/api/me", { enabled: isLoggedIn })
