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
import "./style.css";
import { Button, ButtonBase } from "@mui/material";
import Comments from "./components/Comments";
import toast, { Toaster } from "react-hot-toast";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function App() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [loadData, setLoadData] = React.useState(21);
  return (
    <Provider store={store}>
      <Toaster />
      <div className=" container p-2 h-screen w-full">
        <div className="flex w-full justify-between flex-row-reverse mb-5">
          <CartBtn toggleDrawer={toggleDrawer} />
          <a href="#" className="wrapper">
            <div className="top">Star 🌟</div>
            <div className="bottom" aria-hidden="true">
            Star 🌟
            </div>
          </a>{" "}
        </div>
        <ContainerCard load={loadData} setLoadData={setLoadData} />
        <Comments />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Cart />
        </Drawer>
      </div>
    </Provider>
  );
}

// -------------------

function ContainerCard({ load, setLoadData }) {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.data);
  React.useEffect(() => {
    dispatch(getAsyncData()), [dispatch];
  }, [dispatch]);
  if (error) return <p className="text-2xl">Please Try Again later :(</p>;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center w-full">
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
            if (e.id < load) {
              return <Card key={e.id} item={e} />;
            }
          })
        )}
      </div>
      <div className="w-full flex justify-center my-3 mt-10">
        <Button
          variant="outlined"
          onClick={() => setLoadData((e) => (e = e + 8))}
        >
          Load More ...
        </Button>
      </div>
    </>
  );
}
function CartBtn({ toggleDrawer }) {
  const numOfCart = useSelector((state) => state.cart).items.length;
  return (
    <IconButton
      size="large"
      aria-label="cart"
      onClick={toggleDrawer(true)}
      className="!rounded-full !p-0 !px-4 !m-0"
    >
      <StyledBadge badgeContent={numOfCart}>
        <ShoppingCartIcon className="w-7 h-7 text-black" />
      </StyledBadge>
    </IconButton>
  );
}

export default App;
