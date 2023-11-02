import React, { useState } from "react";
import "./App.css";
import images from "./utils/images";

const App = () => {
  // State for image data and selected images
  const [imagesData, setImagesData] = useState(images);
  const [checkedImages, setCheckedImages] = useState([]);

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

  return (
    <div className="bg-white shadow-md mx-4 lg:mx-12 rounded-md">
      <div className=" h-16 py-6 px-6 lg:px-12 border-b border-slate-300">
        {checkedImages.length > 0 ? (
          <div className="flex justify-between">
            <div className="font-semibold md:font-bold flex gap-3">
              <input type="checkbox" checked className="scale-125 rounded-md" />
              {checkedImages.length} Files Selected
            </div>
            <button
              className="font-normal md:font-semibold text-red-600 hover:underline underline-offset-2"
              onClick={() => handleDeleteImages()}
            >
              Delete files
            </button>
          </div>
        ) : (
          <p className="text-xl font-bold">Gallery</p>
        )}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 lg:p-12">
        {imagesData.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === 0 ? "col-span-2 row-span-2" : ""
            } rounded-lg relative group bg-white border border-slate-300`}
          >
            <img className=" rounded-lg" src={item.src} alt="image" />

            {checkedImages.includes(item.id) ? (
              <div className="bg-white bg-opacity-40 absolute inset-0  rounded-md">
                <input
                  type="checkbox"
                  className="scale-125 rounded-md absolute left-3 md:left-6 top-3 md:top-6 z-10"
                  onChange={() => handleCheckImage(item.id)}
                />
              </div>
            ) : (
              <div className="bg-black bg-opacity-75 absolute inset-0 opacity-0 hover:opacity-60 transition-opacity duration-300 rounded-md">
                <input
                  type="checkbox"
                  className="scale-125 rounded-md absolute left-3 md:left-6 top-3 md:top-6 z-10 hidden group-hover:block"
                  onChange={() => handleCheckImage(item.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
