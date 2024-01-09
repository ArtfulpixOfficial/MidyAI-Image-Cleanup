import { useState } from "react";
import { Main } from "./Main";
import { Navbar } from "./Navbar";

export function ImageToText() {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  return (
    <>
      <Navbar image={image} newImage={newImage} setNewImage={setNewImage} />
      <Main
        image={image}
        newImage={newImage}
        setImage={setImage}
        setNewImage={setNewImage}
      ></Main>
    </>
  );
}
