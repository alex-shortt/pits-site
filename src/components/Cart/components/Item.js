import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: white 1px solid;
  padding-top: 10px;
  padding-bottom: 10px;

  & h4 {
    width: 110px;
    text-align: center;

    @media screen and (max-width: 650px) {
      width: 110px;
      font-size: 12px;
    }
  }
`

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  font-size: 20px;
  transition: 0.3s;

  &:hover {
    color: rgba(250, 250, 250, 0.5);
    cursor: pointer;
    transition: 0.3s;
  }
`

const Image = styled.img`
  width: 100px;
  padding-left: 40px;
  @media screen and (max-width: 650px) {
    width: 50px;
  }
  @media screen and (max-width: 850px) {
    padding-left: 0;
  }
`

export default function Item(props) {
  const { item, removeFromCheckout } = props

  return (
    <Container key={item.id}>
      <RemoveButton onClick={() => removeFromCheckout(item.id)}>x</RemoveButton>
      <Image src={item.variant.image.src} />
      <h4>{item.variant.title}</h4>
      <h4>{item.title}</h4>
      <h4>{item.quantity}</h4>
      <h4>${item.variant.price}</h4>
    </Container>
  )
}
