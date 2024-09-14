
# Laravel 11 + Vue.js 3 Project

This repository contains a web application built using Laravel 11 on the backend and Vue.js 3 on the frontend. The project also uses Laravel Sanctum for authentication and Vue Router for handling the frontend routing.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Laravel 11 Backend** with Sanctum for authentication
- **Vue.js 3 Frontend** with Vue Router for client-side routing
- User registration and login functionality
- Secure authentication using **Laravel Sanctum**
- Fetch and display user data
- RESTful API to manage users
- Use of `.env` variables for API Base URL in Vue.js

## Technologies Used

- **Backend:** Laravel 11, PHP 8.x
- **Frontend:** Vue.js 3, Vite, Pinia for state management
- **Authentication:** Laravel Sanctum
- **Database:** MySQL (or any database supported by Laravel)
- **HTTP Client:** Axios
- **CSS Framework:** Tailwind CSS (Optional, based on your preferences)

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- PHP 8.x
- Composer
- Node.js with npm or yarn
- MySQL or another database supported by Laravel

### Steps to Install

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install backend dependencies**

   Run the following command to install Laravel and other PHP dependencies:

   ```bash
   composer install
   ```

3. **Install frontend dependencies**

   Run the following command to install Vue.js and other JavaScript dependencies:

   ```bash
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root of your project by copying the example `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file with the correct database and Sanctum settings for the backend:

   ```bash
   APP_NAME=LaravelVueApp
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password

   SANCTUM_STATEFUL_DOMAINS=localhost:8000
   SESSION_DOMAIN=localhost
   ```

   In the frontend `.env` file (located in the root directory of your Vue.js project), define the base API URL for Axios:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

5. **Generate application key**

   ```bash
   php artisan key:generate
   ```

6. **Run migrations**

   Set up the database tables by running the migrations:

   ```bash
   php artisan migrate
   ```

7. **Run the Laravel backend**

   Start the Laravel development server:

   ```bash
   php artisan serve
   ```

8. **Run the Vue.js frontend**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

## Configuration

### Sanctum Setup

Laravel Sanctum is used for authentication. Make sure to configure the `SANCTUM_STATEFUL_DOMAINS` and `SESSION_DOMAIN` in the `.env` file properly, as shown in the previous step.

### API Authentication

Sanctum requires you to be logged in to access protected routes. Ensure you set the `Authorization` headers correctly in your frontend HTTP requests using Axios.

### Axios Setup with .env

In your Vue.js project, you can use the API base URL stored in the `.env` file. Add this in the `.env` file for Vue.js:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Then in your Vue.js components or Pinia stores, use this environment variable:

```javascript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.withCredentials = true;
```

## Running the Application

1. Start the backend server:

   ```bash
   php artisan serve
   ```

2. Run the frontend Vue.js app:

   ```bash
   npm run dev
   ```

3. Visit the frontend at:

   ```
   http://localhost:3000
   ```

4. API endpoints are served from:

   ```
   http://localhost:8000/api
   ```

## API Endpoints

- **Login User:** `POST /api/users/login`
- **Register User:** `POST /api/users/add`
- **Get User Info:** `GET /api/users/me`
- **Fetch Users (Paginated):** `GET /api/users?page={page}&limit={limit}`
- **Update User:** `PUT /api/users/{id}`
- **Delete User:** `DELETE /api/users/{id}`

### Example User Controller

```php
<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        } else {
            return response()->json(['message' => 'Invalid login details'], 401);
        }
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json($user);
    }
}
```

## Project Structure

```
├── app/
├── database/
├── public/
├── resources/
│   ├── js/
│   │   ├── pages/
│   │   │   ├── Home.vue
│   │   │   ├── Register.vue
│   │   │   └── Login.vue
│   │   └── router/
│   │       └── index.js
├── routes/
├── storage/
├── tests/
├── .env
├── package.json
├── composer.json
└── README.md
```

## Contributing

Feel free to fork this repository and contribute by submitting pull requests.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
