import React from "react"
import styled, { keyframes } from "styled-components/macro"
import { Tween } from "react-gsap"

const moveAcross = y => keyframes`
  0% { transform: translateX(0vw) translateX(-100%) translateY(-${y}%) }
  100% { transform: translateX(100vw) translateX(0%) translateY(-${y}%) }
`

const Container = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  z-index: 0;
  left: 0;
  height: 30vh;
  pointer-events: none;
  user-select: none;
  animation: ${props => moveAcross(props.y)} ${props => props.velocity}s linear
    infinite;
  animation-delay: ${props => props.delay}s;
`

const Image = styled.img.attrs(props => ({
  style: {
    transform: `translateY(${props.yOffset}px)`
  }
}))`
  height: 100%;
  user-select: none;
  pointer-events: none;
`

function getLayerStyles(layer) {
  const styles = {}

  styles.zIndex = layer
  styles.opacity = Math.min(1, (layer / 20) * 0.7 + 0.4)
  if (layer > 20) {
    styles.opacity = 0.85
  }

  const brightness = Math.max((layer / 20) * 0.8, 1)
  // const blur = `${Math.max(((20 - layer) / 20) * 2.5, 0)}px`
  styles.filter = `brightness(${brightness})`

  styles.yDuration = Math.max(((20 - layer) / 20) * 1.2 + 1, 1)
  styles.maxOffset = Math.max((layer / 20) * 40 + 20, 25)
  styles.xDuration = Math.max(((20 - layer) / 20) * 90 + 100, 90)
  return styles
}

export default function Cloud(props) {
  const { image, xInit = 0, y = 50, offset, layer } = props

  const { yDuration, maxOffset, xDuration, ...styles } = getLayerStyles(layer)

  const delay = (xInit / 100) * xDuration * -1

  return (
    <Container y={y} velocity={xDuration} delay={delay} style={styles}>
      <Tween to={{ y: `${maxOffset * offset}px` }} duration={yDuration}>
        <Image src={image} />
      </Tween>
    </Container>
  )
}
