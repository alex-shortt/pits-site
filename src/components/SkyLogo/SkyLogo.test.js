import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import SkyLogo from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<SkyLogo />).toJSON()

  expect(tree).toMatchSnapshot()
})
