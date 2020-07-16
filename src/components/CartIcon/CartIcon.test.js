import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import CartIcon from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<CartIcon />).toJSON()

  expect(tree).toMatchSnapshot()
})
