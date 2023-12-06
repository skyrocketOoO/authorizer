import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8000/selfuser'; // Replace with your actual API base URL

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Simulate ramp-up of traffic from 1 to 10 users over 10 seconds
    { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '10s', target: 0 },  // Ramp-down to 0 users
  ],
};

// Function to generate a random email address for testing
function generateRandomEmail() {
  return `testuser${Math.floor(Math.random() * 100000)}@example.com`;
}

export default function () {
  // Test registration endpoint
  const registrationPayload = {
    email: generateRandomEmail(),
    password: 'testpassword',
    name: 'Test User',
  };
  const registrationResponse = http.post(`${BASE_URL}/register`, registrationPayload);
  check(registrationResponse, { 'Registration successful': (r) => r.status === 200 });

  // Test login endpoint
  const loginPayload = {
    email: registrationPayload.email,
    password: registrationPayload.password,
  };
  const loginResponse = http.post(`${BASE_URL}/login`, loginPayload);
  check(loginResponse, { 'Login successful': (r) => r.status === 200 });

  // Extract token from login response
  const authToken = loginResponse.json('token');

  // Test protected endpoints using the obtained token
  const profileResponse = http.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  check(profileResponse, { 'Profile request successful': (r) => r.status === 200 });

  // Sleep for a short duration before the next iteration
  sleep(1);
}
