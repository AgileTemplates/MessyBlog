# Messy Blog

This is a messy blogging application.

## ✨ Quick Start Guide

```bash
yarn # install dependencies
npm install netlify-cli -g # install netlify dev
yarn dev # Start client and server
```

Visit [http://localhost:8888](http://localhost:8888).

(Do not use localhost:3000, it will not work).

## 🔗 Linking a database

When you first run the app locally you will get an error message saying `no database found`. This app needs a database to function.

Set up a free database at [ElephantSQL](https://www.elephantsql.com). Once it is created you will get a Database URL. We need to add this Database URL to your environment so the app knows where to save data. Copy the Database URL and paste it into the `.env.example` file.

It will look something like this:

```
DATABASE_URL="postgres://xxxxx:xxxxx-xxxxxxxxxx@xxx.db.elephantsql.com/xxxxxxx"
```

In order to load new environment variables you may need to quit the process and restart. In your terminal type Crtl+C to quit and then run `yarn dev` again to restart.

A table and some mock data will automatically be created for you.

## 💻 The code

Inside the `src` folder you will find two directories: `server` and `client`.

- `server` contains the Node code that runs the server.
- `client` contains the React code that runs the client.

## ✅ Issues

You are now ready to start working on this project. You have been given a list of issues. Each issue should be completed **in isolation**. once you have completed an issue create a Pull Request but do not merge it. An issue is considered complete once you have opened the pull request. You can then go back to `main`, create a new branch and work on the next issue.

Click the 'Projects' tab at the top of this page to get started.
