import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components/macro"

import { ThreeScene } from "services/scene"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: filter 0.15s linear;
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  z-index: 99;
  pointer-events: none;
  opacity: 1;
  transition: 1s ease-out opacity;
  ${props => props.loaded && "opacity: 0"};
`

const LoadingText = styled.h1`
  font-family: "Helvetica", Helvetica, sans-serif;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  text-transform: uppercase;
  pointer-events: none;
  opacity: 1;
  transition: 1s ease-out opacity;
  ${props => props.loaded && "opacity: 0"};
`

const ContinueText = styled.h2`
  font-family: "Helvetica", Helvetica, sans-serif;
  color: white;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
  text-transform: uppercase;
  pointer-events: none;
  opacity: 1;
  transition: 1s ease-out opacity;
  ${props => props.loaded && "opacity: 0"};
`

export default function ThreeEnvironment(props) {
  const { history } = props

  const [loaded, setLoaded] = useState(false)
  const [setup, setSetup] = useState(false)

  const containerRef = useRef()

  useEffect(() => {
    if (setup === false) {
      const scene = new ThreeScene()
      scene.threeSetup(containerRef.current, history)
      scene.initSky()
      scene.initKeanu(setLoaded)
      scene.startAnimationLoop()

      setSetup(true)
    }
  }, [history, setup])

  return (
    <>
      <Container ref={containerRef} />
      <LoadingContainer loaded={loaded} />
      <LoadingText loaded={loaded}>Loading...</LoadingText>
      <ContinueText>Select Keanu to Continue</ContinueText>
    </>
  )
}
