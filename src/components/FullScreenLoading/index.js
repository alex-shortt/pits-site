import React from "react"
import styled, { keyframes } from "styled-components/macro"

const scrollGradient = keyframes`
  0% {
    background-position: 0 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
 `

const FullScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  background-size: 400% 400%;

  animation: ${scrollGradient} 40s ease infinite;

  color: #fff;
`

export default function FullScreenLoading() {
  return <FullScreenWrapper />
}
