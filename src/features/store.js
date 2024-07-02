import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import dataReducer from "./data/dataSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    data: dataReducer,
  },
});

export default store;
