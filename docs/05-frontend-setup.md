# 05. Frontend Setup

The frontend is built with **React.js** using **Vite** as the build tool, providing fast development experience.

## Folder Structure

```
frontend/
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── public/
│   └── CVs/                    # Uploaded CV storage (local)
└── src/
    ├── App.css                 # Global styles
    ├── App.jsx                 # Main app component with routing
    ├── main.jsx                # React entry point
    └── components/             # React components
        ├── Application/        # Job application components
        │   ├── Application.jsx
        │   ├── MyApplications.jsx
        │   └── ResumeModal.jsx
        ├── Auth/               # Authentication components
        │   ├── Login.jsx
        │   └── Register.jsx
        ├── Home/               # Home page components
        │   ├── HeroSection.jsx
        │   ├── Home.jsx
        │   ├── HowItWorks.jsx
        │   ├── PopularCategories.jsx
        │   └── PopularCompanies.jsx
        ├── Job/                # Job-related components
        │   ├── JobDetails.jsx
        │   ├── Jobs.jsx
        │   ├── MyJobs.jsx
        │   └── PostJob.jsx
        ├── Layout/             # Layout components
        │   ├── Footer.jsx
        │   └── Navbar.jsx
        └── NotFound/           # 404 page
            └── NotFound.jsx
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | Core React library |
| `react-dom` | React DOM rendering |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client for API calls |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon library |
| `lucide-react` | Modern icon set |
| `tailwindcss` | Utility-first CSS framework |
| `vite` | Build tool and dev server |

## Architecture Overview

### 1. **main.jsx** - Entry Point
- Creates a React Context (`Context`) for global state
- Manages authentication state (`isAuthorized`, `user`)
- Wraps the app with `Context.Provider`

**Global State:**
```javascript
const [isAuthorized, setIsAuthorized] = useState(false);
const [user, setUser] = useState({});
```

### 2. **App.jsx** - Main Application
- Sets up React Router with all routes
- Fetches user data on mount to check authentication
- Includes `Navbar` and `Footer` on all pages

**Key Features:**
- Auto-authentication check on page load
- Protected routes based on `isAuthorized` state
- API calls to backend using Axios

### 3. **Component Structure**

Components are organized by feature:

- **Auth**: Login and Register forms
- **Home**: Landing page sections
- **Job**: Job listing, details, posting, and management
- **Application**: Job application submission and tracking
- **Layout**: Navbar and Footer (shared across pages)

### 4. **Styling**
- Uses **TailwindCSS** for utility-first styling
- Custom styles in `App.css`
- Responsive design for mobile, tablet, and desktop

## Installing Frontend Dependencies

Navigate to the frontend folder and install all dependencies:

```bash
cd frontend
npm install
```

This will install all packages listed in `package.json`.

## Development Server

Vite provides a fast development server with hot module replacement (HMR):

```bash
npm run dev
```

The app will run on **http://localhost:5173** by default.

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder with minified and optimized files.

## Environment Configuration

The frontend currently uses hardcoded API URLs:

```javascript
const response = await axios.get(
  "http://localhost:4000/api/v1/user/getuser",
  { withCredentials: true }
);
```

### Recommended Improvement

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

Then use it in code:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
const response = await axios.get(`${API_URL}/user/getuser`, {
  withCredentials: true
});
```

**Note:** Vite requires environment variables to be prefixed with `VITE_`.

## Routing Structure

The app uses React Router with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page |
| `/login` | `Login` | User login |
| `/register` | `Register` | User registration |
| `/job/getall` | `Jobs` | Job listings | 

| `/job/:id` | `JobDetails` | Single job details |
| `/application/:id` | `Application` | Apply for a job |
| `/applications/me` | `MyApplications` | User's applications |
| `/job/post` | `PostJob` | Post a new job (employers) |
| `/job/me` | `MyJobs` | Employer's posted jobs |
| `*` | `NotFound` | 404 page |

## Key Frontend Features

1. **Authentication**: JWT-based with cookies
2. **Authorization**: Different views for job seekers vs employers
3. **File Upload**: Resume/CV upload for applications
4. **Real-time Feedback**: Toast notifications for user actions
5. **Responsive Design**: Works on all screen sizes

## Next Steps

Before running the frontend:
1. Ensure backend is running on `http://localhost:4000`
2. Configure environment variables if needed
3. Follow instructions in `07-running-the-project.md`

---
**Next:** `docs/06-api-integration.md`
