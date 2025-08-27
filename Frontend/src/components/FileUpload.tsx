"use client";
import React, { useState } from "react";
import { FileUploadUI } from "./ui/file-upload";

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("File uploaded successfully:", data);
      } catch (error) {
        console.error("There was a problem with the file upload:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 h-[562px] border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-2xl">
      <FileUploadUI onChange={handleFileUpload} />
    </div>
  );
}
