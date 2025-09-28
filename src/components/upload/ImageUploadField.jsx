import { toast } from "react-toastify";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { Loader2, CheckCircle } from "lucide-react";
import { uploadImage } from "@/hooks/ReactQueryHooks";

export default function ImageUploadField({
    name,
    control,
    rules,
    register,
    moduleTitle = "defaultModule",
}) {
    const [preview, setPreview] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const handleImageUpload = async (file) => {
        if (!file) return;

        setImageUploading(true);
        try {
            const formData = new FormData();
            formData.append("uploadimg", file);
            formData.append("moduletitle", moduleTitle);
            const response = await uploadImage(formData);
            if (response?.data?.data?.filename) {
                const imageUrl = response?.data?.data?.filename;
                setUploadedImageUrl(imageUrl);
                toast.success("Image uploaded successfully!");
                return imageUrl;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Image upload failed");
            return null;
        } finally {
            setImageUploading(false);
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
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                disabled={imageUploading}
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                        const uploadedUrl = await handleImageUpload(file);
                                        if (uploadedUrl) {
                                            onChange(uploadedUrl);
                                        }
                                    } else {
                                        onChange(null);
                                        setPreview(null);
                                        setUploadedImageUrl("");
                                    }
                                }}
                                label="Choose File"
                            />
                            {imageUploading && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                </div>
                            )}
                        </div>
                        {imageUploading && (
                            <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Uploading image...
                            </p>
                        )}
                        {uploadedImageUrl && !imageUploading && (
                            <p className="text-green-500 text-sm mt-1 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Image uploaded successfully
                            </p>
                        )}
                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </>
                )}
            />
            {uploadedImageUrl && (
                <input type="hidden" {...register(name, { required: true })} value={uploadedImageUrl} />
            )}
        </div>
    );
}

