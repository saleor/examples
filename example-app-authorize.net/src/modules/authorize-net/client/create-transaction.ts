import AuthorizeNet from "authorizenet";

import { z } from "zod";
import { AuthorizeNetResponseValidationError } from "../authorize-net-error";
import { AuthorizeNetClient, baseAuthorizeObjectSchema } from "./authorize-net-client";

const ApiContracts = AuthorizeNet.APIContracts;
const ApiControllers = AuthorizeNet.APIControllers;

const createTransactionSchema = baseAuthorizeObjectSchema.and(
  z.object({
    transactionResponse: z.object({
      transId: z.string().min(1),
    }),
  }),
);

const AuthorizeCreateTransactionResponseError = AuthorizeNetResponseValidationError.subclass(
  "AuthorizeCreateTransactionResponseError",
);

export type CreateTransactionResponse = z.infer<typeof createTransactionSchema>;

export class CreateTransactionClient extends AuthorizeNetClient {
  async createTransaction(
    transactionInput: AuthorizeNet.APIContracts.TransactionRequestType,
  ): Promise<CreateTransactionResponse> {
    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(this.merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionInput);

    const transactionController = new ApiControllers.CreateTransactionController(
      createRequest.getJSON(),
    );

    transactionController.setEnvironment(this.getEnvironment());

    return new Promise((resolve, reject) => {
      transactionController.execute(() => {
        try {
          // eslint disabled because of insufficient types
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const apiResponse = transactionController.getResponse();
          const response = new ApiContracts.CreateTransactionResponse(apiResponse);

          this.logger.trace({ response }, "CreateTransactionResponse");
          const parseResult = createTransactionSchema.safeParse(response);

          if (!parseResult.success) {
            throw new AuthorizeCreateTransactionResponseError(
              "The response from Authorize.net CreateTransaction did not match the expected schema",
              {
                errors: parseResult.error.errors,
              },
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
