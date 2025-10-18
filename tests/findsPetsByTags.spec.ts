

import { test, } from '@playwright/test';
import { z } from 'zod';
import { getAPI } from '../utils/apiCallHelper';

test.describe('Finds Pet By Tags API Test', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    const findPetsByTagsResponseSchema = z.array(z.object({
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
        status: z.enum(['available', 'not available',]),
    }));

    test('should find pets by tags', async ({ request }) => {
        await getAPI(
            request,
            `${BASE_URL}/pet/findByTags?tags=dog`,
            200,
            findPetsByTagsResponseSchema
        );
    });
});

