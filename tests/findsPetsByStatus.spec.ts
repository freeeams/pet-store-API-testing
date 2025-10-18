import { test } from '@playwright/test';
import { z } from 'zod';
import { getAPI } from '../utils/apiCallHelper';

test.describe('Finds Pet By Status API Test', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const findPetsByStatusResponseSchema = z.array(z.object({
        id: z.number(),
        category: z.object({
            id: z.number(),
            name: z.string(),
        }).optional(),
        name: z.string(),
        photoUrls: z.array(z.string()),
        tags: z.array(z.object({
            id: z.number(),
            name: z.string(),
        })).optional(),
        status: z.enum(['available', 'pending', 'sold']),
    }));

    test('should find pets by status available', async ({ request }) => {
        await getAPI(
            request,
            `${BASE_URL}/pet/findByStatus?status=available&status=available`,
            200,
            findPetsByStatusResponseSchema
        );
    });
});

