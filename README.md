# Remix Math Rock Site!
![Math Rock site image](https://raw.githubusercontent.com/numbersmatter/math-rock-stack/master/images/math_rock_banner.jpeg)



Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template numbersmatter/math-rock-stack
```

## Status
This stack is currently in alpha. I was looking for Firebase and GCP stack and could not find one so here is the setup I got working for me. Parts of this README I borrowed from k-pop and indie stack README's because I wanted some consistency following patterns. So if any of this is README is wrong it is because I learned it from Jason! I kid, it is because this is an alpha version and I am copying and pasting. But you can Learn With Jason, @LearnWithJason. Good Stuff!!  

## What's in the stack

- [Google Cloud](https://cloud.google.com/) deployment via [Google Cloud Run](https://cloud.google.com/run)
- [Firebase](https://firebase.google.com) database (Firestore) and authentication
- [Tailwind](https://tailwindcss.com/) for styling
- [Prettier](https://prettier.io) code formatting
- [ESLint](https://eslint.org) linting
- [TypeScript](https://typescriptlang.org) static typing

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

---

## Development

- Install all dependencies:

  ```sh
  npm install

  ```

- Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)



- Add your Firebase  PROJECT_ID, API_KEY (client key), and SERVICE_ACCOUNT environment variables to a `.env` file like [`.env.sample`](./.env.sample). Please note for production Google recommends using their Secrets Manager product. This setup is designed for being able to make a Docker Container to run locally for development. The API_KEY is for client side authenication needed to create the session cookie we will be passing with each request. 

  ```
  PROJECT_ID=good-app-dagfrea
  API_KEY= afewafdsfewDEWFAdfw
  SESSION_SECRET={"type":"service-account" ... other secret stuff here}
  ```

> TODO add more information here on how to find/create these items. 

  <details>
  <summary>Environment Variable list in project dashboard.</summary>

![screenshot of env vars]()

  </details>

- Run First Build
  ```sh
  npm run build
  ```
  This runs the scripts that creates tailwind styles and a couple of other things. Honestly, I just have not gotten around to moving the important elements to the dev script. This is a work in progress and as I am running though my entire development environment checklist for a new mac, I know it breaks if I do not run this command atleast once first. These elements should be cleaned up in the beta release. 

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.
Currently this does not rebuild the css automatically. 

  ```sh
  npm run build:css
  ```

  This command rebuilds the css in the event that the tailwind classes changed. I will automate this for the beta but again this is alpha release.

### Running Locally

The Remix dev server starts your app in development mode, rebuilding assets on file changes. To start the Remix dev server:

```sh
npm run dev
```

Once application is running on the dev server correctly you can begin the process of making a docker image

### Run local docker image 
Test application also runs from a docker image 

TO-DO add some more instructions for running this as a docker image


### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Remix and Supabase. The main functionality is creating users, logging in and out, and creating and deleting notes.

- REST API Adapter for Google Auth via HTTP post request : [./app/server/firebase-rest.ts](./app/server/firebase-rest.ts)
- sign-up, sign-in, checkSessionCookie, requireAuth functions: [./app/server/auth.server.ts](./app/server//auth.server.ts)
- Login Component : [./app/routes/login.tsx](./app/routes/join.tsx)
- Logout Component: [./app/routes/logout.tsx](./app/routes/logout.tsx)
- Adapter for Firestore Database: [./app/server/db.server.ts](./app/server/db.server.ts)
- Firebase Admin Adapter : [./app/server/firebase.server.ts](./app/server/firebase.server.ts)
- Manage Session cookie settings: [./app/server/sessions](./app/server/sessions.tsx)
- npm scripts: [package.json](./package.json)
- Docker Build Instructions : [Dockerfile](./Dockerfile)


---

## Develop with Firebase emulators
Develop first with emulators. It is a good practise. Then connect to the live firebase project
TO-DO add instructions here for connecting to emulators


---


## Database

This project uses [Firebase](https://firebase.google.com/) for data storage and user authentication.

TO-DO add some instructions on creating a collection reference with type safety.

### Environment Variables

You will need these 3 environment variables to connect to your Firebase instance:
TO-DO update this and merge with other environment variables section

- `PROJECT_ID`:

  Found in 
  <details><summary> See screenshot</summary>

  

  </details>

- `API_KEY`:

  Found in 
  <details><summary> See screenshot</summary>


  </details>

You can add your environment variables to an `.env` file (like shown in the sample [`.env.sample`](./.env.sample)) which will not be committed publicly because it is added to the `.gitignore` file. 


---

## Deployment
Deploy To Google Cloud Run

TO-DO instructions on deploying







