import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    media: '',
    description: '',
  });
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { name, price, media, description } = product;
  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);
  const handleChange = (e) => {
    if (e.target.name === 'media') {
      setProduct({ ...product, media: e.target.files[0] });
      setMediaPreview(window.URL.createObjectURL(e.target.files[0]));
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud_name', 'dicrwfyvs');
    try {
      const res = await axios.post(process.env.CLOUDINARY_URL, data);
      console.log(res);
      const mediaUrl = res.data.url;
      return mediaUrl;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name: '', price, description, mediaUrl };
      const response = await axios.post(url, payload);
      console.log(response);

      setProduct({
        name: '',
        price: '',
        media: '',
        description: '',
      });
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header='Oops!' content={error} />
        <Message
          success
          icon='check'
          header='Success!'
          content='Your product has been posted.'
        />
        <Header as='h2' block>
          <Icon name='add' color='orange' />
          Create New Product
        </Header>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            label='Name'
            placeholder='Name'
            onChange={handleChange}
            value={name}
          />
          <Form.Field
            control={Input}
            name='price'
            label='Price'
            placeholder='Price'
            min='0.00'
            step='0.01'
            type='number'
            onChange={handleChange}
            value={price}
          />
          <Form.Field
            control={Input}
            name='media'
            type='file'
            label='Media'
            accept='image/*'
            content='Select Image'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          onChange={handleChange}
          value={description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color='blue'
          icon='pencil alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  );
}

export default CreateProduct;
