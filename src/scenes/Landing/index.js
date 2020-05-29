import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"

import Sky from "./components/Sky"
import Puzzle from "./components/Puzzle"

export default function Landing(props) {
  return (
    <>
      <Helmet title="Puzzle In The Sky" />
      <Sky />
      <Puzzle />
    </>
  )
}
