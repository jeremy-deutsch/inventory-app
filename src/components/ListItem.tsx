import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { LIST_QUERY } from "./InventoryList";
import { DeleteItem, DeleteItemVariables } from "./__generated__/DeleteItem";

const DELETE_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    delete(id: $id) {
      id
      value
    }
  }
`;

interface Props {
  id: string;
  value: string;
}

export default function ListItem(props: Props) {
  const [deleteItem, { loading }] = useMutation<
    DeleteItem,
    DeleteItemVariables
  >(DELETE_MUTATION, {
    // the mutation will respond with a new list, which we add to the cache
    update(cache, { data }) {
      if (data) {
        cache.writeQuery({ query: LIST_QUERY, data: { list: data.delete } });
      }
    }
  });

  let outerClassname = "flex items-center f4 hover-bg-black-10";
  if (loading) {
    // add opacity if the item is being deleted
    outerClassname += " o-50";
  }

  return (
    <p className={outerClassname}>
      <a
        role="button"
        href="#delete"
        className="f6 no-underline pa1"
        onClick={() => {
          if (!loading) {
            deleteItem({ variables: { id: props.id } });
          }
        }}
      >
        ❌
      </a>
      {props.value}
    </p>
  );
}
