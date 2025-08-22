import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function ProfileTrigger() {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(openModal("PROFILE"))}
      className="hover:bg-orange-400 font-semibold hover:text-white hover:cursor-pointer p-2 rounded-lg transition-colors"
    >
      See Profile
    </div>
  );
}
