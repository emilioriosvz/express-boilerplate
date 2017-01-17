# Express & mongoose REST API Boilerplate component based

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code Climate](https://codeclimate.com/github/emilioriosvz/express-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/emilioriosvz/express-boilerplate)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Getting Started
Clone the repo:
```sh
git clone git@github.com:emilioriosvz/express-boilerplate.git
cd express-boilerplate
```

Install yarn:
```js
npm install -g yarn
```

Install dependencies:
```sh
yarn
```

## Run the project in docker
Build the image:
```sh
docker build -t <your username>/express-boilerplate .
```

If the image was created correctly, you can see it doing:
```js
docker images
```

Run the image:
```sh
docker run -p 3000:3000 -d --name express-boilerplate <your username>/express-boilerplate
```

## Features

* Authentication via JsonWebToken
* Secure app via helmet
* Uses [yarn](https://yarnpkg.com) instead of npm
* Uses [StandardJS](https://github.com/feross/standard) as style guide
* Promises via [Bluebird](http://bluebirdjs.com/docs/getting-started.html)
* API parameter validation via [express-validation](https://github.com/ctavan/express-validator) using [Joi](https://github.com/hapijs/joi)

## Todo list

If you like what you see, there are some tasks that would have to be done:

* Add testing
* Add code coverage
* Add eslint
* Add logger

## Contributing

Contributions, questions and comments are all welcome.🤘
