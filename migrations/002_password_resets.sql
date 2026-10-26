CREATE TABLE IF NOT EXISTS password_resets (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  token_hash CHAR(64) NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  requested_at DATETIME NOT NULL,
  CONSTRAINT password_resets_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
