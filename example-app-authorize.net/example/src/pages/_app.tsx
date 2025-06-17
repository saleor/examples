import { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import "../global.css";
import Banner from "../ui/components/Banner";

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_SALEOR_API_URL,
});

export const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<Banner />
			<section className="mx-auto max-w-2xl px-8 py-12 lg:max-w-7xl">
				<Component {...pageProps} />
			</section>
		</ApolloProvider>
	);
}
