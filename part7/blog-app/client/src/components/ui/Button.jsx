import styled from "styled-components";

const Button = styled.button`
    font-size: 1em;
    padding: 10px;
    padding-inline: 15px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    background-color: darkslateblue;
    border: 1px solid cornsilk;

    &:hover {
        background-color: slateblue;
    }
`;

export default Button;
