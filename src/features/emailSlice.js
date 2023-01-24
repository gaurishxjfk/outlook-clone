import { createSlice } from "@reduxjs/toolkit";

const EmailsListAPI = "https://flipkart-email-mock.now.sh/";
const EmailBodyAPI = "https://flipkart-email-mock.now.sh/?id=";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    emailsList: [],
    emailBody: "",
    selectedEmail: {},
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

export const { getEmailsList, getEmailBody, setSelectedEmail } =
  emailSlice.actions;
export default emailSlice.reducer;
