# Wealthify - Project Assumptions

This document outlines the core technical and architectural assumptions made during the development and structuring of the Wealthify dashboard project.

## 1. Frontend Architecture
- **Vanilla Setup:** The frontend is intentionally built using pure Vanilla JavaScript (ES6+ features) and standard CSS without relying on modern framework bundlers (like Webpack, Vite) or UI libraries (like React, Angular, or Vue).
- **Client-Side Rendering:** The backend provides raw JSON data via REST APIs, and the frontend JS handles all HTML generation, rendering, and DOM manipulation.
- **Client-Side Sorting/Pagination:** Some table sorting and logic are assumed to be handled client-side for immediate UI responsiveness, while large datasets use backend pagination.

## 2. Backend Architecture
- **FastAPI Framework:** Python with FastAPI is used for its high performance and automatic Swagger UI generation.
- **RESTful API:** The backend strictly follows RESTful principles for CRUD operations.

## 3. Database
- **PostgreSQL Exclusive:** The system assumes a PostgreSQL database (`psycopg2` driver). Other SQL dialects (SQLite, MySQL) are not guaranteed to be fully compatible with specific schema configurations used.
- **Public Schema:** All tables (`investors`, `funds`, `transactions`) exist under the default `public` schema in PostgreSQL.

## 4. Environment & Deployment
- **Vercel Zero Config:** The repository structure is optimized for Vercel's zero-configuration deployment. The root handles static frontend serving, while the `api/` directory (or specific Vercel configuration) seamlessly translates Python scripts into Serverless Functions.
- **No Authentication Layer:** Currently, the API routes and dashboard are assumed to be public. No JWT, session, or role-based access control (RBAC) mechanisms have been integrated.

## 5. Third-Party Libraries
- **Chart.js:** Assumed to be loaded via CDN for data visualization.
- **FontAwesome:** Assumed to be loaded via CDN for iconography.
