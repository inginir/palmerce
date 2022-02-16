import { Button } from "../../stycomponents";
import { TopbarContainer } from "./styled";

export const Topbar = (props) => {
  return (
    <TopbarContainer>
      <div>
        <Button>M</Button>
      </div>
      <div>
        <Button secondary>Home</Button>
        <Button secondary>Shop</Button>
        <Button secondary>Products</Button>
        <Button secondary>About Us</Button>
        <Button secondary>Contact Us</Button>
        <Button secondary>Cart</Button>
      </div>
    </TopbarContainer>
  );
};
