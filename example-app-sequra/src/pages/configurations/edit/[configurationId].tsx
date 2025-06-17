import { Text } from "@saleor/macaw-ui/next";
import { withAuthorization } from "@saleor/app-sdk/app-bridge";
import { useRouter } from "next/router";
import { AppLayout } from "@/modules/ui/templates/AppLayout";
import { ConfigurationForm } from "@/modules/ui/organisms/AddConfigurationForm/AddConfigurationForm";
import { Breadcrumbs } from "@/modules/ui/molecules/Breadcrumbs/Breadcrumbs";

const EditConfigurationPage = () => {
  const router = useRouter();
  if (typeof router.query.configurationId !== "string" || !router.query.configurationId) {
    // TODO: Add loading
    return <div />;
  }

  return (
    <AppLayout
      title={
        <Breadcrumbs
          breadcrumbs={[
            { text: "Sequra", link: "/configurations/list" },
            { text: "Edit Configuration" },
          ]}
        />
      }
      description={
        <>
          <Text as="p" variant="body" size="medium">
            Edit Sequra configuration.
          </Text>
        </>
      }
    >
      <ConfigurationForm configurationId={router.query.configurationId} />
    </AppLayout>
  );
};

export default withAuthorization()(EditConfigurationPage);
