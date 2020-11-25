
exports.up = function(knex) {
    return knex.schema.createTable("forumTopic", table => {
        table.increments("forumTopic_id").primary();
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.integer("subject_id").unsigned().notNull();
        table.foreign("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
        table.string("forumTopic_title").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("forumTopic")
};