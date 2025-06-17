import AuthorizeNet from "authorizenet";

import { z } from "zod";
import { AuthorizeNetResponseValidationError } from "../authorize-net-error";
import { AuthorizeNetClient, baseAuthorizeObjectSchema } from "./authorize-net-client";

const ApiContracts = AuthorizeNet.APIContracts;
const ApiControllers = AuthorizeNet.APIControllers;

const getTransactionDetailsSchema = baseAuthorizeObjectSchema.and(
  z.object({
    transaction: z.object({
      transId: z.string().min(1),
      transactionStatus: z.string().min(1),
      authAmount: z.number(),
      responseReasonDescription: z.string().min(1),
      submitTimeLocal: z.string().min(1),
      order: z
        .object({
          description: z.string().min(1),
        })
        .optional(),
    }),
  }),
);

export type GetTransactionDetailsResponse = z.infer<typeof getTransactionDetailsSchema>;

const AuthorizeGetTransactionDetailsResponseError = AuthorizeNetResponseValidationError.subclass(
  "AuthorizeGetTransactionDetailsResponseError",
);

export class TransactionDetailsClient extends AuthorizeNetClient {
  async getTransactionDetails({
    transactionId,
  }: {
    transactionId: string;
  }): Promise<GetTransactionDetailsResponse> {
    const createRequest = new ApiContracts.GetTransactionDetailsRequest();
    createRequest.setMerchantAuthentication(this.merchantAuthenticationType);
    createRequest.setTransId(transactionId);

    const transactionController = new ApiControllers.GetTransactionDetailsController(
      createRequest.getJSON(),
    );

    transactionController.setEnvironment(this.getEnvironment());

    return new Promise((resolve, reject) => {
      transactionController.execute(() => {
        try {
          // eslint disabled because of insufficient types
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const apiResponse = transactionController.getResponse();
          const response = new ApiContracts.GetTransactionDetailsResponse(apiResponse);
          this.logger.trace({ response }, "getTransactionDetails response");
          const parseResult = getTransactionDetailsSchema.safeParse(response);

          if (!parseResult.success) {
            throw new AuthorizeGetTransactionDetailsResponseError(
              "The response from Authorize.net GetTransactionDetails did not match the expected schema",
              { cause: parseResult.error },
            );
          }

          const parsedResponse = parseResult.data;
          this.resolveResponseErrors(parsedResponse);

          resolve(parsedResponse);
        } catch (error) {
          if (error instanceof z.ZodError) {
            reject(error.format());
          }
          reject(error);
        }
      });
    });
  }
}
