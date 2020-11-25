
exports.up = function(knex) {
    return knex.schema.createTable("supportMaterial", table => {
        table.increments("supportMaterial_id").primary();
        table.integer("subject_id").unsigned().notNull();
        table.foreign("subject_id").references("subject_id").inTable("subject").onDelete('CASCADE');
        table.string("supportMaterial_name").notNull();
        table.string("supportMaterial_size").notNull();
        table.string("supportMaterial_key").notNull();
        table.string("supportMaterial_url").notNull();
        table.string("supportMaterial_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("supportMaterial")
};

