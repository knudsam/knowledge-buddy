import React, { useState } from "react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
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

const ADD_TO_COLLECTION = gql`
  mutation AddToCollection($collection: String!, $book: BookInput!) {
    addToCollection(collection: $collection, book: $book) {
      _id
      collections {
        type
        books {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`;

const SearchBar = ({ onSelectBook }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBooks, { loading, error, data }] = useLazyQuery(SEARCH_BOOKS);
  const [addToWishlist] = useMutation(ADD_TO_COLLECTION, {
    onError: (error) => {
      console.error("Error adding to wishlist:", error);
    },
    onCompleted: (data) => {
      console.log("Added to wishlist:", data.addToCollection);
    },
  });
  const [addToCurrentlyReading] = useMutation(ADD_TO_COLLECTION, {
    onError: (error) => {
      console.error("Error adding to currently reading:", error);
    },
    onCompleted: (data) => {
      console.log("Added to currently reading:", data.addToCollection);
    },
  });

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
      <div style={{ display: 'flex', alignItems: 'center', width: "80vw" }}>
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
        <Button variant="contained" style={{padding: "15.5px 6px"}} onClick={handleSearch}>Search</Button>
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
                <div style={{ marginTop: '16px', display: 'flex' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      console.log("Adding to Wishlist:", book);
                      addToWishlist({
                        variables: { collection: 'wishlist', book: book }
                      });
                    }}
                    sx={{ width: '50%' }}
                  >
                    Save to Wishlist
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      console.log("Adding to Currently Reading:", book);
                      addToCurrentlyReading({
                        variables: { collection: 'currentlyReading', book: book }
                      });
                    }}
                    style={{ marginLeft: '8px', padding: '8px', fontSize: '12px' }}
                    sx={{ width: '50%' }}
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
