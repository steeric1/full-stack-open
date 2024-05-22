import { useSelector } from "react-redux";
import styled from "styled-components";

const NotificationArea = styled.div`
    background-color: ${(props) => (props.$error ? "lightcoral" : "palegreen")};
    padding: 10px;
    padding-inline: 15px;
    border: 1px solid ${(props) => (props.$error ? "maroon" : "mediumseagreen")};
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Notification = () => {
    const { message, kind } = useSelector((state) => state.notification);
    return (
        message && (
            <NotificationArea $error={kind === "error"}>
                {message}
            </NotificationArea>
        )
    );
};

export default Notification;
