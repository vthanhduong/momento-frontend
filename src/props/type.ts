type ShareItemData = {
  id: number;
  src?: string;
  name: string;
};

type ShareItemProps = {
  item: ShareItemData;
  onPress: () => void;
  isSelected: boolean;
};
