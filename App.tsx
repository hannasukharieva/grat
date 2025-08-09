import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import {
  createTamagui,
  TamaguiProvider,
  View,
  Input,
  Button,
  ListItem,
  YStack,
  XStack,
} from "tamagui";
import { Eraser } from "@tamagui/lucide-icons";
import { defaultConfig } from "@tamagui/config/v4";
import { useState } from "react";

const config = createTamagui(defaultConfig);

type Item = {
  text: string;
};

export default function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<Item[]>([]);

  const handleChange = (text: string) => {
    setInput(text);
  };

  const handleAdd = () => {
    setList([...list, { text: input }]);
    setInput("");
  };

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
                  <ListItem>{numberedItem}</ListItem>
                </View>
              );
            })}
          </YStack>
          <XStack style={styles.container}>
            <View style={styles.inputWrapper}>
              <Input
                size="$4"
                flex={1}
                borderWidth={2}
                placeholder="Thank you for..."
                onChangeText={handleChange}
                value={input}
                paddingRight={60}
                returnKeyType="done"
              />
              <Pressable
                style={styles.inputIcon}
                onPress={() => setInput("")}
                hitSlop={10}
              >
                <Eraser size="$1" />
              </Pressable>
            </View>
            <Button onPress={handleAdd}>Add</Button>
          </XStack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
