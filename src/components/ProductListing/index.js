import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

const Container = styled.div`
  width: 90%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
`

const Title = styled.h1`
  margin: 25px 0 0;
  text-align: center;
  font-family: Arial, sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 1.5rem;
`

const Button = styled(Link)`
  width: 100%;
  padding: 8px 10px;
  text-align: center;
  font-size: 1.2rem;
  text-transform: uppercase;
  text-decoration: none;
  background: white;
  color: black;
  border-radius: 4px;
  margin-top: 20px;
  box-sizing: border-box;
`

export default function ProductListing(props) {
  const { product } = props
  console.log(product)
  return (
    <Container>
      <Image src={product.images[0].src} />
      <Title>{product.title}</Title>
      <Button to={product.handle}>Shop</Button>
    </Container>
  )
}
