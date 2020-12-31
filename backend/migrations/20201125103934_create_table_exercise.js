exports.up = function (knex) {
  return knex.schema.createTable("exercise", (table) => {
    table.increments("exercise_id").primary();
    table.integer("subject_id").unsigned().notNull();
    table
      .foreign("subject_id")
      .references("subject_id")
      .inTable("subject")
      .onDelete("CASCADE");
    table.string("exercise_name").notNull();
    table.date("exercice_date").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("exercice");
};
