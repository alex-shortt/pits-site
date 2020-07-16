import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import ProductListing from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<ProductListing />).toJSON()

  expect(tree).toMatchSnapshot()
})
