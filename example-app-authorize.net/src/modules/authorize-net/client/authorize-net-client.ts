import AuthorizeNet from "authorizenet";
import { z } from "zod";
import { getAuthorizeConfig, type AuthorizeConfig } from "../authorize-net-config";
import { AuthorizeNetError } from "../authorize-net-error";
import { createLogger } from "@/lib/logger";

const ApiContracts = AuthorizeNet.APIContracts;
const SDKConstants = AuthorizeNet.Constants;

const messagesSchema = z.object({
  resultCode: z.enum(["Ok", "Error"]),
  message: z.array(
    z.object({
      code: z.string(),
      text: z.string(),
    }),
  ),
});

type ResponseMessages = z.infer<typeof messagesSchema>;

export const baseAuthorizeObjectSchema = z.object({
  messages: messagesSchema,
});

type BaseAuthorizeObjectResponse = z.infer<typeof baseAuthorizeObjectSchema>;

const AuthorizeResultCodeError = AuthorizeNetError.subclass("AuthorizeResultCodeError");

export class AuthorizeNetClient {
  merchantAuthenticationType: AuthorizeNet.APIContracts.MerchantAuthenticationType;
  logger = createLogger({
    name: "AuthorizeNetClient",
  });

  config: AuthorizeConfig;

  constructor() {
    const config = getAuthorizeConfig();

    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(config.apiLoginId);
    merchantAuthenticationType.setTransactionKey(config.transactionKey);

    this.merchantAuthenticationType = merchantAuthenticationType;
    this.config = config;
  }

  getEnvironment() {
    return SDKConstants.endpoint[this.config.environment];
  }

  private formatAuthorizeErrors(messages: ResponseMessages) {
    return messages.message
      .map(({ code, text }) => {
        return `${code}: ${text}`;
      })
      .join(", ");
  }

  resolveResponseErrors(response: BaseAuthorizeObjectResponse) {
    if (response.messages.resultCode === "Error") {
      const message = this.formatAuthorizeErrors(response.messages);

      throw new AuthorizeResultCodeError(message);
    }
  }
}
