import React from "react"
import styled from "styled-components/macro"

import skyLogo from "assets/img/sky-logo.png"

const Image = styled.img.attrs({ src: skyLogo })`
  width: 150px;
  height: auto;
  object-fit: contain;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0;
`

export default function SkyLogo(props) {
  return (
    <Header>
      <Image />
    </Header>
  )
}
