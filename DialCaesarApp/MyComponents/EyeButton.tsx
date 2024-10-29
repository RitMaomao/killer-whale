import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

interface EyeButtonProps {
    onPress: () => void; // Make sure this prop is defined
    secureText: boolean;
}

const EyeButton: React.FC<EyeButtonProps> = ({ onPress, secureText}) => {
  return (
    <TouchableOpacity
      style={styles.btnHover}
      activeOpacity={0.7}
      onPress={onPress} // タップ時に状態を切り替え
    >
      <LinearGradient
        colors={['#39FEE9', '#486FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.btnHover}
      >
        <Icon
          name={secureText ? 'eye-slash' : 'eye'} // 状態に応じてアイコンを切り替え
          type="font-awesome"
          color="#FFF"
          size={24}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHover: {
    width: 90,
    height: 50,
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: '#CA4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:3,
  },
});

export default EyeButton;
