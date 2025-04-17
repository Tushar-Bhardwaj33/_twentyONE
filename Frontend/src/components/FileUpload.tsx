"use client";
import React, { useState } from "react";
import { FileUploadUI } from "./ui/file-upload";

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 h-[562px] border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-2xl">
      <FileUploadUI onChange={handleFileUpload} />
    </div>
  );
}
