import { useState, useRef } from "react";
import { Button } from "./Button";
import clipBoardAPI from "./api";
import useDraw from "./useDraw.ts";
const ImageEditor = function ({ image, setNewImage, setIsLoading }) {
  const [brushRadius, setBrushRadius] = useState(25);
  const {
    canvasRef,
    cursorPosition,
    isCursorVisible,
    onMouseDown,
    clear,
    undo,
    getMaskImage,
  } = useDraw(brushRadius);

  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  async function saveCanvas() {
    try {
      setIsLoading(true);
      const img = imageRef.current;
      if (!img) return;
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      const originalImage = img.src;
      const maskImage = getMaskImage(originalWidth, originalHeight);
      const originalImageBlob = await fetch(originalImage).then((res) =>
        res.blob()
      );
      const maskImageBlob = await fetch(maskImage).then((res) => res.blob());
      const newImageURL = await clipBoardAPI(originalImageBlob, maskImageBlob);
      setNewImage(newImageURL);
      clear();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="editor">
      <div className="flex  mb-2">
        <div className="relative cursor-none">
          <img
            src={URL.createObjectURL(image)}
            alt="to clean up"
            ref={imageRef}
            onLoad={() => setImageLoaded(true)}
          />
          {isCursorVisible && (
            <div
              className="rounded-full bg-red-500 absolute opacity-70"
              style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                width: brushRadius * 2,
                height: brushRadius * 2,
                marginLeft: -brushRadius,
                marginTop: -brushRadius,
              }}
            ></div>
          )}

          {imageLoaded && (
            <canvas
              ref={canvasRef}
              onMouseDown={onMouseDown}
              width={imageRef?.current?.width}
              height={imageRef?.current?.height}
              className={" absolute top-0 left-40 opacity-70"}
            />
          )}
        </div>
      </div>

      <div className="cleaning-options absolute">
        <div className="editor-btns">
          <Button className="cleanup-btn" onClick={undo}>
            Undo
          </Button>
          <Button className="cleanup-btn" onClick={clear}>
            Reset
          </Button>
        </div>

        <div className="brush-options">
          <label>Brush size</label>
          <input
            type="range"
            value={brushRadius}
            min={5}
            max={120}
            onChange={(e) => setBrushRadius(+e.target.value)}
          />
        </div>
        <div className="clean-btn">
          <Button className="cleanup-btn" onClick={saveCanvas}>
            Clean
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ImageEditor;
