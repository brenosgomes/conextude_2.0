
exports.up = function(knex) {
    return knex.schema.createTable("series", table => {
        table.increments("series_id").primary();
        table.string("series_name").notNull();
        table.string("series_number").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("series")
};
