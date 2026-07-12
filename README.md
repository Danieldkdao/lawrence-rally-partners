# 🔗 [Synapse](https://synapsedev.up.railway.app)

## Overview

Synapse is a platform that allows developers to compete against other developers in realtime timed coding battles, connect with other developers, and practice by themselves using an integrated AI coach called the Oracle. Other developers can also watch the matches in realtime, providing insight and fun.

## What It Does

Some of the main features are:

- Realtime match battling
- Realtime observer match updates
- Tailored coding session with AI help
- Realtime notifications
- Detailed dashboard with your recent data
- Community of developers and coding problems
- Ability to friend other developers
- Invite your friends to battle against you and invite friends to watch those battles
- Strong security and auth checks to make sure the right data is shown to the right people
- AI search to find other developers in the community
- Infinite scrolling lists to improve website efficiency

## Screenshots / Photos

| Dashboard                                   | Arena Match Page                                               | Oracle Session Page                                         |
| ------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------- |
| ![Dashboard](./public/hero-image-light.png) | ![Arena Match Interface](./public/arena-match-image-light.png) | ![Oracle sessions](./public/oracle-session-image-light.png) |

## About the project

I always enjoyed playing chess on a website called Chess.com. This website allowed users to practice chess through realtime online matches with other users and watch other users matches as well. I wanted to create something similar but for programming. I also wanted this to have more of a social aspect too, so I can connect with others. The entire project from start to first usable prototype took **7-9 weeks** of planning, careful design, thought about user needs and UI, and actually building it out, feature by feature. I hope to continue working on this project and turn this into something real used by real people.

## Try it out!

Go to the [Synapse](https://synapsedev.up.railway.app) website, hosted on Railway.

## How to Use

The application has many features you can explore. First go to the [Synapse](https://synapsedev.up.railway.app) website and create an account (note that the platform DOES send an email verification OTP when you sign in with email-password). You can explore the website and try out some of the features. I have also included some recommended features to look at below, depending on how many people might be exploring with you.

### 1 Person

For one person, you can explore the community pages and start Oracle sessions with the AI. The match features require 2+ people to use. One way around this is you can have two accounts on one browser and one incognito mode (that is how I tested the application myself). However, this is pretty cumbersome so you can just stick to the features I mentioned above.

### 2+ People

You can start a new match with the other person by heading to the arena page then starting a new match (make sure both users have the same programming language set in their user profile because that is how the application decides to pair them up), then the application will pair them up and send them to a new room. If this does not happen, you can try refreshing the page.

If you would rather run this locally, I have instructions below.

## Tech Stack

- Next.js with React & Typescript
- Neon for DB and Drizzle as the ORM
- Better Auth for secure, easy authentication
- Mailjet for sending emails
- Tailwind CSS for styling and Shadcn UI for easy-to-edit and reusable components
- React Hook Form handles easy form input field management and Zod handles form validation and input validation
- React MD Editor provides a rich text interface and clean markdown rendering
- Monaco provides a VS Code-like code editing experience with syntax highlighting and more
- Wandbox is used for secure code execution
- PNPM as the package manager

## Components / Dependencies

To run this project you will need a few things setup:

- Node.js (At least version 20.9, check the Next.js docs for more information)
- PNPM (The package manager used in this project)
- Git (To clone the repo to your local machine)

## Setup Instructions

### 1. Install Node.js (Skip if you already have installed)

Go to the [Node.js website](https://nodejs.org/en) and follow the installation instructions there to install it on your machine. To verify it is working, you can enter the following command:

```bash
node --version
npm --version
```

If both commands run successfully and print out version numbers with no "not found" errors, then you are good to go.

### 2. Install PNPM

This project uses PNPM as the package manager. To install, run:

```bash
npm install -g pnpm@latest
```

Once installed, you can verify it is working by running the following command:

```bash
pnpm --version
```

If it prints a version number with no errors, then you are good to go. Otherwise, please refer to the [PNPM documentation](https://pnpm.io/installation) for more information.

### 3. Install Git (If not already installed)

Go to the [Git website](https://git-scm.com) and follow the installation instructions there to install it on your system (if you don't already have it).

Then run the following command to verify that it works:

```bash
git --version
```

If no errors are raised, then you are good to continue.

### 4. Clone the Repo!

To clone, run:

```bash
git clone https://github.com/Danieldkdao/synapse.git
cd synapse
pnpm install
```

Once finished, open the project in your favorite IDE or code editor.

## Configuration

Because the project uses @t3-oss/env-nextjs for environment variables, it will throw an error if you try to run the application without any of the following variables in an .env file at the root of the application:

```text
// .env

# Neon
DATABASE_URL=

# App
NEXT_PUBLIC_APP_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Mailjet
MAILJET_API_KEY=
MAILJET_API_SECRET=
SENDER_EMAIL=

# Mistral
MISTRAL_API_KEY=

# Hack Club AI
HACKCLUB_AI_API_KEY=
```

## Running the Project

To start the project locally, simply run:

```bash
pnpm db:push
pnpm dev
```

To confirm that the project is running successfully, you can go to [localhost:3000](http://localhost:3000) in your browser. If you see the landing page, then it worked!

To build the project for production, you can run:

```bash
pnpm build
```

See the package.json for more information.

## Troubleshooting

There are a few bottlenecks that might impact the experience of using the website:

- I use Railway as the hosting provider because they provide a free 30-day trial and support websockets. I will try to rotate my project around different accounts to ensure the best uptime.
- Hackclub AI is used for some features. If the service is down, some AI features might not work.
- Wandbox is used for the code execution but they do mention some rate limits from the same IP address so be aware of that.

#### For local development

If you ran into any issues while trying to run the project locally, you can Google the issue or ask an LLM for help.

#### On the live website

The websocket connection does rely on stable internet connection so if things aren't working properly or things seem a little slow, you might want to check your connection. If you found a bug, an issue, or just have a feature request please don't hesitate to email me at [danieldkdao@gmail.com](mailto:danieldkdao@gmail.com). I am actively working on this and I hope to make this a real thing used by real people, so I would appreciate any feedback or requests you may have!

## Credits

The project was solely my creation with some AI assistance. No outside reference regarding the initial idea or code was used.

### AI Usage

AI was used for some tasks which I have documented below. Every line of AI generated code was read, understood, and tweaked if necessary.

- Help troubleshoot and fix bugs
- Suggest next steps and new features
- Suggest ideas for the UI, mostly just suggestions and help with Tailwind classes (very little of the UI was built by AI and when it was I reviewed it and made adjustments to match my preferences)
- Helped in researching documentation for new packages/libraries
- Helped me with code reviews and testing

No other collaborators worked on this project other than myself.

## License

This project is licensed under the MIT license.
