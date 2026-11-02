# LoveFound Frontend

> The Angular web application for **LoveFound**, a pet adoption platform designed to help adopters discover pets and connect with shelters.

**Backend API:** [love-found-api](https://github.com/islemzaafouri/love-found-api)

## Overview

LoveFound brings adopters and shelters together through a role-based pet adoption workflow.

The frontend is built with Angular's standalone-component architecture and a feature-based folder structure. It communicates with the Spring Boot REST API and uses an HTTP interceptor to attach authentication information to requests.

## Tech stack

- Angular 22
- TypeScript
- RxJS
- Angular Router
- Angular Reactive Forms / Forms
- SCSS
- Font Awesome
- Vitest (configured test runner)



For the cross-repository component diagram and request flows, see the [LoveFound system architecture](https://github.com/islemzaafouri/love-found-api/blob/main/docs/architecture.md).

## Features

### Public experience
- Home page.
- Browse available pets.
- View pet details.
- Filter pets by species.

### Authentication
- Adopter and shelter registration.
- Login.
- JWT-based authenticated requests.
- Authentication and role guards for protected pages.

### Adopter experience
- View and update adopter profile.
- Submit an adoption application.
- View submitted applications.
- Open application details, edit or cancel an application.

### Shelter experience
- Shelter dashboard.
- View and update shelter profile.
- Create, update, activate, and deactivate pet listings.
- Review applications submitted for the shelter's pets.
- Update application status.

## Application structure

The source code is organized by feature, with shared infrastructure in `core` and reusable UI components in `shared`.

```text
src/app/
├── core/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── services/
├── features/
│   ├── applications/
│   ├── auth/
│   ├── dashboard/
│   ├── home/
│   ├── pets/
│   ├── profile/
│   └── shelter-pets-component/
└── shared/
    └── components/
        ├── footer/
        └── navbar/
```

### Routing overview

| Route | Purpose | Access |
|---|---|---|
| `/` | Home page | Public |
| `/auth` | Login and registration | Public |
| `/pets` | Browse pets | Public |
| `/pets/:id` | Pet details | Public |
| `/pets/create` | Create a pet listing | Shelter |
| `/pets/update/:id` | Update a pet listing | Shelter |
| `/dashboard` | Shelter dashboard | Shelter |
| `/my-pets` | Shelter's pet listings | Shelter |
| `/profile/adopter` | Adopter profile | Adopter |
| `/profile/shelter` | Shelter profile | Shelter |
| `/applications/my` | My adoption applications | Adopter |
| `/applications/my/:applicationId` | Application details | Adopter |
| `/applications/shelter` | Applications for shelter pets | Shelter |
| `/applications/shelter/:applicationId` | Application details | Shelter |
| `/applications/:petId` | Apply for a pet | Adopter |

The application uses lazy-loaded feature routes and route guards for authentication and role-specific access.

## Run locally

### Prerequisites

- Node.js (use a version compatible with the installed Angular CLI)
- npm
- The [LoveFound API](https://github.com/islemzaafouri/love-found-api) running locally

### 1. Clone the repository

```bash
git clone https://github.com/islemzaafouri/love-found-frontend.git
cd love-found-frontend
```

### 2. Install dependencies

```bash
npm install
```

For reproducible installs, use:

```bash
npm ci
```

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

The API base URL is centralized in `src/environments/environment.ts` and `environment.development.ts`. The development build uses `http://localhost:8080/api`; the production configuration uses the relative `/api` path, intended for deployment behind a same-origin reverse proxy. Make sure the backend is configured and running before testing API-dependent features.

## Build and test

Build the application:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

The production build output is generated in Angular's configured output directory under `dist/`.

## Screenshots

Screenshots of the application will be added here as the interface is finalized.

## Related repository

- [LoveFound API — Spring Boot backend](https://github.com/islemzaafouri/love-found-api)

## Project status

LoveFound is an actively developed project. Features, routes, and UI details may change as development continues.
