# Destination Cafe

A responsive cafe website built with React + Vite, CSS, Node.js + Express, and MySQL.

## Requirements
- Node.js 20+
- npm
- MySQL 8+
- Git

## Project structure
- `frontend/` React website
- `backend/` Express API and MySQL connection
- `database/schema.sql` database and bookings table

## 1. Create the database
Open MySQL Workbench or the MySQL CLI and run the contents of `database/schema.sql`.

## 2. Configure and run the backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` and update the MySQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=destination_cafe
CLIENT_ORIGIN=http://localhost:5173
```
Start the API:
```bash
npm run dev
```
Test `http://localhost:5000/api/health`.

## 3. Configure and run the frontend
Open a second terminal:
```bash
cd frontend
npm install
```
Copy `.env.example` to `.env`:
```env
VITE_API_URL=http://localhost:5000
```
Start React:
```bash
npm run dev
```
Open the URL Vite prints, usually `http://localhost:5173`.

## 4. Test a reservation
Submit the form on the website. Then run:
```sql
USE destination_cafe;
SELECT * FROM bookings ORDER BY created_at DESC;
```

## 5. Deploy

### Database (Railway)
1. Create a Railway project and add a MySQL service.
2. Open the MySQL service's connection variables.
3. Use the public/TCP connection values if your backend is hosted outside Railway.
4. Run `database/schema.sql` against that hosted database using a MySQL client.
5. Keep database credentials private.

### Backend (Render)
1. Push this repository to GitHub.
2. In Render, create a new **Web Service** connected to the repository.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` from Railway
   - `CLIENT_ORIGIN` = your deployed Vercel website URL (for example `https://your-project.vercel.app`)
   - `NODE_ENV` = `production`
7. Deploy and test `https://YOUR-RENDER-SERVICE.onrender.com/api/health`.

### Frontend (Vercel)
1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_API_URL` = your Render API base URL, without a trailing slash.
7. Deploy.

If you change `CLIENT_ORIGIN` or `VITE_API_URL`, redeploy the affected service.

## Notes before real-world use
This starter accepts reservation requests and stores them. It does not yet check live table capacity, prevent overlapping reservations, send confirmation messages, or provide an admin dashboard. Add those features before using it as a real booking system. Use HTTPS, strong database credentials, backups, and a privacy notice for production.
