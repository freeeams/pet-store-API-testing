import { test } from '@playwright/test';
import { z } from 'zod';
import { getAPI } from '../utils/apiCallHelper';
test.describe('Returns Pet Inventories By Status API Test', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const returnsPetInventoriesByStatusResponseSchema = z.record(
        z.string(),
        z.number()
    );

    test('return pet inventories by status', async ({ request }) => {
        await getAPI(
            request,
            `${BASE_URL}/store/inventory`,
            200,
            returnsPetInventoriesByStatusResponseSchema
        );
    });
});