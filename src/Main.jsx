import { useState } from "react";
import { ImageSection } from "./ImageSection";
import { Message } from "./Message";
import UploadFile from "./UploadFile";
import { Hourglass } from "react-loader-spinner";
import ImageEditor from "./ImageEditor";

export function Main({ image, newImage, setImage, setNewImage }) {
  const [isloading, setIsLoading] = useState(false);

  async function onFileChange(file) {
    setImage(file);
  }

  return (
    <main className="relative">
      {newImage ? (
        <ImageSection image={image} newImage={newImage} />
      ) : isloading ? (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#fff", "#424b5a"]}
        />
      ) : (
        <>
          {!image ? (
            <>
              <Message />
              <UploadFile onFileChange={onFileChange} />
            </>
          ) : (
            <ImageEditor
              image={image}
              setNewImage={setNewImage}
              setIsLoading={setIsLoading}
            />
          )}
        </>
      )}
    </main>
  );
}
