CREATE DATABASE divvy;

CREATE TABLE bill (
    bill_id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(150),       /* merchant_name */
    restaurant_address VARCHAR(150),    /* merchant_address */
    date_receipt TIMESTAMP,             /* date */
    date_entered TIMESTAMP,             /* calculate now() */
    tax_percent real,                   /* taxRate */
    tip_percent real,                   /* tip */
    payer_id integer REFERENCES patron (patron_id)
);

CREATE TABLE patron (
    patron_id SERIAL PRIMARY KEY,
    name_first VARCHAR(50),             /* nameFirst */
    name_last VARCHAR(50),              /* nameLast */
    phone VARCHAR(10)
);

CREATE TABLE bill_patron (
    bill_id SERIAL REFERENCES bill,
    patron_id SERIAL REFERENCES patron,
    PRIMARY KEY (bill_id, patron_id)
);