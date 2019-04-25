const momentRandom = require('moment-random')

const authors = [
  { id: 1, firstName: 'Blake', lastName: 'Zeiger', email: 'bz@sweatworks.net' },
  { id: 2, firstName: 'Ron', lastName: 'Smith', email: 'rs@sweatworks.net' },
  { id: 3, firstName: 'David', lastName: 'Beneway', email: 'db@sweatworks.net' },
  { id: 4, firstName: 'Franklin', lastName: 'Fowler', email: 'ff@sweatworks.net' },
]

const publications = [
  { id: 1, title: 'Title 1', body:  'Body 1', date: momentRandom(), authorId: 1 },
  { id: 2, title: 'Title 2', body:  'Body 2', date: momentRandom(), authorId: 1 },
  { id: 3, title: 'Title 3', body:  'Body 3', date: momentRandom(), authorId: 2 },
  { id: 4, title: 'Title 4', body:  'Body 4', date: momentRandom(), authorId: 3 },
  { id: 5, title: 'Title 5', body:  'Body 5', date: momentRandom(), authorId: 3 },
  { id: 6, title: 'Title 6', body:  'Body 6', date: momentRandom(), authorId: 3 },
  { id: 7, title: 'Title 7', body:  'Body 7', date: momentRandom(), authorId: 4 },
  { id: 8, title: 'Title 8', body:  'Body 8', date: momentRandom(), authorId: 2 },
  { id: 9, title: 'Title 9', body:  'Body 9', date: momentRandom(), authorId: 4 },
  { id: 10, title: 'Title 10', body:  'Body 10', date: momentRandom(), authorId: 3 }
]

module.exports = {
  authors,
  publications
}
