OBES Admin Panel

Overview

The OBES Admin Panel is a web-based platform designed for administrators to manage users, content, and configurations efficiently. It provides an intuitive interface with powerful features for streamlined administration.

Features

User Management (Create, Edit, Delete, View Users)

Role-based Access Control

Dashboard with Analytics

Content Management

Settings and Configuration

Secure Authentication and Authorization

Technologies Used

Frontend: React.js, Material-UI, Tailwind CSS

State Management: React Hook Form, Context API

API Communication: Axios

Package Manager: Yarn

Installation

Prerequisites

Ensure you have the following installed:

Node.js (v16+ recommended)

Yarn package manager

Steps to Run the Project

Clone the repository:

git clone https://github.com/your-repo/obes-admin-panel.git
cd obes-admin-panel

Install dependencies:

yarn install

Start the development server:

yarn start

Open your browser and navigate to:

 http://localhost:5173/

Environment Variables

Create a .env file in the root directory and configure the following:

REACT_APP_API_BASE_URL=https://api.obes.com
REACT_APP_AUTH_TOKEN_SECRET=your-secret-key

Folder Structure

obes-admin-panel/
│-- src/
│   │-- components/        # Reusable UI components
│   │-- pages/             # Application pages
│   │-- services/          # API calls and services
│   │-- hooks/             # Custom hooks
│   │-- context/           # Global state management
│   │-- assets/            # Images, fonts, and static files
│-- public/                # Public assets
│-- .env                   # Environment variables
│-- package.json           # Dependencies and scripts

Contribution

If you’d like to contribute:

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

License

This project is licensed under the MIT License.
