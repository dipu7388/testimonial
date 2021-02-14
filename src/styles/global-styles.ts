import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
    height: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
  #mainContent{
    height: 100%;
  }

  header .logo {
  z-index: 1000;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1em;
  text-transform: uppercase;
  text-shadow: 0px 1px 1px black;
  color: #fff;
  height: 50px;
  width: 50px;
  overflow: hidden; 
  position: relative;
  display: flex;
    align-items: center;
    justify-content: center;
  &::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #ff9800;
    opacity: .6;
    border-radius: 5px;
    z-index: -1;
  }
}
}
`;
