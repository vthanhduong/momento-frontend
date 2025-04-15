import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import ShareListsComponent from "../list/ShareListsComponent";
import { ALargeSmall, Send } from "lucide-react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { listFriendData } from "@assets/data/listFriend";

const ButtonGroupUploadMoment = ({
  screenWidth,
  cancelPicture,
  selectedIds,
  onSelectedIdsChange,
}: {
  screenWidth: number;
  cancelPicture: () => void;
  selectedIds: Array<string>;
  onSelectedIdsChange: (ids: Array<string>) => void;
}) => {
  return (
    <>
      <View className="w-full flex-row justify-around items-center">
        <TouchableOpacity onPress={cancelPicture}>
          <Icon name="xmark" size={35} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={selectedIds.length === 0}
          className="bg-primary/75 rounded-full flex items-center justify-between p-5"
        >
          <Send size={35} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ALargeSmall size={35} color="white" />
        </TouchableOpacity>
      </View>

      {/* User */}
      <ShareListsComponent
        data={listFriendData}
        width={screenWidth}
        onSelectionChange={onSelectedIdsChange}
      />
    </>
  );
};

export default memo(ButtonGroupUploadMoment);
