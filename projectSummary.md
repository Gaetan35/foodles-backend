# Project summary

## My tech choices

The tech stack for this project is PostgreSQL / Nest.js / React.js
I chose these technologies because they are standard, widely used, and I am familiar with them.
Nest.js might be a bit overkill for this small project, as it is quite verbose and requires a lot of boilerplate code, but it provides a clean way to separate the different layers of the application and unit test them independently.

## The assumptions I made:
- The products images are stored as a URL in the database. Here I uploaded the images to GoogleDrive, but in a real life project we can suppose they have been uploaded to a S3 bucket for example.
- The products images all have more or less the same width and height, so that the ratio looks correct when displayed on the frontend.
- I supposed clients were allowed to have a negative credit, as it was shown on the provided screenshots. Otherwise I would need to add an extra validation step (both backend and frontend) to prevent the user from ordering if he doesn't have enough money
- Some of the choices I made couldn't work if this project had a bigger scale: I am fetching all the clients and all the products on the website before displaying them. If the number of clients and products grows too big, I would need to : 
  - Add pagination on the backend instead of fetching all products/clients in one request
  - Adapt the frontend to show pagination for products
  - Add an API route to use for the clientSelect autocomplete, that returns the first 5 clients matching what the user typed.

## What I would have done with more time:

- Add integration tests in the frontend with react-testing-library
- Test the repositories in the backend, and add integration tests
- If SEO is important, use Next.js for the frontend
- Use react-intl to manage translations
- Use a design system with specific colors, fontSizes... in a variables.scss file. Other scss files can then import this file to use the design system
- Make the website responsive on mobile devices with media queries
- Add loading skeletons to show instead of the product cards when fetchProducts request is loading
- Show an error message if fetching products or clients fail
- Fine-tune react-query parameters to cache and refetch data efficiently

If it was a bigger project:
- Add end to end testing with cypress
- Use redux to manage global state across the app
- Use axios to send requests instead of fetch
- Add a CI to deploy the app
