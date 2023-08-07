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
import Logout from './Logout'; 

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
  const [readingList, setReadingList] = useState([]);
  const [wishList, setWishList] = useState([]);

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

     

    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  if (loading) {
    return null;
  }
   const handleRemoveFromReadingList = () => {
    setReadingList(readingList.filter(item => item !== profileData.username));
  };

  const handleRemoveFromWishList = () => {
    setWishList(wishList.filter(item => item !== profileData.username));
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row> 
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Reading List</h3>
              </CardHeader>
              <CardBody>
                {readingList.length === 0 ? (
                  <p>No items in the reading list.</p>
                ) : (
                  <ul>
                    {readingList.map((item, index) => (
                      <li key={index}>
                        {item}
                        <Button
                          color="danger"
                          size="sm"
                          onClick={handleRemoveFromReadingList}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
            <Card className="bg-secondary shadow mt-4">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Wish List</h3>
              </CardHeader>
              <CardBody>
                {wishList.length === 0 ? (
                  <p>No items in the wish list.</p>
                ) : (
                  <ul>
                    {wishList.map((item, index) => (
                      <li key={index}>
                        {item}
                        <Button
                          color="danger"
                          size="sm"
                          onClick={handleRemoveFromWishList}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br /> 
        <Logout />
      </Container>
    </>
  );
};

export default Profile