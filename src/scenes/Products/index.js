import React, { useContext } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Sky from "components/Sky"
import { ShopifyContext } from "services/shopify"
import ProductListing from "components/ProductListing"
import CartIcon from "components/CartIcon"
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
  flex-wrap: wrap;
  margin: 90px 0;
`

const ProductsContent = props => {
  const { products } = props

  if (!products) {
    return <>Loading...</>
  }

  if (products.length === 0) {
    return <>No products to show...</>
  }

  return (
    <>
      {products.map(prod => (
        <ProductListing product={prod} />
      ))}
    </>
  )
}

export default function Products(props) {
  const { products } = useContext(ShopifyContext)

  return (
    <>
      <Helmet title="Products" />
      <Sky />
      <CartIcon />
      <Container>
        <SkyLogo />
        <ProductContainer>
          <ProductsContent products={products} />
        </ProductContainer>
      </Container>
    </>
  )
}
