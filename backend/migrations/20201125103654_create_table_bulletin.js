
exports.up = function(knex) {
    return knex.schema.createTable("bulletin", table => {
        table.increments("bulletin_id").primary();
        table.integer("subject_id").unsigned().notNull();
        table.foreign("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
        table.string("bulletin_unit").notNull();
        table.string("bulletin_grade").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("bulletin")
};