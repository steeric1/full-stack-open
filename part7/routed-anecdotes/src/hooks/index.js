import { useState } from "react";

export const useField = (type) => {
    const [value, setValue] = useState("");

    return {
        type,
        value,
        onChange(event) {
            setValue(event.target.value);
        },
        reset() {
            setValue("");
        },
    };
};
