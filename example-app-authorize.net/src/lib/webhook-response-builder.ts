import { type NextApiResponse } from "next";
import { createLogger, type Logger } from "@/lib/logger";

export class SynchronousWebhookResponseBuilder<TResponse extends object> {
  private logger: Logger;

  private getWebhookName(res: NextApiResponse) {
    const path = res.req.url ?? "";
    return path.replace("/api/webhooks/", "").toLocaleLowerCase();
  }

  constructor(private res: NextApiResponse) {
    const webhookName = this.getWebhookName(res);

    this.logger = createLogger({
      name: webhookName,
    });
  }

  ok(response: TResponse) {
    this.res.status(200).json(response);
  }

  internalServerError(error: Error) {
    this.res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
}
