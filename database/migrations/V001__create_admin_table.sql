CREATE TABLE admin (
    admin_id SERIAL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    full_access BOOLEAN DEFAULT FALSE
);