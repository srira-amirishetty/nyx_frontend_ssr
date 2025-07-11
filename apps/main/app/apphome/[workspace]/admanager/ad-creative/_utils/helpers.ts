export const imageAndVideos = (data: Array<{ type: string }>) => {
  if (!data) {
    return {
      images: [],
      videos: [],
      hasImages: false,
      hasVideos: false,
    };
  }

  const images = data.filter(
    (post: { type: string }) => post.type === "images",
  );
  const videos = data.filter(
    (post: { type: string }) => post.type !== "images",
  );

  return {
    images,
    videos,
    hasImages: images.length > 0,
    hasVideos: videos.length > 0,
  };
};
