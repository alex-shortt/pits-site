import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

export default createGlobalStyle`
  body, html, #root {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
        position: relative;
  }

  body {
    font-family: "Helvetica", sans-serif;
    overflow: auto;
    overflow-x: hidden;
  }
`
