import React, { FormEvent } from "react";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { gql, useQuery } from "@apollo/client";

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
` 

export default function LoginPage() {
  const { signIn, signOut } = useSaleorAuthContext();

  const { data: currentUser, loading } = useQuery(CurrentUserDocument);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn({
      email: "admin@example.com",
      password: "admin",
    });

    if (result.data.tokenCreate.errors) {
      // handle errors
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (    
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {currentUser?.me ? (
        <>
          <div>Display user {JSON.stringify(currentUser)}</div>
          <button className="button" onClick={() => signOut()}>
            Log Out
          </button>
        </>
      ) : (
        <div>
          <form onSubmit={submitHandler}>
            {/* You must connect your inputs to state or use a form library such as react-hook-form */}
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="button" type="submit">
              Log In
            </button>
          </form>
        </div>
      )}
    </main>
  );
};