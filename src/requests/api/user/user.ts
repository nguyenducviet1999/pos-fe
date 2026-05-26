// GET
// /api/v1/users

// POST
// /api/v1/users
// Admin: Create new user/employee

// GET
// /api/v1/users/profile/me

// PUT
// /api/v1/users/profile/me

// GET
// /api/v1/users/{userId}

// DELETE
// /api/v1/users/{userId}
// Admin: Delete user

// PUT
// /api/v1/users/{userId}
// Admin: Update user details (pass only fields to update)
import axios from "@src/requests";

const PATH = "/users";

//   "id": 0,
//   "username": "string",
//   "email": "string",
//   "fullName": "string",
//   "role": "string",
//   "permissions": [
//     "string"
//   ],
//   "active": true
const getUserProfile = async () => {
  const response = await axios.get<{
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: string;
    permissions: string[];
    active: boolean;
  }>(`${PATH}/profile/me`);
  return response.data;
};
export const userRequests = { getUserProfile };
