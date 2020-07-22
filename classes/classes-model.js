const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  update,
  remove,
  findById,
};

function find(){
    return db('classes')
}


function add(newclass) {
    return db("classes")
        .insert(newclass, "id")
        .then(([id]) => {
            return findById(id);
        });
}
function update(id, changes) {
    return db('classes')
      .where({ id })
      .update(changes, '*');
  }

function remove(id) { 
    return db('classes')
    .where('id', Number(id))
    .del();
}

function findById(id) {
    return db("classes").where({ id }).first();
}