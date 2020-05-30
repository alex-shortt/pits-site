import React from "react"
import { Helmet as ReactHelmet } from "react-helmet"

export default function Helmet(props) {
  const { title, children } = props

  return (
    <ReactHelmet>
      <title>
        {title ? `${title} | Puzzle In The Sky` : "Puzzle In The Sky"}
      </title>
      {children}
    </ReactHelmet>
  )
}
