import { Text } from "@saleor/macaw-ui/next";
import { withAuthorization } from "@saleor/app-sdk/app-bridge";
import { AppLayout } from "@/modules/ui/templates/AppLayout";
import { Breadcrumbs } from "@/modules/ui/molecules/Breadcrumbs/Breadcrumbs";
import { ConfigurationForm } from "@/modules/ui/organisms/AddConfigurationForm/AddConfigurationForm";

const AddConfigurationPage = () => {
  return (
    <AppLayout
      title={
        <Breadcrumbs
          breadcrumbs={[
            { text: "Sequra", link: "/configurations/list" },
            { text: "Add Configuration" },
          ]}
        />
      }
      description={
        <>
          <Text as="p" variant="body" size="medium">
            Create new Sequra configuration.
          </Text>
        </>
      }
    >
      <ConfigurationForm configurationId={undefined} />
    </AppLayout>
  );
};

export default withAuthorization()(AddConfigurationPage);
