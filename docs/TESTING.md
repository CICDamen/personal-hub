# Testing Guide

This document describes the testing setup and practices for the Personal Hub application.

## Overview

The project uses Jest and React Testing Library for unit testing of components and utility functions. Tests are automatically run on every pull request to the main branch via GitHub Actions.

## Test Infrastructure

### Dependencies

- **Jest** - Testing framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM assertions
- **@testing-library/user-event** - User interaction simulation
- **jest-environment-jsdom** - DOM environment for Jest

### Configuration

Test configuration is defined in:
- `jest.config.ts` - Main Jest configuration
- `jest.setup.ts` - Test environment setup (loads jest-dom matchers)

## Running Tests

### Local Development

```bash
# Run all tests (uses Jest via Bun)
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage report
bun run test:coverage
```

Note: Use `bun run test` instead of `bun test` to ensure Jest is used (Bun has its own test runner which doesn't support our React Testing Library setup).

### Continuous Integration

Tests are automatically run on:
- Pull requests to the `main` branch
- Pushes to the `main` branch

The CI workflow (`.github/workflows/test.yml`) uses Bun for fast dependency installation and runs Jest via `bun run test`.

**CI Workflow Steps:**
1. Install dependencies
2. Run ESLint for code quality checks
3. Run Jest unit tests

**Note:** The CI workflow does not include a build step to avoid attempting to connect to Sanity during static page generation. Build verification should be done separately during deployment with real Sanity credentials.

## Test Structure

Tests are organized alongside the code they test:

```
src/
├── components/
│   ├── __tests__/
│   │   ├── About.test.tsx
│   │   ├── BlogPostCard.test.tsx
│   │   ├── Hero.test.tsx
│   │   └── ProjectCard.test.tsx
│   ├── About.tsx
│   ├── BlogPostCard.tsx
│   ├── Hero.tsx
│   └── ProjectCard.tsx
└── lib/
    └── sanity/
        ├── __tests__/
        │   └── mappers.test.ts
        └── mappers.ts
```

## Test Coverage

### Components

- **Hero** - Tests rendering of profile information, social links, and contact details
- **About** - Tests rendering of bio content
- **ProjectCard** - Tests rendering of project information, thumbnails, and technology tags
- **BlogPostCard** - Tests rendering of blog post information, dates, and reading time

### Utility Functions

- **Mappers** - Tests data transformation from Sanity CMS format to application format
  - `mapSanityImage` - Image transformation
  - `mapHomepage` - Homepage data mapping
  - `mapPost` - Blog post mapping
  - `mapProject` - Project mapping
  - `mapPosts` - Batch post mapping
  - `mapProjects` - Batch project mapping

## Writing Tests

### Component Tests

Component tests use React Testing Library to render components and verify their behavior:

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent prop="value" />)
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Utility Function Tests

Utility function tests verify input/output behavior:

```typescript
import { myFunction } from '@/lib/myModule'

describe('myFunction', () => {
  it('should transform data correctly', () => {
    const input = { /* ... */ }
    const result = myFunction(input)
    
    expect(result).toEqual({ /* expected output */ })
  })
})
```

## Mocking

### Next.js Image Component

The Next.js `Image` component is mocked in tests to avoid optimization logic:

```typescript
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}))
```

### Next.js Link Component

The Next.js `Link` component is mocked for testing:

```typescript
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  )
}))
```

### Sanity Image Utilities

Image utilities are mocked to avoid external dependencies:

```typescript
jest.mock('@/lib/sanity/image', () => ({
  urlFor: jest.fn((image: any) => ({
    url: () => `https://cdn.sanity.io/images/test/${image.asset._ref}`
  })),
  getImageAlt: jest.fn((image: any, fallback: string) => 
    image?.alt || fallback
  )
}))
```

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what users see and interact with
2. **Use Descriptive Test Names** - Test names should clearly describe what is being tested
3. **Keep Tests Focused** - Each test should verify one specific behavior
4. **Avoid Testing Third-Party Libraries** - Trust that Next.js, React, etc. work correctly
5. **Mock External Dependencies** - Mock APIs, image processing, and other external services
6. **Test Edge Cases** - Include tests for missing data, empty arrays, null values, etc.

## Troubleshooting

### Tests Fail Locally But Pass in CI

- Ensure you have all dependencies installed: `bun install`
- Clear Jest cache: `bunx jest --clearCache`
- Verify you're using the latest Bun version

### Tests Pass Locally But Fail in CI

- Check for environment-specific issues
- Verify all test files are committed to git
- Review CI logs for specific error messages

### Mock Warnings

Some React warnings about non-boolean attributes may appear when using mocked Next.js components. These are expected and don't affect test functionality.

## Future Enhancements

Potential testing improvements:

- Add integration tests for API routes
- Add end-to-end tests with Playwright or Cypress
- Increase code coverage targets
- Add visual regression testing
- Add performance testing

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
