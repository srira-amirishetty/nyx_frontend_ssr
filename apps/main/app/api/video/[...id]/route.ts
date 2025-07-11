import axios from "axios";

export async function GET(request: Request) {
  const data = new URL(request.url);
  const videoPath = data.pathname.replace(/\/api\/video\//, '');
  const videoUrl = `${videoPath}${data.search}`;
  try {
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data);
    return new Response(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Length': videoBuffer.length.toString(),
      },
    });
  } catch (error) {
    return new Response('Failed to fetch video', { status: 500 });
  }
}