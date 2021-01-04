exports.up = function (knex) {
  return knex.schema.createTable("lesson", (table) => {
    table.increments("lesson_id").primary();
    table.integer("subject_id").unsigned().notNull();
    table
      .foreign("subject_id")
      .references("subject_id")
      .inTable("subject")
      .onDelete("CASCADE");
    table.string("lesson_title").notNull();
    table.date("lesson_date").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("lesson");
};
