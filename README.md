# Moos-Agent-UI

## Requirements

For building project, you will only need Node.js installed on your environement.

### Node

Make sure there is a minimum version of [Node](http://nodejs.org/) and [NPM](https://npmjs.org/)

    $ node --version
    v10.15.0

    $ npm --version
    6.4.1

## Install

    $ git clone git@github.com:SuperbCoders/moos-agent-ui.git
    $ cd moos-agent-ui
    $ npm install

### Configure app

Copy `src/contentConstants.sample.json` to `contentConstants.json` then edit it with the url where you have setup:

- Copyright, Phone, E-Mail texts on site
- tasks statuses *(if need)*

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

Make sure that nginx is correctly configured to redirect the required server_name to the folder moos-agent-ui/build
