# Pet Store API Testing

A comprehensive API testing framework built with Playwright, TypeScript, Zod for schema validation, and Faker for test data generation.

## 🚀 Features

- **Playwright** - Modern end-to-end testing framework
- **TypeScript** - Type-safe test development
- **Zod** - Runtime schema validation
- **Faker** - Dynamic test data generation
- **dotenv** - Environment variable management

## 📁 Project Structure

```
pet-store-API-testing/
├── tests/
│   └── example.spec.ts          # API test examples
├── schemas/
│   └── example.schema.ts        # Zod schema definitions
├── .gitignore
├── package.json
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment variables template
└── README.md
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers (optional for API testing):**
   ```bash
   npx playwright install
   ```

3. **Create environment file:**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` with your API base URL and credentials.

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Show test report
npm run test:report
```

## 📝 Writing Tests

### 1. Define Zod Schemas

Create schemas in `schemas/` directory:

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
});
```

### 2. Create API Tests

Import schemas and use Playwright's request fixture:

```typescript
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserSchema } from '../schemas/example.schema';

test('GET - Fetch user', async ({ request }) => {
  const response = await request.get('/users/1');
  const data = await response.json();
  
  // Validate with Zod
  const validatedUser = UserSchema.parse(data);
  
  expect(validatedUser.id).toBe(1);
});
```

## 🔧 Configuration

### Playwright Config

- Test directory: `./tests`
- Reporters: HTML, List, JSON
- Timeout: 30 seconds per test
- Base URL: Configured via `.env` file

### Environment Variables

Set in `.env` file:
- `BASE_URL` - API base URL
- `API_TOKEN` - Authentication token (if needed)
- `API_KEY` - API key (if needed)

## 📊 Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Reports are generated in:
- `playwright-report/` - HTML report
- `test-results/` - JSON results

## 🤝 Contributing

1. Create feature branch
2. Add tests for new features
3. Ensure all tests pass
4. Submit pull request

## 📄 License

ISC
