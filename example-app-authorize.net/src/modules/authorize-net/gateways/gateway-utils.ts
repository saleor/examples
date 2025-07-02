import { z } from "zod";

const createGatewayDataSchema = <TName extends string, TData extends z.ZodTypeAny>(
  gatewayName: TName,
  data: TData,
) => {
  return z.object({
    type: z.literal(gatewayName),
    data,
  });
};

export const gatewayUtils = {
  createGatewayDataSchema,
};
