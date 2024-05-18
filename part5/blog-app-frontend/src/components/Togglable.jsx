import { forwardRef, useState, useImperativeHandle } from "react";

const Togglable = forwardRef(({ showButtonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    useImperativeHandle(ref, () => ({
        toggleVisibility() {
            setVisible(!visible);
        },
    }));

    return (
        <div>
            <button style={hideWhenVisible} onClick={() => setVisible(true)}>
                {showButtonLabel}
            </button>
            <div style={showWhenVisible}>
                {children}
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
        </div>
    );
});

export default Togglable;
