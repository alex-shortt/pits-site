import React, { useContext, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import Div100vh from "react-div-100vh"
import styled from "styled-components/macro"

import { ShopifyContext } from "services/shopify"
import nf from "assets/img/notfound.png"
import cartImg from "assets/img/cart.png"
import backgroundImg from "assets/img/background.jpg"

import "./style.css"

const Container = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: 100%;
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
  })

  if (!products) {
    return (
      <Div100vh className="pp pp-loading">
        <h1 className="pp-loading-text">Loading...</h1>
      </Div100vh>
    )
  }

  const product = products.find(prod => prod.handle === handle)

  if (!product) {
    return (
      <Div100vh className="pp pp-loading">
        <h1 className="pp-loading-text">
          We couldn't find the product you're looking for...
        </h1>
        <Link to="/">Home</Link>
      </Div100vh>
    )
  }

  const sizes = product.variants.map((variant, index) => (
    <button
      type="button"
      className={`pp-product-info-size-button ${
        curVariantId === variant.id
          ? "pp-product-info-size-button-selected"
          : ""
      }`}
      key={variant.id}
      onClick={() => setVariantId(variant.id)}
    >
      {variant.title}
    </button>
  ))

  return (
    <Container>
      <Div100vh className="pp">
        <div className="pp-header">
          <h1 className="pp-header-text">SKY WORLDWIDE</h1>
        </div>
        <div className="pp-product">
          <div className="pp-product-image-wrap">
            <img
              src={
                product.variants[0].image ? product.variants[0].image.src : nf
              }
              alt={product.title}
              draggable={false}
              className="pp-product-image"
            />
          </div>
          <div className="pp-product-info">
            <div className="pp-product-info-price">
              ${product.variants[0].price}
            </div>
            <div className="pp-product-info-size">{sizes}</div>
            <button
              className="pp-product-info-add-to-cart"
              type="submit"
              onClick={() => addToCheckout()}
            >
              add to cart
            </button>
          </div>
        </div>
        <p className="pp-cr">
          &copy;PUZZLE IN THE SKY LLC | ALL RIGHTS RESERVED
        </p>
        <button
          className="pp-cart"
          type="submit"
          onClick={() => setCheckoutOpen(true)}
        >
          <img src={cartImg} className="pp-cart-image" />
        </button>
      </Div100vh>
    </Container>
  )
}
