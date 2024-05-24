import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            bookCount
            born
            id
            name
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author
            genres
            id
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            published
            author
            genres
            id
        }
    }
`;
