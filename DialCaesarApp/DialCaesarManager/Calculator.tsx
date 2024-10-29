export function Calculator(PlainText: string, KeyVector: string): string {
    const WordList: string[] = [..."aA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"];
    const String: string[] = Array.from(PlainText);
    const New_String_List: string[] = [];

    // 入力内容の定義
    const KeyVector_Number_Input: string[] = KeyVector.split("/");

    // 最後の要素にinverseがついていたらそれぞれの成分に-1をかける
    let KeyVector_Number: number[];
    //KeyVectorをint化
    KeyVector_Number = KeyVector_Number_Input.map(Number);

    // New_String_Listのリストの生成
    for (let i = 0; i < String.length; i++) {
        // list_1と照合
        if (WordList.includes(String[i])) {
            const Before_Number = WordList.indexOf(String[i]);
            const After_Number = (Before_Number + KeyVector_Number[i % KeyVector_Number.length]) % 62;
            New_String_List.push(WordList[After_Number]);
        }
        // WordList以外の文字はそのまま保存
        else {
            New_String_List.push(String[i]);
        }
    }

    // New_String_ListからNew_Stringの作成
    const New_String = New_String_List.join("");

    return New_String;
}

export function InverseCalculator(PlainText: string, KeyVector: string): string {
    const WordList: string[] = [..."aA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"];
    const String: string[] = Array.from(PlainText);
    const New_String_List: string[] = [];

    // 入力内容の定義
    const KeyVector_Number_Input: string[] = KeyVector.split("/");

    // 最後の要素にinverseがついていたらそれぞれの成分に-1をかける
    let KeyVector_Number: number[];
    //KeyVectorをそれぞれの要素に-1をかけてからint化
    KeyVector_Number = KeyVector_Number_Input.map(Number).map(x => x * -1);

    // New_String_Listのリストの生成
    for (let i = 0; i < String.length; i++) {
        // list_1と照合
        if (WordList.includes(String[i])) {
            const Before_Number = WordList.indexOf(String[i]);
            const After_Number = (Before_Number + KeyVector_Number[i % KeyVector_Number.length]) % 62;
            New_String_List.push(WordList[After_Number]);
        }
        // WordList以外の文字はそのまま保存
        else {
            New_String_List.push(String[i]);
        }
    }

    // New_String_ListからNew_Stringの作成
    const New_String = New_String_List.join("");

    return New_String;
}

