"use client";
import React from "react";
import { FileUploadUI } from "./ui/file-upload";

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-5 h-[562px] border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <FileUploadUI onChange={handleFileChange} />
        </div>
    );
}
