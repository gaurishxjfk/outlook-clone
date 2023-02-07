import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "../features/emailSlice";
import folderSlice from "../features/folderSlice";

export const store = configureStore({
  reducer: {
    emailData: emailSlice,
    folderData: folderSlice,
  },
});
