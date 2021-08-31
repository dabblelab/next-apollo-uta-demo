import { ApolloClient, InMemoryCache } from "@apollo/client";
const PRODUCTION = process.env.production;
const API_URL = false ? "https://node-graphql-uta-demo.vercel.app/graphql" : "http://localhost:4000/graphql";

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    ssrMode: true
});

export default client;