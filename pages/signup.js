import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import catchErrors from '../utils/catchErrors';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import { handelLogin } from '../utils/auth';

function Signup() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const inputHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const { name, email, password } = input;
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
      const url = `${baseUrl}/api/signup`;
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
        icon='settings'
        header='Get Started'
        content='Create a new account'
        color='teal'
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={onsubmitHandler}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Name'
            label='Name'
            name='name'
            value={name}
            onChange={inputHandler}
          />
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
            icon='signup'
            type='submit'
            color='orange'
            content='Signup'
          />
        </Segment>
      </Form>
      <Message attached='bottom' warning>
        <Icon name='help' />
        Existing user?{' '}
        <Link href='/login'>
          <a>Log in here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  );
}

export default Signup;
