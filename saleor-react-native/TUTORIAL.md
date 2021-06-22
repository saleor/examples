### Introduction

We will build a React Native application using the toolchain Expo. With Expo, you can quickly build cross-platform applications for mobile (iOS, Android) and the web. By using Expo we have one unified approach to building, compiling, and running React Native from a local machine.

[MORE ABOUT GRAPHQL]

[MORE ABOUT SALEOR]

[MORE ABOUT REACT NATIVE]

### Getting started

Install Expo globally on your machine.

```
yarn global add expo-cli
```

> You need to have node v12 installed

Creating a new React Native app with Expo in `saleor-react-native` by running:

```
expo init saleor-react-native
```

You'll be asked to select a template to kickstart the development of the application but for this tutorial, the `blank` template will be sufficient.

> There are also templates available to give you a boilerplate application with routing or TypeScript

After the installation is finished, we can start the application by running `yarn start`. This will start the Expo Developer Tools in your browser on [http://localhost:19002/](http://localhost:19002/). From this page, you can select where you want to run the React Native application (iOS, Android, or web) and find tools to debug the application. Alternatively, you can start the application directly at the location of your choice, by running `yarn ios|android|web`.

To run the application you have to install the Expo Go application on your mobile device, install XCode on your Mac computer, or Android Studio on any computer. Preferably you use the Expo Go application that's available in the Apple App Store and Android Play Store. By using this application you open the React Native application by scanning the QR code that you find in the Expo Developer Tools, or by creating an Expo account and share the link from there.

The application will look something like this when we first start it:

![Initial application](initial_application.png 'Initial application')

Let's proceed by adding GraphQL to this application, and connect it with the Saleor GraphQL API to render a list of products.

### Installing dependencies

We need to install Apollo Client, a library to connect with a GraphQL server, and `graphql` itself. We can install these packages from npm using:

```
yarn add @apollo/client graphql
```

After installing Apollo Client make sure to restart the React Native application, so that the JavaScript bundle will be rebuild containing these new dependencies.

[MORE ABOUT APOLLO CLIENT]

To set up Apollo Client in our application we need to make changes to the entry point of our application in `App.js`. In this file we need to create an instance of Apollo Provider and pass the connection details to the GraphQL server connection:

```jsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://demo.saleor.io/graphql/',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style='auto' />
      </View>
    </ApolloProvider>
  );
}
```

Any component that we now render within `ApolloProvider` can connect with the GraphQL server that's available at [https://demo.saleor.io/graphql/](https://demo.saleor.io/graphql/).

In the next section, we'll learn more about this GraphQL server, which is a demo instance of the Saleor GraphQL API.

### Your first query

The GraphQL API from Saleor has a demo instance from which you can retrieve mock products, category and everything else you need to build an e-commerce store. This demo API has a GraphQL playground that you can find at [https://demo.saleor.io/graphql/](https://demo.saleor.io/graphql/), where you can use the following query to retrieve a list of products:

```graphql
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
```

This query can be used from our React Native application, by using the Apollo Client library that's already connected to the Saleor GraphQL API.

Let's create a new component called Products.js, that will be used to retrieve a list of products from the API and render them.

```js
// Products.js
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
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

  console.log({ data });

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <Text>Products will be rendered here!</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

The code above has an executable query created with `gql`, which lets you use the GraphQL syntax within a JavaScript (or TypeScript) application. In the `Products` component, the `useQuery` Hook from Apollo Client is used to send this query to the GraphQL API and return the variable `loading` and `data`. The value for `loading` will be `true` until the data is resolved after which the list of products can be rendered. But for now, the value for `data` will be logged into the console, where you can check its value either in the Expo Developer Tools or the command line.

To render the `Products` component we need to add it to `App.js`, nested within `ApolloProvider` so this component will be able to connect with the GraphQL API. Also, we'll add a header to the page by adding a `View` component with a blue background and a `Text` component that's rendered within a `SafeAreaView` component. This component will make sure that the text is visible on all mobile screens.

```js
// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Products from './Products';

// ...

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
```

If you've checked if the products are retrieved properly from the Saleor GraphQL API, we can build the interface to display the products in our application. There are multiple React Native components that we can use to render a list of elements, but the `FlatList` component is the most suitable one. This component is optimized to render large sets of data, and it can iterate over the data that we retrieved from the GraphQL server and render this data in a grid.

```js
// Products.js
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';

// ...

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
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image
                source={{ uri: item.node.thumbnail.url }}
                style={{ height: 150, width: 150 }}
              />
              <Text>{item.node.name}</Text>
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
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'grey',
  },
});
```

The `FlatList` component will iterate over the data coming from the GraphQL server and render a `View` component for every item in the list. This `View` component will hold an `Image` component and two `Text` components with the title and the price of the product. For simplicity, the price of the product is fixed.

To make this page look pretty, we can add a header title above the list of products and make sure that the grid of products is styled. The title and price that are rendered by `Text` components can also be styled, and as you probably have noticed we're using a combination of style objects and inline styling in this tutorial.

```js
// Products.js
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
                padding: 10,
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {item.node.name}
              </Text>
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
```

When you're finished making the changes, the application will be styled and looks something like the following:

![Final application](final_application.png 'Final application')

This application is rendering a list of products from the Saleor GraphQL API, which has much more to offer than just retrieving products. With this API you can also retrieve categories, handle the checkout or authenticate users. To explore these features in more detail, you can have a look at the [documentation](https://docs.saleor.io/docs/) and build upon the application we've created in this tutorial.


### Conclusion

In this tutorial, we've created a React Native application using the toolchain Expo. With Expo, you can quickly build cross-platform applications for mobile (iOS, Android) and the web. By using Expo we have one unified approach to building, compiling, and running React Native on a local machine. This application is connected to the Saleor GraphQL API, which delivers a headless approach for modern e-commerce. Using this API you can focus on building a frontend application for your clients or customers, using any library or framework that you're familiar with.
