# NineDimensions Fitness Application

## Overview

**NineDimensions** is a full-stack fitness application designed to help users track their health, nutrition, and exercise, while also providing a platform for coaches to manage and guide their trainees. The app offers personalized plans based on user goals (lose weight, gain muscle, manage stress, etc.), and features both user and coach interfaces for a holistic fitness experience.

---

## Features

- **User Authentication:** Secure login/signup for both members and coaches using hashed passwords.
- **Personalized Dashboard:** Users can view and manage their profile, daily meals, and exercise routines.
- **Coach Dashboard:** Coaches can view their trainees, assign meals and exercises, and manage their coaching profile.
- **Food & Exercise Database:** Pre-populated with a variety of foods and exercises, with calories and descriptions.
- **Goal Tracking:** Users select goals and are matched with coaches specializing in those areas.
- **Interactive Quizzes:** Onboarding quizzes for both users and coaches to personalize experience and matching.
- **Responsive UI:** Built with React and styled for modern usability.
- **RESTful API:** Flask backend serving JSON endpoints for all app data.
- **Role-Based Access:** MySQL roles for coaches and members, with granular permissions.
- **Session Management:** Secure session handling for authenticated routes.
- **Cross-Origin Resource Sharing:** Enabled for seamless frontend-backend communication.

---

## Technologies Used

### Frontend
- **React** (with React Router)
- **Vite** (for fast development and build)
- **ESLint** (with React and hooks plugins)
- **CSS Modules** and custom styles

### Backend
- **Python Flask** (REST API)
- **Flask-MySQLdb** (MySQL integration)
- **bcrypt** (password hashing)
- **python-dotenv** (environment variable management)
- **Flask-CORS** (CORS support)

### Database
- **MySQL** (schema for users, coaches, food, exercises, and role management)

### DevOps & Tooling
- **npm** (frontend package management)
- **.env** (for secrets and configuration)
- **VS Code** (recommended editor, with launch/debug configs)

---

## Project Structure

```
.
├── app4521.py                # Example script for API integration
├── setupDB.py                # Python script for DB setup/testing
├── proj4521.sql              # MySQL schema and seed data
├── server/
│   └── api/
│       └── app.py            # Flask backend API
├── client/
│   ├── src/
│   │   ├── components/       # React components (NavBar, Dashboard, etc.)
│   │   ├── pages/            # Page-level React components
│   │   ├── styles/           # CSS files
│   │   └── images/           # Static assets
│   ├── package.json          # Frontend dependencies and scripts
│   └── vite.config.js        # Vite config with API proxy
└── .vscode/                  # Editor configs for C++/Python debugging
```

---

## How It Works

1. **User/Coach Signup:**  
   - Users and coaches register via interactive quizzes.
   - Passwords are hashed and stored securely.
   - Users are matched with coaches based on selected goals.

2. **Authentication & Session:**  
   - Login endpoints validate credentials and create a session.
   - Protected routes (dashboard, profile) require authentication.

3. **Dashboard Experience:**  
   - Users see their profile, assigned meals, and exercises.
   - Coaches see a list of trainees and can assign meals/exercises.

4. **Data Management:**  
   - All data (users, coaches, foods, exercises) is stored in MySQL.
   - RESTful API endpoints provide CRUD operations.

5. **Frontend-Backend Communication:**  
   - React frontend communicates with Flask backend via `/api` endpoints.
   - Vite proxy ensures seamless local development.

---

## Setup & Installation

### Prerequisites

- Node.js & npm
- Python 3.x
- MySQL Server

### 1. Clone the Repository

```sh
git clone https://github.com/COP4521-Health-Application/COP4521_Project.git
cd COP4521_Project
```

### 2. Database Setup

- Import the schema and seed data:

```sh
mysql -u <user> -p < proj4521.sql
```

- (Optional) Test DB connection:

```sh
python setupDB.py
```

### 3. Backend Setup

```sh
cd server/api
pip install -r requirements.txt  # (create this if not present)
# Set up .env file with your DB credentials and secret key
python app.py
```

### 4. Frontend Setup

```sh
cd ../../client
npm install
npm run dev
```

- The app will be available at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend API).

---

## Notable Engineering Details

- **Security:** Passwords are hashed with bcrypt. Sessions are managed securely via Flask.
- **Scalability:** Modular React components and RESTful API design.
- **Extensibility:** Easy to add new goals, foods, exercises, or roles.
- **Testing:** ESLint for code quality; backend and DB scripts for integration testing.
- **API Integration:** Example scripts for fetching exercise/food data from external APIs.

---

## Contributors

- Rood Vilmont (Authentication)
- Sebastian Metellus (Frontend, UI/UX, Quiz)
- Jeremiah Daniels (Backend, DB, API Integration)
- Ricardi Antoine (Coach UI, Integration, Design)

---

## License

This project is for educational purposes. See [LICENSE](LICENSE) if present.

---
