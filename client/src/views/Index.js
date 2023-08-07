import React, { useState } from "react";
import { useQuery, ApolloProvider } from "@apollo/client";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Row, Col } from "reactstrap";
import SearchBar, { SEARCH_BOOKS } from "./examples/Searchbar";
import client from "../graphql";

const Index = (props) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
      <Container className="mt-3" fluid>
        <Row style={{width: "80vw !important"}}>
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
  );
};

export default Index;
