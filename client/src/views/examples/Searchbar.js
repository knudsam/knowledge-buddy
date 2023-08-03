import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Card, CardContent, CardMedia, Typography, TextField, Button, Grid } from "@mui/material";

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

const SearchBar = ({ onSelectBook }) => {
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
      <TextField
        variant="outlined"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      <Grid container spacing={4}>
        {searchResults.map((book) => (
          <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => onSelectBook(book)} sx={{ cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="140"
                image={book.image}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Authors: {book.authors.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchBar;
