import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import dataReducer from "./data/dataSlice";
import commrntReducer from "./comment/commentSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    data: dataReducer,
    comment: commrntReducer,
  },
});

export default store;
