import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 13px;

    #root {
      height: 100vh;
      display: flex;
      flex-direction: column;

      header, footer {
        flex-shrink: 0;
      }

      main {
        flex-grow: 1;
        overflow-y: scroll;
        height: 77vh;

        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: #ffffff50;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #00000020;
        }

        &::-webkit-scrollbar-track {
          background-color: #ffffff50;
        }
      }
    }
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
    position: relative;
    min-width: 360px;
    max-width: 800px;
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
