import Tabs from "./tabs.component";
import { DigitHeader, DigitText } from "@cthit/react-digit-components";
import { Link } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <DigitHeader
      title=""
      mainPadding="0"
      renderHeader={() => (
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <DigitText.Heading5 text="BookIT" />
        </Link>
      )}
      renderToolbar={Tabs}
      renderMain={() => <>{children}</>}
    />
  );
};

export default Header;
