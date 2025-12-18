import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function AddDropZone({ onFileSelect }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        if (onFileSelect) onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // ✅ รับเฉพาะรูปภาพ
  });

  return (
    <div className="">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-0 overflow-hidden 
    flex items-center justify-center 
    text-gray-500 cursor-pointer transition 
    ${
      isDragActive ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"
    }`}
        style={{ height: "220px" }} // ← ★ Fix height
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover" // ← ★ ควบคุมให้รูปไม่ดัน layout
          />
        ) : (
          <p className="text-center px-4">
            📂 <span className="font-medium text-gray-600">ลากรูป</span> หรือ{" "}
            <span className="text-red-500 font-medium">คลิกเพื่ออัปโหลด</span>
          </p>
        )}
      </div>
    </div>
  );
}
