import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: 'YOUR_GRAPH_QL_ENDPOINT_HERE',
	}),
});

export default client;