#REST.IO#
Small extendable REST framework for express and mongoose.

##Installation

    $ npm install rest-io --save

##Features
 * Automatic resource routing
 * Sub resource binding
 * Standard CRUD binding

Roadmap
 * Bind all resources found in folder
 * Make

##Quick Start
It's easy and fast to use rest.io. To start using rest.io see the next few steps:

Install the necessary node modules:

    $ npm i rest-io -S

Create a resource:

    var resource = require('rest-io');
    var Resource = resource.Resource;
    var foodResource = new Resource({
        name: 'food',
        model: {
            name: String
        }
    });
    module.exports = foodResource;

Create an app:

    var express = require('express');
    var restIO = require('rest-io');
    var mongoose = require('mongoose');
    var app = express();

    // register the express app with rest.io
    restIO(app);

    // include food resource
    require('./resource/food');

    mongoose.connect('mongodb://localhost:27017/test');
    app.listen(3000, function () {
        console.log('Server has started under port: 3000');
    });
    module.exports = app;

Start the server:

    node app.js

Resource is now available as:

    GET     /api/foods
    POST    /api/foods
    GET     /api/foods/:foodId
    PUT     /api/foods/:foodId
    DELETE  /api/foods/:foodId

##restIO(app)
Registers the app with `rest-io`. This allows `rest-io` to bind the routings automatically. The `bodyParser` module will be used to parse the `json` requests.

##new restIO.Resource(options)
Resources are routed automatically with the configuration provided. These configurations
are provided to the `Resource` constructor.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| name | The name of the resource | String | Mandatory |
| model | The mongoose `Schema` config | Schema | Mandatory |
| parentRef | The parent reference of the resource to be populated during retrieval | String |  |
| populate | The children to populate, space separated | String |  |
| plural | The plural form of the resource name | String | name + 's' |
| parentResource | The parent of this resource | Resource |  |