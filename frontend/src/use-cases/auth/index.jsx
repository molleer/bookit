import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { exchangeCode } from "../../api/backend.api";
import UserContext from "../../common/contexts/user-context";

const Callback = () => {
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  useEffect(() => {
    const authenticateUser = async () => {
      const params = new URLSearchParams(window.location.search);
      setUser(await exchangeCode(params.get("code")));
      history.push("/");
    };
    authenticateUser();
  }, [setUser, history]);
  return null;
};

export default Callback;
