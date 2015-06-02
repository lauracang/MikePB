# Cuddlebot UI

The Cuddlebot UI is implemented as an [Apache Cordova][cordova] application
using the [ReactJS][react] JavaScript library and [Gulp][gulp] build system. 


## Getting Started

The development environment depends on [Node.js][nodejs]. You'll find
instructions on how to install Node.js on your system from their 
[website][nodejs].

Once Node.js has been installed, additional dependencies are needed from
[NPM][npmjs], the package manager for Node.js. On Unix-like systems, issue
the following commands to install these dependencies:

```sh
npm install -g cordova gulp karma ripple
npm install
```

The first command installs global dependencies and places executables in
your `PATH`. The second command installs local project-specific dependences.
Should you have trouble accessing the `cordova`, `gulp`, `karma`, or
`ripple` commands, you may also execute the locally-installed executables
under `./node_modules/.bin`.

The following commands are configured in `package.json` for your
convenience:

```sh
# Run automated tests in Chrome using Karma
npm test
# Start the application in a browser using the Ripple emulator
npm start
# Build the application and save the results to the www directory
npm run build
# Continually watch for changed files and rebuild the application
npm run watch
# Start the application on an Android emulator
npm run emulate
```

You must run either `npm run build` or `npm run watch` before starting the
emulator or developing using a web browser.

Please see the [Android Getting Started Guide][android_guide] for
instructions on how to get started with Cordova on Android.


### Developing using a web browser

Certain web browsers, including Google Chrome at the time of writing, allow
`file://` applications to send Ajax requests to remote servers. We may
exploit this feature by directly opening `www/index.html` in a local web
browser to more quickly develop the application. Simply refresh the page
after editing source files and allowing enough time for the build system to
update the compiled application files.

The application currently does not use any Android or Cordova-specific
features. Should this change in the future, developing using the application
using a web browser would no longer be possible. However, you may be able
to use the [Ripple][ripple] emulator to speed up development.


## Project File Organization

- `app/` source files for the web application
- `app/assets/` these files are copied directly to `www/`
- `app/components/` [ReactJS][react] components
- `app/lib/` JavaScript library files
- `app/styles/` [LessCSS][lesscss] stylesheets
- `app/styles/routes.jsx` application route definitions
- `app/styles/start.jsx` application entry point
- `docs/` documentation
- `hooks/` [Apache Cordova][cordova] hooks directory
- `node_modules` [Node.js][nodejs] modules directory
- `platforms/` [Apache Cordova][cordova] platforms directory
- `plugins/` [Apache Cordova][cordova] plugins directory
- `tasks/` [Gulp][gulp] task scripts
- `test/` [Karma][karma] test files
- `www/` compiled application files, used by Cordova to package the
  application
- `config.xml` [Apache Cordova][cordova] configuration file
- `gulpfile.js` [Gulp][gulp] configuration script
- `karma.conf.js` [Karma][karma] configuration script
- `LICENSE.txt` project licence
- `README.md` a getting started guide
- `webpack.conf.js` [WebPack][webpack] configuration script, part of the
  build system

## License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


[android_guide]: docs/android.md
[cordova]: http://cordova.apache.org
[gulp]: http://gulpjs.com
[karma]: http://karma-runner.github.io/0.12/index.html
[lesscss]: http://lesscss.org
[nodejs]: http://nodejs.org
[npmjs]: https://www.npmjs.org
[react]: http://facebook.github.io/react/
[ripple]: http://ripple.incubator.apache.org
[webpack]: http://webpack.github.io
