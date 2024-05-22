import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    initializeUsers,
    loginUser,
    removeCurrent,
} from "../reducers/userReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";

export const useUsers = () => {
    const dispatch = useDispatch();
    const { all } = useSelector((state) => state.users);

    return [
        all,
        () => {
            dispatch(initializeUsers());
        },
    ];
};

export const useCurrentUser = () => {
    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.users);

    useEffect(() => {
        blogService.setToken(current ? current.token : null);
    }, [current]);

    return [
        current,
        {
            logout() {
                dispatch(removeCurrent());
            },
            async login(name, pass) {
                await dispatch(loginUser(name, pass));
            },
        },
    ];
};
