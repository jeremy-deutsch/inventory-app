import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { LIST_QUERY } from "./InventoryList";
import { AddItem, AddItemVariables } from "./__generated__/AddItem";

const ADD_MUTATION = gql`
  mutation AddItem($value: String!) {
    add(item: $value) {
      id
      value
    }
  }
`;

export default function InventoryAdder() {
  const [value, setValue] = useState("");
  const [addItem, { loading }] = useMutation<AddItem, AddItemVariables>(
    ADD_MUTATION,
    {
      // the mutation will respond with a new list, which we add to the cache
      update(cache, { data }) {
        if (data) {
          cache.writeQuery({ query: LIST_QUERY, data: { list: data.add } });
        }
      },
      onCompleted() {
        setValue("");
      }
    }
  );

  const canSubmit = !!value;

  const onSubmit = () => {
    if (!canSubmit) return;
    addItem({ variables: { value } });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      Add inventory item:{" "}
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
      />
      <button className="ma1" type="submit" disabled={loading || !canSubmit}>
        {/*
          We add an invisible "placeholder" string here so that the button is
          always at least as wide as the larger "Adding..." string
        */}
        <div className="placeholder">Adding...</div>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
