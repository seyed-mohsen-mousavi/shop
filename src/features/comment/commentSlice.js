import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: JSON.parse(localStorage.getItem("COMMENTS")),
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const newComment = {
        id: Date.now(),
        name: action.payload.name,
        text: action.payload.text,
        profile: action.payload.profile,
        date: new Date().toLocaleString("en-US", options),
      };
      state.comments.push(newComment);
      localStorage.setItem("COMMENTS", JSON.stringify(state.comments));
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload.id
      );
      localStorage.setItem("COMMENTS", JSON.stringify(state.comments));
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
      localStorage.setItem("COMMENTS", JSON.stringify(state.comments));
    },
  },
});

export const { addComment, removeComment, updateComment } =
  commentSlice.actions;
export default commentSlice.reducer;
