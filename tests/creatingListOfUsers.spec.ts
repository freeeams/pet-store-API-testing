// Creates list of users with given input array

import { test } from '@playwright/test';
import { z } from 'zod';
import { postAPI } from '../utils/apiCallHelper';   
test.describe('Create List of Users API Test', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const createUsersRequestBody: Array<{
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        userStatus: number;
    }> = []
    for (let i = 0; i < 3; i++) {
        createUsersRequestBody.push({
            id: 12312 + i,
            username: `TestUserName${i + 1}`,
            firstName: `Test`,
            lastName: `User${i + 1}`,
            email: `testuser${i + 1}@example.com`,
            password: `Test1234!`,
            phone: `123-456-789${i}`,
            userStatus: 0
        });
    }
    const createUsersResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.string(),
    });

   test('should create users with array endpoint', async ({ request }) => {
        await postAPI(request, `${BASE_URL}/user/createWithArray`, createUsersRequestBody, 200, createUsersResponseSchema);
    });
});