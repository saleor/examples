import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';

// Create an executable query
const GET_PRODUCTS = gql`
  query getProducts {
    products(first: 10, channel: "default-channel") {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
          }
        }
      }
    }
  }
`;

export default function Products() {
  // Send the query to the GraphQL server
  const { loading, data } = useQuery(GET_PRODUCTS);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={data.products.edges}
          ListHeaderComponent={() => (
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                padding: 10
              }}
            >
              Products
            </Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image
                source={{ uri: item.node.thumbnail.url }}
                style={{ height: 150, width: 150 }}
              />
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}>{item.node.name}</Text>
              <Text>$4.50</Text>
            </View>
          )}
          numColumns={2}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  product: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'grey',
  },
});
