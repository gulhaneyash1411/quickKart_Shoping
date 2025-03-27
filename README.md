Setup Instructions

Prerequisites

Ensure you have Node.js and npm installed. It is recommended to use nvm (Node Version Manager) for installation.

Installation Steps

Clone the repository

git clone <YOUR_GIT_URL>

Navigate to the project directory

cd <YOUR_PROJECT_NAME>

Install dependencies

npm i

Start the development server

npm run dev






API Used

This project fetches product data from the Fake Store API to display a list of products dynamically.
https://fakestoreapi.com/products






Technologies Used

TypeScript – Strongly typed JavaScript

React – Component-based UI library

ShadCN-UI – Pre-built components for better UI consistency

Tailwind CSS – Utility-first CSS framework for styling

Framer Motion  – Animation libraries for smooth UI interactions





Features & Animations Implementation

UI & Animations

On-scroll animations: Product cards fade in as the user scrolls.

Hover interactions: Smooth scaling, shadow effects, and bounce animations.

Animated modal: Clicking on a product opens a modal (or side drawer) with full product details, smoothly transitioning in and out.

Layout transitions: State changes are animated for a seamless experience.





Form Handling

Contact Us Form with fields:

Name

Email

Message

Validation: Implemented using React Hook Form.

Toast confirmation: Displays a success message upon form submission .






Styling

Tailwind CSS: Used for efficient styling and layout.

ShadCN-UI: Used for UI components like buttons, modals, and forms.

Responsive Design: Ensures the application works seamlessly across different screen sizes.




Running the Project

After completing the setup, run:

npm run dev

This starts the development server, and you can access the application in your browser.
