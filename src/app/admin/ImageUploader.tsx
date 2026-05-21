"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FiUpload } from "react-icons/fi";
import type { Id } from "../../../convex/_generated/dataModel";

export default function ImageUploader({
  section,
  slot,
}: {
  section: string;
  slot: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(0);

    try {
      const uploadUrl = await generateUploadUrl();
      setProgress(10);

      // Upload with real progress tracking via XMLHttpRequest
      const storageId = await new Promise<Id<"_storage">>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 80) + 10; // 10-90%
            setProgress(pct);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            setProgress(95);
            resolve(response.storageId as Id<"_storage">);
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Upload failed")));
        xhr.open("POST", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      await saveImage({ section, slot, storageId, filename: file.name });
      setProgress(100);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 400);
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
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative cursor-pointer rounded-[5px] border py-2 text-center transition-colors ${
        dragOver ? "border-[#111111] bg-[#fafafa]" : "border-[#e8e8e8] hover:border-[#cccccc]"
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
        <div className="space-y-1.5 px-3">
          <div className="flex items-center justify-between">
            <span className="text-[0.75rem] text-[#888888]">Uploading</span>
            <span className="text-[0.75rem] font-medium text-[#555555]">{progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-[#eee]">
            <div
              className="h-full rounded-full bg-[#111111] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
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
