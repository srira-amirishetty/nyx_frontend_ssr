import Image from "next/image";

interface IDraggableProps {
  id: string | number;
  index: number;
  item: {
    signed_image_url: string;
    signed_video_url?: string;
    name: string;
    type: string;
    data: {
      type: string;
      file: Blob;
    };
  };
  deleteItem: (index: number, type: string) => void;
  selectItem: (url: string, type: string) => void;
  selected?: any;
}

export const Draggable = ({
  id,
  index,
  item,
  deleteItem,
  selectItem,
  selected,
}: IDraggableProps) => {
  const mediaURL =
    item.type === "images" ? item.signed_image_url : item.signed_video_url;

  const onClickSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;

    if (mediaURL) {
      selectItem(mediaURL, item.type);
    }
  };

  const onClickDelete = () => {
    deleteItem(index, item.type);
  };

  return (
    <>
      <div
        className={`relative group mt-2 max-w-[40px] xl:max-w-[80px] h-full max-h-[40px]   xl:max-h-[80px] cursor-pointer  m-1 rounded-md ${selected ? "bg-[#5E32FF]" : "hover:border-[1px] hover:border-white"}`}
      >
        <button className="size-full p-1 rounded-md" onClick={onClickSelect}>
          {item.type === "images" && mediaURL ? (
            <Image
              src={mediaURL}
              alt={item.name}
              className="size-full object-cover pointer-events-none rounded-md"
              width={64}
              height={64}
            />
          ) : (
            <video
              src={mediaURL}
              className="size-full object-cover pointer-events-none rounded-md"
              width={64}
              height={64}
            />
          )}
        </button>
        <button
          onClick={onClickDelete}
          className="w-[23px] h-[23px] absolute top-0 right-0 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity p-1 flex justify-center items-center text-balance"
        >
          x
        </button>
      </div>
    </>
  );
};
