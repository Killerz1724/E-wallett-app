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
  rates_query: string;
  page_rates: number;
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
    rates_query: "USD",
    page_rates: 1,
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
    setUserSeeBalance: (state) => {
      state.userBehaviour.seeBalance = !state.userBehaviour.seeBalance;
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
    setUserRatesQuery: (state, action: PayloadAction<string>) => {
      state.userExchangeRate.rates_query = action.payload;
    },
    setUserRatesPage: (state, action: PayloadAction<number>) => {
      state.userExchangeRate.page_rates = action.payload;
    },
  },
});

export const {
  setUser,
  setUserSeeBalance,
  setUserExchangeFrom,
  setUserExchangeTo,
  setUserExchangeAmount,
  setUserRatesQuery,
  setUserRatesPage,
} = UserSlice.actions;
export default UserSlice.reducer;
