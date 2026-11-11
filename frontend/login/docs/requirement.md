# Login & Auth — Functional & Technical Requirements

## 1. Objective
Provide a high-security, fast-loading, multi-role authentication gateway for Shubharambh Realty.

## 2. Supported Roles
- **Super Admin**: Organization owner & high-level analytics access.
- **Admin**: Property & team operations manager.
- **RM**: Relationship Manager (leads & site visits).
- **Agent**: Property brokers & direct clients.
- **Customer**: Buyers, tenants & real estate investors.

## 3. Core Requirements
- **Authentication Methods**:
  - Phone Number + OTP verification with resend countdown (30s).
  - Email + Password with toggle visibility & validation.
- **Role Routing**:
  - Automatic redirect to corresponding dashboard folder upon authentication.
- **Security & Validation**:
  - CSRF protection & token storage.
  - Sanitized input fields with immediate visual feedback (`:user-valid` / `:user-invalid`).
- **Performance Standard**:
  - Built with React, responding at 90–120 FPS with GPU-accelerated micro-animations.
