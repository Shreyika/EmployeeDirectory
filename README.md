# Employee Directory

A full-stack Employee Directory application built using React, TypeScript, Python Flask, and MySQL.

The application allows users to manage employee records with CRUD operations, search, and pagination.

## Technologies Used

**Frontend**
- React
- TypeScript
- Vite
- Axios
- Bootstrap
- Bootstrap Icons

**Backend**
- Python
- Flask
- Flask-CORS
- MySQL Connector
- python-dotenv

**Database**
- MySQL

## Features

- View all employees
- Add new employees
- Edit employee details
- Delete employees
- Search employees by name, email, or role
- Pagination with 5 employees per page
- MySQL database integration

## Prerequisites

Install the following before running the application:

- Python 3
- Node.js and npm
- MySQL Server
- Git (optional)

## Project Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd EmployeeDirectory
```

### 2. Database Setup

Open MySQL Workbench and execute:

```sql
CREATE DATABASE employee_directory;

USE employee_directory;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend folder and configure your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=employee_directory
```

Replace `YOUR_MYSQL_PASSWORD` with your local MySQL password.

Start the Flask backend:

```bash
python app.py
```

Backend URL:

http://127.0.0.1:5000

### 4. Frontend Setup

Open a second terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

## Running the Application

Make sure both servers are running simultaneously:

| Component | URL |
|---|---|
| React Frontend | http://localhost:5173 |
| Flask Backend | http://127.0.0.1:5000 |
| Employee API | http://127.0.0.1:5000/employees |

Open the frontend URL in your browser to access the Employee Directory.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Fetch all employees |
| POST | `/employees` | Add an employee |
| PUT | `/employees/<id>` | Update an employee |
| DELETE | `/employees/<id>` | Delete an employee |

## Author

Employee Directory Project
