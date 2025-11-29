# MERN Stack Testing and Debugging Assignment

This repository contains a robust MERN stack application with a comprehensive testing suite and implemented debugging techniques, fulfilling the requirements for Week 6.

## 🚀 Features

- **Modern UI**: A sleek, dark-themed interface with glassmorphism effects and animations.
- **Robust Backend**: Express server with MongoDB integration (supports both local and in-memory databases).
- **Full Testing Suite**: Unit, Integration, and End-to-End tests.
- **Debugging Tools**: Integrated logging, error handling, and error boundaries.

## 🧪 Testing Strategy

We implemented a multi-layered testing strategy to ensure application reliability:

### 1. Unit Testing (Jest)
Focused on testing individual functions and components in isolation.
- **Client-side**:
    - `Button.test.jsx`: Verifies rendering, props, and click events of the Button component.
    - `format.test.js`: Tests the currency formatting utility function.
    - `useCounter.test.js`: Tests the custom hook logic.
- **Server-side**:
    - `math.test.js`: Tests calculation utility functions.
    - `auth.test.js`: Verifies the authentication middleware logic.

**Coverage Goal**: >70% code coverage achieved for unit tests.

### 2. Integration Testing (Jest & Supertest)
Focused on verifying interactions between different parts of the system.
- **Server API**:
    - `api.test.js`: Uses `supertest` to send HTTP requests to the Express app and verifies responses (status codes, JSON structure).
    - Uses `mongodb-memory-server` to spin up a temporary database for isolated testing.
- **Client Components**:
    - `UserList.test.jsx`: Tests the `UserList` component's ability to fetch data from a mocked API and render it correctly.

### 3. End-to-End Testing (Cypress)
Focused on simulating real user scenarios in the browser.
- **Tests**:
    - `app.cy.js`: Verifies that the home page loads, the "Users" header is present, and the user list is populated from the API.
- **Configuration**:
    - Configured via `cypress.config.js` to run against the local development server.

## 🐞 Debugging Techniques Implemented

### 1. Server-Side Logging (`winston` & `morgan`)
- **Implementation**: Configured `winston` in `server/src/utils/logger.js` to write logs to `error.log` and `combined.log`.
- **Usage**: Captures runtime errors and important system events. `morgan` logs all HTTP requests to the console for real-time monitoring.

### 2. Global Error Handling (Express Middleware)
- **Implementation**: Created `server/src/middleware/errorHandler.js`.
- **Usage**: Catches unhandled exceptions in routes and sends a standardized JSON error response to the client, preventing server crashes and leaking stack traces in production.

### 3. React Error Boundaries
- **Implementation**: Created `client/src/components/ErrorBoundary.jsx`.
- **Usage**: Wraps the main application. If a React component crashes, this boundary catches the error and displays a fallback UI instead of a blank white screen.

### 4. Robust Database Connection (Fallback Mechanism)
- **Implementation**: In `server/src/index.js`.
- **Usage**: The server attempts to connect to a local MongoDB. If it fails (e.g., service not running), it automatically falls back to an **in-memory MongoDB instance**. This ensures the app works immediately for any developer without requiring local database setup.

## 🛠️ Setup and Running

### Prerequisites
- Node.js (v14+)
- npm

### Installation
```bash
npm run install-all
```

### Running the Application
To run both client and server:
1. **Server**: `cd server && npm run dev`
2. **Client**: `cd client && npm start`

### Running Tests
- **All Tests**: `npm test`
- **Unit Tests**: `npm run test:unit`
- **Integration Tests**: `npm run test:integration`
- **E2E Tests**: `npm run test:e2e` (or `cd client && npx cypress open` for interactive mode)

## 📊 Test Coverage
To generate a coverage report:
```bash
npm run test:unit -- --coverage
```
*(See `coverage-report.txt` or the terminal output for details)* 