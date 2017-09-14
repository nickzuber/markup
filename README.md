
[markup](https://github.com/nickzuber/markup)
========

Create & share TeX snippets with rich math typesetting and markdown support.

[![Build Status](https://travis-ci.org/markup-app/markup.svg?branch=master)]()
[![License](https://img.shields.io/badge/license-MIT%20Licence-blue.svg)]()

Overview
--------

Markup is a web app that lets people easily create and share rich TeX snippets. You can write snippets containing markdown and/or math typesettting - similar to the math typesetting you find in LaTeX distributions!

Write whatever you want, and hit the share button to send what you've created to your friends! 

You can also save your progress and snippets locally if you want to come back to them later. We use your browser's local storage here, so keep in mind that your locally saved work is connected to your browser!

Contributing
-----

```
$ git clone git@github.com:nickzuber/markup.git
$ cd markup
$ npm i --no-shrinkwrap
```

If npm is giving you a hard time for whatever reason, try removing the lock file and reinstalling dependencies.

```
$ rm package-lock.json
$ npm i --no-shrinkwrap
```

And if _that_ doesn't work, try using npm version 5.0.2

```
$ npm i -g npm@5.0.2
```

#### Setting Up

Now you want configure your host files so you can access the development site locally. Add the following to your `/etc/hosts` file.

```
127.0.0.1 markup.dev
127.0.0.1 api.markup.dev
```

#### Building

Once everything is installed, build the app with

```
$ npm run build:app
```

#### Developing

You generally want to build the css and app at the same time. We use hot loading with webpack. 

```
$ npm run dev & npm run sass &
```

Code will recompile as you save it in real time (woo!)

License
-------

This software is free to use under the MIT License. See [this reference](https://opensource.org/licenses/MIT) for license text and copyright information.