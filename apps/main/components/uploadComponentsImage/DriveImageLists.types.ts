export type TDriveImageList = {
  index: number;
  size :number;
  name: string;
  url: string;
};

export type TDriveImageListProps = {
  data: TDriveImageList;
  onSelect: (list: TDriveImageList) => void;
  selectedItem: TDriveImageList;
};

export type TDriveImageListsProps = {
  onSelect: (list: TDriveImageList) => void;
};
