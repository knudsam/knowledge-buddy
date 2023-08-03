import React from "react";
import { useQuery, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import SearchBar, { SEARCH_BOOKS } from "./examples/Searchbar";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Update with your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

const Index = (props) => {
  return (
    <ApolloProvider client={client}>
      <Container className="mt-3" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Book Properties
                    </h6>
                    <h2 className="mb-0">Book Details</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <SearchBar />
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Property</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render your book data here */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
};

export default Index;
