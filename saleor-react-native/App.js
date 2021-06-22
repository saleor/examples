import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Products from './Products';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://demo.saleor.io/graphql/',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.header}>
          <SafeAreaView style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 18 }}>
              React Native Demo App
            </Text>
          </SafeAreaView>
        </View>
        <Products />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'blue',
    width: '100%',
    height: 100,
  },
});
