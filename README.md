# Hospital Management App

A full-stack web application for managing hospital operations, appointments, and patient records.

## Features

- Patient Management
- Doctor Management
- Appointment Scheduling
- Admin Dashboard
- User Authentication
- Responsive Design

## Tech Stack

- Frontend: React, Styled Components
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd hospital-management-app
```

2. Install Backend Dependencies:
```bash
cd Backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

4. Configure Environment Variables:
   - Create `.env` file in Backend directory
   - Set required environment variables (see .env.example)

5. Start the Application:
```bash
# Start Backend (from Backend directory)
npm run dev

# Start Frontend (from frontend directory)
npm start
```

## Environment Variables

Create a `.env` file in the Backend directory with the following variables:
```
DB_Url=mongodb://localhost:27017/hospital
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

