import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; 
import { useAuth } from '../../utils/AuthContext'; 

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const [wishlistcount, setWishlistCount] = useState([]); 

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const result = await registerUser({
        variables: { username, email, password },
      });
  
      console.log('Mutation Result:', result);
  
      const token = result.data?.addUser?.token;
  
      if (token) {
        // Decode the token manually to get the username
        const decodedToken = jwt_decode(token);
        const usernameFromToken = decodedToken.user.username;
        const wishlistCount = decodedToken.user.wishlistCount; // Use the correct field name
  
        // Set the username and log in
        setUsername(usernameFromToken);
        setWishlistCount(wishlistCount); // Set the wishlist count
  
        login(token);
  
        navigate('/admin/index');
      } else {
        console.error('Registration error:', result);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };  

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-4">
            <small>Sign up with</small>
          </div>
          {/* ... */}
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Or sign up with credentials</small>
          </div>
          <Form role="form">
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-muted font-italic">
              <small>
                password strength:{" "}
                <span className="text-success font-weight-700">strong</span>
              </small>
            </div>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  {/* ... */}
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="button" onClick={handleRegister}>
                Create account
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
