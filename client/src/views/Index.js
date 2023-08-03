import React from "react";
import { useQuery } from 'react-query';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Googlebookssearch } from '../utils/api'; // Import your API function for Google Books search

const Index = (props) => {
  const { data: bookData, isLoading, isError } = useQuery('books', () => Googlebookssearch('Harry Potter'));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  console.log(bookData);

  const bookItems = bookData.items || []; 

  return (
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Property</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {bookItems.map((book, index) => (
                    <tr key={index}>
                      <th scope="row">Title</th>
                      <td>{book.volumeInfo.title}</td>
                    </tr>
                    // Add more rows for other properties (e.g., authors, description, etc.)
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
