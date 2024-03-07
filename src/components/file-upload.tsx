"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import "@uploadthing/react/styles.css";
import {UploadDropzone} from "@/utils/uploadthings";
import {FC} from "react";
import {cn} from "@/lib/utils";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "avatar" | "banner" | "photos";
}

const FileUpload: FC<FileUploadProps> = ({onChange, value, endpoint}) => {
  const fileType: string | undefined = value?.split(".").pop();

  if (value && fileType !== "pdf" && endpoint === "photos") {
    return (
      <div className={cn("relative h-60 w-60")}>
          <Image
            fill
            src={value}
            alt="Upload"
            className={cn("object-center object-cover rounded")}
            priority
          />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType !== "pdf") {
    return (
      <div className={cn("relative", endpoint === "banner" ? "h-20 w-60" : "h-20 w-20")}>
        <Image
          fill
          src={value}
          alt="Upload"
          className={cn("object-center object-cover", endpoint === "banner" ? "rounded": "rounded-full")}
          priority
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a href={value} target={"_blank"} rel={"noopener noreferrer"} className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res: any): void => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error): void => {
        console.log({error});
      }}
    />
  );
};

export default FileUpload;