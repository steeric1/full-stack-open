import styled from "styled-components";

const SmallButton = styled.button`
    font-size: 0.85em;
    padding: 5px;
    padding-inline: 8px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    background-color: darkslateblue;
    border: 1px solid cornsilk;

    &:hover {
        background-color: slateblue;
    }
`;

export default SmallButton;
