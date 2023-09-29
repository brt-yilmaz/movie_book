import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
  clearSearchQueryMessage: string;
}

const initialState: MessagesState = {
  clearSearchQueryMessage: "",
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setClearSearchQueryMessage: (state, action: PayloadAction<string>) => {
      state.clearSearchQueryMessage = action.payload;
    },
  },
});

export const { setClearSearchQueryMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
