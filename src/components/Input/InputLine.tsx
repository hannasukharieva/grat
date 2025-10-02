import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Input, Button, XStack, View } from "tamagui";
import { StyleSheet } from "react-native";
import { getIsInputValid } from "../../helpers/checkInput";

interface Props {
  input: string;
  handleChange: (text: string) => void;
  handleClear: () => void;
  handleAdd: () => void;
}

export function InputLine({
  input,
  handleChange,
  handleClear,
  handleAdd,
}: Props) {
  return (
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
        <Pressable style={styles.inputIcon} onPress={handleClear} hitSlop={10}>
          <Entypo name="eraser" size={24} />
        </Pressable>
      </View>
      <Button onPress={handleAdd} disabled={!getIsInputValid(input)}>
        Add
      </Button>
    </XStack>
  );
}

const styles = StyleSheet.create({
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
