import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8000'; // Replace with your actual API base URL
const SELFUSER_URL = BASE_URL + "/selfuser";

export const options = {
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
    }

    // register
    const registrationPayload = {
        email: 'test@gmail.com',
        password: 'test',
        name: 'test',
    };
    const registrationResponse = http.post(`${SELFUSER_URL}/register`, JSON.stringify(registrationPayload), {
        headers: headers
    });
    check(registrationResponse, { 'Registration successful': (r) => r.status === 200 });

    // already registered
    const alreadyRegistrationResponse = http.post(`${SELFUSER_URL}/register`, JSON.stringify(registrationPayload), {
        headers: headers
    });
    check(alreadyRegistrationResponse, { 'Registration successful': (r) => r.status === 409 });

    // login
    const loginPayload = {
        email: registrationPayload.email,
        password: registrationPayload.password,
    };
    const loginResponse = http.post(`${SELFUSER_URL}/login`, JSON.stringify(loginPayload), {
        headers: headers
    });
    check(loginResponse, { 'Login successful': (r) => r.status === 200 });

    // Extract token from login response
    const authToken = loginResponse.json('token');

    // get current user
    const profileHeaders = Object.assign({}, headers, {
        Authorization: `Bearer ${authToken}`,
    })
    const profileResponse = http.get(`${SELFUSER_URL}`, {
        headers: profileHeaders
    });
    check(profileResponse, { 'Profile request successful': (r) => r.status === 200 });

    // Update
    const updatePayload = {
        name: "test1",
    };
    const updateResp = http.put(`${SELFUSER_URL}`, JSON.stringify(updatePayload), {
        headers: profileHeaders
    });
    check(updateResp, { 'Update request successful': (r) => r.status === 200 });

    // Change password
    const changePasswordPayload = {
        old_password: "test",
        new_password: "test1"
    }
    const changePasswordResp = http.post(`${SELFUSER_URL}/change_password`, JSON.stringify(changePasswordPayload), {
        headers: profileHeaders
    });
    check(changePasswordResp, { 'Update request successful': (r) => r.status === 200 });

    // Delete
    const deleteResp = http.del(`${SELFUSER_URL}`, null, {
        headers: profileHeaders
    });
    check(deleteResp, { 'Delete request successful': (r) => r.status === 200 });
}
