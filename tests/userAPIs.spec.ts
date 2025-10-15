import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    test('Create a new user', async ({ request }) => {
        const createUserRequestBody = {
            "id": 12312,
            "username": "TestUserNameSalih123",
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": "Test1234!",
            "phone": faker.phone.number(),
            "userStatus": 0
        }
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

});
test('get user by username', async ({ request }) => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const username = "TestUserNameSalih123";
    const getUserResponse = await request.get(`${BASE_URL}/user/${username}`);
    expect(getUserResponse.status()).toBe(200);
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
    const actualResponseBody = await getUserResponse.json();
    expectedResponseSchema.parse(actualResponseBody);
});