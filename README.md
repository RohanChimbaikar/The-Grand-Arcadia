<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/Logo-Dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/Logo-Light.svg">
    <img src="public/Logo-Light.svg" alt="Grand Arcadia" width="360">
  </picture>
</p>

<p align="center">
  <strong>Hotel Operations & Property Management Dashboard</strong>
</p>

<p align="center">
  A modern management platform for handling hotel bookings, guests, rooms, check-ins, check-outs, and day-to-day operations.
</p>

---

## Overview

**Grand Arcadia** is a hotel management application built to centralize day-to-day property operations into a single dashboard.

It provides hotel staff with tools to monitor business activity, manage reservations and accommodation inventory, handle guest stays, process check-ins and check-outs, configure hotel settings, and manage their accounts.

The application is designed primarily for **internal hotel operations** rather than public-facing guest reservations. Authenticated staff can access operational dashboards and manage the property's data through a responsive interface.

The application uses **Supabase** for authentication, database persistence, and file storage, while the frontend is built with **React** and **TanStack Query**.

---

## 🚀 Live Demo

[**Visit Grand Arcadia →**](https://thegrandarcadia.netlify.app)

## 🎥 Demo Video

[**Watch the Grand Arcadia demo →**](https://drive.google.com/file/d/1rABnx1msUkl_DkC26_3RJVUxCb2ZcBMT/view?usp=sharing)

---

## What Grand Arcadia Provides

### 📊 Operations Dashboard

The dashboard provides an at-a-glance view of the hotel's current activity.

- Total bookings
- Sales and revenue overview
- Check-ins
- Occupancy rate
- Recent booking activity
- Today's arrivals and departures
- Sales trend visualization
- Stay-duration analysis
- Configurable reporting periods

### 📅 Booking Management

Manage and monitor hotel reservations from a centralized booking interface.

- Paginated booking list
- Booking status filtering
- Sorting
- Booking details
- Check-in workflow
- Check-out workflow
- Breakfast add-on handling
- Payment confirmation
- Booking deletion

### 🏨 Accommodation Management

Manage the property's accommodation inventory.

- View available accommodation units
- Create new units
- Edit existing units
- Delete units
- Configure capacity
- Configure pricing
- Configure discounts
- Filter by discount status
- Sort accommodation records
- Upload accommodation images

### 👤 Account Management

Authenticated staff members can manage their own accounts.

- Profile editing
- Avatar upload
- Password changes
- Account information management
- Secure logout

### ⚙️ Hotel Settings

Hotel-wide operational settings can be configured from the settings interface.

- Minimum stay duration
- Maximum stay duration
- Maximum guest capacity
- Breakfast pricing

### 🎨 User Experience

Grand Arcadia includes a reusable interface system designed around everyday hotel operations.

- Responsive application layout
- Light and dark themes
- Persistent theme preference
- Reusable UI components
- Modal confirmation flows
- Toast notifications
- Data tables
- Interactive charts
- Filtering and sorting
- Form validation

---

## Tech Stack

| Technology                        | Role                                            |
| --------------------------------- | ----------------------------------------------- |
| **React 19**                | Frontend application and component architecture |
| **Vite**                    | Development server and build tooling            |
| **React Router**            | Client-side routing and protected navigation    |
| **Supabase**                | Authentication, database, and storage           |
| **TanStack Query**          | Server-state management, caching, and mutations |
| **Styled Components**       | Component styling and theming                   |
| **Recharts**                | Dashboard data visualization                    |
| **React Hook Form**         | Form state and validation                       |
| **date-fns**                | Date manipulation and formatting                |
| **react-hot-toast**         | Application notifications                       |
| **Heroicons / React Icons** | Interface icons                                 |

---

## Architecture

Grand Arcadia follows a **feature-oriented React architecture**. Application screens are separated from business features, shared UI components, data-access services, and reusable hooks.

```text
src/
├── context/
│   └── DarkModeContext.jsx
│
├── data/
│   ├── Uploader.jsx
│   ├── data-bookings.js
│   ├── data-cabins.js
│   ├── data-guests.js
│   └── img/
│
├── features/
│   ├── authentication/
│   ├── bookings/
│   ├── cabins/
│   ├── check-in-out/
│   ├── dashboard/
│   └── settings/
│
├── hooks/
│   ├── useClickOutside.js
│   ├── useLocalStorageState.js
│   └── useMoveBack.js
│
├── pages/
│   ├── Account.jsx
│   ├── Bookings.jsx
│   ├── Cabins.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── PageNotFound.jsx
│   ├── ProtectedRoutes.jsx
│   ├── Settings.jsx
│   └── Users.jsx
│
├── services/
│   ├── apiAuth.js
│   ├── apiBookings.js
│   ├── apiCabins.js
│   ├── apiSettings.js
│   └── supabase.js
│
├── styles/
│   └── GlobalStyles.js
│
├── ui/
│   ├── AppLayout.jsx
│   ├── Button.jsx
│   ├── Form.jsx
│   ├── Modal.jsx
│   ├── Table.jsx
│   └── ...
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── App.jsx
└── main.jsx
```

### Directory Responsibilities

| Directory     | Responsibility                                             |
| ------------- | ---------------------------------------------------------- |
| `features/` | Domain-specific application functionality                  |
| `pages/`    | Top-level routed screens                                   |
| `services/` | Supabase queries, mutations, and authentication operations |
| `ui/`       | Shared reusable interface components                       |
| `hooks/`    | Reusable React hooks                                       |
| `context/`  | Global application context                                 |
| `styles/`   | Global styles, themes, and design tokens                   |
| `data/`     | Seed data and data-upload utilities                        |
| `utils/`    | Shared utility functions and constants                     |

---

## Data & Backend

Grand Arcadia uses **Supabase** as its backend and persistence layer.

The application communicates directly with Supabase through a dedicated service layer rather than maintaining a separate custom backend.

### Supabase is responsible for

- PostgreSQL database access
- User authentication
- Profile/account operations
- Accommodation data
- Booking data
- Guest data
- Hotel settings
- Image storage

The application uses Supabase operations including:

```text
select
insert
update
delete
eq
order
range
single
```

### Core Data

The application works with several primary data domains:

- **Bookings** — reservations, dates, prices, status, guests, and accommodation references
- **Accommodation** — capacity, pricing, discounts, and images
- **Guests** — guest information and contact details
- **Settings** — hotel-wide operational configuration
- **User avatars** — profile images stored in Supabase Storage
- **Accommodation images** — property images stored in Supabase Storage

Supabase Storage currently uses dedicated buckets for:

```text
avatars
cabin-images
```

---

## Authentication

Grand Arcadia uses **Supabase Auth** for email/password authentication.

The application does not implement a separate custom JWT authentication system.

### Authentication flow

1. A user signs in using their email and password.
2. Supabase establishes the authenticated session.
3. Grand Arcadia retrieves the current session/user.
4. Protected routes verify authentication before rendering.
5. Authenticated users can access the operational dashboard.
6. Users can update their account information and password.
7. Users can securely log out.

Protected navigation is handled through `ProtectedRoutes`.

Unauthenticated users are redirected to the login page.

The current application uses an **authenticated-user access model** rather than a granular role/permission hierarchy.

---

## Server-State Management

Grand Arcadia uses **TanStack Query** to manage remote application state.

This separates server data from local UI state and provides caching, invalidation, and synchronization between different parts of the application.

### Queries

`useQuery()` is used for data such as:

- Current user
- Bookings
- Accommodation
- Settings
- Dashboard statistics

### Mutations

`useMutation()` handles operations such as:

- Authentication
- Booking updates
- Accommodation changes
- Profile updates
- Settings changes

After mutations, relevant queries are invalidated so the interface reflects the latest database state.

### Pagination Prefetching

The booking interface also prefetches the next page while the current page is being viewed, helping make pagination feel more responsive.

---

## URL State

Several operational controls are represented through URL search parameters.

This includes:

- Booking filters
- Booking sorting
- Pagination
- Accommodation filtering
- Dashboard reporting periods

Using URL state allows operational views to preserve their filtering and sorting configuration without introducing unnecessary global state.

---

## UI & Design

Grand Arcadia uses **Styled Components** together with CSS custom properties to create a reusable visual system.

The application supports both light and dark themes.

### Design characteristics

- Light and dark themes
- Persistent theme preference
- Responsive dashboard layout
- Reusable buttons and form controls
- Reusable tables and menus
- Modal workflows
- Toast-based feedback
- Data visualization
- Branded application shell
- Responsive navigation
- Card-based dashboard widgets

The primary application layout is composed through `AppLayout`, with reusable UI primitives handling common interactions throughout the application.

---

## Dashboard Analytics

The dashboard uses **Recharts** to visualize operational data.

Current visualizations include:

- Booking/sales trends
- Stay-duration distribution
- Operational summary metrics
- Current-day activity

Dashboard calculations also use `date-fns` and the application's booking data to derive reporting periods and stay-related statistics.

---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js
- npm
- A Supabase project

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd grand-arcadia
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
VITE_SUPABASE_KEY=your_supabase_anon_key
```

Grand Arcadia currently reads the Supabase API key from `VITE_SUPABASE_KEY`.

The Supabase project URL is configured in:

```text
src/services/supabase.js
```

> Never commit real Supabase credentials or other secrets to the repository.

---

## Development

Start the development server:

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

## Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## Typical Hotel Workflow

Grand Arcadia is structured around a straightforward operational workflow:

```text
              ┌─────────────────┐
              │     Sign In     │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    Dashboard    │
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
     Bookings     Accommodation   Settings
          │
          ▼
    Booking Details
          │
     ┌────┴────┐
     ▼         ▼
 Check-In   Booking Management
     │
     ▼
   Guest Stay
     │
     ▼
  Check-Out
```

This workflow keeps the core operational activities accessible from a single management interface.

---

## Project Highlights

Some of the more notable implementation details include:

- Feature-oriented React architecture
- Dedicated Supabase service layer
- TanStack Query server-state management
- Query invalidation after mutations
- Booking pagination with next-page prefetching
- URL-driven filtering and sorting
- Protected application routes
- Persistent dark-mode preference
- Reusable Styled Components design system
- Supabase Storage integration for images
- React Hook Form validation
- Dashboard data visualization with Recharts
- Responsive operational dashboard

---

## Roadmap

Potential future improvements include:

- Dedicated guest management with full CRUD and search
- Granular role-based access control
- A complete reservation creation workflow
- Advanced operational reporting
- Exportable booking and revenue reports
- More detailed occupancy forecasting
- Automated testing for authentication, bookings, and dashboard calculations

These features are **not currently implemented** and represent potential future development.

---

## Project Structure

At the repository level:

```text
grand-arcadia/
│
├── public/
│   ├── Logo-Dark.svg
│   ├── Logo-Light.svg
│   ├── header-dark.png
│   ├── header-light.png
│   ├── login-dark.png
│   ├── login-light.png
│   ├── sidebar-dark.png
│   ├── sidebar-light.png
│   └── default-user.jpg
│
├── src/
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## License

This repository does not currently contain a license file.

---

<p align="center">
  <strong>Grand Arcadia</strong>
  <br>
  Hotel operations, simplified.
</p>
