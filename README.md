# Good Night Insomnia



### Requirements

- Node.js 18+ and npm

### Getting started

Run the following command on your local environment:

```shell
cd sleeplesschat
yarn install
```

Then, you can run locally in development mode with live reload:

```shell
yarn run dev
```

Open http://localhost:3000 with your favorite browser to see your project.



### Commit Message Format

The project enforces [Conventional Commits](https://www.conventionalcommits.org/) specification. This means that all your commit messages must be formatted according to the specification. To help you write commit messages, the project uses [Commitizen](https://github.com/commitizen/cz-cli), an interactive CLI that guides you through the commit process. To use it, run the following command:

One of the benefits of using Conventional Commits is that it allows us to automatically generate a `CHANGELOG` file. It also allows us to automatically determine the next version number based on the types of commits that are included in a release.

### Testing

All tests are colocated with the source code inside the same directory. So, it makes it easier to find them. Unfortunately, it is not possible with the `pages` folder which is used by Next.js for routing. So, what is why we have a `pages.test` folder to write tests from files located in `pages` folder.

### Integration & E2E Testing

The project uses Playwright for Integration and E2E testing. You can run the tests with:

```shell
npx playwright install # Only for the first time in a new environment
yarn run test:e2e
```

### Enable Edge runtime (optional)

The App Router folder is compatible with the Edge runtime. You can enable it by uncommenting the following lines `src/app/layouts.tsx`:

```tsx
// export const runtime = 'edge';
```

For your information, the database migration is not compatible with the Edge runtime. So, you need to disable the automatic migration in `src/libs/DB.ts`:

```tsx
if (process.env.NODE_ENV !== 'production') {
  await migrate(db, { migrationsFolder: './migrations' });
}
```

After disabling it, you are required to run the migration manually with:

```shell
yarn run db:migrate
```

You also require to run the command each time you want to update the database schema.

### Deploy to production

During the build process, the database migration is automatically executed. So, you don't need to run the migration manually. But, in your environment variable, `DATABASE_URL` and `DATABASE_AUTH_TOKEN` need to be defined.

Then, you can generate a production build with:

```shell
$ yarnrun build
```

It generates an optimized production build of the boilerplate. For testing the generated build, you can run:

```shell
$ yarn run start
```

The command starts a local server with the production build. Then, you can now open http://localhost:3000 with your favorite browser to see the project.

Build docker image:
```shell
docker build . -t ghcr.io/wenhuizhao/sleeplesschat
```
push docker image:
```shell
docker push   ghcr.io/wenhuizhao/sleeplesschat
```
