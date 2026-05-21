"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FiUpload } from "react-icons/fi";

export default function ImageUploader({
  section,
  slot,
}: {
  section: string;
  slot: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const saveImage = useMutation(api.images.saveImage);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();

      await saveImage({
        section,
        slot,
        storageId,
        filename: file.name,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative cursor-pointer rounded-[5px] border py-2 text-center transition-colors ${
        dragOver
          ? "border-[#111111] bg-[#fafafa]"
          : "border-[#e8e8e8] hover:border-[#cccccc]"
      }`}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 cursor-pointer opacity-0"
        disabled={uploading}
      />
      {uploading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-[#e0e0e0] border-t-[#111111]" />
          <span className="text-[0.78rem] text-[#888888]">Uploading...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1.5">
          <FiUpload className="text-[0.75rem] text-[#bbbbbb]" />
          <span className="text-[0.78rem] font-medium text-[#aaaaaa]">
            {dragOver ? "Drop here" : "Upload"}
          </span>
        </div>
      )}
    </div>
  );
}
