import React from "react"
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
  transition: all 0.15s linear;
  pointer-events: none;
`

const ShadowImg = styled(PieceImg)`
  filter: brightness(0.3);
`

export default function Puzzle(props) {
  // x,y offset
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

  const bind = useGesture(opts => {
    const { down, delta, velocity, previous } = opts
    const newVelocity = clamp(velocity, 1, 4)
    set({
      xy: [
        previous[0] - window.innerWidth / 2,
        previous[1] - window.innerHeight / 2
      ],
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
            (x, y) => `translate(-50%, -50%) translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <div>
          <ShadowImg />
          <PieceImg />
        </div>
      </PuzzlePiece>
    </>
  )
}

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
