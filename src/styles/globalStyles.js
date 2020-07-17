import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

export default createGlobalStyle`
  body, html, #root {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  html, body {
    overflow-y: hidden;
  }

  body {
    font-family: "Helvetica", sans-serif;
    overflow-x: hidden;
  }
`
