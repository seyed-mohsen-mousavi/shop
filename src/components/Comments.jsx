import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  removeComment,
  updateComment,
} from "../features/comment/commentSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Comments() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const name = useRef();
  const text = useRef();
  const profileImages = [
    "/profile/1.png",
    "/profile/2.jpg",
    "/profile/3.png",
    "/profile/4.png",
    "/profile/5.png",
    "/profile/6.svg",
    "/profile/8.svg",
    "/profile/7.jpg",
  ];
  const [profile, setProfile] = useState(profileImages[0]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.current.value.length > 10) {
      dispatch(
        addComment({
          name: name.current.value,
          text: text.current.value,
          profile: profile || profileImages[0], // default profile if not selected
        })
      );
      name.current.value = "";
      text.current.value = "";
    } else {
      toast.error("Comment must be at least 10 characters");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <section className="py-8 lg:py-16 antialiased">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Comments ({comments?.length})
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-600 cursor-pointer font-bold"
              >
                Name:{" "}
              </label>
              <input
                pattern=".{3,}"
                ref={name}
                type="text"
                name="name"
                id="name"
                className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 outline-none"
                placeholder="Mohsen"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                htmlFor="profile"
                className="text-gray-600 cursor-pointer font-bold"
              >
                Profile:
              </label>
              <Button
                type="button"
                onClick={handleOpen}
                size="large"
                className="!mb-5 !bg-primary-700 !text-white !rounded-lg !text-xs !py-2.5 "
              >
                Choose Profile
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box
                  sx={{ ...style }}
                  gap="10px"
                  display="flex"
                  flexDirection="column"
                >
                  <h2
                    id="parent-modal-title"
                    className="py-2 pb-5 text-lg font-bold text-gray-600"
                  >
                    Select your Profile
                  </h2>
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    {profileImages.map((img, i) => (
                      <img
                        onClick={() => {
                          setProfile(img);
                        }}
                        key={i}
                        src={img}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover cursor-pointer hover:brightness-75 transition ease-in-out"
                      />
                    ))}
                    <label htmlFor="upload-photo">
                      <input
                        type="file"
                        id="upload-photo"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <IconButton
                        component="span"
                        size="large"
                        className="mb-5 ring-2 ring-gray-400"
                      >
                        <ArrowUpOnSquareIcon className="w-10" />
                      </IconButton>
                    </label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={profile}
                        alt="Selected Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <span className="text-sm">Your Profile</span>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
            <label
              htmlFor="comment"
              className="text-gray-600 cursor-pointer font-bold"
            >
              Comment:{" "}
            </label>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                ref={text}
                id="comment"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>
          <div className="grid grid-cols-1 divide-y-2 ">
            {comments?.map((c) => (
              <Comment key={c.id} c={c} dispatch={dispatch} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Comments;

function Comment({ c, dispatch }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(c.text);

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editText.length > 10) {
      dispatch(updateComment({ ...c, text: editText }));
      setIsEditing(false);
    } else {
      toast.error("Comment must be at least 10 characters");
    }
  };

  return (
    <motion.article
      key={c.id}
      className="p-6 text-base bg-white rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <footer className="flex justify-between items-center mb-2 relative">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={c.profile}
              alt="Profile"
            />
            {c.name}
          </p>
          <p className="text-sm text-gray-600">
            <time
              pubdate="true"
              dateTime="2022-02-08"
              title="February 8th, 2022"
            >
              {c.date}
            </time>
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        <div
          className={`z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow absolute right-0 top-5 ${
            open ? "" : "hidden"
          }`}
        >
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => {
                  startEditing();
                  setOpen(!open);
                }}
                className="block py-2 px-4 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch(removeComment(c));
                  setOpen(!open);
                }}
                className="block py-2 px-4 hover:bg-gray-100 w-full text-left"
              >
                Remove
              </button>
            </li>
            <li>
              <button
                className="block py-2 px-4 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  toast.success("Thanks for your report");
                  setOpen(!open);
                }}
              >
                Report
              </button>
            </li>
          </ul>
        </div>
      </footer>
      {isEditing ? (
        <div>
          <textarea
            className="w-full p-2 border rounded min-h"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Write a comment..."
            rows={6}
          />
          <button
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            onClick={saveEdit}
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-500">{c.text}</p>
      )}
    </motion.article>
  );
}
