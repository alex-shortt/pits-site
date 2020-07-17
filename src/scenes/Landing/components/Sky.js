import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"

import Cloud from "components/Cloud"
import cloud1 from "assets/clouds/cloud1.png"
import cloud2 from "assets/clouds/cloud2.png"
import cloud3 from "assets/clouds/cloud3.png"
import cloud4 from "assets/clouds/cloud4.png"
import cloud5 from "assets/clouds/cloud5.png"

const Container = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(180deg, #598ac2, #639cdf);
  filter: grayscale(${props => props.grayscale});
  transition: 0.5s ease-in-out;
  transform: translate3d(0, 0, 0);
`

export default function Sky(props) {
  const { pieceState, ...restProps } = props

  const [mouseY, setMouseY] = useState(null)
  const [orientation, setOrientation] = useState(null)

  const [{ offset }, set] = useSpring(() => ({
    offset: 0,
    config: { mass: 25, tension: 120, friction: 55 }
  }))

  const handleOrientationChange = e => {
    const newOrientation = e.beta / 180 - 0.5
    setOrientation(newOrientation)
    set({ offset: newOrientation * 2.5 + mouseY * 1.2 - 1 || 0 })
  }
  const handleMousePositionChange = e => {
    const newMouseY = (window.scrollY + e.clientY) / document.body.clientHeight
    setMouseY(newMouseY)
    set({ offset: orientation * 2.5 + newMouseY * 1.2 - 1 || 0 })
  }

  useEffect(() => {
    if (!mouseY) {
      window.addEventListener("deviceorientation", handleOrientationChange)
      window.addEventListener("mousemove", handleMousePositionChange)
    }

    if (pieceState === "done") {
      window.removeEventListener("deviceorientation", handleOrientationChange)
      window.removeEventListener("mousemove", handleMousePositionChange)
    }
  }, [
    handleOrientationChange,
    mouseY,
    orientation,
    handleMousePositionChange,
    pieceState
  ])

  // calc grayscale
  let grayscale = 1
  if (pieceState === "close") {
    grayscale = 0.75
  } else if (pieceState === "done") {
    grayscale = 0
  }

  return (
    <Container grayscale={grayscale} {...restProps}>
      <Cloud
        image={cloud1}
        xInit={60}
        y={10}
        offset={offset}
        layer={9}
        style={{ height: "25vh" }}
      />
      <Cloud
        image={cloud5}
        xInit={87}
        y={22}
        offset={offset}
        layer={23}
        style={{ height: "28vh" }}
      />
      <Cloud
        image={cloud2}
        xInit={40}
        y={50}
        offset={offset}
        layer={15}
        style={{ height: "30vh" }}
      />
      {/* long and lazy */}
      <Cloud
        image={cloud3}
        xInit={39}
        y={84}
        offset={offset}
        layer={4}
        style={{ height: "30vh" }}
      />
      <Cloud
        image={cloud4}
        xInit={20}
        y={80}
        offset={offset}
        layer={24}
        style={{ height: "38vh" }}
      />
      <Cloud
        image={cloud5}
        xInit={78}
        y={99}
        offset={offset}
        layer={19}
        style={{ height: "35vh" }}
      />
    </Container>
  )
}
