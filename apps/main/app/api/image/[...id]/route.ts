import axios from "axios";

export async function GET(request: Request) {
  const data = new URL(request.url);
  const fdata = data.pathname.replace(/\/api\/image\//, '');
  const image = await axios.get(`${fdata + data.search}`, {responseType: 'arraybuffer'});
  const returnedB64 = Buffer.from(image.data).toString('base64');
  return new Response(returnedB64);
}