import React, { useState, useCallback, useEffect } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Cloud from "components/Cloud"
import cloud1 from "assets/clouds/cloud1.png"
import cloud2 from "assets/clouds/cloud2.png"
import cloud3 from "assets/clouds/cloud3.png"
import cloud4 from "assets/clouds/cloud4.png"
import cloud5 from "assets/clouds/cloud5.png"

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(180deg, #598ac2, #639cdf);
`

export default function Sky(props) {
  const [mouseY, setMouseY] = useState(0)
  const [orientation, setOrientation] = useState(0)
  const [scrollDist, setScrollDist] = useState(0)
  const [offset, setOffset] = useState()

  const handleOrientationChange = useCallback(
    e => setOrientation(e.beta / 180 - 0.5),
    []
  )
  const handleMousePositionChange = useCallback(
    e => setMouseY((window.scrollY + e.clientY) / document.body.clientHeight),
    []
  )
  const handleScrollChange = useCallback(
    () =>
      setScrollDist(
        window.scrollY / (document.body.clientHeight - window.innerHeight)
      ),
    []
  )

  useEffect(() => {
    if (!offset) {
      window.addEventListener("deviceorientation", handleOrientationChange)
      window.addEventListener("scroll", handleScrollChange)
    }

    setOffset(orientation * 2.5 + scrollDist + mouseY * 1.2 - 1)
  }, [
    offset,
    handleOrientationChange,
    handleScrollChange,
    mouseY,
    orientation,
    scrollDist
  ])

  return (
    <Container onMouseMove={handleMousePositionChange}>
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
