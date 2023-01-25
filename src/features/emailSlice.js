import { createSlice } from "@reduxjs/toolkit";

const EmailsListAPI = "https://flipkart-email-mock.now.sh/";
const EmailBodyAPI = "https://flipkart-email-mock.now.sh/?id=";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    emailsList: [],
    modifiedEmailList: [],
    emailBody: "",
    selectedEmail: {},
    readFavObj:
      localStorage.getItem("readFavObj") !== null
        ? JSON.parse(localStorage.getItem("readFavObj"))
        : {
            readIds: [],
            favIds: [],
          },
    filteredEmailsList: [],
  },
  reducers: {
    getEmailsList: (state, action) => {
      state.emailsList = [...action.payload];
    },
    getEmailBody: (state, action) => {
      state.emailBody = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    setReadEmails: (state, action) => {
      if (!state.readFavObj.readIds.includes(action.payload)) {
        state.readFavObj.readIds.push(action.payload);
      }
      localStorage.setItem("readFavObj", JSON.stringify(state.readFavObj));
    },
    setFavEmails: (state, action) => {
      if (!state.readFavObj.favIds.includes(action.payload)) {
        state.readFavObj.favIds.push(action.payload);
      } else {
        state.readFavObj.favIds = state.readFavObj.favIds.filter(
          (i) => i !== action.payload
        );
      }
      localStorage.setItem("readFavObj", JSON.stringify(state.readFavObj));
    },
    setFilteredEmailsList: (state, action) => {
      state.filteredEmailsList = state.emailsList.filter((email) => {
        if (action.payload === "Read") {
          return state.readFavObj.readIds.includes(email.id);
        } else if (action.payload === "Unread") {
          return !state.readFavObj.readIds.includes(email.id);
        } else if (action.payload === "Favorites") {
          return state.readFavObj.favIds.includes(email.id);
        }
        return email;
      });
    },
  },
});

export const getEmailsListAsync = () => async (dispatch) => {
  try {
    const response = await fetch(EmailsListAPI);
    const { list } = await response.json();
    dispatch(getEmailsList(list));
  } catch (err) {
    throw new Error(err);
  }
};

export const getEmailBodyAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(EmailBodyAPI + id);
    const { body } = await response.json();
    dispatch(getEmailBody(body));
  } catch (err) {
    throw new Error(err);
  }
};

export const {
  getEmailsList,
  getEmailBody,
  setSelectedEmail,
  setReadEmails,
  setFavEmails,
  setFilteredEmailsList,
} = emailSlice.actions;
export default emailSlice.reducer;
