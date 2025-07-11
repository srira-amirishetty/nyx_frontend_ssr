export async function GET(request: Request) {
  const data = new URL(request.url);
  console.log("data", data);
  return Response.json({
    name: "NYX",
    short_name: "NYX",
    icons: [
      {
        src: "/android-chrome-192x192.png?v=1",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png?v=1",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png?v=1",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png?v=1",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#333333",
    background_color: "#333333",
    display: "standalone",
    start_url: data.origin,
  });
}
