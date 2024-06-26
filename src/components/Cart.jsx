import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { List, ListItem } from "@mui/material";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../features/cart/cartSlice";
import SpringModal from "./SpringModal";
function Cart() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 350 }} role="presentation" fontFamily={"Roboto"}>
      <SpringModal />
      <h2 className="text-xl font-bold p-5">Cart</h2>
      <Divider />
      <List>
        {state.items.length > 0 ? (
          state.items.map((item) => (
            <ListItem disablePadding key={item.id}>
              <div className="flex items-center gap-4 justify-between p-2 w-full">
                <div className="flex items-center gap-5 justify-between">
                  <img
                    src={item.url}
                    alt="asd"
                    className="rounded-lg w-16 h-16 object-cover"
                  />
                  <div>
                    <h1 className="text-lg line-clamp-1">{item.title}</h1>
                    <p className="text-gray-400 text-sm">$999</p>
                  </div>
                </div>
                <div>
                  <Button
                    className="!min-w-2 w-7 h-7 !rounded-full !p-0"
                    variant="outlined"
                    color="error"
                  >
                    <TrashIcon
                      className="w-4 "
                      onClick={() => dispatch(removeItem(item))}
                    />
                  </Button>
                </div>
              </div>
            </ListItem>
          ))
        ) : (
          <img src="/empty.png" className="h-56 mx-auto " />
        )}
      </List>
    </Box>
  );
}

export default Cart;
