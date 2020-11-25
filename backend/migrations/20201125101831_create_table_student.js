
exports.up = function(knex) {
    return knex.schema.createTable("student", table => {
        table.increments("student_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("student_name").notNull();
        table.string("student_email").notNull();
        table.string("student_registration").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("student")
};