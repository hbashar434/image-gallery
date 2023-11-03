import React from "react";
import { PiImage } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

const ImageUpload = ({ imagesData, setImagesData }) => {
  // Handle image upload
  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const newImageId = uuidv4();
      const newImageData = {
        id: newImageId,
        src: URL.createObjectURL(uploadedFile),
      };
      setImagesData([...imagesData, newImageData]);
    }
  };

  return (
    <label
      htmlFor="file"
      className=" bg-gray-100 border-4 border-dotted border-gray-300 rounded-lg flex flex-col justify-center items-center p-4 h-full w-full"
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <PiImage size={24} />
        <p className="text-gray-700 font-semibold text-xs md:text-base">
          Add Images
        </p>
      </div>
      <input type="file" id="file" hidden onChange={handleImageUpload} />
    </label>
  );
};

export default ImageUpload;
