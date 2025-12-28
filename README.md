# Job Portal - MERN Stack Project

A full-stack job portal application built with MongoDB, Express.js, React.js, and Node.js. This platform connects job seekers with employers, allowing users to post jobs, apply for positions, and manage applications.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access (Job Seeker / Employer)
- **Job Management**: Employers can post, update, and delete job listings
- **Job Applications**: Job seekers can browse jobs and submit applications with resume upload
- **Resume Storage**: Cloudinary integration for secure resume storage
- **Responsive Design**: Mobile-friendly UI built with TailwindCSS
- **Real-time Notifications**: Toast notifications for user feedback

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign up](https://cloudinary.com/) (for file uploads)

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Job-Portal
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create config directory
mkdir config

# Create and configure environment variables
# Copy the content from .env.example and update with your values
# File location: backend/config/config.env
```

**Configure `backend/config/config.env`:**

```env
PORT=4000
NODE_ENV=development
DB_URL=mongodb://localhost:27017
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Start the backend server:**

```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

Backend will run at **http://localhost:4000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at **http://localhost:5173**

## 📁 Project Structure

```
Job-Portal/
├── backend/                 # Node.js + Express backend
│   ├── config/
│   │   └── config.env       # Environment variables
│   ├── controllers/         # Business logic
│   ├── database/            # Database connection
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── app.js               # Express configuration
│   ├── server.js            # Server entry point
│   └── package.json
│
├── frontend/                # React.js frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React entry point
│   │   └── config.js        # API configuration
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── docs/                    # Detailed documentation
│   ├── 01-project-overview.md
│   ├── 02-backend-setup.md
│   ├── 03-database-setup.md
│   ├── 04-env-configuration.md
│   ├── 05-frontend-setup.md
│   ├── 06-api-integration.md
│   ├── 07-running-the-project.md
│   └── 08-troubleshooting.md
│
├── .env.example             # Example environment variables
├── .gitignore
└── README.md
```

## 🔑 Environment Variables

### Backend (`backend/config/config.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `4000` |
| `DB_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `JWT_SECRET_KEY` | Secret for JWT signing | `your_secret_key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Your cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Your API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Your API secret |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:4000/api/v1` |

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user
- `GET /api/v1/user/getuser` - Get current user (protected)

### Jobs
- `GET /api/v1/job/getall` - Get all jobs
- `GET /api/v1/job/:id` - Get single job (protected)
- `POST /api/v1/job/post` - Post new job (Employer only)
- `GET /api/v1/job/getmyjobs` - Get employer's jobs (protected)
- `PUT /api/v1/job/update/:id` - Update job (protected)
- `DELETE /api/v1/job/delete/:id` - Delete job (protected)

### Applications
- `POST /api/v1/application/post` - Submit application (Job Seeker only)
- `GET /api/v1/application/jobseeker/getall` - Get job seeker's applications (protected)
- `GET /api/v1/application/employer/getall` - Get employer's received applications (protected)
- `DELETE /api/v1/application/delete/:id` - Delete application (protected)

### Health Check
- `GET /api/health` - Server health check

## 🧪 Testing the Application

1. **Register a User**:
   - Navigate to http://localhost:5173/register
   - Create an account as either "Job Seeker" or "Employer"

2. **Login**:
   - Go to http://localhost:5173/login
   - Enter your credentials

3. **Post a Job** (as Employer):
   - Navigate to "Post Job"
   - Fill in job details and submit

4. **Apply for a Job** (as Job Seeker):
   - Browse available jobs
   - Click on a job and submit your application with resume

## 📚 Documentation

Detailed documentation is available in the `docs/` folder:

- [00 - Complete Setup Guide (Start Here!)](docs/00-complete-setup-guide.md) ⭐
- [01 - Project Overview](docs/01-project-overview.md)
- [02 - Backend Setup](docs/02-backend-setup.md)
- [03 - Database Setup](docs/03-database-setup.md)
- [04 - Environment Configuration](docs/04-env-configuration.md)
- [05 - Frontend Setup](docs/05-frontend-setup.md)
- [06 - API Integration](docs/06-api-integration.md)
- [07 - Running the Project](docs/07-running-the-project.md)
- [08 - Troubleshooting](docs/08-troubleshooting.md)
- [09 - Verification Checklist](docs/09-verification-checklist.md)

## 🔧 Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Axios
- TailwindCSS
- React Hot Toast

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Bcrypt
- Cloudinary
- Cookie Parser

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
- Ensure `FRONTEND_URL` in backend config.env matches your frontend URL
- Verify backend CORS middleware is properly configured

**Database Connection Failed:**
- Check if MongoDB service is running
- Verify `DB_URL` in config.env is correct

**File Upload Issues:**
- Verify Cloudinary credentials
- Check file size limits

For more solutions, see [docs/08-troubleshooting.md](docs/08-troubleshooting.md)

## 🚦 Running Both Servers

You need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📦 Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Your Name - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- MERN Stack community
- MongoDB Documentation
- Express.js Documentation
- React Documentation
- Cloudinary for file storage

---

**Built with ❤️ using the MERN Stack**

For detailed setup instructions, please refer to the [documentation](docs/) folder.
