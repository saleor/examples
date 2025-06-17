import { z } from "zod";

const InputSchema = z.object({
  channelSlug: z.string().min(1),
  providerId: z.string().min(1),
});

const FullSchema = InputSchema.extend({
  id: z.string(),
});

export namespace ChannelConnection {
  export type InputShape = z.infer<typeof InputSchema>;
  export type FullShape = z.infer<typeof FullSchema>;

  export const Schema = {
    Input: InputSchema,
    Full: FullSchema,
  };
}
