"use client";
import clsxm from "@riverfl0w/clsxm";
import Button from "components/Button";
import { useProfileImgPatch } from "hooks/useProfileMutation";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ImageProfileForm from "./ImageProfileForm";

export default function ProfileModalContent() {
  const [editMode, setEditMode] = useState(false);
  const [isDirty, isSetDirty] = useState(false);
  const profile = useSelector((state: RootState) => state.user.userData);
  const [imageUrl, setImageUrl] = useState(profile.profilPic);
  const [imageFile, setImageFile] = useState<File>();
  const { mutateAsync: updateProfile, isPending } = useProfileImgPatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.currentTarget.files![0];
    const newUrl = URL.createObjectURL(val);
    isSetDirty(true);
    setImageUrl(newUrl);
    setImageFile(val);
  }

  function handleSave() {
    const formVal = new FormData();
    formVal.append("profile_pic", imageFile);

    updateProfile(formVal);
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <h5 className="text-3xl font-bold">My Profile</h5>
      <ImageProfileForm
        editMode={editMode}
        imgUrl={imageUrl}
        handleChange={handleChange}
      />
      <div className="space-y-2 ">
        <h5 className="text-3xl font-bold text-center">{profile.username}</h5>
        <p className="text-sm font-semibold text-center opacity-50">
          {profile.email}
        </p>
      </div>
      {editMode ? (
        <div className="w-full space-y-2">
          <Button
            disabled={isPending || !isDirty}
            onClick={handleSave}
            className={clsxm("p-2 w-full", !isDirty && "hover:cursor-pointer")}
          >
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
