# Shubharambh Realty — Multi-Role Backend API

Robust, enterprise-grade Role-Based Access Control (RBAC) authentication engine and REST API designed for Shubharambh Realty. Supports 5 discrete organizational roles with zero-trust input validation, bcrypt password hashing, and HttpOnly JWT cookie sessions.

---

## 🏗️ Visual Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Mongoose connection with error handling
│   ├── controllers/
│   │   └── authController.js     # Register, Login, Logout, Profile controllers
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT extraction, session verification & active check
│   │   ├── roleMiddleware.js     # Multi-level RBAC role authorization gatekeeper
│   │   └── errorMiddleware.js    # Sanitized errors (Mongoose duplicate/cast/validation)
│   ├── models/
│   │   └── User.js               # Multi-role User schema & bcrypt pre-save hooks
│   ├── routes/
│   │   └── authRoutes.js         # Public auth & role-gated verification endpoints
│   ├── utils/
│   │   └── token.js              # JWT generator & Secure SameSite HttpOnly cookies
│   └── app.js                    # Express app configuration, CORS, Helmet, Rate Limiter
├── server.js                     # Server bootstrap & cluster process handling
├── .env.example                  # Environment variables template
├── .env                          # Local credentials (ignored by git)
├── .gitignore                    # Git exclusions
├── package.json                  # Scripts & dependencies
└── README.md                     # Documentation & API reference
```

---

## 👥 Role Hierarchy & Access Matrix

| Role | Key Scope | Permitted Endpoints |
| :--- | :--- | :--- |
| **`super_admin`** | Executive owner, financial metrics, system audit, user role provisioning | Access to all routes & admin management |
| **`admin`** | Property management, RM allocations, customer enquiries | Property & operations endpoints |
| **`rm`** (Relationship Mgr) | Customer leads, site visit schedules, pipeline tracking | Assigned leads, site visits & logs |
| **`agent`** | Direct listings, property bookings, client commissions | Assigned listings & customer enquiries |
| **`customer`** | Real estate browsing, wishlists, booking requests | Public search, my bookings & enquiries |

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22 recommended)
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your configuration:
```bash
cp .env.example .env
```

Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shubharambh_realty
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 3. Run Server
Development mode (with nodemon auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

---

## 🔒 Security Architecture

1. **Zero-Trust Input Validation**:
   - Phone numbers strictly validated (10–14 digits).
   - Email format verified regex-level and stored strictly lowercased.
   - Passwords enforce minimum 6 characters.

2. **Credential & Cookie Security**:
   - Passwords hashed with `bcryptjs` using 10 salt rounds.
   - Passwords excluded by default from query results (`select: false`).
   - Session tokens dispatched via `HttpOnly`, `SameSite=Strict`, `Secure` (in prod) cookies to eliminate XSS token theft.

3. **Multi-Level RBAC Enforcement**:
   - `authorizeRoles('super_admin', 'admin')` verifies role server-side on every request.
   - Public registration strictly restricted: Elevated roles (`super_admin`, `admin`, `rm`) cannot be self-assigned unless the database has 0 users (initial setup bootstrap). After that, only an authenticated `super_admin` can provision administrative roles.

4. **API Hardening**:
   - Rate limiting via `express-rate-limit` (100 requests per 15 minutes on auth endpoints).
   - HTTP security headers via `helmet`.
   - Strict CORS origin binding with `credentials: true`.

---

## 📡 API Endpoints Reference

### Public & Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user (customer / agent, or super_admin bootstrap) | No (or Super Admin for elevated roles) |
| `POST` | `/api/auth/login` | Login via email or phone + password (returns JWT & HttpOnly cookie) | No |
| `POST` | `/api/auth/logout` | Clear session cookie | Yes |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile | Yes (Any role) |
| `PUT` | `/api/auth/update-password` | Update account password | Yes (Any role) |

### Sample Payload: Register
```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "Rajesh Sharma",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "password": "SecurePassword123",
  "role": "customer"
}
```

### Sample Payload: Login
```json
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "rajesh@example.com",
  "password": "SecurePassword123"
}
```
*(Note: `identifier` can be either Email or Phone Number)*

### RBAC Test / Tier-Gated Endpoints

| Method | Endpoint | Permitted Roles |
| :--- | :--- | :--- |
| `GET` | `/api/auth/role-check/super-admin` | `super_admin` only |
| `GET` | `/api/auth/role-check/admin` | `super_admin`, `admin` |
| `GET` | `/api/auth/role-check/rm` | `super_admin`, `admin`, `rm` |
| `GET` | `/api/auth/role-check/agent` | `super_admin`, `admin`, `agent` |
| `GET` | `/api/auth/role-check/customer` | `customer` only |

---

## 🚀 Production Deployment Guide

1. Set `NODE_ENV=production` in your server environment.
2. Ensure `JWT_SECRET` is set to a cryptographically secure 64+ character random hex string.
3. Replace `MONGO_URI` with a secured MongoDB cluster connection string with SSL/TLS enabled (`+srv`).
4. Set `CLIENT_URL` to the production domain (`https://shubharambhrealty.eformx.com`).
5. Run behind a reverse proxy (e.g., NGINX / Caddy) with automated SSL certificates (Let's Encrypt).
6. Process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "shubharambh-api" -i max
   pm2 save
   pm2 startup
   ```

