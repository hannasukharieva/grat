import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function RootLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(tabs)/(me)/index">
        <Label>Me</Label>
        <Icon sf="person" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(tabs)/partner/index">
        <Label>Partner</Label>
        <Icon sf="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
