import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import ThreeEnvironemnt from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<ThreeEnvironemnt />).toJSON()

  expect(tree).toMatchSnapshot()
})
