
exports.up = function(knex) {
    return knex.schema.createTable("alternative", table => {
        table.increments("alternative_id").primary();
        table.integer("question_id").unsigned().notNull();
        table.foreign("question_id").references("question_id").inTable("question").onDelete('CASCADE');
        table.string("alternative_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("alternative")
};