import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useReactRouter from "use-react-router"

import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import ScrollToTop from "components/ScrollToTop"
import GA from "services/ga"
import { ShopifyProvider } from "services/shopify"
import Cart from "components/Cart"

const Landing = React.lazy(() => import("scenes/Landing"))
const Keanu = React.lazy(() => import("scenes/Keanu"))
const Product = React.lazy(() => import("scenes/Product"))
const Products = React.lazy(() => import("scenes/Products"))
const Password = React.lazy(() => import("scenes/Password"))

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

export default function App() {
  printCredits()

  return (
    <ShopifyProvider>
      <Cart />
      <GlobalStyles />
      <React.Suspense fallback={<FullScreenLoading />}>
        <Router>
          <GoogleAnalytics />
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/password" exact component={Password} />
              <Route path="/products" exact component={Products} />
              <Route path="/entryway" exact component={Keanu} />
              <Route path="/:handle" component={Product} />
              {/* TODO: 404 Page */}
            </Switch>
          </ScrollToTop>
        </Router>
      </React.Suspense>
    </ShopifyProvider>
  )
}

function printCredits() {
  const credits = `
 ______   __     ______   ______
/\\  == \\ /\\ \\   /\\__  _\\ /\\  ___\\
\\ \\  _-/ \\ \\ \\  \\/_/\\ \\/ \\ \\___  \\
 \\ \\_\\    \\ \\_\\    \\ \\_\\  \\/\\_____\\
  \\/_/     \\/_/     \\/_/   \\/_____/
 Puzzle in the Sky
 
  Alex Shortt
      https://instagram.com/alexander.shortt
      https://twitter.com/_alexshortt
      
  Peter Campanelli
      https://instagram.com/petercampanelli
      https://twitter.com/petercampanelli
  `
  console.log(credits)
}
