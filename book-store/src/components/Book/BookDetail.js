import { Box, Button, FormControlLabel, FormLabel, TextField, Checkbox } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState  } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const BookDetail = () => {
    const [checked, setChecked] = React.useState(false);
    const [inputs, setInputs] = useState({})
    const id = useParams().id;
    const history = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            await axios.get(`http://localhost:5000/books/${id}`).then((res) => (res.data)).then(data=>setInputs(data.book));
        }
        fetchHandler();
    }, [id]);

    const sendRequest = async() => {
    await axios.put(`http://localhost:5000/books/${id}`, {
      name: String(inputs.name),
      author: String(inputs.author),
      description: String(inputs.description),
      price: Number(inputs.price),
      image: String(inputs.image),
      available: Boolean(checked),
    }).then(res => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/books'));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  return (
    <div>
        {inputs && ( 
        <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" justifyContent={'center'} 
        maxWidth={700} alignContent={"center"} alignSelf="center" marginLeft="auto" marginRight="auto" marginTop={10}>
      <FormLabel>Name</FormLabel>
      <TextField value={inputs.name} onChange={handleChange} margin="normal"  fullWidth varient="outlined" name="name"/>
      <FormLabel>Author</FormLabel>
      <TextField value={inputs.author} onChange={handleChange} margin="normal"  fullWidth varient="outlined" name="author"/>
      <FormLabel>Description</FormLabel>
      <TextField value={inputs.description} onChange={handleChange} margin="normal"  fullWidth varient="outlined" name="description"/>
      <FormLabel>Price</FormLabel>
      <TextField value={inputs.price} onChange={handleChange} type="number" margin="normal"  fullWidth varient="outlined" name="price"/>
      <FormLabel>Image</FormLabel>
      <TextField value={inputs.image} onChange={handleChange} margin="normal"  fullWidth varient="outlined" name="image"/>
      <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Available" />
      <Button variant="contained" type='submit'>Add Book</Button>
      </Box>
    </form>) }
    </div>
  )
}

export default BookDetail