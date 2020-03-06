import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import InventoryList from "./components/InventoryList";

import "tachyons";
import "./index.css";

const client = new ApolloClient({ uri: "http://localhost:4000" });

function Application() {
  return (
    <ApolloProvider client={client}>
      <InventoryList />
    </ApolloProvider>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
