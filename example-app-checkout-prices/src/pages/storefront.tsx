import { useMutation, useQuery } from "@tanstack/react-query";
import { createClient, fetchExchange } from "urql";
import {
  CheckoutDetailsFragment,
  GetFirstVariantsDocument,
  VariantDetailsFragment,
} from "../../generated/graphql";
import { useState } from "react";
import { getVariantPrice } from "../lib/get-variant-price";
import { AddToCartResponseData } from "./api/add-to-cart";
import { formatPrice } from "../lib/format-price";
import { DEFAULT_CHANNEL, SALEOR_API_URL } from "../const";

const getVariants = () => {
  const client = createClient({
    url: SALEOR_API_URL,
    exchanges: [fetchExchange],
  });
  return client.query(GetFirstVariantsDocument, { channel: DEFAULT_CHANNEL }).toPromise();
};

const CheckoutDetails = ({ checkout }: { checkout: CheckoutDetailsFragment }) => {
  return (
    <div>
      <h3>Checkout</h3>
      <p>ID: {checkout.id}</p>
      <p>Lines:</p>

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Variant</th>
            <th style={{ textAlign: "right" }}>Quantity</th>
            <th style={{ textAlign: "right" }}>Price</th>
            <th style={{ textAlign: "right" }}>Line total</th>
          </tr>
        </thead>
        <tbody>
          {checkout.lines?.map((line) => (
            <tr key={line.id}>
              <td style={{ textAlign: "left", paddingRight: 40 }}>
                {line.variant.product.name} - {line.variant.name}
              </td>
              <td style={{ textAlign: "right" }}>{line.quantity}</td>
              <td style={{ textAlign: "right", paddingLeft: 40 }}>
                {formatPrice(line.unitPrice.gross.amount)}
              </td>
              <td style={{ textAlign: "right", paddingLeft: 40 }}>
                {formatPrice(line.totalPrice?.gross.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Checkout subtotal: {formatPrice(checkout.subtotalPrice.gross.amount)}</p>
    </div>
  );
};

interface VariantDetailsProps {
  checkoutId: string | undefined;
  variant: VariantDetailsFragment;
  setCheckout: (checkout: CheckoutDetailsFragment | undefined) => void;
}

const VariantDetails = ({ checkoutId, variant, setCheckout }: VariantDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const addButtonLabel = checkoutId ? "Add another item" : "Create new checkout and add the item";

  const checkoutMutation = useMutation({
    mutationFn: ({
      variantId,
      quantity,
      checkoutId,
    }: {
      variantId: string;
      quantity: number;
      checkoutId: string | undefined;
    }) => {
      return fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantId, quantity, checkoutId }),
      });
    },
    onSuccess: async (data) => {
      const responseData = (await data.json()) as AddToCartResponseData;
      if ("checkout" in responseData) {
        console.info("Add to cart succeeded");
        setCheckout(responseData.checkout);
      }
    },
    onError: (error) => {
      console.error("Adding to cart operation has failed");
      console.error(error);
      setCheckout(undefined);
    },
  });

  return (
    <>
      <h2>Product details</h2>
      <h3>
        {variant.product.name} - {variant.name}
      </h3>

      {variant.quantityPricing ? (
        <p>The item has specified quantity based pricing: {variant.quantityPricing}</p>
      ) : (
        <p>The item has no quantity based pricing</p>
      )}

      <label htmlFor="Quantity">Quantity:</label>

      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        max="10000"
        value={quantity}
        onChange={(x) => setQuantity(parseInt(x.target.value, 10))}
      />

      <p>
        Price (including quantity pricing):{" "}
        {formatPrice(
          getVariantPrice(quantity, variant.quantityPricing, variant.pricing?.price?.gross.amount)
        )}
      </p>

      <p>Base price: {formatPrice(variant.pricing?.price?.gross.amount)}</p>

      <button
        disabled={checkoutMutation.isLoading}
        onClick={() =>
          checkoutMutation.mutate({
            quantity,
            variantId: variant.id,
            checkoutId: checkoutId,
          })
        }
      >
        {addButtonLabel}
      </button>
    </>
  );
};

const StorefrontPage = () => {
  const { data } = useQuery({ queryKey: ["variants"], queryFn: getVariants });
  const [chosenVariantId, setVariantId] = useState<undefined | string>();
  const [checkout, setCheckout] = useState<CheckoutDetailsFragment | undefined>();

  const variants = data?.data?.productVariants?.edges.map((variant) => variant.node) || [];
  const chosenVariant = variants.find((variant) => variant.id === chosenVariantId);

  return (
    <>
      <h1>Custom pricing based on the metadata</h1>
      <h2>First variants from the shop:</h2>
      <ul>
        {variants.map((variant) => (
          <li key={variant.id}>
            <button
              onClick={() => setVariantId(variant.id)}
              disabled={variant.id === chosenVariant?.id}
            >
              Choose this variant
            </button>{" "}
            {variant.product.name} - {variant.name}
          </li>
        ))}
      </ul>
      {!chosenVariant ? (
        <h2>Please choose a variant</h2>
      ) : (
        <VariantDetails
          checkoutId={checkout?.id}
          variant={chosenVariant}
          setCheckout={setCheckout}
        />
      )}

      {!!checkout && <CheckoutDetails checkout={checkout} />}
    </>
  );
};

export default StorefrontPage;
