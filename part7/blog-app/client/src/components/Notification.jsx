import { useSelector } from "react-redux";
import { useEffect } from "react";

import "../styles.css";

const Notification = () => {
    const { message, kind } = useSelector((state) => state.notification);
    return (
        message && <div className={`notification ${kind ?? ""}`}>{message}</div>
    );
};

export default Notification;
