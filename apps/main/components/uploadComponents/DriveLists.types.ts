export type TDriveList = {
  index: number;
  size :number;
  name: string;
  url: string;
};

export type TDriveListProps = {
  data: TDriveList;
  onSelect: (list: TDriveList) => void;
  selectedItem: TDriveList;
};

export type TDriveListsProps = {
  onSelect: (list: TDriveList) => void;
};
