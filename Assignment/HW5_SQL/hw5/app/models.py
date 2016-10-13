import sqlite3 as sql

def insert_data(first_name, last_name, company, email, phone_number, street_address, city, state, country, zip_code):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO customers (first_name, last_name, company, email,  phone_number) VALUES (?,?,?,?,?)", (first_name, last_name, company, email, phone_number))
        customer_id = cur.lastrowid
        cur.execute("INSERT INTO address (customer_id, street_address, city, state, country, zip_code) VALUES (?,?,?,?,?,?)", (customer_id, street_address, city, state, country, zip_code))
        con.commit()


def insert_order(customer_id, name_of_part, manufacturer_of_part):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("SELECT order_id FROM orders WHERE name_of_part = ? AND manufacturer_of_part = ?", (name_of_part, manufacturer_of_part))
        order_id = cur.fetchone()
        if order_id is None:
            cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?,?)", (name_of_part, manufacturer_of_part))
            order_id = cur.lastrowid
        else:
            order_id = order_id[0]
        cur.execute("INSERT INTO cust_orders (order_id, customer_id) VALUES (?,?)", (order_id, customer_id))
        con.commit()

# def retrieve_address():
#     with sql.connect("app.db") as con:
#         con.row_factory = sql.Row
#         cur = con.cursor()
#         result = cur.execute("select * from address").fetchall()
#     return result

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from customers").fetchall()
    return result

def retrieve_orders():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("SELECT customer_id, name_of_part, manufacturer_of_part FROM cust_orders JOIN orders ON cust_orders.order_id = orders.order_id").fetchall()
    return result
