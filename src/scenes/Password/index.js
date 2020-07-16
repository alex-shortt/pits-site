import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Input = styled.input`
  width: 90%;
  max-width: 300px;
  padding: 10px;
  font-size: 1.2rem;
`
const Button = styled.button`
  margin-top: 15px;
  font-size: 1.2rem;
  padding: 8px 25px;
  font-family: Arial, sans-serif;
  text-transform: uppercase;
  border: none;
  background: white;
  color: black;
`

export default function Password(props) {
  return (
    <>
      <Helmet title="Password" />
      <Container>
        <Input />
        <Button>Enter</Button>
      </Container>
    </>
  )
}
