import React, { useContext } from "react"
import styled from "styled-components/macro"

import { ShopifyContext } from "services/shopify"

const Container = styled.button`
  position: absolute;
  top: 80px;
  right: 5%;
  font-family: Arial, sans-serif;
  color: white;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.25s linear;

  &:hover {
    opacity: 0.75;
  }
`

export default function CartIcon(props) {
  const { setCheckoutOpen } = useContext(ShopifyContext)
  return <Container onClick={() => setCheckoutOpen(true)}>CART</Container>
}
