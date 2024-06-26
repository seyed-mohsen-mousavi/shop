import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { List, ListItem } from "@mui/material";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";

import SpringModal from "./SpringModal";
import { useState } from "react";
function Cart() {
  const state = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState([]);
  return (
    <Box sx={{ width: 350 }} role="presentation" fontFamily={"Roboto"}>
      <SpringModal open={open} setOpen={setOpen} item={item} />
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
                  {/* mr.rooter */}
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
                    onClick={() => {
                      setOpen(true);
                      setItem(item);
                    }}
                  >
                    <TrashIcon className="w-4" />
                  </Button>
                </div>
              </div>
            </ListItem>
          ))
        ) : (
          <img src="/empty.png" className="h-56 mx-auto animate-fade" />
        )}
      </List>
    </Box>
  );
}

export default Cart;
