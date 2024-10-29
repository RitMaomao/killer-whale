import React from 'react';
import { Input } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface KeyProps {
    placeholder: string; // 必要に応じてプロパティを追加
    secureTextEntry: boolean;
    value: string;
    onChangeText: (key: string) => void;
}

const Key: React.FC<KeyProps> = ({ placeholder = "key", secureTextEntry = true, value, onChangeText }) => {
    return (
        <View>
            <BlurView intensity={50} style={styles.blurView}>
                <Input placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChangeText} value={value} containerStyle={styles.key} inputStyle={styles.inputText}/>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    key: {
        width: 130,
        marginTop: 0,
        backgroundColor: 'transparent',
        paddingTop: 10,
        borderRadius: 5,
        opacity: 0.95,
    },
    blurView:{
        width: 150,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight:10,
        height:50,
        justifyContent:'center',
    },
    inputText:{
        color:'white',
    },
});

export default Key;
