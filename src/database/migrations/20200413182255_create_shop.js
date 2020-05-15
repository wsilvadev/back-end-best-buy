exports.up = function (knex) {
  return knex.schema.createTable("shops", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("image").notNullable();
    table.string("value").notNullable();

    table.string("user_id").notNullable();

    table
      .foreign("user_id")
      .references("email")
      .references("password")
      .inTable("login");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("shops");
};
