import React from "react"

import Helmet from "components/Helmet"
import ThreeEnvironment from "components/ThreeEnvironemnt"

export default function Keanu(props) {
  const { history } = props

  return (
    <>
      <Helmet title="Keanu" />
      <ThreeEnvironment history={history} />
    </>
  )
}
