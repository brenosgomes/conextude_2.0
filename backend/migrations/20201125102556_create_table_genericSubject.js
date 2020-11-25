
exports.up = function(knex) {
    return knex.schema.createTable("genericSubject", table => {
        table.increments("genericSubject_id").primary();
        table.string("genericSubject_name").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("genericSubject")
};