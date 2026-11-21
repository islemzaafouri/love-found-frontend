# LoveFound — Frontend

> A warm, role-based pet adoption platform that helps people discover animals in need of a home and gives shelters a place to manage their adoption process.

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/Styles-SCSS-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)

**Related project:** [LoveFound API — Spring Boot backend](https://github.com/islemzaafouri/love-found-api)

---

## About the project

LoveFound is a pet adoption web application built around a simple idea: every animal deserves a safe, loving home. It connects adopters with shelters through a shared platform, making it easier to discover pets, submit adoption applications, and follow their progress.

The frontend is developed with Angular using standalone components, lazy-loaded feature routes, and a feature-oriented structure. It communicates with the Spring Boot REST API and uses an HTTP interceptor to attach authentication information to protected requests.

## User experiences

| Adopters | Shelters |
|---|---|
| Create an account and manage a profile | Register and manage a shelter profile |
| Browse and filter available pets | Create and manage pet listings |
| View pet details | Review applications for their pets |
| Submit adoption applications | Update application statuses |
| Track, edit, or cancel applications | Activate or deactivate listings |

The API also includes an **ADMIN** role in its role model and security configuration.

## Tech stack

- **Framework:** Angular 22
- **Language:** TypeScript
- **Reactive programming:** RxJS
- **Routing:** Angular Router with lazy-loaded feature routes
- **Forms:** Reactive Forms / Forms
- **Styling:** SCSS
- **Icons:** Font Awesome
- **Testing:** Vitest

## Application structure

The frontend is organized by feature. Shared infrastructure lives in `core`, while reusable UI elements live in `shared`.

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

### Main routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Home page | Public |
| `/auth` | Login and registration | Public |
| `/pets` | Browse pets | Public |
| `/pets/:id` | Pet details | Public |
| `/pets/create` | Create a pet listing | Shelter |
| `/pets/update/:id` | Update a pet listing | Shelter |
| `/dashboard` | Shelter dashboard | Shelter |
| `/my-pets` | Shelter pet listings | Shelter |
| `/profile/adopter` | Adopter profile | Adopter |
| `/profile/shelter` | Shelter profile | Shelter |
| `/applications/my` | Adopter applications | Adopter |
| `/applications/shelter` | Applications for shelter pets | Shelter |

Protected routes use authentication and role guards. For the cross-layer architecture and request flows, see the [system architecture](https://github.com/islemzaafouri/love-found-api/blob/main/docs/architecture.md) and [application structure](https://github.com/islemzaafouri/love-found-api/blob/main/docs/application-structure.md).

## Run locally

### Prerequisites

- Node.js version compatible with the project's Angular CLI
- npm
- MySQL and the [LoveFound API](https://github.com/islemzaafouri/love-found-api) running locally

### 1. Clone the repository

```bash
git clone https://github.com/islemzaafouri/love-found-frontend.git
cd love-found-frontend
```

### 2. Install dependencies

```bash
npm ci
```

Use `npm install` if you need to update or regenerate the dependency lockfile.

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

The API base URL is centralized in `src/environments/environment.ts` and `environment.development.ts`. The development configuration targets `http://localhost:8080/api`. The production configuration uses the relative `/api` path and is intended for deployment behind a same-origin reverse proxy.

## Build and test

Create a production build:

```bash
npm run build
```

Run the test suite:

```bash
npm test
```

The production build is generated in Angular's configured output directory under `dist/`.

## Documentation

- [System architecture](https://github.com/islemzaafouri/love-found-api/blob/main/docs/architecture.md)
- [Database design](https://github.com/islemzaafouri/love-found-api/blob/main/docs/database-design.md)
- [Application structure](https://github.com/islemzaafouri/love-found-api/blob/main/docs/application-structure.md)
- [Backend API repository](https://github.com/islemzaafouri/love-found-api)

## Project status

LoveFound is an actively developed project. The repository documents the current frontend structure and implemented user flows; features and UI details may evolve as development continues.
