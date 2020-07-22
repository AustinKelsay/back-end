const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "client", password: bcrypt.hashSync('pass', 14), admin: 0},
        {username: "instructor", password: bcrypt.hashSync('password', 14), admin: 1},
      ]);
    });
};
