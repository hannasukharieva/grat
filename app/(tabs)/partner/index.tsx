import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createTamagui,
  TamaguiProvider,
  View,
  ListItem,
  YStack,
} from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { getIsInputValid, InputLine } from "../../../src";

const config = createTamagui(defaultConfig);

type Item = {
  text: string;
};

export default function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<Item[]>([]);

  function handleDelete(index: number) {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  function handleChange(text: string) {
    setInput(text);
  }

  function handleClear() {
    setInput("");
  }

  function handleAdd() {
    if (!getIsInputValid(input)) return;
    setList([...list, { text: input }]);
    handleClear();
  }

  return (
    <TamaguiProvider config={config}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <YStack style={styles.list}>
            {list.map((item, index) => {
              const numberedItem = `${index + 1}. ${item.text}`;
              return (
                <View key={index}>
                  <ListItem>
                    {numberedItem}{" "}
                    <Pressable
                      style={styles.inputIcon}
                      onPress={() => handleDelete(index)}
                      hitSlop={10}
                    >
                      <Entypo name="trash" size={24} />
                    </Pressable>
                  </ListItem>
                </View>
              );
            })}
          </YStack>
          <InputLine
            input={input}
            handleChange={handleChange}
            handleClear={handleClear}
            handleAdd={handleAdd}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingBottom: 50,
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
    gap: 5,
  },
  container: {
    padding: 12,
    gap: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  inputWrapper: {
    position: "relative",
    flex: 1,
  },
  inputIcon: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
