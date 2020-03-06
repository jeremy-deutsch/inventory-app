import React from "react";
import { gql } from "apollo-boost";
import { useQuery, QueryResult } from "react-apollo";
import { List } from "./__generated__/List";
import ListItem from "./ListItem";
import InventoryAdder from "./InventoryCreator";

export const LIST_QUERY = gql`
  query List {
    list {
      id
      value
    }
  }
`;

export default function InventoryList() {
  // we only need to fetch this once, since any mutations
  // are responsible for updating the cache
  const { data, loading, error } = useQuery<List>(LIST_QUERY);

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  let listElements: React.ReactNode;
  if (loading || !data) {
    listElements = <p>Loading...</p>;
  } else {
    listElements = data.list.map(({ id, value }) => (
      <ListItem key={id} id={id} value={value} />
    ));
  }

  return (
    <div>
      <h1>Inventory</h1>
      <InventoryAdder />
      {listElements}
    </div>
  );
}
