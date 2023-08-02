import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

const Index = (props) => {
  return (
    <>
      {/* Page content */}
      <Container className="mt-3" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Item Properties
                        </h6>
                        <h2 className="mb-0">Product Name</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Your item properties content goes here */}
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Property</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Property 1</th>
                          <td>Value 1</td>
                        </tr>
                        <tr>
                          <th scope="row">Property 2</th>
                          <td>Value 2</td>
                        </tr>
                        {/* Add more property rows as needed */}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
