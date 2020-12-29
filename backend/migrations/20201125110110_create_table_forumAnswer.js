exports.up = function (knex) {
  return knex.schema.createTable("forumAnswer", (table) => {
    table.increments("forumAnswer_id").primary();
    table.integer("forumTopic_id").unsigned().notNull();
    table
      .foreign("forumTopic_id")
      .references("forumTopic_id")
      .inTable("forumTopic")
      .onDelete("CASCADE");
    table.integer("student_id").unsigned().nullable();
    table
      .foreign("student_id")
      .references("student_id")
      .inTable("student")
      .onDelete("CASCADE");
    table.integer("teacher_id").unsigned().nullable();
    table
      .foreign("teacher_id")
      .references("teacher_id")
      .inTable("teacher")
      .onDelete("CASCADE");
    table.text("forumAnswer_title").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("forumAnswer");
};
