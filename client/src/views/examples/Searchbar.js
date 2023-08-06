import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Card, CardContent, CardMedia, Typography, TextField, Button, Grid } from "@mui/material";

const SEARCH_BOOKS = gql`
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

const SearchBar = ({ onSelectBook, onAddToReadingList, onAddToWishList }) => {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField 
          variant="outlined"
          placeholder="Search Books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          style={{ flex: 1, marginRight: '8px', color: 'white' }}
          InputProps={{
            style: {
              color: 'white',
            },
          }}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </div>
      <br />
      <Grid container spacing={4}>
        {searchResults.map((book) => (
          <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => onSelectBook(book)}
              sx={{ cursor: "pointer" }}
            >
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
                  Author: {book.authors.join(", ")}
                </Typography>
                {/* Buttons to save to Wishlist and Currently Reading */}
                <div style={{ marginTop: '16px', display: 'flex' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToWishList();
                    }}
                    sx={{ width: '50%' }} // Set a common width for both buttons
                  >
                    Save to Wishlist
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToReadingList();
                    }}
                    style={{ marginLeft: '8px', padding: '8px', fontSize: '12px' }} // Adjust padding and font size
                    sx={{ width: '50%' }} // Set a common width for both buttons
                  >
                    Currently Reading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchBar;