// Creates list of users with given input array

import { test } from '@playwright/test';
import { z } from 'zod';
import { postAPI } from '../utils/apiCallHelper';   
test.describe('Create List of Users API Test', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const createUsersRequestBody = [
        {
            "id": 12312,
            "username": "TestUserName1",
            "firstName": "Test",
            "lastName": "User1",
            "email": "testuser1@example.com",
            "password": "Test1234!",
            "phone": "123-456-7890",
            "userStatus": 0
        },
        {
            "id": 12313,
            "username": "TestUserName2",
            "firstName": "Test",
            "lastName": "User2",
            "email": "testuser2@example.com",
            "password": "Test1234!",
            "phone": "123-456-7890",
            "userStatus": 0
        }
    ];
    const createUsersResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.string(),
    });

    test('should create list of users', async ({ request }) => {
        for (const user of createUsersRequestBody) {
            await postAPI(request, `${BASE_URL}/user`, user, 200, createUsersResponseSchema);
        }
    });
});
