import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  content: "TRANSFER" | "TOPUP" | null;
};

const initialState: ModalState = {
  isOpen: false,
  content: null,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState["content"]>) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { closeModal, openModal } = ModalSlice.actions;
export default ModalSlice.reducer;
