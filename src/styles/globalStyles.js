import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

export default createGlobalStyle`
  body {
    font-family: "Helvetica", sans-serif;
    overflow: auto;
    overflow-x: hidden;
  }
`
