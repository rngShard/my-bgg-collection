# MyBGGCollection-App

A simple single-page application, which retrieves your own collection from [BoardGameGeek](https://boardgamegeek.com)'s open API and displays it in a modern Angular-based frontend app for filtering & navigation.

## Inspiration, Motivation and due Credit

Inspiration was drawn from [EmilStenstrom's MyBGG-project](https://github.com/EmilStenstrom/mybgg), where MyBGGCollection aims at improving specifically two points:

- not relying on a third-party search-index-provider, instead querying [BoardGameGeek's API](https://boardgamegeek.com/wiki/page/BGG_XML_API2) directly
- providing a modern frontend UI in Angular


# Building the App

To build this app yourself, you'll want to fork it, clone locally to provide config-params (e.g. BGG username) and build it with Angular.
Then, pushing it back to Github will allow you to deploy it via Github pages.

## Pre-requisites

To clone, build and run the app, please install on your system:

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en/)

## Fork, clone, build

- Fork this repository (https://github.com/rngShard/my-bgg-collection) to your own Github account
- Clone your forked repo to your local machine
```bash
$ git clone https://github.com/[yourUsername]/[yourRepoName].git
```
- Install dependencies via _npm_
```bash
$ cd [yourRepoName]
$ npm install
```
- Rename _config.json.example_ to _config.json_ & provide parameters in the new _config.json_
```bash
$ cp config.json.example config.json
# then, in config.json, provide params
```
- Build the app
```bash
$ (sudo) npm install -g @angular/cli
$ ng build --prod --baseHref="..."
```


# Want to continue development?

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
