async function clipBoardAPI(originalImage, maskImage) {
  const originalImageExtension =
    originalImage.type === "image/jpeg" ? "jpg" : "png";
  // Making The body of the request
  const form = new FormData();
  form.append("image_file", originalImage, `image.${originalImageExtension}`);
  form.append("mask_file", maskImage, `mask.png`);

  // Sending the post request to the api
  const buffer = await fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
    body: form,
  }).then((res) => res.arrayBuffer());

  const imageBlob = new Blob([buffer], { type: "image/png" });
  const imageUrl = URL.createObjectURL(imageBlob);
  return imageUrl;
}

export default clipBoardAPI;
