
exports.up = function(knex) {
    return knex.schema.createTable("question", table => {
        table.increments("question_id").primary();
        table.string("question_name");
        table.string("question_size");
        table.string("question_key");
        table.string("question_url");
        table.string("question_question").notNull();
        table.string("question_description").notNull();
        table.string("question_discipline").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("question")
};

