
exports.up = function(knex) {
    return knex.schema.createTable("exercice", table => {
        table.increments("exercice_id").primary();
        table.integer("subject_id").unsigned().notNull();
        table.foreign("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
        table.string("exercice_name").notNull();
        table.date("exercice_date").notNull();
        table.string("exercice_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("exercice")
};