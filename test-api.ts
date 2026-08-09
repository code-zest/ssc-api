import axios from 'axios';

async function test() {
  try {
    const loginRes = await axios.post('http://localhost:3000/api/v1/auth/login', {
      email: 'admin@codezest.com',
      password: 'password123'
    });
    
    const token = loginRes.data.data.accessToken;
    console.log('Login success, token:', token.substring(0, 20) + '...');
    
    const chaptersRes = await axios.get('http://localhost:3000/api/v1/subjects/cmsi1xmz10005j29v24oz6e0q/chapters', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Chapters length:', chaptersRes.data.data.length);
    
    if (chaptersRes.data.data.length > 0) {
      const chapterId = chaptersRes.data.data[0].id;
      console.log('Fetching chapter:', chapterId);
      
      const chapterRes = await axios.get(`http://localhost:3000/api/v1/chapters/${chapterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Chapter:', chapterRes.data.data.name);
      
      const lessonsRes = await axios.get(`http://localhost:3000/api/v1/chapters/${chapterId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Lessons length:', lessonsRes.data.data.length);
    }
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

test();
