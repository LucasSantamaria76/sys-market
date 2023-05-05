-- Database: lucas

-- DROP DATABASE IF EXISTS lucas;

CREATE DATABASE sysmarketdb
    WITH
    OWNER = adminUser
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	

CREATE TABLE products (
 product_ID varchar(13),
 description varchar NOT NULL,
 sale_price	NUMERIC(15,2) NOT NULL CHECK (sale_price > 0),
 stock 	NUMERIC(6) DEFAULT 0,
 profit_percentage NUMERIC(3),
 cost_price	NUMERIC(15,5),
 provider_ID INTEGER,
	
PRIMARY KEY (product_ID)
);

CREATE TABLE providers (
 provider_ID SERIAL,
 name_provider varchar NOT NULL,
 address VARCHAR(50),
 phone VARCHAR(15),	
	
PRIMARY KEY (provider_ID)
);