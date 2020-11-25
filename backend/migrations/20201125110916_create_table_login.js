
exports.up = function(knex) {
    return knex.schema.createTable("login", table => {
        table.increments("login_id").primary();
        table.string("login_email").notNull();
        table.string("login_password").notNull();
        table.string("login_school").notNull();
        table.string("login_role").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("login")
};
