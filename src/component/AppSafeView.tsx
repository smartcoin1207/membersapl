import * as React from 'react';
import {StyleSheet} from 'react-native';
import type {SafeAreaViewProps} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native-safe-area-context';

type AppSafeViewProps = SafeAreaViewProps;

export default function AppSafeView(props: AppSafeViewProps) {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
