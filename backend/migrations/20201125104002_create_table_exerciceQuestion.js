
exports.up = function(knex) {
    return knex.schema.createTable("exerciceQuestion", table => {
        table.increments("exerciceQuestion_id").primary();
        table.integer("exercice_id").unsigned().notNull();
        table.foreign("exercice_id").references("exercice_id").inTable("exercice").onDelete('CASCADE');
        table.integer("question_id").unsigned().notNull();
        table.foreign("question_id").references("question_id").inTable("question").onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("exerciceQuestion")
};