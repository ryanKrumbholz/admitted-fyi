import React, { useState, useCallback } from 'react';
import { api } from '~/trpc/react';

interface ImageUploadProps {
  onSuccess: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSuccess }) => {
  const [dragging, setDragging] = useState(false);

  const s3UploadMutation = api.s3Router.getPresignedUrl.useMutation();

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    
    const {url} = await s3UploadMutation.mutateAsync({fileName: file.name, fileType: file.type});

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
      const imageUrl = url.split('?')[0];
      if (response.ok && imageUrl) {
        onSuccess(imageUrl);
      } else {
        console.error('Upload failed');
      }
  };

  return (
    <div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-6 mt-2 border-2 border-dashed ${dragging ? 'border-blue-300 bg-blue-50' : 'border-gray-300'} rounded-md cursor-pointer`}
      >
        Drag and drop an image here, or click to select a file
      </div>
      <input
        id="imageUpload"
        name="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
