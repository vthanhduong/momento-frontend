// components/portals/FriendBottomSheetPortal.tsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Portal } from 'react-native-portalize';
import RBSheet from "react-native-raw-bottom-sheet";
import { StyleSheet, Text, View } from 'react-native';
import SearchFriend from "@/components/search/SearchFriend";

export type FriendBottomSheetRef = {
    open: () => void;
    close: () => void;
};

const FriendBottomSheetPortal = forwardRef<FriendBottomSheetRef>((_, ref) => {
    const sheetRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.open(),
        close: () => sheetRef.current?.close(),
    }));

    return (
        <Portal>
            <RBSheet
                ref={sheetRef}
                draggable={true}
                closeOnPressBack={true}
                customStyles={{
                    container: styles.wrapper,
                }}
                customModalProps={{
                    animationType: "slide",
                    statusBarTranslucent: true,
                    transparent: false
                }}
            >
                <View style={styles.inner}>
                    <Text style={styles.title}>Invite a friend to continue</Text>
                    <View style={styles.searchWrapper}>
                        <SearchFriend />
                    </View>
                </View>
            </RBSheet>
        </Portal>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        height: "90%",
        backgroundColor: "#202020",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 20,
    },
    searchWrapper: {
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
});

export default FriendBottomSheetPortal;
