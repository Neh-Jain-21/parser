import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0px;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

        @media (prefers-color-scheme: dark) {
            background-color: black;
        }
    }
`;

export default GlobalStyles;
