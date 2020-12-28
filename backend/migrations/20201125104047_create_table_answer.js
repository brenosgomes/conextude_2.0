exports.up = function (knex) {
  return knex.schema.createTable("answer", (table) => {
    table.increments("answer_id").primary();
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
    table.integer("alternative_id").unsigned().notNull();
    table
      .foreign("alternative_id")
      .references("alternative_id")
      .inTable("alternative")
      .onDelete("CASCADE");
    table.integer("student_id").unsigned().notNull();
    table
      .foreign("student_id")
      .references("student_id")
      .inTable("student")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("answer");
};
