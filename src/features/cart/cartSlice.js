import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
function shallowEqualityCheck(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
// mr.rooter
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.items.length > 0) {
        const isIn = state.items.some((item) =>
          shallowEqualityCheck(item, action.payload)
        );
        if (!isIn) {
          state.items.push(action.payload);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((e) => e.id != action.payload.id);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
