import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

const Container = styled(Link)`
  position: absolute;
  top: 80px;
  left: 5%;
  font-family: Arial, sans-serif;
  color: white;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.25s linear;
  text-decoration: none;

  &:hover {
    opacity: 0.75;
  }
`

export default function BackIcon(props) {
  const { to } = props
  return <Container to={to}>BACK</Container>
}
