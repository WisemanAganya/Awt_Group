import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface ImageUploadProps {
    onUpload: (url: string) => void;
    currentImage?: string;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, currentImage, label = "Upload Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | undefined>(currentImage);

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files || event.target.files.length === 0) {
                return;
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            setUploading(true);

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            const publicUrl = data.publicUrl;

            setPreview(publicUrl);
            onUpload(publicUrl);

        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="flex items-center space-x-4">
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                    />
                )}
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-awt-primary">
                    <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={uploadImage}
                        disabled={uploading}
                    />
                </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div>
    );
};

export default ImageUpload;
