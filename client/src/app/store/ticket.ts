import { User } from "@acme/shared-models";
import { createSlice } from "@reduxjs/toolkit";

interface TicketStoreType {
  list: User[];
  loading: boolean;
}
// Define the initial state using that type
const initialState: TicketStoreType = {
  list: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    updateTicket: (state, action) => {
      console.log(action.payload, '/payload')
      state.loading = true;
      state.list = action.payload
    },
  },
});

const { actions, reducer } = userSlice;
export const { updateTicket } = actions; // name export
export default reducer; // default export
