# 03. Database Setup

This project uses **MongoDB** as the database with **Mongoose** as the ODM (Object Data Modeling) library.

## MongoDB Connection

The database connection is handled in [`backend/database/dbConnection.js`](../backend/database/dbConnection.js).

### Connection Code

```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL, {
    dbName: "Job_Portal"
  })
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log(`Failed to connect: ${error}`);
  });
};

export default dbConnection;
```

### Database Name
- **Database Name**: `Job_Portal`
- The database is automatically created when you first connect and insert data

## Database Models (Schemas)

The project uses three main Mongoose models:

### 1. **User Schema** ([`backend/models/userSchema.js`](../backend/models/userSchema.js))

Stores user information for both job seekers and employers.

**Fields:**
- `name` (String, 3-30 chars, required)
- `email` (String, validated email, required)
- `phone` (Number, required)
- `password` (String, 8-32 chars, hashed, required)
- `role` (Enum: "Job Seeker" or "Employer", required)
- `createdAt` (Date, auto-generated)

**Features:**
- Password is automatically hashed before saving (using bcrypt)
- Password comparison method for login
- JWT token generation method
- Password field is not returned by default (select: false)

### 2. **Job Schema** ([`backend/models/jobSchema.js`](../backend/models/jobSchema.js))

Stores job postings created by employers.

**Fields:**
- `title` (String, 3-30 chars, required)
- `description` (String, 10-500 chars, required)
- `category` (String, required)
- `country` (String, required)
- `city` (String, required)
- `location` (String, 20+ chars, required)
- `fixedSalary` (Number, optional)
- `salaryFrom` (Number, optional)
- `salaryTo` (Number, optional)
- `expired` (Boolean, default: false)
- `jobPostedOn` (Date, auto-generated)
- `postedBy` (ObjectId, references User)

**Salary Options:**
- Either provide a `fixedSalary` OR a range (`salaryFrom` to `salaryTo`)

### 3. **Application Schema** ([`backend/models/applicationSchema.js`](../backend/models/applicationSchema.js))

Stores job applications submitted by job seekers.

**Fields:**
- `name` (String, 3-30 chars, required)
- `email` (String, validated email, required)
- `coverLetter` (String, required)
- `phone` (Number, required)
- `address` (String, required)
- `resume` (Object with `public_id` and `url` from Cloudinary)
- `applicantID` (Object with user ObjectId and role "Job Seeker")
- `employerID` (Object with user ObjectId and role "Employer")

**Resume Storage:**
- Resumes are uploaded to **Cloudinary**
- Stored as `{ public_id, url }`

## MongoDB Setup Options

You have two options for MongoDB:

### Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a **Free Cluster** (M0 Sandbox)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database user credentials
7. Add this to your `.env` file as `DB_URL`

**Network Access:**
- Go to **Network Access** in Atlas
- Add your current IP address or use `0.0.0.0/0` (allow from anywhere - for development only)

### Option 2: MongoDB Local Installation

1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB runs as a service automatically
   - **Mac/Linux**: Run `mongod` in terminal
3. Use this connection string in `.env`:
   ```
   DB_URL=mongodb://localhost:27017
   ```

## Verifying Database Connection

When you start the backend server, you should see:

```
MongoDB Connected Successfully!
Server running at port 4000
```

If connection fails, check:
- MongoDB service is running (local) or Atlas cluster is active
- `DB_URL` in `.env` is correct
- Network access is allowed (Atlas)
- Username and password are correct (Atlas)

## Database Tools

To view and manage your data:

- **MongoDB Compass** (GUI): [Download here](https://www.mongodb.com/products/compass)
- **MongoDB Atlas UI**: Built-in data browser for cloud databases
- **VS Code Extension**: MongoDB for VS Code

---
**Next:** `docs/04-env-configuration.md`
