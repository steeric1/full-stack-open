import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initializeUser, loginUser, logoutUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";

export const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        blogService.setToken(user ? user.token : null);
    }, [user]);

    return [
        user,
        {
            init() {
                dispatch(initializeUser());
            },
            async login(name, pass) {
                await dispatch(loginUser(name, pass));
            },
            logout() {
                dispatch(logoutUser());
            },
        },
    ];
};
