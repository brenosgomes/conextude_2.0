
exports.up = function(knex) {
    return knex.schema.createTable("multimedia", table => {
        table.increments("multimedia_id").primary();
        table.integer("subject_id").unsigned().notNull();
        table.foreign("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
        table.string("multimedia_title").notNull();
        table.string("multimedia_url").notNull();
        table.string("multimedia_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("multimedia")
};

