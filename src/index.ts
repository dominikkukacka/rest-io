import express = require('express');
import resource = require('./resource');
import Resource = resource.Resource;
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
import Mongoose = mongoose.Mongoose;
import UserResource = require('./userResource');
import authorizedResource = require('./authorizedResource');
import SubResource = require('./subResource');
import AuthorizedSubResource = require('./authorizedSubResource');
var autoloader = require('auto-loader');

class RestIO {
  static authorizedResource = authorizedResource;
  static UserResource = UserResource;
  static AuthorizedResource = authorizedResource.AuthorizedResource;
  static SubResource = SubResource;
  static AuthorizedSubResource = AuthorizedSubResource;
  static Resource = Resource;

  constructor(app: express.Application, config?: RestIO.IRestIOConfig) {
    app.use(bodyParser.json());
    resource.registerApp(app, config.db);
    if (!!config) {
      var resources: Object = autoloader.load(config.resources);
      for (var i in resources) {
        if (resources.hasOwnProperty(i)) {
          resources[i];
        }
      }
    }
    return resource;
  }
}

declare module RestIO {
  interface IRestIOConfig {
    resources: string;
    db?: Mongoose;
  }
}

export = RestIO;
