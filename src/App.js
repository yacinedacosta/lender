import Template from "./template/Template";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/detail/ProductDetail";

function App() {
  return (
    <Template>
      <Switch>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/:zone">
          <ProductList />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
