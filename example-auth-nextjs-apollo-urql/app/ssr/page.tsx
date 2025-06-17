import Image from "next/image";
import { UserCard } from "@/components/UserCard";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { getNextServerCookiesStorage } from "@saleor/auth-sdk/next/server";
import { saleorApiUrl } from "@/lib";

const getServerAuthClient = () => {
  const nextServerCookiesStorage = getNextServerCookiesStorage();
  return createSaleorAuthClient({
    saleorApiUrl,
    refreshTokenStorage: nextServerCookiesStorage,
    accessTokenStorage: nextServerCookiesStorage,
  });
};

const CurrentUserDocument = /* graphql */ `
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

export default async function PageSSR() {
  const { data } = await getServerAuthClient()
    .fetchWithAuth(saleorApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: CurrentUserDocument }),
      cache: "no-store",
    })
    .then((res) => res.json());

  return (
    <>
      <div className="rounded mb-8 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div>This example shows how to use Saleor Auth SDK with Next.js 13+ (App Dir).</div>
      </div>
      {data?.me ? (
        <>
          <UserCard {...data.me} />
          <form
            action={async () => {
              "use server";

              getServerAuthClient().signOut();
            }}
          >
            <button
              className="bg-slate-800 text-slate-200 hover:bg-slate-700 rounded py-2 px-4"
              type="submit"
            >
              Log Out
            </button>
          </form>
        </>
      ) : (
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-10 flex justify-center">
            <Image src={`/saleor.png`} alt="Saleor" width={75} height={75} />
          </div>
          <form
            className="bg-white shadow-md rounded p-8"
            action={async (formData) => {
              "use server";
              const email = formData.get("email");
              const password = formData.get("password");
              if (!email || !password) {
                throw new Error("Email and password are required");
              }

              await getServerAuthClient().signIn(
                {
                  email: email.toString(),
                  password: password.toString(),
                },
                { cache: "no-store" },
              );
            }}
          >
            <div className="mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border rounded bg-gray-50 px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded bg-gray-50 px-4 py-2 w-full"
              />
            </div>

            <button
              className="bg-slate-800 text-slate-200 hover:bg-slate-700 rounded py-2 px-4"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      )}
    </>
  );
}
