# Cineflow Notification Service

A standalone Node.js microservice designed to handle background email notifications for the [ClinFlow](https://github.com/prantaroy11/ClinFlow) movie booking platform. 

To prevent the main API from slowing down or timing out during third-party network requests, this service uses a database-polling architecture. It reads `PENDING` notification tickets from a MongoDB database and dispatches them asynchronously using a scheduled cron job and the Resend API.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Email Provider:** Resend API
* **Task Scheduling:** `node-cron`

---

## 🚀 Local Setup

### Prerequisites
* Node.js (v16+)
* MongoDB (Local or Atlas)
* Resend API Key

### Installation

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/prantaroy11/NotificationService.git
cd NotificationService
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3001
NODE_ENV=development
DB_URL=mongodb://localhost:27017/noti_db
PROD_DB_URL=your_mongodb_atlas_url
RESEND_API_KEY=re_your_api_key_here
```

3. Start the development server:
```bash
npm run dev
```
*The server will start on port 3001, and the mailer cron job will execute every 2 minutes.*

---

## 📡 API Endpoints

### `POST /notiservice/api/v1/notifications`
Create a new email ticket (Status defaults to `PENDING`).

### `GET /notiservice/api/v1/notifications`
Retrieve all tickets (Pending, Success, Failed).

### `GET /notiservice/api/v1/notifications/:id`
Retrieve a specific ticket by ID.

---

## 🔗 Related Repository
* **[ClinFlow (Core API)](https://github.com/prantaroy11/ClinFlow):** The main backend API that generates the ticket booking payloads.