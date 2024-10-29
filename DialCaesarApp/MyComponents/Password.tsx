import React from 'react';
import { Input } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface PasswordProps {
    placeholder: string; // 必要に応じてプロパティを追加
    secureTextEntry: boolean;
    value: string; // 追加
    onChangeText: (pass: string) => void; // 追加
}

const Password: React.FC<PasswordProps> = ({ placeholder = "Password", secureTextEntry = true, value, onChangeText }) => {
    return (
        <View>
            <BlurView intensity={50} style={styles.blurView}>
                <Input placeholder={placeholder} secureTextEntry={secureTextEntry} containerStyle={styles.pass} onChangeText={onChangeText} value={value} inputStyle={styles.inputText}/>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    pass: {
        width: 200,
        marginTop: 0,
        backgroundColor: 'transparent',
        paddingTop: 10,
        borderRadius: 5,
        opacity: 0.95,
    },
    blurView:{
        width: 200,
        borderRadius: 10,
        overflow: 'hidden',
        height:60,
        justifyContent:'center',
    },
    inputText:{
        color:'white',
    },
});

export default Password;
