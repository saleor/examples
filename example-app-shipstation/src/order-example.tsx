import { actions, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box, Text } from "@saleor/macaw-ui";
import gql from "graphql-tag";
import Link from "next/link";
import { ShippingMethod, useLastOrderQuery } from "../generated/graphql";

gql`
  query LastOrder {
    orders(first: 1) {
      edges {
        node {
          id
          number
          created
          deliveryMethod {
            ... on ShippingMethod {
              id
              name
            }
          }
          metadata {
            key
            value
          }
          user {
            firstName
            lastName
          }
          shippingAddress {
            streetAddress1
            postalCode
            country {
              country
            }
          }
        }
      }
    }
  }
`;

const isShippingMethod = (method: any): method is ShippingMethod =>
  method.__typename === "ShippingMethod";

const getShippingMethodName = (method: unknown) => {
  if (isShippingMethod(method)) {
    return method.name;
  }
};

export const OrderExample = () => {
  const { appBridge } = useAppBridge();

  const [{ data, fetching }] = useLastOrderQuery();
  const lastOrder = data?.orders?.edges[0]?.node;

  const navigateToOrder = (id: string) => {
    appBridge?.dispatch(
      actions.Redirect({
        to: `/orders/${id}`,
      })
    );
  };

  return (
    <Box display="flex" flexDirection={"column"} gap={2}>
      <Text as={"h2"} variant={"heading"}>
        Fetching data
      </Text>

      <>
        {fetching && <Text color="textNeutralSubdued">Fetching the last order...</Text>}
        {lastOrder && (
          <>
            <Box
              backgroundColor={"subdued"}
              padding={4}
              borderRadius={4}
              borderWidth={1}
              borderStyle={"solid"}
              borderColor={"neutralDefault"}
              marginY={4}
            >
              <Text>{`The last order #${lastOrder.number}:`}</Text>
              <ul>
                <li>
                  <Text>{`Delivered by ${getShippingMethodName(
                    lastOrder.deliveryMethod
                  )} 🚚`}</Text>
                </li>
                <li>
                  <Text>{`Ships to ${lastOrder.shippingAddress?.streetAddress1} ${lastOrder.shippingAddress?.postalCode} ${lastOrder.shippingAddress?.country.country} 📦`}</Text>
                </li>
              </ul>
              <Link onClick={() => navigateToOrder(lastOrder.id)} href={`/orders/${lastOrder.id}`}>
                See the order details →
              </Link>
            </Box>
          </>
        )}
        {!fetching && !lastOrder && <Text color="textNeutralSubdued">No orders found</Text>}
      </>
    </Box>
  );
};
