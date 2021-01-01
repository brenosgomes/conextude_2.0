exports.up = function (knex) {
  return knex.schema.createTable("exerciseQuestion", (table) => {
    table.increments("exerciseQuestion_id").primary();
    table.integer("exercise_id").unsigned().notNull();
    table
      .foreign("exercise_id")
      .references("exercise_id")
      .inTable("exercise")
      .onDelete("CASCADE");
    table.integer("question_id").unsigned().notNull();
    table
      .foreign("question_id")
      .references("question_id")
      .inTable("question")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("exerciseQuestion");
};
