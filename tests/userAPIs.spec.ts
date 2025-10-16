import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { getAPI, postAPI, putAPI, deleteAPI } from '../utils/apiCallHelper';
test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const createUserRequestBody = {
        "id": 12312,
        "username": "TestUserName-test-automation-delete-me",
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email(),
        "password": "Test1234!",
        "phone": faker.phone.number(),
        "userStatus": 0
    }
    test('Create a new user', async ({ request }) => {

        const createUserResponse = await request.post(`${BASE_URL}/user`, {
            data: createUserRequestBody
        });
        expect(createUserResponse.status()).toBe(200);
        const expectedResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal("unknown"),
            message: z.literal(createUserRequestBody.id.toString()),
        })
        const actualResponseBody = await createUserResponse.json();
        expectedResponseSchema.parse(actualResponseBody);
    });
    test('get user by username', async ({ request }) => {
        const username = createUserRequestBody.username;
        let getUserResponse;
        for (let i = 0; i < 5; i++) {
            getUserResponse = await request.get(`${BASE_URL}/user/${username}`);
            if (getUserResponse.status() === 200) {
                break;
            }
            console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
        expect(getUserResponse!.status()).toBe(200);

        const expectedResponseSchema = z.object({
            id: z.number(),
            username: z.literal(username),
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            password: z.string(),
            phone: z.string(),
            userStatus: z.number(),
        })
        const actualResponseBody = await getUserResponse!.json();
        expectedResponseSchema.parse(actualResponseBody);
    });
    test('Delete user by username', async ({ request }) => {
        const username = createUserRequestBody.username;
        const deleteUserResponse = await request.delete(`${BASE_URL}/user/${username}`);
        let getUserResponse;
        for (let i = 0; i < 5; i++) {
            getUserResponse = await request.get(`${BASE_URL}/user/${username}`);
            if (getUserResponse.status() === 200) {
                break;
            }
            console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
        expect(deleteUserResponse.status()).toBe(200);
        const expectedResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal("unknown"),
            message: z.literal(username),
        })
        const actualResponseBody = await deleteUserResponse.json();
        expectedResponseSchema.parse(actualResponseBody);
    });
});

