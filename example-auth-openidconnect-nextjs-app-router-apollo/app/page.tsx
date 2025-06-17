"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { gql, useQuery } from "@apollo/client";
import { ExternalProvider } from "@saleor/auth-sdk";
import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import Link from "next/link";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_URL!;

const CurrentUserDocument = gql`
  query CurrentUser {
    me {
      id
      email
      firstName
      lastName
      avatar {
        url
        alt
      }
    }
  }
`;

export default function Home() {
  const {
    data: currentUser,
    loading: isLoadingCurrentUser,
    error: currentUserError,
  } = useQuery(CurrentUserDocument);

  const {
    authURL,
    loading: isLoadingExternalAuth,
    error: externalAuthError,
  } = useSaleorExternalAuth({
    saleorURL: saleorApiUrl,
    provider: ExternalProvider.OpenIDConnect,
    redirectURL: "http://localhost:5375/api/auth/callback",
  });

  const { signOut } = useSaleorAuthContext();

  if (isLoadingCurrentUser || isLoadingExternalAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen mx-auto w-[25%]">
        <Skeleton className="h-[100px] w-full " />
      </div>
    );
  }

  if (currentUserError || externalAuthError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold mb-4">Error logging in</h1>
        <pre className="bg-muted p-4 rounded-md overflow-auto font-mono text-sm">
          {JSON.stringify(currentUserError || externalAuthError, null, 2)}
        </pre>
      </div>
    );
  }

  if (currentUser?.me) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold mb-4">Successfully logged in</h1>
        <p>Your user information fetched from Saleor GraphQL API</p>
        <pre className="bg-muted p-4 rounded-md overflow-auto font-mono text-sm">
          {JSON.stringify(currentUser, null, 2)}
        </pre>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    );
  }

  if (authURL) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 ">
        <h1 className="text-2xl font-bold mb-4">Welcome to Saleor Auth Example</h1>
        <div>
          <p>
            Click button below to login with OIDC provider. Don&apos;t forget to check our{" "}
            <a
              href="https://docs.saleor.io/api-usage/authentication#oidc-single-sign-on-sso-flow"
              className="text-blue-500 underline"
              target="_blank"
            >
              docs
            </a>{" "}
            on how to configure Saleor auth with OIDC.
          </p>
        </div>

        <Button>
          <Link href={authURL}>Login</Link>
        </Button>
      </div>
    );
  }

  return <div>Something went wrong</div>;
}
