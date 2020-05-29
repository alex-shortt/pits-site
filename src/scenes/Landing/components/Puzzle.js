import React, { useState } from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"
import { useGesture } from "react-with-gesture"

import puzzleImg from "assets/puzzle/puzzle.png"
import missingPieceImg from "assets/puzzle/missing-piece.png"

const Background = styled.div`
  height: 100%;
  width: 100%;
  background: url(${puzzleImg});
  background-size: 150vw;
  background-position: center;
  position: absolute;
  z-index: 50;
  pointer-events: none;

  @media screen and (max-width: 1200px) {
    background-size: 200vw;
  }

  @media screen and (max-width: 750px) {
    background-size: 400vw;
  }
`

const PuzzlePiece = styled(animated.div)`
  height: 12vw;
  width: 12vw;
  position: absolute;
  background-color: transparent !important;
  overflow: visible;
  left: 50%;
  top: 50%;
  z-index: 51;

  cursor: pointer;

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  @media screen and (max-width: 1200px) {
    height: 16vw;
    width: 16vw;
  }

  @media screen and (max-width: 750px) {
    height: 32vw;
    width: 32vw;
  }
`

const PieceImg = styled.img.attrs({ src: missingPieceImg })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.25s linear;
  pointer-events: none;
  ${props => props.dragging && "transform: scale(1.1)"};
  ${props => props.close && "filter: brightness(1.4);"};
`

const ShadowImg = styled(PieceImg)`
  filter: brightness(0.3);
  ${props => props.dragging && "transform: scale(1.11)"};
  ${props => props.dragging && "filter: brightness(0.2) blur(8px);"};
`

export default function Puzzle(props) {
  // still, moving, close, done
  const [pieceState, setPieceState] = useState("still")

  // x,y offset represented as a decimal from -0.5 to 0,5
  // offset from 0,0 being center of screen
  // multiplied by screen width/height in a sec
  const [{ xy }, set] = useSpring(() => {
    const startX = (Math.random() - 0.5) * 0.6 + 0.15
    const startY = (Math.random() - 0.5) * 0.6 + 0.15

    return {
      xy: [startX, startY]
    }
  })

  const bind = useGesture(opts => {
    const { down, delta, velocity, previous } = opts

    const newVelocity = clamp(velocity, 1, 4)
    let newX = (previous[0] - window.innerWidth / 2) / window.innerWidth
    let newY = (previous[1] - window.innerHeight / 2) / window.innerHeight

    const dist = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2))

    if (dist < 0.1 && !down) {
      newX = 0
      newY = 0
      setPieceState("done")
    } else if (dist < 0.1 && down) {
      setPieceState("close")
    } else if (!down) {
      setPieceState("still")
    } else if (down) {
      setPieceState("moving")
    }

    set({
      xy: [newX, newY],
      config: { mass: newVelocity, tension: 500 * newVelocity, friction: 50 }
    })
  })

  return (
    <>
      <Background />
      <PuzzlePiece
        {...bind()}
        style={{
          transform: xy.interpolate(
            (x, y) =>
              `translate(-50%, -50%) translate3d(${x *
                window.innerWidth}px,${y * window.innerHeight}px,0)`
          )
        }}
      >
        <div>
          <ShadowImg
            dragging={pieceState === "moving" || pieceState === "close"}
          />
          <PieceImg
            dragging={pieceState === "moving" || pieceState === "close"}
            close={pieceState === "close" || pieceState === "done"}
          />
        </div>
      </PuzzlePiece>
    </>
  )
}

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
