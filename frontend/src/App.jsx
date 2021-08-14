import { Route, Switch } from "react-router-dom";
import { DigitProviders } from "@cthit/react-digit-components";

import Header from "./common/components/header";
import Home from "./use-cases/home";

const App = () => (
  <DigitProviders>
    <Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/" component={() => <h1>Page not found</h1>} />
      </Switch>
    </Header>
  </DigitProviders>
);

export default App;
