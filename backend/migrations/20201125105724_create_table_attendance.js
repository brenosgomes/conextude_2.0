
exports.up = function(knex) {
    return knex.schema.createTable("attendance", table => {
        table.increments("attendance_id").primary();
        table.integer("lesson_id").unsigned().notNull();
        table.foreign("lesson_id").references("lesson_id").inTable("lesson").onDelete('CASCADE');
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.string("attendance_attendance").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("attendance")
};