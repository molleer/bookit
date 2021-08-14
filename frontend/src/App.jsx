import { Route, Switch } from "react-router-dom";
import { DigitProviders } from "@cthit/react-digit-components";

import Header from "./common/components/header";

const App = () => (
  <DigitProviders>
    <Header>
      <Switch>
        <Route exact path="/" component={() => <div>Home</div>} />
        <Route path="/" component={() => <h1>Page not found</h1>} />
      </Switch>
    </Header>
  </DigitProviders>
);

export default App;
