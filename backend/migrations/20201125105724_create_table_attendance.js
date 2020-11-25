
exports.up = function(knex) {
    return knex.schema.createTable("attendance", table => {
        table.increments("attendance_id").primary();
        table.integer("subject_id").unsigned().notNull();
        table.foreign("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.string("attendance_date").notNull();
        table.string("attendance_attendance").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("attendance")
};