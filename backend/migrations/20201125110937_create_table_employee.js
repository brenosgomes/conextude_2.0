
exports.up = function(knex) {
    return knex.schema.createTable("employee", table => {
        table.increments("employee_id").primary();
        table.string("employee_name").notNull();
        table.string("employee_email").notNull();
        table.string("employee_registration").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("employee")
};
