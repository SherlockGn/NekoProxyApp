# Neko Proxy App

Neko Proxy App is a powerful node-based application that provides a flexible and customizable proxy server solution. It utilizes various technologies such as Express, express-http-proxy, Sequelize, PM2, Vue3, and element-plus to offer a comprehensive backend and frontend environment. This README.md file serves as a guide to understanding the features and functionalities of the Neko Proxy App.

## Demo environment

We have created a demo environment for the Neko Proxy App, allowing you to explore and test its features and configuration options. You can access the demo [here](https://nekogong.gitee.io/neko-proxy-app). Please note that the demo is a static hosted web page designed for demonstration purposes only. It provides a safe environment to familiarize yourself with the app's functionalities without affecting live data or making permanent changes. Any actions or modifications you make within the demo will not be recorded, and all changes will be reset upon refreshing the browser. 

## Features

The Neko Proxy App primarily focuses on four main functions:

1. Proxy Rule Configuration: The Neko Proxy App allows users to define HTTP proxy rules dynamically using JavaScript code, providing a high degree of flexibility. This feature enables users to configure proxy settings according to their specific requirements. Additionally, the application offers a powerful analyzer to analyze proxy records and logs efficiently.

2. System and API Log Viewing: With the Neko Proxy App, users can easily view system logs and API logs. This functionality provides valuable insights into the application's behavior, aiding in debugging and monitoring processes.

3. Datacenter and Database Management: The Neko Proxy App generates an easy-to-use ORM database known as Datacenter. Users can define databases, models, and model properties using the web portal. The data stored in the database can be managed through the web portal or accessed via auto-generated APIs, offering a convenient and efficient means of data management.

4. CI/CD Tool: The Neko Proxy App serves as a reliable CI/CD (Continuous Integration/Continuous Deployment) tool. It allows users to effortlessly add static page projects or Node.js projects through the web portal. The application automatically creates and launches the projects, enabling users to manage the processes seamlessly.

5. Scheduled jobs: The Neko Proxy App introduces the feature of scheduled jobs, allowing users to create automated tasks through simple JavaScript code. With the ability to specify cron expressions, users can determine when these jobs should run automatically. Through the web portal, users can easily define and manage scheduled jobs, enabling efficient execution of recurring tasks according to their desired schedule.

## Getting Started

To get started with the Neko Proxy App, follow these steps:

1. Clone the repository: git clone https://gitee.com/NekoGong/neko-proxy-app.git

2. Install dependencies:

Backend: Navigate to the base directory and run npm install.

```
cd neko-proxy-app
npm install
```

Frontend: Move to the frontend directory and run npm install.

```
cd frontend
npm install
npm run build
```

3. Start the backend service

```
cd neko-proxy-app
node main.js
```

Or

```
cd neko-proxy-app
node pm2start.js
```

4. Open your preferred web browser and visit http://localhost:3334 to access the Neko Proxy App web portal. To start using the service, you can log in using the default user account "admin" with the password "admin".

## How to Contribute

We welcome contributions to the development and improvement of the Neko Proxy App.

### Development Setup

To set up the development environment for the Neko Proxy App, follow these steps:

1. Enable CORS for the backend: Go to the config.json file and set `enableCORS` to `true` and the `required.required` to `false`.

2. Install the backend:

```
cd neko-proxy-app
npm install
```

3. Install the frontend:

```
cd frontend
npm install
```

4. Go to frontend/src/utils/host.js and set the host to http://localhost:3334.

5. Start the backend service. We recommend using nodemon (should be installed globally in advance):

```
cd neko-proxy-app
npm i nodemon -g
nodemon
```

6. Start the frontend live server:

```
cd frontend
npm run dev
```

7. Press 'o' and 'enter' to start the browser.

### Submitting Changes

1. When you're ready to submit your changes, follow these steps:

2. Commit your changes with a clear and descriptive commit message.

3. Push your changes to your forked repository on GitHub.

4. Submit a pull request to the original repository, providing a detailed description of the changes you made.

5. To maintain consistency with the existing code style, please format your code using the Prettier plugin before committing any changes.

If you find any issues or have suggestions for improvements, please submit an issue or a pull request on the GitHub repository.

## License

The Neko Proxy App is released under the MIT License. Feel free to modify and distribute the application as per the terms of the license.

## Acknowledgements

The development of the Neko Proxy App was made possible thanks to the contributions of various open-source libraries and frameworks.
