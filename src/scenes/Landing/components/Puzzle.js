import React from "react"
import styled from "styled-components/macro"

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

    #puzPiece {
      height: 16vw;
      width: 16vw;
    }
  }

  @media screen and (max-width: 750px) {
    background-size: 400vw;

    #puzPiece {
      height: 32vw;
      width: 32vw;
    }
  }
`

const PuzzlePiece = styled.div`
  height: 12vw;
  width: 12vw;
  position: absolute;
  top: 0;
  background-color: transparent !important;
  overflow: visible;
  z-index: 51;

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  @media screen and (max-width: 750px) {
    background-size: 400vw;

    #puzPiece {
      height: 32vw;
      width: 32vw;
    }
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
`

const ShadowImg = styled(PieceImg)`
  filter: brightness(0.3);
`

export default function Puzzle(props) {
  return (
    <>
      <Background />
      <PuzzlePiece>
        <div>
          <ShadowImg />
          <PieceImg />
        </div>
      </PuzzlePiece>
    </>
  )
}
