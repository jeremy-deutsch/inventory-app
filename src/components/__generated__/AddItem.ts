/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddItem
// ====================================================

export interface AddItem_add {
  __typename: "Item";
  id: string;
  value: string;
}

export interface AddItem {
  add: AddItem_add[];
}

export interface AddItemVariables {
  value: string;
}
