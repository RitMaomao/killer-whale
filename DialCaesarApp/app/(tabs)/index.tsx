import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText'
import { ThemedView } from '../../components/ThemedView'
import Buttons from '../../MyComponents/Convert-button';
import EyeButton from '../../MyComponents/EyeButton';
import Trush from '../../MyComponents/Trush';
import Key from '../../MyComponents/Key';
import Password from '../../MyComponents/Password';
import Title from '../../MyComponents/Title';
import RestoreButtonComponent from '../../MyComponents/Restore-button'
import LargeTextInput from '../../MyComponents/whole-PS'
//import PlusButtonComponent from '../../MyComponents/Plus-button' 
import { EncodeInserter } from '../../DialCaesarManager/MyFunctions/EncodeInserter'
import { GetDecoder } from '../../DialCaesarManager/MyFunctions/GetDecoder'
import { Calculator } from '../../DialCaesarManager/Calculator'
import DisplayDataBase from '../../DialCaesarManager/DataBase';
import { GetData } from '../../DialCaesarManager/Storage';
import { RemoveData } from '../../DialCaesarManager/Storage';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


interface DataItem {
  title: string;
  chiper: string;
}

const HomeScreen: React.FC = () => {
  const [pass, setPass] = useState<string>(''); // useStateに型を指定
  const [title, setTitle] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(true);
  const [dataList, setDataList] = useState<DataItem[]>([]);
  // useEffect(() => {
  //   CreateDataBase(); // データベースを作成
  // }, []);
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('dataList');
        if (storedData) {
          setDataList(JSON.parse(storedData));  // データを配列に変換して反映
        }
      } catch (e) {
        console.error('データの取得に失敗しました', e);
      }
    };
    loadStoredData();
  }, []);

  const handleSave = async (title: string, plaintext: string, key: string) => {
    if (!title.trim() || !plaintext.trim()) return; // 空の入力は無視
    const isDuplicate = dataList.some((item) => item.title === title);
    if (isDuplicate) {
      Alert.alert('保存エラー', `タイトル "${title}" は既に存在します。`);
      return;
    }
    const chiper: string = Calculator(plaintext, key)
    const pair = { title, chiper }
    const newDataList = [...dataList, pair]; // 新しいデータをリストに追加
    try {
      await AsyncStorage.setItem('dataList', JSON.stringify(newDataList));
      setDataList(newDataList);  // リストを更新してUIに反映
      setPass('');  // 入力をクリア
      setTitle('');  // 入力をクリア
      setKey('');  // 入力をクリア
      Alert.alert('保存成功', 'データが保存されました');
    } catch (e) {
      console.error('保存に失敗しました', e);
    }
  };

  const renderItem = ({ item }: { item: DataItem }) => (
    <View>
      <Text style={styles.ListContainer}>{item.title} : {item.chiper}</Text>
    </View>
  );

  const handleRestore = async (title: string, key: string) => {
    try {
      const data = await GetData(title, key); // awaitを使って結果を取得
      setPass('');
      setTitle('');
      setKey('');

      if (data) {
        console.log('復元に成功しました:', data); // 復元したデータの確認
        Alert.alert(
          'データ復元成功',
          `タイトル: ${data.title}\n暗号: ${data.chiper}`,
          [{ text: 'OK' }]
        );
      } else {
        console.log(`タイトル "${title}" に対するデータが見つかりませんでした。`); // データが見つからなかった場合の処理
      }
    } catch (error) {
      console.error('データの復元中にエラーが発生しました:', error); // エラーハンドリング
    }
  };

  const handleRemove = async (title: string) => {
    const success = await RemoveData(title); // データ削除処理
    setPass('');
    setTitle('');
    setKey('');
    if (success) {
      Alert.alert('削除成功', `データ "${title}" が削除されました。`);
      // 更新されたデータリストを取得するために再度読み込み
      const storedData = await AsyncStorage.getItem('dataList');
      if (storedData) {
        setDataList(JSON.parse(storedData)); // データを更新
      }
    } else {
      Alert.alert('削除失敗', `データ "${title}" は見つかりませんでした。`);
    }
  };

  return (
    <ImageBackground
      // source={require('../../MyComponents/img/名称未設定のデザイン.png')} // 画像のパス
      source={require('../../MyComponents/img/CyanLock.png')} // 画像のパス
      style={styles.background}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.title}>
          <ThemedText style={styles.customFont}>V C E S S</ThemedText>
        </ThemedView>
        {/* ThemedTextの代わりにreact-native-elementsのTextを使用 */}
        {/*      <BlurView intensity={50} tint="light" style={styles.blur}>*/}
        <ThemedView style={styles.inputKey}>
          <EyeButton onPress={() => { setSecure((prev) => !prev); }} secureText={secure} />
          <Key placeholder="Key Vector" secureTextEntry={secure} onChangeText={setKey} value={key} />
        </ThemedView>
        <ThemedView style={styles.inputPassword}>
          <Title placeholder="Title" secureTextEntry={true} onChangeText={setTitle} value={title} />
          <Password
            placeholder="Password"
            value={pass}
            secureTextEntry={secure}
            onChangeText={setPass}
          />
        </ThemedView>
        <ThemedView style={styles.inputPassword}>
          <Buttons onPress={() => handleSave(title, pass, key)} />
          <RestoreButtonComponent onPress={() => { handleRestore(title, key) }} />
        </ThemedView>
        <BlurView intensity={40} style={styles.List}>
          <View style={styles.chipers}>
            <ThemedText style={styles.chipersList}>ChipersList</ThemedText>
          </View>
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item) => item.title} // ユニークなキーとしてtitleを使用
          />
        </BlurView>
        <Trush onPress={() => handleRemove(title)} />
        {/* <DisplayDataBase /> */}
        {/* <LargeTextInput /> */}
        {/*<DisplayDataBase /> */}
        {/*<PlusButtonComponent/> */}
        {/*        </BlurView>*/}

      </ThemedView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'italic', // フォント名に置き換えてください
    fontWeight: '100', // 太字
    fontSize: 90, // サイズ調整
    color: '#39FEE9',
    padding: 65,
    textShadowColor: '#50FFFA', // 影の色
    textShadowRadius: 15, // ぼかしの強さ
  },
  title: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '10%',
    width: '105%',
    marginTop: 60,
  },
  titleContainer: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 20,
    height: '100%',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    width: 250,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  inputKey: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
  },
  inputPassword: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  List: {
    width: '80%', // 幅を100%に設定
    height: 300, // 高さを200に設定
    backgroundColor: 'transparent',
    borderColor: '#39FEEA', // 枠線の色
    //borderWidth: 4, // 枠線の幅
    borderRadius: 10, // 角を丸くする
    padding: 10, // 内部のパディング
    fontSize: 18, // フォントサイズを大きくする
    //opacity: 0.7,
    alignItems: 'flex-start',
    overflow: 'scroll',
  },
  ListContainer: {
    fontSize: 23,
    fontStyle: 'italic',
    fontWeight: '300',
    color: 'white',//#39FEE9,#2AFF31
    alignContent: 'flex-start',
    textShadowColor: 'black', // 影の色#50FFFA
    textShadowRadius: 6, // ぼかしの強さ
  },
  chipersList: {
    color: '#39FEE9',
    fontStyle: 'italic',
    fontWeight: '300',
    fontSize: 25,
    textShadowColor: '#50FFFA', // 影の色
    textShadowRadius: 6, // ぼかしの強さ
    textDecorationLine: 'underline', // アンダーバーの設定
    textDecorationColor: '#39FEE9', // 下線の色を指定（オプション）
  },
  chipers: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

export default HomeScreen;
