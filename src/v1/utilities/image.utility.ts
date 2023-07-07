/**
 *
 * @param {*} url
 */
export const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 *
 * @param {*} imageSrc
 * @param {*} pixelCrop
 * @param mimeType
 */
export async function getCroppedImage(
  imageSrc: string,
  pixelCrop: any,
  mimeType = 'image/jpg',
): Promise<{ file: any; url: string } | null> {
  const image = (await createImage(imageSrc)) as {
    height: number;
    width: number;
  };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // set canvas size to match the bounding box
  canvas.width = image.width;
  canvas.height = image.height;

  // draw rotated image
  ctx.drawImage(image as any, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve({ file: file, url: URL.createObjectURL(file) });
      } else reject(new Error('Failed to create image'));
    }, mimeType);
  });
}

export const imageFileToUrl = (file: any) => {
  if (file) return URL.createObjectURL(file);
  else return null;
};
