import { type NextPage } from "next";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box, Button, Text } from "@saleor/macaw-ui/next";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { FormInput } from "@/modules/ui/atoms/macaw-ui/FormInput";

const schema = z
  .object({
    saleorUrl: z.string().url(),
  })
  .required();
type FormValues = z.infer<typeof schema>;

const AddToSaleorForm = () => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      saleorUrl: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form
        method="post"
        noValidate
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((values) => {
          const manifestUrl = new URL("/api/manifest", window.location.origin).toString();
          const redirectUrl = new URL(
            `/dashboard/apps/install?manifestUrl=${manifestUrl}`,
            values.saleorUrl,
          ).toString();

          window.open(redirectUrl, "_blank");
        })}
      >
        <Box display="flex" flexDirection="column" gap={2} marginTop={10}>
          <FormInput
            inputMode="url"
            label="Saleor URL"
            required
            name="saleorUrl"
            size="medium"
            placeholder="https://…"
            error={!!errors.saleorUrl}
            helperText={errors.saleorUrl?.message || " "}
            control={control}
          />
          <Button type="submit" size="large" disabled={isSubmitting}>
            Add to Saleor
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

const CopyManifest = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsetCopied = () => {
      setCopied(false);
    };

    if (copied) {
      setTimeout(unsetCopied, 1750);
    }
  }, [copied]);

  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.origin + "/api/manifest");
    setCopied(true);
  };

  return (
    <Button variant="secondary" onClick={() => void handleClick()}>
      {copied ? "Copied" : "Copy app manifest URL"}
    </Button>
  );
};

const IndexPage: NextPage = () => {
  const { appBridgeState } = useAppBridge();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (appBridgeState?.ready && mounted) {
    void router.replace("/configurations/list");
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} __maxWidth="45rem">
      <Text as="h1" size="large" variant="hero">
        Welcome to Payment App Sequra 💰
      </Text>
      <Text as="p" size="large" variant="title">
        Simplify your payment process and offer a seamless online shopping experience with Sequra
        payment integration for Saleor.
      </Text>

      {!appBridgeState?.ready && (
        <div>
          <Text as="p" size="large" variant="bodyStrong">
            Install this app in your Saleor Dashboard to proceed!
          </Text>
          {mounted && <AddToSaleorForm />}
        </div>
      )}

      <CopyManifest />
    </Box>
  );
};

export default IndexPage;
