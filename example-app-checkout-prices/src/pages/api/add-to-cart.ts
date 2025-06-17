import type { NextApiRequest, NextApiResponse } from "next";
import {
  AddLinesToCheckoutDocument,
  CheckoutDetailsFragment,
  CreateExampleCheckoutDocument,
  GetCheckoutDetailsDocument,
  GetVariantDetailsDocument,
} from "../../../generated/graphql";
import { createClient } from "../../lib/create-graphql-client";
import { getVariantPrice } from "../../lib/get-variant-price";
import { DEFAULT_CHANNEL, SALEOR_API_URL } from "../../const";
import { apl } from "../../saleor-app";

type SuccessfulResponse = {
  checkout: CheckoutDetailsFragment;
};

type ErrorResponse = {
  errorMessage: string;
};

export type AddToCartResponseData = SuccessfulResponse | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddToCartResponseData>
) {
  console.info("Add to cart has been called");

  // Validation of incoming data
  const variantId = req.body.variantId as string;

  if (!variantId) {
    console.error("Variant Id has not been specified");
    return res.status(400).json({ errorMessage: "variantId has not been provided" });
  }

  const quantity = req.body.quantity;

  if (!quantity) {
    console.error("Quantity has not been specified");
    return res.status(400).json({ errorMessage: "quantity has not been provided" });
  }

  const checkoutId = req.body.checkoutId as string | undefined;

  console.debug("Incoming data has been validated");

  const client = createClient(SALEOR_API_URL, async () => {
    const authData = await apl.get(SALEOR_API_URL);
    if (!authData) {
      throw new Error("No auth data found. Is the app installed?");
    }
    return Promise.resolve({ token: authData.token });
  });

  console.debug(`Getting details for variant ${variantId}`);

  // Getting variant data
  const variantQuery = await client
    .query(GetVariantDetailsDocument, { channel: DEFAULT_CHANNEL, id: variantId })
    .toPromise();

  if (variantQuery.error) {
    console.error("Error while getting variant details");
    console.error(variantQuery.error);
    return res.status(400).json({
      errorMessage: `Could not pull data for variant ${variantId}. Error: ${variantQuery.error.message}`,
    });
  }

  const productVariant = variantQuery.data?.productVariant;

  if (!productVariant) {
    console.error(`Product variant ${variantId} not found`);
    return res.status(400).json({ errorMessage: "Product variant not found" });
  }

  if (!checkoutId) {
    console.log("No checkout id provided - create a new checkout");

    // Calculate price based on amount of items which will be added to the cart
    const price = getVariantPrice(
      quantity,
      productVariant.quantityPricing,
      productVariant.pricing?.price?.gross.amount
    );

    const createCheckoutMutation = await client
      .mutation(CreateExampleCheckoutDocument, {
        input: {
          channel: DEFAULT_CHANNEL,
          lines: [
            {
              quantity,
              variantId,
              price,
            },
          ],
        },
      })
      .toPromise();

    if (createCheckoutMutation.error) {
      console.error(createCheckoutMutation.error);
      return res.status(400).json({
        errorMessage: `Could not create a new checkout. Error: ${createCheckoutMutation.error.message}`,
      });
    }

    const checkout = createCheckoutMutation.data?.checkoutCreate?.checkout;

    if (!checkout) {
      console.error("Checkout has not been created");
      return res.status(400).json({
        errorMessage: "Checkout has not been created",
      });
    }

    return res.status(200).json({
      checkout,
    });
  }

  console.log("Add to the existing checkout");

  const checkoutQuery = await client
    .query(GetCheckoutDetailsDocument, {
      id: checkoutId,
    })
    .toPromise();

  if (checkoutQuery.error) {
    console.error(checkoutQuery.error);
    return res.status(400).json({
      errorMessage: `Could not get checkout details. Error: ${checkoutQuery.error.message}`,
    });
  }

  const checkout = checkoutQuery.data?.checkout;

  if (!checkout) {
    console.error("Checkout has not been found");
    return res.status(400).json({
      errorMessage: "Checkout has not been found",
    });
  }

  // check if the variant is already in the cart
  const existingLine = checkoutQuery.data?.checkout?.lines.find(
    (line) => line.variant.id === variantId
  );

  // Add to cart operation will override existing price. That's why we need to calculate it using sum of existing and new quantity
  const combinedQuantity = existingLine ? existingLine.quantity + quantity : quantity;

  const price = getVariantPrice(
    combinedQuantity,
    productVariant.quantityPricing,
    productVariant.pricing?.price?.gross.amount
  );

  const addLinesMutation = await client
    .mutation(AddLinesToCheckoutDocument, {
      id: checkoutId,
      lines: [
        {
          quantity,
          variantId,
          price,
        },
      ],
    })
    .toPromise();

  if (addLinesMutation.error) {
    console.error(checkoutQuery.error);
    return res.status(400).json({
      errorMessage: `Could not get checkout details. Error: ${addLinesMutation.error.message}`,
    });
  }

  const updatedCheckout = addLinesMutation.data?.checkoutLinesAdd?.checkout;

  if (!updatedCheckout) {
    console.error("Adding lines to checkout has failed");
    return res.status(400).json({
      errorMessage: "Adding lines to checkout has failed",
    });
  }

  res.status(200).json({
    checkout: updatedCheckout,
  });
}
