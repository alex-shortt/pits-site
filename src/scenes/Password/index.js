import React, { useState } from "react"
import { Redirect } from "react-router-dom"
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
const Button = styled.input`
  margin-top: 15px;
  font-size: 1.2rem;
  padding: 8px 25px;
  font-family: Arial, sans-serif;
  text-transform: uppercase;
  border: none;
  background: white;
  color: black;
`

const Wrong = styled.p`
  font-size: 1rem;
  color: red;
  width: 80%;
  text-align: center;
  margin-bottom: 0;
`

export default function Password(props) {
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useState(0)

  return (
    <>
      {auth === 2 ? <Redirect to="/products" /> : null}
      <Helmet title="Password" />
      <Container>
        <Input
          type="password"
          name="pw"
          onChange={e => setPassword(e.target.value)}
        />
        {auth === 1 ? <Wrong>Incorrect password.</Wrong> : null}
        <Button
          type="submit"
          value="Enter"
          onClick={() => {
            setAuth(password === "Spilsbury123" ? 2 : 1)
          }}
        />
      </Container>
    </>
  )
}
