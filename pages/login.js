import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import catchErrors from '../utils/catchErrors';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import { handelLogin } from '../utils/auth';
function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const inputHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const { email, password } = input;
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const isInput = Object.values(input).every((el) => Boolean(el));
    if (isInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`;
      const payload = { ...input };
      const response = await axios.post(url, payload);
      handelLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Message
        attached
        icon='privacy'
        header='Welcome Back!'
        content='Log in with email and password'
        color='blue'
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={onsubmitHandler}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            placeholder='Email'
            type='email'
            label='Email'
            name='email'
            value={email}
            onChange={inputHandler}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            label='Password'
            name='password'
            type='password'
            value={password}
            onChange={inputHandler}
          />
          <Button
            disabled={disabled}
            icon='sign in'
            type='submit'
            color='orange'
            content='Login'
          />
        </Segment>
      </Form>
      <Message attached='bottom' warning>
        <Icon name='help' />
        New user?{' '}
        <Link href='/signup'>
          <a>Sign up here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  );
}

export default Login;
