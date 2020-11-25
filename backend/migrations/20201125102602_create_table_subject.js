
exports.up = function(knex) {
    return knex.schema.createTable("subject", table => {
        table.increments("subject_id").primary();
        table.integer("teacher_id").unsigned().notNull();
        table.foreign("teacher_id").references("teacher_id").inTable("teacher").onDelete('CASCADE');
        table.integer("genericSubject_id").unsigned().notNull();
        table.foreign("genericSubject_id").references("genericSubject_id").inTable("genericSubject").onDelete('CASCADE');
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("subject_name").notNull();
        table.string("subject_courseProgram").notNull();
        table.string("subject_workload").notNull();
        table.string("subject_year").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("subject")
};