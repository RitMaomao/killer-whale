import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonsComponentProps {
  onPress: () => void;
}
const ButtonComponent: React.FC<ButtonsComponentProps> = ({ onPress }) => {
  return (

    <View style={styles.buttons}>
      <TouchableOpacity
        style={styles.btnHover}
        activeOpacity={0.7} // タップ時の透明度を設定
        onPress={onPress}
      >
        <LinearGradient
          colors={['#39FEE9', '#486FFF']} // グラデーションの色
          start={{ x: 0, y: 0 }} // 開始位置
          end={{ x: 1, y: 1 }}   // 終了位置
          style={styles.btnHover}
        >
          <Text style={styles.btnText}>Decode Button</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 0,
    textAlign: 'center', // これはRNでは無効。親Viewで調整する必要あり
  },
  btnHover: {
    width: 200,
    height: 40,
    //backgroundColor: '#39FEEA', // 緑色
    backgroundColor: '#FBDD9D', // 橙色
    margin: 0,
    borderRadius: 15,
    // shadowOpacity: 0.5,
    // shadowColor: '#CA4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default ButtonComponent;
