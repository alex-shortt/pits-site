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

export default function ThreeEnvironment(props) {
  const { history } = props
  const [setup, setSetup] = useState(false)

  const containerRef = useRef()

  useEffect(() => {
    if (setup === false) {
      const scene = new ThreeScene()
      scene.threeSetup(containerRef.current, history)
      scene.initSky()
      scene.initKeanu()
      scene.startAnimationLoop()

      setSetup(true)
    }
  }, [history, setup])

  return <Container ref={containerRef} />
}
