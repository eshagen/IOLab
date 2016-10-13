
-- Insert code to create Database Schema
-- This will create your .db database file for use

drop table if exists customers;
create table customers (
	customer_id integer primary key,
	company text not null,
	email text not null,
  first_name text not null,
  last_name text not null,
  phone_number text not null
);

drop table if exists address;
create table address(
  address_id integer primary key,
  street_address text not null,
  city text not null,
  state text not null,
  country text not null,
  zip_code varchar not null,
	customer_id integer,
	foreign key(customer_id) references customers(customer_id)
);

drop table if exists orders;
create table orders (
  order_id integer primary key,
  name_of_part text not null,
  manufacturer_of_part text not null
);

drop table if exists cust_orders;
create table cust_orders(
	id integer primary key,
	order_id integer,
	customer_id integer,
	foreign key (order_id) references orders(order_id),
	foreign key (customer_id) references customers(customer_id)
);
