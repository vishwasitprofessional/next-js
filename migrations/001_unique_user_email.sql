-- Resolve existing duplicate email addresses before applying this migration.
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
