import axios from 'axios';

export  const fetchImages = async (name, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30996402-c54c41306985cfdc2f4f02212&q=${name}&image_type=photo&per_page=12&page=${page}`
    );
    const data = response.data
    return data
  } catch (error) {
    console.log(error);
  }
}