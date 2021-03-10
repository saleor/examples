# Creating a Type-Safe React Application with TypeScript using the Saleor GraphQL API

### Introduction

This tutorial will show how to create a type-safe React application with TypeScript using the Saleor GraphQL API.

/_ Some information about Saleor _/

/_ Some information about GraphQL _/

## Prerequisites

Before you begin this guide you'll need the following:

- Access to the Saleor GraphQL API https://demo.saleor.io/graphql/
- Familiarity with React and TypeScript

## Creating a Basic React Application with TypeScript

We will use the [Create React App](https://github.com/facebook/create-react-app) to get quickly started. You can create a new `create-react-app` application using the command:

```bash
npx create-react-app saleor-demo --template typescript
```

This will create a barebone React application with TypeScript support enabled in a directory called `saleor-demo`. In that directory, a lot of files have been created, that we'll remove later in case they are not needed for this project. You can start the application from the `saleor-react-ts` directory by running the command:

```bash
yarn start
```

On the page [https://localhost:3000](https://localhost:3000) you can see the result, which is a landing page that welcomes you to this new React application.

Before we continue expanding this application, we'll introspect the Saleor GraphQL API that will be used as the source of data for the application.

## Fetching the Saleor GraphQL API

Let's introspect the Saleor GraphQL API, which is available at [https://demo.saleor.io/graphql/](https://demo.saleor.io/graphql/). On this page, you can find the GraphQL Playground for this API, which you can inspect by opening the "Docs" tab on the right side.

/_ Insert GraphQL Playground image or iframe _/

On the left side, you can send a GraphQL operation in the shape of a document to this GraphQL API. A document can best be described as a file containing a GraphQL operation (or multiple) which is either a `query`, `mutation`, or `subscription`.

The most used operation is a `query` and is comparable to a `GET` request for REST APIs. This operation retrieves data from a GraphQL API without mutating it. One of the queries that are available for the Saleor GraphQL API is the following one:

```graphql
query getLatestProducts {
  products(first: 5) {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
```

This query retrieves the last 5 products from the Saleor GraphQL API and returns the fields `id`, `name`, and `description`. Also, you can see the fields `edges` and `nodes` being retrieved, which are useful for the ["Connections" pattern](https://relay.dev/graphql/connections.htm) in GraphQL and Relay. In GraphQL there are two main libraries for data fetching, which are Relay and Apollo Client. In this tutorial, however, we won't be using that concept as we're using Apollo instead of Relay as our GraphQL Client because of a smoother learning curve.

### Setup Apollo Client

GraphQL returns JSON data over HTTP, and therefore you're free to use whatever method or library for data fetching that you're familiar with. But as mentioned in the previous section, there are also libraries to help you do this and we'll be using [Apollo Client](https://www.apollographql.com/apollo-client).

Installing Apollo Client is easy, and can be done by running the command below:

```bash
yarn add @apollo/client graphql graphql.macro
```

The package `@apollo/client` contains everything you need to set up data fetching with Apollo Client like in-memory cache, error handling, and methods to query or mutate GraphQL. And, of course, we also need to import `graphql` to parse GraphQLs' query language and another library called `graphql.macro` that lets us parse `.graphql` files.

Apollo Client is specifically useful for React applications, as it comes with a Hooks-based approach. To use these Hooks, we first need to create a `client` instance that has to configuration to connect with the Saleor GraphQL API. This `client` must be added to a component called `ApolloProvider`, that wraps our application with the connection to the GraphQL API. Usually, you wrap your application with this provider on the highest level possible, in this case `src/index.tsx`, so the GraphQL can be accessed throughout your entire application:

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'https://demo.saleor.io/graphql/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

> This approach is comparable to how the [React Context API](https://reactjs.org/docs/context.html) works.

With this, we're able to start sending documents to the Saleor GraphQL API using Apollo Client!

### Query Data using Apollo React Hooks

Our application can now fetch data from the Saleor GraphQL API by sending documents to that API. We've already looked at some of the operations that were accepted by the API and can use the query to retrieve the first 5 products first. You can add this query to a new file called `getLatestProducts.graphql`:

```graphql
# src/getLatestProducts.graphql
query getLatestProducts {
  products(first: 5) {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
```

This query should be used as input for an Apollo `useQuery` Hook, that returns three variables: `loading`, `data`, and `error`. These variables are pretty self-explanatory and can be used to define what you want to return from your React application.

The `useQuery` Hook can be imported from `@apollo/client`, and can be imported in a new file called `Products.tsx` in the `src` directory:

```tsx
// src/Products.tsx
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

const getLatestProducts = loader('src/getLatestProducts.graphql');

function Products() {
  const { loading, error, data } = useQuery<any>(getLatestProducts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    const latestProducts = data.products?.edges || [];

    return (
      <div>
        {latestProducts?.length > 0 &&
          latestProducts.map(({ node: { id, name, description } }) => (
            <div key={id}>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          ))}
      </div>
    );
  }

  return null;
}

export default Products;
```

In this file, the query `getLatestProducts` is passed to the `useQuery` Hook and used to retrieve the last 5 products from the GraphQL API. The data that's returned is being destructed and rendered in the `Products` component. We haven't added any type definitions to this file, which we'll do later on in this tutorial using GraphQL Code Generator!

The `useQuery` Hook accepts a generic for the return type of the data that it's fetching which, as we're using GraphQL, has the same shape as the GraphQL query. You can use the GraphQL Playground to check what the shape of the output is, in case you're in doubt. Afterwards, add the new type `LatestProduct` in the `Products` component and add it to the Hook:

```tsx
// src/Products.tsx

//..

type Product = {
  id: string;
  name: string;
  description: string;
};

type LatestProducts = {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
};

function Products() {
  const { loading, error, data } = useQuery<LatestProducts>(getLatestProducts);

  // ...
```

To render this in the browser we need to alter the `src/App.tsx` file and replace its contents with the following:

```js
// src/App.tsx
import Products from './Products';

function App() {
  return (
    <div>
      <header>
        <h1>Saleor React Application</h1>
      </header>
      <Products />
    </div>
  );
}

export default App;
```

The basic Create React Application starter page is no longer rendered, but instead, a list of 5 products is displayed.

/_ Insert Application Image _/

We can spend a lot more time updating the styling of this application, but let's save that for later and add more difficulty to our application.

### Filtering and Sorting Products

Displaying products is one thing, but from an e-commerce application, you'd expect more like filtering and sorting those products. All of this can be done from the Saleor GraphQL API, and you don't even have to add additional API calls to the React application. By changing the query to retrieve the latest products a little, we can add both filtering and sorting to the application with little effort.

Let's start with adding [filtering]https://docs.saleor.io/docs/developer/products/#filtering, the Saleor API lets you for example filter by keyword, price, and stock availability.

For this example we'll be adding a search filter, which you can try out by going to the GraphQL Playgroud and enter the following query:

```graphql
query getLatestProducts {
  products(first: 5, filter: { search: "juice" }) {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
```

This query will not just retrieve the 5 latest products but retrieves the 5 latest products that contain the word "juice" it either its `name` or `description`.

From our React application we're able to add this search filter by changing the `getLatestProducts` query so it will take a variable called `keyword` and use it as value for the parameter that adds the search filter:

```graphql
# src/getLatestProducts.graphql
query getLatestProducts($keyword: String) {
  products(first: 5, filter: { search: $keyword }) {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
```

After which you can add this variable to the `useQuery` Hook, and use a default prop that we set on the `Product` component as its value. Also, don't forget to set the type of props for this component:

```tsx
// src/Products.tsx

type ProductsProps = {
  keyword?: string;
};

function Products({ keyword = 'juice' }: ProductsProps) {
  const { loading, error, data } = useQuery<LatestProducts>(getLatestProducts, {
    variables: {
      keyword,
    },
  });

  // ...
```

The prop `keyword` is now passed to the `useQuery` Hook and used as a variable for the query that retrieves our latest products. As this variable gets its value from the props for the `Product` component, which has "juice" as a default value, the application that runs at [http://localhost:3000/](http://localhost:3000/) is now showing 5 products related to juice.

Of course, you want to set this value dynamically, so let's create a search bar in the `App` component and use its input to retrieve the latest products:

```tsx
// src/App.tsx
import { useState } from 'react';
import Products from './Products';
import SearchBar from './SearchBar';

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <header>
        <h1>Saleor React Application</h1>
      </header>
      <SearchBar setKeyword={setKeyword} />
      <Products keyword={keyword} />
    </div>
  );
}

export default App;
```

The value for `keyword` is here put in a local state variable, using the `useState` Hook from React. The `useState` Hook returns both the local state variable, which is passed as a prop to the `Products` component and a function to update that variable. This function is passed as a prop to a new component called `SearchBar` that has the following content:

```tsx
// src/SearchBar.tsx
import { Dispatch, SetStateAction, useState } from 'react';

type SearchBarProps = {
  setKeyword: Dispatch<SetStateAction<string>>;
};

function SearchBar({ setKeyword }: SearchBarProps) {
  const [value, setValue] = useState('');

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();

    setKeyword(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Search:
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
}

export default SearchBar;
```

In the `SearchBar` component above a form is being rendered, where the `input` element is a so-called [controlled component](https://reactjs.org/docs/forms.html). This controlled component maintains its state is updated every time the user changes the value of the input field. When the user submits the form the value of that input field will be passed to the `setKeyword` function that was passed as a prop.

/_ Insert Application Image _/

From opening the application in the browser you can now see there's a search bar added, which updates the lists of products that are displayed if you enter a keyword and submit the form.

Something similar could be applied for [sorting](https://docs.saleor.io/docs/developer/products/#sorting) the products. The Saleor API also has these capabilities built-in, for example to sort by title or price.

## Using GraphQL Code Generator to autogenerate type-safe components

We build this React application using TypeScript, which adds enormous value as having a type-safe application reduces the number of potential bugs you ship to your customers. But as you saw in the earlier sections, adding these type definitions is time-consuming and requires you to check the shape of the GraphQL response.

With [GraphQL Code Generator](https://graphql-code-generator.com/docs/getting-started/index) we can create type-safe code based on our schema automatically. This means you no longer have to write the type definitions yourself but can have the library do this for you.

To install this library, execute the following command:

```bash
yarn add -D @graphql-codegen/cli
```

This installs the CLI, which you can use to generate the TypeScript types and code. To start the CLI you can run the following:

```bash
yarn graphql-codegen init
```


By default the CLI expects you to use React with Apollo, and you can answer the questions with the following answers (all default):

/_ Image of CLI answers _/

The CLI now takes the schema from the Saleor GraphQL API to create type-safe components based on both the schema and the operations defined in the `.graphql` files in the project. By running:

```bash
yarn && yarn generate
```

The libraries that GraphQL Code Generator needs are installed and the type-safe components are created in `src/generated/graphql.tsx`. In this file, types are created, but also type-safe Hooks for Apollo Client. You can import these in the `Products` component, which allows you to delete all the custom type definitions for Apollo Client and the import of the `.graphql` file:

```tsx
// src/Products.tsx
import { useGetLatestProductsQuery } from './generated/graphql';

type ProductsProps = {
  keyword?: string;
};

function Products({ keyword = 'juice' }: ProductsProps) {
  const { loading, error, data } = useGetLatestProductsQuery({
    variables: {
      keyword,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    const latestProducts = data.products?.edges || [];

    return (
      <div>
        {latestProducts?.length > 0 &&
          latestProducts.map(({ node: { id, name, description } }) => (
            <div key={id}>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          ))}
      </div>
    );
  }

  return null;
}

export default Products;
```

In our local React application nothing visual has changed, but we did have added a lot of type-safety to our application. This is best demonstrated by adding a new field to the `getLatestProducts`, namely the name of the products' category:

```graphql
# src/getLatestProducts.graphql
query getLatestProducts($keyword: String) {
  products(first: 5, filter: { search: $keyword }) {
    edges {
      node {
        id
        name
        description
        category {
            name
        }
      }
    }
  }
}
```

The `name` of the category is nested within the `category` object, and to display it in our React application we need to make a couple of small changes to the `Product` component:

```tsx
// src/Products.tsx

// ...

    return (
      <div>
        {latestProducts?.length > 0 &&
          latestProducts.map(({ node: { id, name, description, category } }) => (
            <div key={id}>
              <h3>{name}</h3>
              <p>{description}</p>
              <p>{category?.name}</p>
            </div>
          ))}
      </div>
    );
  }

  return null;
}

export default Products;
```

However, we won't be able to compile our React application anymore as these fields aren't typed yet. Previously we were able to add these types ourselves when we added new fields to the query, but with GraphQL Code Generator we can just run the `generate` script again and the types will automatically be added.

## Conclusion

We have now created a basic type-safe React application with TypeScript that uses the Saleor GraphQL API. With this API we can create e-commerce applications quickly, and add important features like filtering and sorting. Please check out the documentation on the [Saleor website](https://docs.saleor.io/docs/developer) to learn more about the API and start building your application on top of it.