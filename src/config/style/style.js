import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --white: #fff;
  --black: #000;
  --transparent: transparent;

  --gray: #C4C4C4;
  --dark-gray: #424242;

  --light-blue: #f0f8ff;
  --blue: #67BDFF;
  --dark-blue: #1c9cfd;
  --darker-blue: #0079cf;
  --yellow: #ffe554;
  --pink: #ce679a;
}

::selection {
    background: var(--blue);
    color: var(--white);
}

html {
  font-family: Arial, Helvetica, sans-serif;
  color: var(--dark-gray);
}

a {
  text-decoration: none;
  color: var(--blue);

  transition: all 500ms ease;

  &:hover {
    color: var(--dark-blue);
  }
}
`;

export default GlobalStyle;
