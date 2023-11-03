import React, { useRef, useState } from "react";
import "./App.css";
import images from "./utils/images";
import { PiImage } from "react-icons/pi";
import ThemeToggler from "./utils/ThemeToggler";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  // State for image data and selected images
  const [imagesData, setImagesData] = useState(images);
  const [checkedImages, setCheckedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  console.log(imagesData);

  // index of the dragItem/placeItem
  const dragItem = useRef(null);
  const placeDragItem = useRef(null);

  // Handle dragItem/placeItem of an image
  const handleSort = () => {
    let newImagesData = [...imagesData];
    let moveItem = newImagesData.splice(dragItem.current, 1)[0];
    newImagesData.splice(placeDragItem.current, 0, moveItem);
    setImagesData(newImagesData);
  };

  // Handle checking/unchecking an image
  const handleCheckImage = (imgId) => {
    if (checkedImages.includes(imgId)) {
      setCheckedImages(checkedImages.filter((id) => id !== imgId));
    } else {
      setCheckedImages([...checkedImages, imgId]);
    }
  };

  // Handle deleting selected images
  const handleDeleteImages = () => {
    setImagesData(imagesData.filter((img) => !checkedImages.includes(img.id)));
    setCheckedImages([]);
  };

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
    <div className="my-bg-primary shadow-md mx-4 lg:mx-12 rounded-md">
      <div className=" h-16 py-6 px-6 lg:px-12 border-b border-slate-300 relative">
        <div className="absolute inset-x-[50%] bottom-4 md:bottom-1">
          <ThemeToggler />
        </div>
        {checkedImages.length > 0 ? (
          <div className="flex justify-between">
            <div className="my-text-primary text-xs  md:text-lg font-semibold md:font-bold flex items-center gap-1 md:gap-3">
              <input
                type="checkbox"
                checked
                readOnly
                className="md:scale-125 rounded-md"
              />
              <p>
                {checkedImages.length}{" "}
                {checkedImages.length === 1 ? "File" : "Files"} Selected
              </p>
            </div>
            <button
              className="text-xs md:text-lg font-normal md:font-semibold text-red-600 hover:underline underline-offset-2"
              onClick={() => handleDeleteImages()}
            >
              Delete {checkedImages.length === 1 ? "file" : "files"}
            </button>
          </div>
        ) : (
          <p className="my-text-primary text-2xl font-bold">Gallery</p>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 lg:p-12">
        {imagesData.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === 0 ? "col-span-2 row-span-2" : ""
            } rounded-lg relative group bg-white border border-slate-300`}
            draggable
            onDragStart={() => {
              setIsDragging(true);
              dragItem.current = index;
            }}
            onDragEnter={() => (placeDragItem.current = index)}
            onDragEnd={() => {
              setIsDragging(false);
              handleSort();
            }}
          >
            <img className="rounded-lg" src={item.src} alt="galleryImage" />

            {/* TODO: Need to modified dragging  */}
            {/* {checkedImages.includes(item.id) ? (
              <div className="bg-white bg-opacity-50 absolute inset-0  rounded-md">
                <input
                  type="checkbox"
                  className="scale-125 rounded-md absolute left-3 md:left-6 top-3 md:top-6 z-10"
                  onChange={() => handleCheckImage(item.id)}
                />
              </div>
            ) : (
              <div className="bg-black bg-opacity-75 absolute inset-0 opacity-0 hover:opacity-60 transition-all duration-500 ease-in rounded-md">
                <input
                  type="checkbox"
                  className="scale-125 rounded-md absolute left-3 md:left-6 top-3 md:top-6 z-10 hidden group-hover:block"
                  onChange={() => handleCheckImage(item.id)}
                />
              </div>
            )} */}

            {isDragging ? null : checkedImages.includes(item.id) ? (
              <div className="bg-white bg-opacity-50 absolute inset-0  rounded-md">
                <input
                  type="checkbox"
                  className="scale-125 rounded-md absolute left-3 md:left-6 top-3 md:top-6 z-10"
                  onChange={() => handleCheckImage(item.id)}
                />
              </div>
            ) : (
              <div className="bg-black bg-opacity-75 absolute inset-0 opacity-0 hover:opacity-60 transition-all duration-500 ease-in rounded-md">
                <input
                  type="checkbox"
                  className="scale-125 rounded-md absolute left-3 md:left-6 top-3 md:top-6 z-10 hidden group-hover:block"
                  onChange={() => handleCheckImage(item.id)}
                />
              </div>
            )}
          </div>
        ))}
        <label
          htmlFor="file"
          className=" bg-gray-100 border-4 border-dotted border-gray-300 rounded-lg flex flex-col justify-center items-center p-4 h-full w-full min-h-[110px] min-w-[110px]  md:min-h-[217px] md:min-w-[217px]"
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <PiImage size={24} />
            <p className="text-gray-700 font-semibold text-xs md:text-base">
              Add Images
            </p>
          </div>
          <input type="file" id="file" hidden onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  );
};

export default App;
