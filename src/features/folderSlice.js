import { createSlice } from "@reduxjs/toolkit";

const folder = [
  {
    id: 99,
    name: "Folders",
    items: [
      {
        id: 1,
        name: "Inbox",
        items: [],
      },
      {
        id: 2,
        name: "Drafts",
        items: [],
      },
      {
        id: 3,
        name: "Sent Items",
        items: [],
      },
      {
        id: 4,
        name: "Deleted Items",
        items: [],
      },
      {
        id: 5,
        name: "Archive",
        items: [],
      },
      {
        id: 6,
        name: "Previous backup",
        items: [
          {
            id: 7,
            name: "2020_backup",
            items: [],
          },
          {
            id: 8,
            name: "2021_backup",
            items: [],
          },
        ],
      },
      {
        id: 9,
        name: "Imp",
        items: [],
      },
      {
        id: 10,
        name: "Inteview",
        items: [],
      },
    ],
  },
];

const favoriteFolders = [
  {
    id: "a1",
    name: "Favorites",
    items: [
      {
        id: 1,
        name: "Inbox",
        items: [],
      },
    ],
  },
];

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folderList: folder,
    favoriteFolder: favoriteFolders,
  },
  reducers: {
    updateFolderList: (state, action) => {
      state.folderList = action.payload;
    },
  },
});

export const { updateFolderList } = folderSlice.actions;
export default folderSlice.reducer;
