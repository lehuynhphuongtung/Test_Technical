import { TUser } from "../types/user";

export const filterUsers = (users: TUser[], filters: { id?: string; name?: string; email?: string; active?: string }) => {
    return users.filter(user => {
        if (filters.id && !user.id.includes(filters.id)) return false;
        if (filters.name && !user.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
        if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
        if (filters.active && filters.active !== "") {
            const isActive = filters.active === "true";
            if (user.active !== isActive) return false;
        }
        return true;
    });
};