import { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import Button from "./ui/Button";

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
            <Button style={hideWhenVisible} onClick={() => setVisible(true)}>
                {showButtonLabel}
            </Button>
            <div style={showWhenVisible}>
                {children}
                <Button
                    style={{ marginTop: "5px" }}
                    onClick={() => setVisible(false)}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
    showButtonLabel: PropTypes.string.isRequired,
};

export default Togglable;
