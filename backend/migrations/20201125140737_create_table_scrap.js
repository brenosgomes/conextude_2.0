
exports.up = function(knex) {
    return knex.schema.createTable("scrap", table => {
        table.increments("scrap_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("scrap_title").notNull();
        table.string("scrap_description", [5000]).notNull();
        table.date("scrap_date").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("scrap")
};

