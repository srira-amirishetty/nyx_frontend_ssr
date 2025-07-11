export function ConvertB64ToBlob(b64ImageString: string): Blob {
  try {
    // It is assumed that this b64ImageString is coming from a python environment.
    // Python base64 strings have a few different characters from a regular base64 strings.
    // So we have to replace a them
    const regularB64String = b64ImageString
      .replace(/_/g, "/")
      .replace(/-/g, "+")
      .replace(/^b'|'$/g, "");
    const binaryString = atob(regularB64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++)
      bytes[i] = binaryString.charCodeAt(i);
    const blob = new Blob([bytes], { type: "image/png" });
    return blob;
  } catch (error: any) {
    throw `"Error: Could not convert b64 string to blob: ", ${error.message}`;
  }
}

export function ConvertBlobToImageURL(imageBlob: Blob): string {
  try {
    return URL.createObjectURL(imageBlob);
  } catch (error: any) {
    throw `"Error: Could not create a url from the image blob: ", ${error.message}`;
  }
}

export function ConvertB64ToImageURL(b64ImageString: string): string {
  const blob = ConvertB64ToBlob(b64ImageString);
  const url = ConvertBlobToImageURL(blob);
  return url;
}
