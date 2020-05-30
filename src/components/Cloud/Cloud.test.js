import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Cloud from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Cloud />).toJSON()

  expect(tree).toMatchSnapshot()
})
