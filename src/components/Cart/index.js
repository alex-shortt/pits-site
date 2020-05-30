import React, { useContext, useCallback } from "react"
import styled from "styled-components/macro"

import { ShopifyContext } from "services/shopify"

import Item from "./components/Item"

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.open === "false" && "display: none"};
`

const Checkout = styled.div`
  width: 800px;
  height: 500px;
  background-color: #64a3de;
  border: white solid 5px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  color: white;

  @media screen and (max-width: 650px) {
    width: 100%;
    height: 100%;
  }
`

const Header = styled.div`
  text-align: center;
  position: relative;

  & h1 {
    text-transform: uppercase;
    margin: 10px;
  }
`

const Exit = styled.button`
  color: white;
  position: absolute;
  left: 20px;
  font-size: 30px;
  outline: none;
  border: none;
  background-color: transparent;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    color: rgba(250, 250, 250, 0.5);
    transition: 0.3s;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  @media screen and (max-width: 650px) {
    display: none;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  height: 70%;
  overflow: auto;
`

const Footer = styled.div`
  color: white;
  position: absolute;
  bottom: 5px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    font-size: 20px;
    color: white;
    transition: 0.3s;
    text-decoration: none;

    &:hover {
      color: rgba(250, 250, 250, 0.5);
      transition: 0.3s;
    }

    @media screen and (max-width: 650px) {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 850px) {
    width: 90%;
  }
`

const EmptyText = styled.h4`
  text-align: center;
`

export default function Cart(props) {
  const {} = props
  const {
    checkout,
    setCheckout,
    checkoutOpen,
    setCheckoutOpen,
    client
  } = useContext(ShopifyContext)

  const removeFromCheckout = useCallback(
    itemId => {
      const checkoutId = checkout.id
      const lineItemsToRemove = itemId
      client.checkout
        .removeLineItems(checkoutId, lineItemsToRemove)
        .then(newCheckout => {
          setCheckout(newCheckout)
        })
    },
    [checkout, client.checkout, setCheckout]
  )

  if (!checkout || !checkoutOpen) {
    return <></>
  }

  const { lineItems, subtotalPrice, webUrl } = checkout

  return (
    <Container open={checkoutOpen}>
      <Checkout>
        <Header>
          <Exit
            onClick={() => {
              setCheckoutOpen(false)
            }}
          >
            x
          </Exit>
          <h1>Cart</h1>
        </Header>
        <Content>
          {lineItems && lineItems.length > 0 ? (
            lineItems.map(item => (
              <Item
                item={item}
                key={item.id}
                removeFromCheckout={removeFromCheckout}
              />
            ))
          ) : (
            <EmptyText>YOUR CART IS EMPTY</EmptyText>
          )}
        </Content>
        <Footer>
          <h4>Subtotal: ${subtotalPrice}</h4>
          {lineItems && lineItems.length > 0 ? (
            <a href={webUrl}>CHECKOUT</a>
          ) : null}
        </Footer>
      </Checkout>
    </Container>
  )
}
