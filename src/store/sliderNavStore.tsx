import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavItem, NestedNavItems } from "components/Sidebar";

type SliderNavState = {
  isOpen: boolean;
  navItems: NavItem[];
};

const initialState: SliderNavState = {
  isOpen: false,
  navItems: NestedNavItems,
};

const sliderNavSlice = createSlice({
  name: "sliderNav",
  initialState,
  reducers: {
    openSliderNav: (state) => {
      state.isOpen = true;
    },
    closeSliderNav: (state) => {
      state.isOpen = false;
    },
    setNavItems: (state, action: PayloadAction<NavItem[]>) => {
      state.navItems = action.payload;
    },
  },
});

export const { openSliderNav, closeSliderNav } = sliderNavSlice.actions;
export default sliderNavSlice.reducer;
