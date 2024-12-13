# create-t3-solito
A starter for t3 with solito and turborepo.

## Installation
Clone the repo
```bash
git clone git@github.com:Hammad69275/create-t3-solito.git
```
Install packages
```bash
pnpm i
```
Make sure you have docker installed and running on your system. Setup envs and database.
```bash
./setup.sh
```
```bash
pnpm db:migrate
```
Run the project
```bash
pnpm run dev
```

## About
It uses [Turborepo](https://turborepo.org) and contains:

```text
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ express
  |   ├─ ExpressJS server
  |   ├─ Integrated with TRPC with a basic auth setup
  |   ├─ Uses Prisma
  ├─ expo
  |   ├─ Expo SDK 52
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using NativeWind
  |   └─ Typesafe API calls using tRPC
  └─ next.js
      ├─ Next.js 14
      ├─ React 18
      ├─ Tailwind CSS
      └─ Typesafe API calls using tRPC
packages
  ├─ ui
  |   └─ Common UI components, hooks, context and helpers that can be shared between react native and nextjs
  ├─ prisma
  |   └─ Basic Table for authentication
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> The repo contains a basic auth system with screens for login, register, and profile to showcase the capabilities of it.

> In this template, we use `@acme` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@acme` to something like `@my-company` or `@project-name`.

## References

The stack originates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).