import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "CLEAR":
            return "";
        default:
            return state;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const notifAndDispatch = useReducer(notificationReducer, "");

    return (
        <NotificationContext.Provider value={notifAndDispatch}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export const useNotificationValue = () => {
    const notifAndDispatch = useContext(NotificationContext);
    return notifAndDispatch[0];
};

let timeout = null;

export const useNotificationDispatch = () => {
    const [_, dispatch] = useContext(NotificationContext);
    return (action) => {
        clearTimeout(timeout);

        dispatch(action);
        timeout = setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    };
};
