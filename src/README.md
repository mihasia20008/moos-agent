# Source files

Contain all source files, that compiling by webpack

    /components - simple react components, that don't use redux (except TextFieldWithAutoComplete) and contain just ui
    /containers - react components with data from redux, have logic for changing global store
    /containers/Form - react components for creating different forms (using redux-form or not)
    /containers/Layout - react component for create base page layout total cabinet
    /pages - react components for creating pages of site (see routes.js)
    /redux - contain all logic for global store
    /services - folder for helper functions of app
    /services/api - contain all methods that make ajax requests for getting data from 
    /services/constants - constants that used in different components of app
    /services/utility - simple functions that used in different components of app
    /static - static files that use in different react components
    /static/fonts - fonts that used in app
    /static/img - images that used in app
    /static/scss - source files of styles app, write on scss
    /contentConstants.sample.json - example contents file, before building app copy to contentConstants.json and change values on real text
    /index.js - app root file. Has configuration for using keycloak auth or not
    /routes.js - file with configurations app routes
    /setupProxy.js - config file for setting up proxy for ajax request on server for real data. Used only in development build on local machine
