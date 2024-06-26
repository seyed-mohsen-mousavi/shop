import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import Card from "./components/Card";
import { Provider, useSelector } from "react-redux";
import store from "./features/store";
import axios from "axios";
import LoadingCard from "./components/LoadingCard";
import Cart from "./components/Cart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import "@fontsource/roboto/300.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Provider store={store}>
      <div className=" container p-2">
        <CartBtn toggleDrawer={toggleDrawer} />
        <ContainerCard />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Cart />
        </Drawer>
      </div>
    </Provider>
  );
}
// mr.rooter

function ContainerCard() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
      {data.map((e) => {
        if (e.id < 21) {
          return <Card key={e.id} item={e} />;
        }
      })}
    </div>
  );
}
function CartBtn({ toggleDrawer }) {
  const numOfCart = useSelector((state) => state.cart).items.length;
  return (
    <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
      <StyledBadge badgeContent={numOfCart} color="secondary">
        <ShoppingCartIcon className="w-7" />
      </StyledBadge>
    </IconButton>
  );
}
