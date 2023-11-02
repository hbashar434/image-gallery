import React from "react";
import imagesData from "./utils/images";
const App = () => {
  return (
    <div className=" bg-white shadow-md mx-12 rounded-md p-6 lg:p-12">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4">
        {imagesData.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === 0 ? "col-span-2 row-span-2" : ""
            } rounded-lg relative group bg-white border border-slate-300`}
          >
            <img className="rounded-lg" src={item.src} alt="image" />
            <div className="bg-black bg-opacity-75 absolute inset-0 opacity-0 hover:opacity-80 transition-opacity duration-300 rounded-lg">
              <input
                type="checkbox"
                className="scale-125 rounded-lg absolute left-6 top-6 z-10 hidden group-hover:block"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
