import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { ShopifyContext } from "services/shopify"

const LoadingText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: row;
  overflow: auto;

  @media screen and (max-width: 875px) {
    display: block;
  }
`

export default function Product(props) {
  const {
    match: {
      params: { handle }
    }
  } = props

  const shopify = useContext(ShopifyContext)

  if (!shopify.products) {
    return <LoadingText>Loading...</LoadingText>
  }

  const product = shopify.products.find(prod => prod.handle === handle)

  if (!product) {
    return (
      <LoadingText>
        We couldn't find the product you're looking for...
        <br />
        <br />
        <Link to="/">Return to Shop</Link>
      </LoadingText>
    )
  }

  return <Container>{JSON.stringify(product)}</Container>
}
