import AuthorizeNet from "authorizenet";
import { z } from "zod";
import { AuthorizeNetResponseValidationError } from "../authorize-net-error";
import { AuthorizeNetClient, baseAuthorizeObjectSchema } from "./authorize-net-client";
import { type UserWithEmailFragment } from "generated/graphql";

const ApiContracts = AuthorizeNet.APIContracts;
const ApiControllers = AuthorizeNet.APIControllers;

const createCustomerProfileSchema = baseAuthorizeObjectSchema.and(
  z.object({
    customerProfileId: z.string().min(1),
  }),
);

type CreateCustomerProfileResponse = z.infer<typeof createCustomerProfileSchema>;

const getCustomerProfileSchema = baseAuthorizeObjectSchema.and(
  z.object({
    profile: z.object({
      customerProfileId: z.string().min(1),
    }),
  }),
);

const AuthorizeCreateCustomerProfileResponseError = AuthorizeNetResponseValidationError.subclass(
  "AuthorizeCreateCustomerProfileResponseError",
);

const AuthorizeGetCustomerProfileResponseError = AuthorizeNetResponseValidationError.subclass(
  "AuthorizeGetCustomerProfileResponseError",
);

type GetCustomerProfileResponse = z.infer<typeof getCustomerProfileSchema>;

export class CustomerProfileClient extends AuthorizeNetClient {
  createCustomerProfile({
    user,
  }: {
    user: UserWithEmailFragment;
  }): Promise<CreateCustomerProfileResponse> {
    const createRequest = new ApiContracts.CreateCustomerProfileRequest();
    createRequest.setMerchantAuthentication(this.merchantAuthenticationType);
    createRequest.setProfile(new ApiContracts.CustomerProfileType());

    const customerProfileType = new ApiContracts.CustomerProfileType();
    customerProfileType.setEmail(user.email);
    // @todo we should set `MerchantCustomerId` on customerProfile but unfortunately Saleor user IDs are longer than 20 characters
    // and Authorize.net won't allow it

    createRequest.setProfile(customerProfileType);

    const customerProfileController = new ApiControllers.CreateCustomerProfileController(
      createRequest.getJSON(),
    );

    customerProfileController.setEnvironment(this.getEnvironment());

    return new Promise((resolve, reject) => {
      customerProfileController.execute(() => {
        try {
          const apiResponse: unknown = customerProfileController.getResponse();
          const response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);
          this.logger.trace({ response }, "createCustomerProfile response");
          const parseResult = createCustomerProfileSchema.safeParse(response);

          if (!parseResult.success) {
            throw new AuthorizeCreateCustomerProfileResponseError(
              "The response from Authorize.net CreateCustomerProfileResponse did not match the expected schema",
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
            return reject(error.format());
          }
          return reject(error);
        }
      });
    });
  }

  getCustomerProfileByUser({
    user,
  }: {
    user: UserWithEmailFragment;
  }): Promise<GetCustomerProfileResponse> {
    const createRequest = new ApiContracts.GetCustomerProfileRequest();
    createRequest.setMerchantAuthentication(this.merchantAuthenticationType);
    createRequest.setEmail(user.email);
    // @todo we should get customer profile by `MerchantCustomerId` but unfortunately Saleor user IDs are longer than 20 characters
    // and Authorize.net won't allow it

    const customerProfileController = new ApiControllers.GetCustomerProfileController(
      createRequest.getJSON(),
    );

    customerProfileController.setEnvironment(this.getEnvironment());

    return new Promise((resolve, reject) => {
      customerProfileController.execute(() => {
        try {
          const apiResponse: unknown = customerProfileController.getResponse();
          const response = new ApiContracts.GetCustomerProfileResponse(apiResponse);
          const parseResult = getCustomerProfileSchema.safeParse(response);

          if (!parseResult.success) {
            throw new AuthorizeGetCustomerProfileResponseError(
              "The response from Authorize.net GetCustomerProfileResponse did not match the expected schema",
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
            return reject(error.format());
          }
          return reject(error);
        }
      });
    });
  }
}
