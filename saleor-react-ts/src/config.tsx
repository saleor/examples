import { gql } from '@apollo/client';

export const GET_LATEST_PRODUCTS = gql`
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
`;
