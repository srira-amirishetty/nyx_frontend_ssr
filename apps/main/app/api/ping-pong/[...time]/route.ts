export async function GET(request: Request) {
  const data = new URL(request.url);
  const time = data.pathname.replace(/\/api\/ping-pong\//, '');
  return Response.json({ pong: time });
}
