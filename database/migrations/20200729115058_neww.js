exports.up = function(knex) {
    return (knex.schema.createTable('users', (users) => {
        users.increments();
  
        users
          .string('username', 128)
          .notNullable()
          .unique();
      
        users
          .string('password', 128)
          .notNullable();
  
        users
          .boolean("admin")
          .notNullable()
          .defaultTo(0)
    })
      .createTable('classes', (classes) => {
          classes.increments();
          classes.string("name", 128);
          classes.string("type", 128);
          classes.string("startTime", 128);
          classes.string("duration", 128);
          classes.int("intensity");
          classes.string("location", 128);
          classes.integer("numberOfRegisteredAttendees");
          classes.integer("maxClassSize");
      }))
  };
  
  exports.down = function(knex) {
      return( knex.schema
          .dropTableIfExists("classes")
          .dropTableIfExists("users")
      )
  };
