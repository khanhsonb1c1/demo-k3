import { User } from "@acme/shared-models";
import { createSlice } from "@reduxjs/toolkit";

interface UserStoreType {
  list: User[];
  loading: boolean;
}
// Define the initial state using that type
const initialState: UserStoreType = {
  list: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload, '/payload')
      state.loading = true;
      state.list = action.payload
    },
  },
});

const { actions, reducer } = userSlice;
export const { updateUser } = actions; // name export
export default reducer; // default export
