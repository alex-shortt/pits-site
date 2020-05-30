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

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

export default function App() {
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
