export type ShareItemData = {
  id: number;
  src?: string;
  name: string;
};

export type ShareItemProps = {
  item: ShareItemData;
  onPress: () => void;
  isSelected: boolean;
};
