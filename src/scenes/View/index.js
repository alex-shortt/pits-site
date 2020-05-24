import React from "react"
import { Link } from "react-router-dom"

import Helmet from "components/Helmet"

export default function View(props) {
  return (
    <>
      <Helmet title="View" />
      <Link to="/dummy-t-shirt">Dummy T-Shirt</Link>
    </>
  )
}
