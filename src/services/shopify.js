import React, { useEffect, useState } from "react"
import ShopifyBuy from "shopify-buy"

export const ShopifyContext = React.createContext()

const client = ShopifyBuy.buildClient({
  domain: "puzzleinthesky.myshopify.com",
  storefrontAccessToken: "8a2ea1499096c75572207a0f91789ff0"
})

export function ShopifyProvider(props) {
  const { children } = props

  const [products, setProducts] = useState()
  const [checkout, setCheckout] = useState()
  const [checkoutOpen, setCheckoutOpen] = useState("false")

  useEffect(() => {
    if (!products && !checkout) {
      client.product
        .fetchAll()
        .then(shopifyProducts => setProducts(shopifyProducts))
      client.checkout
        .create()
        .then(shopifyCheckout => setCheckout(shopifyCheckout))
    }
  }, [products, checkout])

  const providerValue = {
    client,
    products,
    checkout,
    setCheckout,
    checkoutOpen,
    setCheckoutOpen
  }

  return (
    <ShopifyContext.Provider value={providerValue}>
      {children}
    </ShopifyContext.Provider>
  )
}
