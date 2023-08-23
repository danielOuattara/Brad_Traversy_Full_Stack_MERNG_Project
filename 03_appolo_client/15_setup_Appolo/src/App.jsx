import Header from "./components/assets/Header";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: " http://localhost:5000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <h1>Hello world</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
