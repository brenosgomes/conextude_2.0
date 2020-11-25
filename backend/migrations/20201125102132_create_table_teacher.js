
exports.up = function(knex) {
    return knex.schema.createTable("teacher", table => {
        table.increments("teacher_id").primary();
        table.string("teacher_name").notNull();
        table.string("teacher_email").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("teacher")
};
