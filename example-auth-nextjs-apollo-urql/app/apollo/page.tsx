"use client";

import React from "react";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { gql, useQuery } from "@apollo/client";
import LoginForm from "@/components/LoginForm";
import { UserCard } from "@/components/UserCard";
import { Loader } from "@/components/Loader";

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

export default function LoginPage() {
  const { signOut } = useSaleorAuthContext();

  const { data, loading } = useQuery(CurrentUserDocument);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="rounded mb-8 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div>This example shows how to use Saleor Auth SDK with Apollo Client as GraphQL client.</div>
        <div className="mt-2">
          Login form: <code className="font-mono font-bold">app/apollo/page.tsx</code>
        </div>
        <div>
          Provider configuration: <code className="font-mono font-bold">app/apollo/layout.tsx</code>
        </div>
      </div>
      {data?.me ? (
        <>
          <UserCard {...data.me} />
          <button
            onClick={() => signOut()}
            className="bg-slate-800 text-slate-200 hover:bg-slate-700 rounded py-2 px-4"
            type="button"
          >
            Log Out
          </button>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
}
