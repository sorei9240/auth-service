const axios = require('axios');

// API base URL
const API_URL = 'http://localhost:5000/api';

// test user credentials
const testUser = {
  name: 'Bob TestUser',
  email: 'testuser123@example.com',
  password: 'password123'
};

// register a user
async function registerUser() {
  try {
    console.log('Registering a new user...');
    const response = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('Registration successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.token;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// login a user
async function loginUser() {
  try {
    console.log('Logging in user...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Login successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// get user profile
async function getUserProfile(token) {
  try {
    console.log('Fetching user profile...');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Profile fetch successful!');
    console.log('User Profile:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Profile fetch failed:', error.response ? error.response.data : error.message);
  }
}

// update user details
async function updateUserDetails(token) {
  try {
    console.log('Updating user details...');
    const response = await axios.put(
      `${API_URL}/auth/updatedetails`,
      {
        name: 'Updated Name',
        email: testUser.email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('Update successful!');
    console.log('Updated Profile:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Update failed:', error.response ? error.response.data : error.message);
  }
}

async function runTests() {
  console.log('=== TEST ===');
  
  // register new user
  let token = await registerUser();
  
  // if registration fails/user already exists
  if (!token) {
    token = await loginUser();
  }
  
  // if we have token is returned, test protected routes
  if (token) {
    await getUserProfile(token);
    await updateUserDetails(token);
    console.log('All tests completed!');
  } else {
    console.error('Could not get authentication token. Tests failed.');
  }
}

runTests();