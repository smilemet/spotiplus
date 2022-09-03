import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 13px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    outline: 0;
    border: 0;
  }

  .inner {
    max-width: 670px;
    margin: 0 auto;
    padding: 0 25px;
  }

  @media screen and (max-width : 767px) {
      max-width: 767px;
      background-color: red;
    }

  
  @media screen and (min-width: 768px) {
    min-width: 768px;
    background-color: blue;
  }
`;

export default GlobalStyle;
