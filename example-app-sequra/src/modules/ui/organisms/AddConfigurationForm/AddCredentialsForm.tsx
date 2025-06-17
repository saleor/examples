import { Button, Box } from "@saleor/macaw-ui/next";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { useRouter } from "next/router";
import { RoundedBoxWithFooter } from "../../atoms/RoundedActionBox/RoundedActionBox";
import { FormInput } from "@/modules/ui/atoms/macaw-ui/FormInput";
import { trpcClient } from "@/modules/trpc/trpc-client";
import { getErrorHandler, getFieldErrorHandler, getFormFields } from "@/modules/trpc/utils";
import { invariant } from "@/lib/invariant";
import { type PaymentAppFormConfigEntry } from "@/modules/payment-app-configuration/config-entry";
import { FormSelect } from "@/modules/ui/atoms/macaw-ui/FormSelect";

const actionId = "payment-form";

export const AddCredentialsForm = ({
  configurationId,
}: {
  configurationId?: string | undefined | null;
}) => {
  const formMethods = useFormContext<PaymentAppFormConfigEntry>();
  const { appBridge } = useAppBridge();
  const router = useRouter();

  const context = trpcClient.useContext();

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { defaultValues },
  } = formMethods;

  const { data: sequraConfigurationData } =
    trpcClient.paymentAppConfigurationRouter.paymentConfig.get.useQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- query is not enabled if configurationId is missing
      { configurationId: configurationId! },
      {
        enabled: !!configurationId,
        onError: (err) => {
          getErrorHandler({
            appBridge,
            actionId,
            message: "Error while fetching initial form data",
            title: "Form error",
          })(err);
        },
      },
    );

  useEffect(() => {
    if (sequraConfigurationData) {
      reset({
        apiUrl: sequraConfigurationData.apiUrl,
        username: sequraConfigurationData.username,
        password: sequraConfigurationData.password,
        assetsKey: sequraConfigurationData.assetsKey,
        merchantId: sequraConfigurationData.merchantId,
        configurationName: sequraConfigurationData.configurationName,
      });
    }
  }, [sequraConfigurationData, reset]);

  const getOnSuccess = useCallback(
    (message: string) => {
      return () => {
        void appBridge?.dispatch({
          type: "notification",
          payload: {
            title: "Form saved",
            text: message,
            status: "success",
            actionId,
          },
        });
        void context.paymentAppConfigurationRouter.paymentConfig.invalidate();
      };
    },
    [appBridge, context.paymentAppConfigurationRouter.paymentConfig],
  );

  const onError = getFieldErrorHandler({
    appBridge,
    setError,
    actionId,
    fieldName: "root",
    formFields: getFormFields(defaultValues),
  });

  const { mutate: updateConfig } =
    trpcClient.paymentAppConfigurationRouter.paymentConfig.update.useMutation({
      onSuccess: (data) => {
        invariant(data.configurationId);
        getOnSuccess("App configuration was updated successfully")();
        return router.replace(`/configurations/edit/${data.configurationId}`);
      },
      onError,
    });
  const { mutate: addNewConfig } =
    trpcClient.paymentAppConfigurationRouter.paymentConfig.add.useMutation({
      onSuccess: async (data) => {
        invariant(data.configurationId);
        context.paymentAppConfigurationRouter.paymentConfig.get.setData(
          { configurationId: data.configurationId },
          data,
        );
        if (!configurationId) {
          await router.replace(`/configurations/edit/${data.configurationId}`);
        }
      },
      onError,
    });

  const handleConfigSave: SubmitHandler<PaymentAppFormConfigEntry> = (data) => {
    configurationId
      ? updateConfig({
          configurationId,
          entry: data,
        })
      : addNewConfig(data);
  };

  return (
    <RoundedBoxWithFooter
      as="form"
      method="POST"
      autoComplete="off"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(handleConfigSave, console.warn)}
      footer={
        <Box display="flex" flexDirection="row" columnGap={4}>
          <Button variant="primary" size="medium" type="submit">
            Save
          </Button>
        </Box>
      }
    >
      <Box paddingBottom={6} rowGap={4} display="flex" flexDirection="column" width="100%">
        <FormInput
          control={control}
          label="Configuration name"
          helperText="Enter configuration name that uniquely identifies this configuration. This name will be used later to assign configuration to Saleor Channels."
          name="configurationName"
          autoComplete="off"
          size="medium"
        />
        <FormInput
          control={control}
          autoComplete="off"
          label="Username"
          name="username"
          size="medium"
        />
        <FormInput
          control={control}
          type="password"
          autoComplete="off"
          label="Password"
          name="password"
          size="medium"
        />
        <FormInput
          control={control}
          type="password"
          autoComplete="off"
          label="Assets Key"
          name="assetsKey"
          size="medium"
        />
        <FormInput
          control={control}
          type="text"
          autoComplete="off"
          label="Merchant ID"
          name="merchantId"
          size="medium"
        />
        <FormSelect
          control={control}
          label="API URL"
          name="apiUrl"
          size="medium"
          options={[
            { label: "Playground ", value: "https://sandbox.sequrapi.com/" },
            { label: "---", value: "" },
            { label: "Production", value: "https://sequrapi.com/" },
          ]}
        />
      </Box>
    </RoundedBoxWithFooter>
  );
};
