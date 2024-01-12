import { useState } from "react";
import { Main } from "./Main";
import { Navbar } from "./Navbar";

export function ImageToText() {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const reset = function () {
    setImage(null);
    setNewImage(null);
  };
  return (
    <>
      <Navbar image={image} newImage={newImage} reset={reset} />
      <Main
        image={image}
        newImage={newImage}
        setImage={setImage}
        setNewImage={setNewImage}
      ></Main>
    </>
  );
}
