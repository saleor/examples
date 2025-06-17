import { CriticalError, ExpectedError } from "../../error";

// Error thrown when there is not enough data in webhook payload to proceed with the process. Not reported.
export const TaxIncompleteWebhookPayloadError = ExpectedError.subclass(
  "TaxIncompleteWebhookPayloadError"
);

// Error thrown when expected data is not present in the payload.
export const TaxBadPayloadError = CriticalError.subclass("TaxBadPayloadError", {
  props: {
    expected: false,
  },
});

// Error thrown when expected data is not present in the response.
export const TaxBadProviderResponseError = CriticalError.subclass(
  "TaxBadProviderResponseError",
  {
    props: {
      expected: false,
    },
  }
);

// Error thrown by external service.
export const TaxExternalError = CriticalError.subclass("TaxExternalError", {
  props: {
    expected: false,
  },
});
