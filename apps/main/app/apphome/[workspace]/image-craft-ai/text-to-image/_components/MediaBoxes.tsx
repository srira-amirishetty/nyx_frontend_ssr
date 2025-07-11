import classNames from "@nyx-frontend/main/utils/classNames";

type Box = {
  id: string;
  width: string;
  height: string;
  diamension: string;
  title: string;
};

type MediaBoxProps = Box & {
  onClick: (item: Box, name: string, index: number) => void;
  index: number;
  active: Box;
  name: string;
};

type MediaBoxesProps = {
  boxes: Array<MediaBoxProps>;
  onClick: (item: Box, name: string, index: number) => void;
  active: Box;
  name: string;
};

function MediaBox(props: MediaBoxProps) {
  const onClickHandler = () => {
    props.onClick(props, props.name, props.index);
  };

  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <button
        style={{
          width: props.width,
          height: props.height,
        }}
        className={classNames(
          "rounded-md flex justify-center items-center hover:shadow-gray-800 shadow-none hover:shadow-lg",
          props.active?.id === props.id ? "bg-[#5E32FF]" : "bg-[#6653B4]",
        )}
        onClick={onClickHandler}
      ></button>
      <div
        className={classNames(
          "w-full text-center text-xs font-normal",
          props.active?.id === props.id ? "text-nyx-yellow" : "text-white",
        )}
      >
        {props?.title}
      </div>
      <div
        className={classNames(
          "w-full text-center text-white text-xs font-light",
          props.active?.id === props.id ? "text-nyx-yellow" : "text-white",
        )}
      >
        {`(${props?.diamension})`}
      </div>
    </div>
  );
}

function MediaBoxes({ boxes, onClick, active, name }: MediaBoxesProps) {
  return (
    <>
      {boxes?.map((box: MediaBoxProps) => (
        <MediaBox
          key={box.id}
          {...box}
          onClick={onClick}
          active={active}
          name={name}
        />
      ))}
    </>
  );
}

export default MediaBoxes;
