import { Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import React from 'react';

export default function HomeScreen() {
  return (
    <View>
      <ThemedView style={{ padding: 16, minHeight: 600 }}>
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Getting Started
        </ThemedText>

        <ThemedView style={styles.stepContainer}>
          <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>1. Edit this file</ThemedText>
          <ThemedText>Open app/(tabs)/index.tsx to modify this screen.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>2. Learn more</ThemedText>
          <ThemedText>
            Read the docs to discover what to do next:
          </ThemedText>
          <Link href="https://reactnative.dev/docs/getting-started" target="_blank">
            <ThemedText style={{ color: 'blue' }}>
              React Native Documentation
            </ThemedText>
          </Link>
        </ThemedView>

        {Platform.OS === 'ios' && (
          <ThemedView style={{ marginTop: 32, alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Powered by Expo
            </ThemedText>
            <ThemedText>Build native iOS, Android, and web apps with JavaScript and React.</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView>
        <ThemedText style={{ textAlign: 'center', marginBottom: 16 }}>
          React Native logo courtesy of React Native.
        </ThemedText>
        <ThemedText style={{ textAlign: 'center', marginBottom: 32 }}>
          Expo logo courtesy of Expo.
        </ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText style={{ textAlign: 'center', marginBottom: 16 }}>
          Made with ❤️ using Expo.
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
