import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import authService from "../../utils/auth"; 

const UserHeader = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = authService.getProfile();
        console.log(profile); // Add this line to check the decoded profile
        if (profile) {
          setUsername(profile.username);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };    
    fetchProfile();
  }, []);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Welcome!</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see your book data and make changes to your account.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
