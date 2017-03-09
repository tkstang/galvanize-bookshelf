
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name', 255).notNullable().defaultTo('');
		table.string('last_name', 255).notNullable().defaultTo('');
		table.string('email', 255).unique().notNull();
		table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
		table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
