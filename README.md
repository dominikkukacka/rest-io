# REST.IO
Small extendable REST framework for express and mongoose. [![wercker status](https://app.wercker.com/status/9b1984ea7839955a2d1c26ff4e89d204/m/master "wercker status")](https://app.wercker.com/project/bykey/9b1984ea7839955a2d1c26ff4e89d204)

## Installation

```
$ npm install rest-io --save
```

## New in v3.0.0
- [Sub Resource for Sub Documents](/docs/subResource.md)
- [Authenticated Sub Resource for Sub Documents](/docs/authorizedSubResource.md)

## Features
- Custom Resource declarations
- Automatic resource routing
- Sub resource binding
- Standard CRUD binding
- Bind all resources found in folder
- User Authentication
- User Authorization
- Typescript definitions

Roadmap
- Resource query/searching
- Resource population control via query

## Reference
- [API](/docs/api.md)
- [Resource](/docs/api.md)
- [AuthorizedResource](/docs/authorizedResource.md)
- [UserResource](/docs/user.md)

## Quick Start
It's easy and fast to use rest.io. To start using rest.io see the next few steps:

Install the necessary node modules:

```
$ npm i rest-io -S
```

Create a resource:

```
var resource = require('rest-io');
var Resource = resource.Resource;
var foodResource = new Resource({
    name: 'food',
    model: {
        name: String
    }
});
module.exports = foodResource;
```

Create an app:

```
var express = require('express');
var restIO = require('rest-io');
var mongoose = require('mongoose');
var app = express();

// register the express app with rest.io
restIO(app, {
  resources: __dirname + '/resources'
});

mongoose.connect('mongodb://localhost:27017/test');
app.listen(3000, function () {
    console.log('Server has started under port: 3000');
});
module.exports = app;
```

Start the server:

```
node app.js
```

Resource is now available as:

Method | Url                | Action
------ | ------------------ | ---------
GET    | /api/foods         | get all
POST   | /api/foods         | create
GET    | /api/foods/:foodId | get by id
PUT    | /api/foods/:foodId | update
DELETE | /api/foods/:foodId | delete

## [restIO(app)](docs/api.md)
Registers the app with `rest-io`. This allows `rest-io` to bind the routings automatically. The `bodyParser` module will be used to parse the `json` requests.

## [new restIO.Resource(config)](docs/resource.md)
Resources are routed automatically with the configuration provided. These configurations are provided to the `Resource` constructor.

Property       | Description                                                           | Type     | Default
-------------- | --------------------------------------------------------------------- | -------- | ----------
name           | The name of the resource                                              | String   | Mandatory
model          | The mongoose `Schema` config                                          | Schema   | Mandatory
parentRef      | The parent reference of the resource to be populated during retrieval | String   |
populate       | The children to populate, space separated                             | String   |
plural         | The plural form of the resource name                                  | String   | name + 's'
parentResource | The parent of this resource                                           | Resource |
