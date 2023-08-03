import React, { useState } from "react";
import { useQuery, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Row, Col } from "reactstrap";
import SearchBar, { SEARCH_BOOKS } from "./examples/Searchbar";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Update with your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

const Index = (props) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <ApolloProvider client={client}>
      <Container className="mt-3" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <SearchBar onSelectBook={setSelectedBook} />
          </Col>
        </Row>
        <Row>
          {selectedBook && (
            <Col>
              <Card>
                <CardImg top src={selectedBook.image} alt={selectedBook.title} />
                <CardBody>
                  <CardTitle tag="h5">{selectedBook.title}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Authors: {selectedBook.authors.join(", ")}</CardSubtitle>
                  <CardText>{selectedBook.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </ApolloProvider>
  );
};

export default Index;
