import React, { memo, useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import ShareItemComponent from "./ShareItemComponent";

const ShareListsComponent = ({
  data,
  width,
  onSelectionChange,
}: {
  data: ShareItemData[];
  width: number;
  onSelectionChange: (ids: Array<string>) => void;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleItem = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        const newItem = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
        onSelectionChange(newItem);
        return newItem;
      });
    },
    [selectedIds]
  );

  const renderItem = ({ item }: { item: ShareItemData }) => {
    const onPress = () => {
      toggleItem(item.id.toString());
    };

    return (
      <ShareItemComponent
        item={item}
        onPress={onPress}
        isSelected={selectedIds.includes(item.id.toString())}
      />
    );
  };

  return (
    <View className="w-full max-h-[120px] mt-10">
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        extraData={selectedIds}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingLeft: width / 2 - 15,
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(ShareListsComponent);
