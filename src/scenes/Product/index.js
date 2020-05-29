import React, { useContext, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import Div100vh from "react-div-100vh"

import { ShopifyContext } from "services/shopify"

import "./style.min.css"
import nf from "../../img/notfound.png"

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

  const [currVariant, setVariant] = useState(0)

  const addtoCheckout = useCallback(
    itemId => {
      if (!checkout) {
        client.checkout.create().then(newCheckout => {
          setCheckout(newCheckout)
        })
      }
      const checkoutId = checkout.id

      client.checkout.addLineItems(checkoutId, itemId).then(newCheckout => {
        setCheckout(newCheckout)
      })
    },
    [client, checkout, setCheckout]
  )

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
        currVariant === index ? "pp-product-info-size-button-selected" : ""
      }`}
      onClick={() => setVariant(index)}
    >
      {variant.title}
    </button>
  ))

  return (
    <Div100vh className="pp">
      <div className="pp-header">
        <h1 className="pp-header-text">SKY WORLDWIDE</h1>
      </div>
      <div className="pp-product">
        <div className="pp-product-image-wrap">
          <img
            src={
              product.variants[currVariant].image
                ? product.variants[currVariant].image.src
                : nf
            }
            alt={product.title}
            draggable={false}
            className="pp-product-image"
          />
        </div>
        <div className="pp-product-info">
          <div className="pp-product-info-price">
            ${product.variants[currVariant].price}
          </div>
          <div className="pp-product-info-size">{sizes}</div>
          <button
            className="pp-product-info-add-to-cart"
            type="submit"
            onClick={addtoCheckout(product.variants[currVariant].id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <p className="pp-cr">&copy;PUZZLE IN THE SKY LLC | ALL RIGHTS RESERVED</p>
      <button
        className="pp-cart"
        type="submit"
        onClick={() => setCheckoutOpen(true)}
      >
        open cart
      </button>
    </Div100vh>
  )
}
