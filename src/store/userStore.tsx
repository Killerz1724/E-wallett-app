import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponses } from "app/login/actions/action";

export type UserData = {
  profilPic: string;
  username: string;
  email: string;
  balance: number;
};

type userBehaviour = {
  seeBalance: boolean;
};

type UserState = {
  userData: UserData;
  userBehaviour: userBehaviour;
};

const UserInitalState: UserState["userData"] = {
  profilPic: "",
  username: "",
  email: "",
  balance: 0,
};

const UserSlice = createSlice({
  name: "user",
  initialState: UserInitalState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponses>) => {
      state.profilPic = action.payload.img_url;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.balance = action.payload.balance;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
