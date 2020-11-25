
exports.up = function(knex) {
    return knex.schema.createTable("clas", table => {
        table.increments("clas_id").primary();
        table.integer("series_id").unsigned().notNull();
        table.foreign("series_id").references("series_id").inTable("series").onDelete('CASCADE');
        table.string("clas_code").notNull();
        table.string("clas_limit").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("clas")
};