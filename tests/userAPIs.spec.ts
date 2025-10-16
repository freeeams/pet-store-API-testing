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
    };
    const createUserResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal(createUserRequestBody.id.toString()),
    });
    const username = createUserRequestBody.username;
    const getUserResponseSchema = z.object({
        id: z.number(),
        username: z.literal(username),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        userStatus: z.number(),
    });
    const deleteUserResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal(username),
    });

    test('end to end test - create, get, delete user', async ({ request }) => {
        await postAPI(request, `${BASE_URL}/user`, createUserRequestBody, 200, createUserResponseSchema);
        await getAPI(request, `${BASE_URL}/user/${username}`, 200, getUserResponseSchema);
        await deleteAPI(request, `${BASE_URL}/user/${username}`, 200, deleteUserResponseSchema);
    });
});