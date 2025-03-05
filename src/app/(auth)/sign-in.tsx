import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function SignInScreen () {
    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>Login bro</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: 'gray',
    },
    
});
export default SignInScreen