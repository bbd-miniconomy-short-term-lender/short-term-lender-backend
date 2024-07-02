CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    full_access BOOLEAN DEFAULT FALSE
);
