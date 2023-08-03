import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBooks, { loading, error, data }] = useLazyQuery(SEARCH_BOOKS);

  const handleSearch = () => {
    searchBooks({
      variables: { query: searchQuery },
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error searching for books</p>;
  }

  const searchResults = data?.searchBooks || [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((book) => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
