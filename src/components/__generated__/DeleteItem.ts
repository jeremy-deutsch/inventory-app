/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteItem
// ====================================================

export interface DeleteItem_delete {
  __typename: "Item";
  id: string;
  value: string;
}

export interface DeleteItem {
  delete: DeleteItem_delete[];
}

export interface DeleteItemVariables {
  id: string;
}
