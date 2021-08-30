import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { DigitProviders } from "@cthit/react-digit-components";
import { UserProvider } from "./common/contexts/user-context";

import Header from "./common/components/header";
import Home from "./use-cases/home";
import NewReservation from "./use-cases/new-event";
import Rules from "./use-cases/rules";
import PartyReports from "./use-cases/party-reports";
import Callback from "./use-cases/auth";

const API = () => {
  useEffect(() => {
    window.location.href = "http://localhost:8080/api/login";
  }, []);
  return null;
};

const App = () => (
  <DigitProviders>
    <UserProvider>
      <Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new-event" component={NewReservation} />
          <Route path="/rules" component={Rules} />
          <Route path="/party_reports" component={PartyReports} />
          <Route path="/auth/callback" component={Callback} />
          <Route path="/api" component={API} />
          <Route path="/" component={() => <h1>Page not found</h1>} />
        </Switch>
      </Header>
    </UserProvider>
  </DigitProviders>
);

export default App;
