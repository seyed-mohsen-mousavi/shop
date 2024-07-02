import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Card from "./components/Card";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./features/store";
import LoadingCard from "./components/LoadingCard";
import Cart from "./components/Cart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import "@fontsource/roboto/300.css";
import { getAsyncData } from "./features/data/dataSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Provider store={store}>
      <div className=" container p-2 h-screen">
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
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.data);
  React.useEffect(() => {
    dispatch(getAsyncData()), [dispatch];
  }, [dispatch]);
  if (error) return <p>Please Try Again later :(</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
      {loading ? (
        <>
          {" "}
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      ) : (
        data.map((e) => {
          if (e.id < 21) {
            return <Card key={e.id} item={e} />;
          }
        })
      )}
    </div>
  );
}
function CartBtn({ toggleDrawer }) {
  const numOfCart = useSelector((state) => state.cart).items.length;
  return (
    <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
      <StyledBadge badgeContent={numOfCart} color="primary">
        <ShoppingCartIcon className="w-7" />
      </StyledBadge>
    </IconButton>
  );
}

export default TemporaryDrawer;
