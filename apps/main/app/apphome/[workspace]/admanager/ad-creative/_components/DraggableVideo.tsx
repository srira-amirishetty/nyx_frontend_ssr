interface IDraggableVideoProps {
  id: string | number;
  index: number;
  item: {
    signed_video_url: string;
    name: string;
    data: {
      type: string;
      file: Blob;
    };
  };
  deleteItem: (index: number, type: string) => void;
  selectItem: (video: string) => void;
}

export const DraggableVideo = ({
  id,
  index,
  item,
  deleteItem,
  selectItem,
}: IDraggableVideoProps) => {
  const videoURL =
    item.data?.type === "video-file"
      ? URL.createObjectURL(item.data.file)
      : item.signed_video_url;

  const onClickSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    selectItem(item.signed_video_url);
  };

  const onClickDelete = () => {
    deleteItem(index, "video");
  };

  return (
    <div className="relative group max-w-[80px] h-full max-h-[80px] cursor-pointer">
      <button className="size-full p-2" onClick={onClickSelect}>
        <video
          src={videoURL}
          className="size-full object-cover pointer-events-none"
          width={64}
          height={64}
        />
      </button>
      <button
        onClick={onClickDelete}
        className="w-[25px] h-[25px] absolute top-0 right-0 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity p-1 flex justify-center items-center text-balance"
      >
        x
      </button>
    </div>
  );
};
