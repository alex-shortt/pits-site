import React, { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"

import Sky from "./components/Sky"
import Puzzle from "./components/Puzzle"

const Wrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  pointer-events: none;
`

const cutoff = 0.5
const wrapperTransform = perc =>
  perc < 0.96 ? Math.max(perc - cutoff, 0) / (1 - cutoff) : 1
const skyTransform = perc => 1 + perc * 2

export default function Landing(props) {
  const { history } = props

  // still, moving, close, done
  const [pieceState, setPieceState] = useState("still")

  const [{ exit }, set] = useSpring(() => ({
    exit: 0,
    config: { mass: 25, tension: 120, friction: 130 }
  }))

  useEffect(() => {
    if (pieceState === "done") {
      setTimeout(() => {
        set({ exit: 1 })

        setTimeout(() => {
          history.push("/products")
        }, 3500)
      }, 750)
    }
  })

  return (
    <>
      <Helmet />
      <Wrapper
        style={{
          background: exit.interpolate(
            perc => `rgba(255, 255, 255, ${wrapperTransform(perc)})`
          )
        }}
      />
      <Sky
        pieceState={pieceState}
        style={{
          transform: exit.interpolate(
            perc => `translate3d(0, 0, 0) scale(${skyTransform(perc)})`
          )
        }}
      />
      <Puzzle pieceState={pieceState} setPieceState={setPieceState} />
    </>
  )
}
