"use client";
import Button from "components/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function ChangeLogModalTrigger() {
  const dispatch = useDispatch();
  return (
    <div className="space-y-4">
      <h4 className="text-lg lg:text-2xl font-semibold">Change Logs</h4>
      <Button onClick={() => dispatch(openModal("CHANGE_LOGS"))}>
        Change Logs
      </Button>
    </div>
  );
}
