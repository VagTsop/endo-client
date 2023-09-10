# Endofusion - Instrument Management System
![Endofusion Logo](insert-logo-url-here)

## Table of Contents
- [About](#about)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
  - [Responsive Layout](#responsive-layout)
  - [API Services](#api-services)
    - [Authentication Service](#authentication-service)
    - [Common Service](#common-service)
    - [Instrument Service](#instrument-service)
    - [Instrument Series Service](#instrument-series-service)
    - [User Service](#user-service)
    - [Notification Service](#notification-service)
  - [Authentication](#authentication)
    - [Email Verification](#email-verification)
    - [Login](#login)
    - [Registration](#registration)
- [Docker](#docker)
- [Kubernetes](#kubernetes)
- [NGINX Configuration](#nginx-configuration)
- [SCSS (Sass)](#scss-sass)
- [Design Pattern](#design-pattern)
- [Contributing](#contributing)
- [License](#license)

## About
Endofusion is a web-based Instrument Management System developed using Angular. This application offers comprehensive functionality for managing instruments, instrument series, users, and authentication.

## Technologies Used
- Angular: The frontend is built using the Angular framework.
- TypeScript: The primary programming language for the application.
- HTML/CSS: For structuring and styling the user interface.
- Angular CLI: Used for project generation and building.
- HttpClient: For making HTTP requests to backend APIs.
- Toastr: A library for displaying notifications.
- ngx-toastr: An Angular wrapper for Toastr.
- JwtHelperService: A library for handling JWT tokens.
- RxJS: For reactive programming and observables.

## Project Structure
The project is structured as follows:
- src/app: Main application code.
- src/environments: Environment configuration files.
- Various services and components for instrument, instrument series, user, and authentication management.

## Authentication Guards
Authentication guards are used to protect routes and ensure that only authenticated users can access certain parts of your application. 

## Lazy Loading
Lazy loading is a technique in Angular that allows you to load feature modules only when they are needed. This can significantly improve the initial load time of your application.

## Interceptors
Interceptors in Angular allow you to intercept HTTP requests and responses globally. They are useful for tasks like adding headers, handling errors, and more. 

## SCSS (Sass) 7-in-1 Pattern
Description: The project follows 7-in-1  SCSS pattern for styling, emphasizing a structured and organized approach to CSS.
Usage: SCSS files are organized into modules and follow naming conventions for consistency.

// SCSS file structure
```sh
styles/
|-- variables.scss   // Contains global variables
|-- mixins.scss      // Reusable mixins
|-- base.scss        // Base styles for the application
|-- components/
|   |-- button.scss  // Styles for buttons
|   |-- form.scss    // Styles for forms
|   |-- ...          // Other component-specific styles
|-- layout/
|   |-- header.scss  // Styles for the header
|   |-- footer.scss  // Styles for the footer
|   |-- ...          // Other layout-specific styles
|-- themes/
|   |-- light.scss   // Styles for the light theme
|   |-- dark.scss    // Styles for the dark theme
|   |-- ...          // Other theme-specific styles
```

## Getting Started
### Prerequisites
Before running the application, ensure you have the following installed:
- Node.js and npm: Required to manage project dependencies.
- Angular CLI: Used for running and building the Angular application.

### Installation
Follow these steps to set up and run the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/endofusion.git
   cd endofusion
Install project dependencies:
npm install

Start the development server:

ng serve

The application will be accessible at http://localhost:4200/.

# Endofusion - Features

Endofusion offers the following features:

## User Authentication
- Secure user login and registration.

## Instrument Management
- Create, update, and delete instruments.

## Instrument Series Management
- Manage instrument series and connected instruments.

## User Management
- CRUD operations for users with role management.

## Password Reset
- Allow users to reset their passwords.

## Notification System
- Display success and error messages to users.

## Responsive Layout
The Endofusion application is designed to be responsive, ensuring an optimal viewing and interaction experience on a wide range of devices, including desktops, tablets, and mobile phones. The responsive design adapts the layout and content to different screen sizes, making it user-friendly and accessible across devices.

## API Services

### Authentication Service
- Description: Manages user authentication and token handling.
- Functionalities: Login, registration, password reset, and change password.

### Common Service
- Description: Provides common functionality for constructing HTTP requests with paging and search parameters.

### Instrument Service
- Description: Manages instruments, including creation, updating, and deletion.
- Functionalities: Fetch instrument data, instrument series codes, and more.

### Instrument Series Service
- Description: Manages instrument series, including creation, updating, and deletion.
- Functionalities: Fetch instrument series data and connected instruments.

### User Service
- Description: Manages user data, including creation, updating, and deletion.
- Functionalities: Fetch user data, roles, and more.

### Notification Service
- Description: Handles showing notifications (success or error messages) to the user.

## Authentication

### Email Verification
Endofusion includes email verification functionality to ensure the security of user accounts. When users register or reset their password, they will receive an email with a verification code to confirm their identity.

### Login
- Description: Users can securely log in to their accounts using their credentials.
- Features: Password validation, JWT token-based authentication.

### Registration
- Description: New users can register for an account by providing their information.
- Features: Email verification, password encryption.

## Docker
Endofusion includes Docker support for containerization. You can containerize the application using the provided Dockerfile.

## Kubernetes
For deploying Endofusion in a Kubernetes cluster, YAML configuration files are provided. You can use these files to define and manage Kubernetes resources.

## NGINX Configuration
NGINX can be used as a reverse proxy server to serve the Angular application and handle routing. Configuration files for NGINX are available.

## SCSS (Sass)
The application uses SCSS (Sass) for styling, allowing for modular and maintainable CSS.

## Contributing
We welcome contributions from the community! To contribute:

1. Fork this repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Description of your changes'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
