# Remix Math Rock Site!
![Math Rock site image](https://firebasestorage.googleapis.com/v0/b/component-sites.appspot.com/o/mathrock%2FMath%20Rock%20Stack.jpg?alt=media&token=6a662467-6156-4bf9-8ca3-d6ca6df2cd8d)

Deployed Site: [math-rock-stack](https://)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template numbersmatter/math-rock-stack
```

## Status
This stack is currently in alpha. I was looking for Firebase and GCP stack and could not find one so here is the setup I got working for me.

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

It will pull in all the [environment variables](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) of your Netlify project. You can learn more about this project's Supabase environment variables in [the Database section below](#database).

To start the Netlify development environment:

```sh
netlify dev
```

With Netlify Dev you can also:

- test functions
- test redirects
- share a live session via url with `netlify dev --live`
- [and more](https://cli.netlify.com/netlify-dev/) :)

Note: When running the Netlify CLI, file changes will rebuild assets, but you will not see the changes to the page you are on unless you do a browser refresh of the page. Due to how the Netlify CLI builds the Remix App Server, it does not support hot module reloading.

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Remix and Supabase. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

---

## Develop with Firebase emulators
Develop first with emulators. It is a good practise. Then connect to the live firebase project



---


## Database

This project uses [Supabase](https://supabase.com/) for data storage and user authentication.

### Environment Variables

You will need these 2 environment variables to connect to your Supabase instance:

- `SUPABASE_ANON_KEY`:

  Found in Settings/API/Project API keys
  <details><summary> See screenshot</summary>

  ![supabase anon key location](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1649193447/Screen_Shot_2022-04-05_at_5.15.45_PM_ipdgcc.jpg)

  </details>

- `SUPABASE_URL`:

  Found in Settings/API/Configuration/URL
  <details><summary> See screenshot</summary>

  ![supabase url location](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1649193610/Screen_Shot_2022-04-05_at_5.18.12_PM_sj7mj8.jpg)

  </details>

You can add your environment variables to an `.env` file (like shown in the sample [`.env.sample`](./.env.sample)) which will not be committed publicly because it is added to the `.gitignore` file. Or you can add it to your Netlify project environment variables (Site settings/Build & deploy/Environment) as shown in the [Development section](#development) so that they can be [easily shared with teammates](https://www.netlify.com/blog/2021/12/09/use-access-and-share-environment-variables-on-netlify).

<details>
<summary>Database creation</summary>

- You can sign up with Supabase with your GitHub credentials
- Create a new project on the 'Project' page

  ![CleanShot 2022-03-31 at 11 54 36](https://user-images.githubusercontent.com/8431042/161098029-b2651160-29c5-42fc-a149-a12cc4f2b339.png)

- Next you will need to name the database and makes sure to save the password you select, then you will want to choose a region closes to you

  ![CleanShot 2022-03-31 at 11 55 47](https://user-images.githubusercontent.com/8431042/161098251-8d73f0ab-c9e7-4a78-921e-1dcf65d9ad1c.png)

- It will take some time for the project to be fully scaffold so you will need to wait before the next steps.

</details>

<details>
<summary>SQL Queries</summary>

- In your Supabase project dashboard, you can find the SQL Editor here

  ![CleanShot 2022-03-31 at 11 57 16](https://user-images.githubusercontent.com/8431042/161098529-9f6fc807-a413-49af-bfc1-1c16a2c4ae2f.png)

- Select "New Query"

  ![CleanShot 2022-03-31 at 11 59 29](https://user-images.githubusercontent.com/8431042/161098865-7c790cbc-db76-45b3-aa75-270af70038ae.png)

- Here are the SQL queries used in the K-pop Stack

  ```sql
  -- Create public profile table that references our auth.user
  create table public.profiles (
    id uuid references auth.users not null,
    created_at timestamptz not null default current_timestamp,
    email varchar not null,

    primary key (id)
  );

  -- Create public notes table
  create table public.notes (
    id uuid not null default uuid_generate_v4(),
    title text,
    body text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    profile_id uuid references public.profiles not null,

    primary key (id)
  );

  -- inserts a row into public.users
  create or replace function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer set search_path = public
  as $$
  begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
  end;
  $$;

  -- trigger the function every time a user is created
  drop trigger if exists on_auth_user_created on auth.user;
  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
  ```

- You can copy these over to the SQL Editor and click the 'Run' button

  ![CleanShot 2022-03-31 at 12 04 31](https://user-images.githubusercontent.com/8431042/161099881-79315a5f-af33-44fc-aee4-daf9a506f23f.png)

- Lastly, you will need to go to 'Authentication and Settings', and switch off "Enable email confirmations" for the project

  ![CleanShot 2022-03-31 at 12 07 47](https://user-images.githubusercontent.com/8431042/161100637-11b7a1f0-9e25-4f1b-8fec-46ebaf047063.png)

</details>

---

## Deployment

This stack has the Netlify [configuration file (netlify.toml)](./netlify.toml) that contains all the information needed to deploy your project to Netlify's [edge nodes](https://www.netlify.com/products/edge).

Want to deploy immediately? Click this button

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/nextjs-toolbox)

Clicking this button will start the setup for a new project and deployment.

### Deploy from the Command Line

Clone this repo with the `git clone` command. Then install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) tool and run `netlify init`.

```sh
git clone https://github.com/netlify-templates/kpop-stack

npm install netlify-cli -g # to install the Netlify CLI tool globally

netlify init # initialize a new Netlify project & deploy
```

### CI/CD

Using the 'Deploy to Netlify' button or the `init` process will also set up continuous deployment for your project so that a new build will be triggered & deployed when you push code to the repo (you can change this from your project dashboard: Site Settings/Build & deploy/Continuous Deployment).

You can also use `netlify deploy` or `netlify deploy --prod` to manually deploy then `netlify open` to open your project dashboard.

> 💡 If you don't use `--prod` on the deploy command you will deploy a preview of your application with a link to share with teammates to see the site deployed without deploying to production

---
## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
