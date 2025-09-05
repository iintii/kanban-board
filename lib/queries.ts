import { gql } from "@apollo/client";

export const SUBSCRIBE_BOARDS = gql`
  subscription SubscribeBoards {
    boards(order_by: { created_at: desc }) {
      id
      title
      created_at
    }
  }
`;

export const SUBSCRIBE_COLUMNS_BY_BOARD = gql`
  subscription SubscribeColumnsByBoard($boardId: String!) {
    columns(
      where: { board_id: { _eq: $boardId } }
      order_by: { position: asc }
    ) {
      id
      title
      position
      board_id
    }
  }
`;

export const SUBSCRIBE_CARDS_BY_BOARD = gql`
  subscription SubscribeCardsByBoard($boardId: String!) {
    cards(where: { board_id: { _eq: $boardId } }, order_by: { position: asc }) {
      id
      title
      description
      columnId: column_id
      board_id
      position
    }
  }
`;

export const SUBSCRIBE_BOARD = gql`
  subscription SubscribeBoard($boardId: String!) {
    boards_by_pk(id: $boardId) {
      id
      title
      created_at
    }
  }
`;

export const INSERT_CARD = gql`
  mutation InsertCard(
    $id: String!
    $title: String!
    $description: String
    $column_id: String!
    $board_id: String!
    $position: float8!
  ) {
    insert_cards_one(
      object: {
        id: $id
        title: $title
        description: $description
        column_id: $column_id
        board_id: $board_id
        position: $position
      }
    ) {
      id
      title
      description
      columnId: column_id
      position
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: String!) {
    delete_cards_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: String!, $column_id: String!, $position: float8!) {
    update_cards_by_pk(
      pk_columns: { id: $id }
      _set: { column_id: $column_id, position: $position }
    ) {
      id
      columnId: column_id
      position
    }
  }
`;

export const INSERT_BOARD = gql`
  mutation InsertBoard($id: String!, $title: String!) {
    insert_boards_one(object: { id: $id, title: $title }) {
      id
      title
      created_at
    }
  }
`;

export const INSERT_COLUMN = gql`
  mutation InsertColumn(
    $id: String!
    $title: String!
    $position: float8!
    $board_id: String!
  ) {
    insert_columns_one(
      object: {
        id: $id
        title: $title
        position: $position
        board_id: $board_id
      }
    ) {
      id
      title
      position
      board_id
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: String!) {
    delete_boards_by_pk(id: $id) {
      id
    }
  }
`;
