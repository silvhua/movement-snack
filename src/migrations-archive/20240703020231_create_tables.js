export function up(knex) {
  return knex.schema
    .dropTableIfExists('exercise_discreetness')
    .dropTableIfExists('exercise_movement')
    .dropTableIfExists('exercise_context')
    .dropTableIfExists('exercise_environment')
    .dropTableIfExists('exercise_focus')
    .dropTableIfExists('exercise_modifier')
    .dropTableIfExists('exercise_muscle')
    .dropTableIfExists('exercise_tip')
    .dropTableIfExists('environment')
    .dropTableIfExists('created_time')
    .dropTableIfExists('focus')
    .dropTableIfExists('context')
    .dropTableIfExists('modifier')
    .dropTableIfExists('movement')
    .dropTableIfExists('muscle')
    .dropTableIfExists('tip')
    .dropTableIfExists('activity')
    .dropTableIfExists('session')
    .dropTableIfExists('exercise')
    .dropTableIfExists('video')
    .dropTableIfExists('discreetness')
    .dropTableIfExists('user')
    .createTable('video', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('src');
      table.string('thumbnail');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('discreetness', (table) => {
      table.binary('id', 128).primary();
      table.float('level');
      table.string('description');
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      // table.binary('database_id', 128).notNullable();
    })
    .createTable('exercise', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.integer('strength').notNullable();
      table.integer('exertion').notNullable();
      table
        .binary('discreetness', 128)
        .references('id').inTable('discreetness')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .binary('video_id', 128)
        .references('id').inTable('video')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('url');
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.timestamp('last_edited_time').defaultTo(knex.fn.now());
      // table.binary('database_id', 128).notNullable();
    })
    .createTable('environment', (table) => {
      table.binary('id', 128).primary();
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('movement', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('body_region');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('context', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('focus', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('description');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('modifier', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('description');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('muscle', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('body_region');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('tip', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('text');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('user', (table) => {
      table.binary('id', 128).primary();
      table.string('username').unique();
      table.string('email').unique();
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      table.string('gender');
      table.string('country');
      // table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('session', (table) => {
      table.binary('id', 128).primary();
      table
        .binary('user', 128)
        .references('id').inTable('user').notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      // table.binary('database_id', 128)
      //   .defaultTo('8946ab15-dda7-48f6-8e71-e0557e3158bc')
      //   .notNullable();
      table.string('url');
    })
    .createTable('activity', (table) => {
      table.binary('id', 128).primary();
      table.integer('reps');
      table.integer('duration');
      table
        .binary('exercise_id', 128).notNullable()
        .references('id').inTable('exercise')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .binary('session_id', 128).notNullable()
        .references('id').inTable('session')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // table.binary('database_id', 128).notNullable();
      table.string('notes');
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('exercise_environment', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('environment_id', 128).references('id').inTable('environment')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_movement', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('movement_id', 128).references('id').inTable('movement')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_context', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('context_id', 128).references('id').inTable('context')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_focus', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('focus_id', 128).references('id').inTable('focus')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_modifier', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('modifier_id', 128).references('id').inTable('modifier')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_muscle', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('muscle_id', 128).references('id').inTable('muscle')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_tip', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('tip_id', 128).references('id').inTable('tip')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
};



export function down(knex) {
  return knex.schema
    .dropTableIfExists('exercise_discreetness')
    .dropTableIfExists('exercise_movement')
    .dropTableIfExists('exercise_context')
    .dropTableIfExists('exercise_environment')
    .dropTableIfExists('exercise_focus')
    .dropTableIfExists('exercise_modifier')
    .dropTableIfExists('exercise_muscle')
    .dropTableIfExists('exercise_tip')
    .dropTableIfExists('environment')
    .dropTableIfExists('created_time')
    .dropTableIfExists('focus')
    .dropTableIfExists('context')
    .dropTableIfExists('modifier')
    .dropTableIfExists('movement')
    .dropTableIfExists('muscle')
    .dropTableIfExists('tip')
    .dropTableIfExists('activity')
    .dropTableIfExists('session')
    .dropTableIfExists('exercise')
    .dropTableIfExists('video')
    .dropTableIfExists('discreetness')
    .dropTableIfExists('user')
};

