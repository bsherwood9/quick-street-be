exports.up = function (knex) {
  return knex.schema

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("email", 255).unique().notNullable();
      tbl.text("password", 255).notNullable();
      tbl.boolean("isVendor");
      tbl.boolean("isAdmin");
    })

    .createTable("vendors", (tbl) => {
      tbl.increments();
      tbl
        .integer("users_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("business_name", 255).notNullable();
      tbl.text("phone", 255).unique().notNullable();
      tbl.text("address", 1000);
      tbl.integer("zipcode").notNullable();
      tbl.text("city", 64);
      tbl.text("description", 1000);
      tbl.text("vendor_category", 255);
      tbl.text("bulletin", 1000);
      tbl.text("vendor_banner", 1000);
    })

    .createTable("customers", (tbl) => {
      tbl.increments();
      tbl
        .integer("users_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("customer_name", 255).notNullable();
      tbl.text("phone_number", 255).unique().notNullable();
      tbl.text("address", 1000).notNullable();
      tbl.integer("zip_code").notNullable();
    })

    .createTable("products", (tbl) => {
      tbl.increments();
      tbl
        .integer("vendor_id")
        .unsigned()
        .notNullable()
        .references("vendors.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("name", 255).notNullable();
      tbl.text("description", 1000);
      tbl.text("product_category", 255);
      tbl.text("diet_category", 255);
      tbl.text("unit", 255);
      tbl.decimal("price").notNullable();
    })

    .createTable("vendor_customer_map", (tbl) => {
      tbl
        .integer("vendors_id")
        .unsigned()
        .notNullable()
        .references("vendors.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("customer_id")
        .unsigned()
        .notNullable()
        .references("customers.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("orders", (tbl) => {
      tbl.increments();
      tbl
        .integer("customer_id")
        .unsigned()
        .notNullable()
        .references("customers.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("product_id")
        .unsigned()
        .notNullable()
        .references("products.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.integer("count");
      tbl.float("total_price");
    })

    .createTable("posts", (tbl) => {
      tbl.increments();
      tbl
        .integer("vendors_id")
        .unsigned()
        .notNullable()
        .references("vendors.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("title", 255).notNullable();
      tbl.text("description", 1000).notNullable();
      tbl.datetime("date");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("posts")
    .dropTableIfExists("orders")
    .dropTableIfExists("vendor_customer_map")
    .dropTableIfExists("products")
    .dropTableIfExists("customers")
    .dropTableIfExists("vendors")
    .dropTableIfExists("users");
};
