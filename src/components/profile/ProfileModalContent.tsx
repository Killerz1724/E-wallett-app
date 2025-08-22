"use client";
import Button from "components/Button";
import { useState } from "react";
import ImageProfileForm from "./ImageProfileForm";

export default function ProfileModalContent() {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <h5 className="text-3xl font-bold">My Profile</h5>
      <ImageProfileForm editMode={editMode} />
      <div className="space-y-2 ">
        <h5 className="text-3xl font-bold text-center">Jokowewe</h5>
        <p className="text-sm font-semibold text-center opacity-50">
          jokowewe@me.com
        </p>
      </div>
      {editMode ? (
        <div className="w-full space-y-2">
          <Button onClick={() => setEditMode(!editMode)} className="p-2 w-full">
            Save Changes
          </Button>
          <Button
            variant="secondary"
            onClick={() => setEditMode(!editMode)}
            className="p-2 w-full"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={() => setEditMode(!editMode)} className="p-2 w-full">
          Edit Profile Image
        </Button>
      )}
    </div>
  );
}
