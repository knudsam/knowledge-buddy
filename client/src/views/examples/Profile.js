import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useAuth } from '../../utils/AuthContext'; 
import UserHeader from 'components/Headers/UserHeader'; 

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      _id
      username
      email
      firstName
      lastName
      address
      city
      country
      postalCode
      aboutMe
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      _id
      username
      email
      firstName
      lastName
      address
      city
      country
      postalCode
      aboutMe
    }
  }
`;

const Profile = () => {
  const { user } = useAuth();
  const { loading, data } = useQuery(GET_USER_PROFILE);
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    aboutMe: '',
  });

  useEffect(() => {
    if (data?.me) {
      setProfileData(data.me);
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateUserProfile({
        variables: {
          input: profileData,
        },
      });

      // Handle successful profile update if needed

    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  if (loading) {
    // Handle loading state
    return null;
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>
                    {profileData.username}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i id="the-info" className="ni location_pin mr-2" />
                    {profileData.aboutMe}
                  </div>
                  {/* ... Rest of the card content ... */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                {/* ... Rest of the card header ... */}
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                            id="input-username"
                            placeholder={profileData.username}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            id="input-email"
                            placeholder={profileData.email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
