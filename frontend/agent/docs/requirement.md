# Agent — Functional & Dashboard Requirements

## 1. Role Scope & Authority
Agents represent active field brokers and real estate associates responsible for listing inventory, fielding prospect questions, and closing deals.

## 2. Key Screen Components (from Reference Design)
1. **Header & Profile**:
   - Shubharambh Realty logo, Notification bell with count `2`.
   - Agent profile avatar with Indigo badge 🧑‍💼.
2. **Hero Banner**:
   - Title: *Agent Dashboard*
   - Subtitle: *Manage your properties and customer enquiries*
3. **4 Key KPI Stat Cards**:
   - My Properties: `12` (`+20%`, Sky Blue `#0284C7`)
   - My Enquiries: `28` (`+15%`, Mint Green `#16A34A`)
   - My Customers: `16` (Warm Peach `#EA580C`)
   - My Bookings: `4` (Purple `#9333EA`)
4. **My Properties List**:
   - *3 BHK Independent House (Gomti Nagar, Lucknow)* — `₹ 85 Lakh` — Status: `Active` (`#DCFCE7` / `#16A34A`).
   - *2 BHK Apartment (Gomti Nagar, Lucknow)* — `₹ 65 Lakh` — Status: `Active` (`#DCFCE7` / `#16A34A`).
   - *Residential Plot (Faizabad Road, Lucknow)* — `₹ 32 Lakh` — Status: `Pending` (`#FEF3C7` / `#D97706`).
5. **Recent Enquiries Feed**:
   - Vikash Singh: *Interested in 3 BHK House* — Status: `New` (`15 mins ago`).
   - Sunita Patel: *Plot enquiry in Gomti Nagar* — Action: `Call` (`#DBEAFE` / `#2563EB`).
   - Aakash Raj: *2 BHK Apartment* — Status: `Interested` (`2 hours ago`).
   - Pooja Kumari: *Villa enquiry* — Status: `Follow Up` (`3 hours ago`).
6. **Bottom Navigation**:
   - Tabs: `Dashboard`, `Properties`, `Enquiries`, `Customers`, `More`.

## 3. Technical Requirements
- Modern React + GPU-accelerated CSS animations.
- 90–120 FPS target response time with `< 16ms` interactions.
