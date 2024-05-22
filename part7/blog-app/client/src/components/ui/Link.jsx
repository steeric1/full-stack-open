import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Link = styled(RouterLink)`
    color: midnightblue;
    font-weight: bold;
    text-decoration: none;
    &:visited {
        color: midnightblue;
    }
    &:hover {
        color: slateblue;
    }
`;

export default Link;
