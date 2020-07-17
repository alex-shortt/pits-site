import React, { useCallback, useContext, useState } from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import Helmet from "components/Helmet"
import Sky from "components/Sky"
import { ShopifyContext } from "services/shopify"
import CartIcon from "components/CartIcon"
import BackIcon from "components/BackIcon"
import SkyLogo from "components/SkyLogo"

const Container = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
`

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  flex-direction: row;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`

const Variant = styled.button`
  font-family: Arial, sans-serif;
  color: white;
  font-weight: 900;
  max-width: 80px;
  padding: 10px 20px;
  font-size: 1.25rem;
  background: none;
  border: 2px solid;
  border-color: ${props => (props.selected ? "white" : "transparent")};
  cursor: pointer;
  outline: none;
`

const VariantContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`
const Half = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 25px;
`

const Title = styled.h1`
  margin: 25px 0 0;
  text-align: center;
  font-family: Arial, sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 1.75rem;
  color: white;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 1.3rem;
  text-transform: uppercase;
  text-decoration: none;
  background: ${props => (props.disabled ? "gray" : "white")};
  color: black;
  border-radius: 4px;
  margin-top: 20px;
  box-sizing: border-box;
  border: none;
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  transition: all 0.15s ease;
  max-width: 400px;
  margin: 0 auto;

  &:hover {
    filter: ${props => (props.disabled ? "invert(0)" : "invert(1)")};
  }
`

const Image = styled.img`
  object-fit: contain;
`

export default function Product(props) {
  const {
    match: {
      params: { handle }
    }
  } = props

  const {
    client,
    products,
    checkout,
    setCheckout,
    setCheckoutOpen
  } = useContext(ShopifyContext)

  const [curVariantId, setVariantId] = useState(null)

  const addToCheckout = useCallback(async () => {
    if (!curVariantId) {
      return
    }

    const lineItemsToAdd = { variantId: curVariantId, quantity: 1 }
    const newCheckout = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    )
    setCheckout(newCheckout)
    setCheckoutOpen(true)
  }, [checkout.id, client.checkout, curVariantId, setCheckout, setCheckoutOpen])

  if (!products) {
    return (
      <>
        <Sky />
        <Container>
          <SkyLogo />
          <ProductContainer>
            <h1>Loading...</h1>
          </ProductContainer>
        </Container>
      </>
    )
  }

  const product = products.find(prod => prod.handle === handle)

  if (!product) {
    return (
      <>
        <Sky />
        <Container>
          <SkyLogo />
          <ProductContainer>
            <h1>Could not find product</h1>
            <Link to="/">Go Back</Link>
          </ProductContainer>
        </Container>
      </>
    )
  }

  const image = product.images[0].src
  const sizes = product.variants.map(variant => (
    <Variant
      selected={curVariantId === variant.id}
      key={variant.id}
      onClick={() => setVariantId(variant.id)}
    >
      {variant.title}
    </Variant>
  ))

  return (
    <>
      <Helmet title="Product" />
      <Sky />
      <CartIcon />
      <BackIcon to="/products" />
      <Container>
        <SkyLogo />
        <ProductContainer>
          <Half>
            <Image src={image} alt={product.title} />
          </Half>
          <Half>
            <Title>{product.title}</Title>
            <Title>${product.variants[0].price}</Title>
            <br />
            <br />
            <br />
            <VariantContainer>{sizes}</VariantContainer>
            <Button onClick={addToCheckout} disabled={!curVariantId}>
              Add To Cart
            </Button>
          </Half>
        </ProductContainer>
      </Container>
    </>
  )
}
