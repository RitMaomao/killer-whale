import React from 'react';
import { Input } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';


interface TitleProps {
    placeholder: string; // 必要に応じてプロパティを追加
    secureTextEntry: boolean;
    value: string;
    onChangeText: (title: string) => void;
}

const Title: React.FC<TitleProps> = ({ placeholder = "Title", secureTextEntry = true, onChangeText, value }) => {
    return (
        <View>
            <BlurView intensity={50} style={styles.blurView}>
                <Input placeholder={placeholder} containerStyle={styles.pass} onChangeText={onChangeText} value={value} inputStyle={styles.inputText}/>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    pass: {
        width: 150,
        marginTop: 0,
        backgroundColor: 'transparent',
        paddingTop: 10,
        borderRadius: 5,
        opacity: 0.95,
    },
    blurView: {
        width: 150,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
        height: 60,
        justifyContent: 'center',
    },
    inputText:{
        color:'white',
    },
});

export default Title;
