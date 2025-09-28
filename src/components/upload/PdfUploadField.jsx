import { toast } from "react-toastify";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { Loader2, CheckCircle } from "lucide-react";
import { uploadImage } from "@/hooks/ReactQueryHooks";

export default function PdfUploadField({
  name,
  control,
  label,
  rules,
  register,
  moduleTitle = "defaultModule",
}) {
  const [preview, setPreview] = useState(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");

  const handlePdfUpload = async (file) => {
    if (!file) return;

    setPdfUploading(true);
    try {
      const formData = new FormData();
      formData.append("uploadimg", file);
      formData.append("moduletitle", moduleTitle);

      const response = await uploadImage(formData);
      if (response?.data?.data?.filename) {
        const pdfUrl = response.data.data.filename;
        setUploadedPdfUrl(pdfUrl);
        toast.success("PDF uploaded successfully!");
        return pdfUrl;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "PDF upload failed");
      return null;
    } finally {
      setPdfUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <div className="relative">
              <Input
                type="file"
                accept="application/pdf"
                disabled={pdfUploading}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    const uploadedUrl = await handlePdfUpload(file);
                    if (uploadedUrl) {
                      onChange(uploadedUrl);
                    }
                  } else {
                    onChange(null);
                    setPreview(null);
                    setUploadedPdfUrl("");
                  }
                }}
                label={label || "Choose PDF"}
              />
              {pdfUploading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                </div>
              )}
            </div>

            {pdfUploading && (
              <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading PDF...
              </p>
            )}
            {uploadedPdfUrl && !pdfUploading && (
              <p className="text-green-500 text-sm mt-1 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                PDF uploaded successfully
              </p>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
      />

      {/* Hidden field for form submission */}
      {uploadedPdfUrl && (
        <input type="hidden" {...register(name, { required: true })} value={uploadedPdfUrl} />
      )}


    </div>
  );
}
