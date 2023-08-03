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

import { useAuth } from '../../utils/AuthContext'; // Import useAuth from AuthContext

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const Login = () => {
  const { login } = useAuth(); // Access login function from AuthContext

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      login(data.login.user); // Call login function with user data

      // Handle successful login (e.g., redirect)
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            {/* Google and GitHub login buttons */}
            <div className="btn-wrapper text-center">
              <Button className="btn-neutral btn-icon" color="default">
                <span className="btn-inner--icon">
                  <img alt="GitHub" src={require('../../assets/img/icons/common/github.svg').default} />
                </span>
                <span className="btn-inner--text">GitHub</span>
              </Button>
              <Button className="btn-neutral btn-icon" color="default">
                <span className="btn-inner--icon">
                  <img alt="Google" src={require('../../assets/img/icons/common/google.svg').default} />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                {/* Email input */}
                <InputGroup className="input-group-alternative">
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
                {/* Password input */}
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
              {/* Remember me checkbox */}
              {/* ... */}
              <div className="text-center">
                {/* Sign in button */}
                <Button className="my-4" color="primary" type="button" onClick={handleLogin}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* Forgot password and create new account links */}
        {/* ... */}
      </Col>
    </>
  );
};

export default Login;
