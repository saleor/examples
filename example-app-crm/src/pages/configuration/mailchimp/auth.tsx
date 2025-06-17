import React from "react";
import { MailchimpAuthSection } from "../../../modules/mailchimp/auth/mailchimp-auth-section/mailchimp-auth-section";
import { NextPageWithLayoutOverwrite } from "../../_app";
import { ThemeProvider } from "@saleor/macaw-ui";
import { NoSSRWrapper } from "../../../components/NoSSRWrapper";

const MailchimpAuthPage: NextPageWithLayoutOverwrite = () => {
  return <MailchimpAuthSection />;
};

MailchimpAuthPage.overwriteLayout = (page) => (
  <NoSSRWrapper>
    <ThemeProvider>{page}</ThemeProvider>
  </NoSSRWrapper>
);

export default MailchimpAuthPage;
