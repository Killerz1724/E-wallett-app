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

type userExchangeRate = {
  from: string;
  to: string;
  amount: number;
  result: number;
  rates: number;
};

type UserState = {
  userData: UserData;
  userBehaviour: userBehaviour;
  userExchangeRate: userExchangeRate;
};

const UserInitalState: UserState = {
  userData: { profilPic: "", username: "", email: "", balance: 0 },
  userBehaviour: { seeBalance: false },
  userExchangeRate: {
    from: "USD",
    to: "IDR",
    amount: null,
    rates: 0,
    result: null,
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState: UserInitalState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponses>) => {
      state.userData.profilPic = action.payload.img_url;
      state.userData.username = action.payload.username;
      state.userData.email = action.payload.email;
      state.userData.balance = action.payload.balance;
    },
    setUserExchangeFrom: (state, action: PayloadAction<string>) => {
      state.userExchangeRate.from = action.payload;
    },
    setUserExchangeTo: (state, action: PayloadAction<string>) => {
      state.userExchangeRate.to = action.payload;
    },
    setUserExchangeAmount: (state, action: PayloadAction<number>) => {
      state.userExchangeRate.amount = action.payload;
    },
  },
});

export const {
  setUser,
  setUserExchangeFrom,
  setUserExchangeTo,
  setUserExchangeAmount,
} = UserSlice.actions;
export default UserSlice.reducer;
