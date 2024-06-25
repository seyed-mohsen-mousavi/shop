import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { List, ListItem } from "@mui/material";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h2 className="text-xl font-bold p-5">Cart</h2>
      <Divider />
      <List>
        <ListItem disablePadding>
          <div className="flex items-center gap-2 justify-between p-2 w-full">
            <div className="flex items-center gap-2 justify-between">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s"
                alt="asd"
                className="rounded-lg w-16 h-16 object-cover"
              />
              <div>
                <h1 className="text-lg">item</h1>
                <p className="text-gray-400 text-sm">desc</p>
              </div>
            </div>
            <div className="flex">
              <Button
                className="!min-w-2 w-7 h-7 !rounded-full !p-0"
                variant="outlined"
                color="error"
              >
                <TrashIcon className="w-4 " />
              </Button>

              <form className="max-w-xs mx-auto">
                <label
                  for="counter-input"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose quantity:
                </label>
                <div className="relative flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <MinusIcon className="text-white" />
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                    placeholder=""
                    value="12"
                    required
                  />
                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <PlusIcon className="text-white" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
