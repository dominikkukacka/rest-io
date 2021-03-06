var English = require('yadda').localisation.English;
var library = English.library();
import chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;

import food = require('../../../examples/foods/resources/food');
var Food = food.model;
import list = require('../../../examples/foods/resources/list');
var List = list.model;
import supertest = require('supertest');

function createIdBasedOnName(name: string) {
  var id = convertToHex(name);
  var i = 0;
  while (id.length < 24) {
    id += i++;
    if (i > 9) {
      i = 0;
    }
  }
  return id;
}

function convertToHex(str) {
  var hex = '';
  for (var i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16);
  }
  return hex;
}

library
  .given('<Food><Name>', (done) => {
    this.request = supertest('http://localhost:3000');
    done();
  })
  .given('<Food><(.*)>', (name: string, done) => {
    Food.create({
      _id: createIdBasedOnName(name),
      name: name
    }, (err, food) => {
      done();
    });
  })
  .given('<List><Name><Fruits>', (done) => {
    this.request = supertest('http://localhost:3000');
    done();
  })
  .given('<List><(.*)><(.*)>', (listName: string, fruitsString: string, done) => {
    var fruits = fruitsString.split(',');
    var list = {
      name: listName,
      foods: []
    };
    fruits.forEach((fruit: string) => {
      list.foods.push(createIdBasedOnName(fruit));
    });
    List.create(list, (err, list) => {
      supertest('http://localhost:3000')
        .get('/api/foods')
        .end((req, res) => {
          done();
        });
    });
  })
  .given('the food app is started', (done) => done())
  .when('I request all food', (done) => {
    this.request = this.request.get('/api/foods');
    done();
  })
  .when('I request all lists', (done) => {
    this.request = this.request.get('/api/lists');
    done();
  })
  .then('I expect to see food "(.*)" on position (.*)',
    (food: string, position: string, done) => {
      this.request
        .end((req: supertest.SuperTest, res: supertest.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body[parseInt(position, 10)].name).to.equal(food);
          done();
        });
    })
  .then('I expect to see list "(.*)" with "(.*)"',
    (listName: string, foodString: string, done) => {
      this.request
        .end((req: supertest.SuperTest, res: supertest.Response) => {
          expect(res.status).to.equal(200);
          var foods = foodString.split(',');
          var list;
          res.body.forEach((currentList) => {
            if (currentList.name === listName) {
              list = currentList;
            }
          });
          foods.forEach((fruit: string) => {
            var foundFruit = null;
            list.foods.forEach((food) => {
              if (food.name === fruit) {
                foundFruit = food.name;
              }
            });
            expect(foundFruit).to.not.be.null;
            foundFruit = null;
          });
          done();
        })
    });

module.exports = library;
