-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  "account_id" uuid UNIQUE default uuid_generate_v4 (),
  "google_id" varchar NOT NULL,
  "name" varchar NOT NULL, 
  "email" varchar NOT NULL, 
  CONSTRAINT "users_pk" PRIMARY KEY ("google_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS accounts cascade;
CREATE TABLE accounts (
  "account_id" uuid UNIQUE NOT NULL,
  "date_opened" timestamp NOT NULL,
  "balance" numeric(16,4) NOT NULL CHECK (balance >= 0), 
  "history" varchar, 
  CONSTRAINT "accounts_pk" PRIMARY KEY ("account_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  "transaction_id" serial NOT NULL,
  "type" varchar NOT NULL,
  "sender_id" uuid NOT NULL,
  "recipient_id" uuid, 
  "amount" numeric(12,2) NOT NULL, 
  "date" timestamp NOT NULL, 
  "memo" varchar, 
  CONSTRAINT "transactions_pk" PRIMARY KEY("transaction_id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE public.people ADD CONSTRAINT "people_fk0" FOREIGN KEY ("species_id") REFERENCES  public.species("_id");

ALTER TABLE accounts ADD CONSTRAINT "accounts_fk" FOREIGN KEY ("account_id") REFERENCES users("account_id");

ALTER TABLE transactions ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("sender_id") REFERENCES accounts("account_id");

-- ALTER TABLE transactions ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("recipient_id") REFERENCES accounts("account_id");

-- INSERT INTO accounts 
-- VALUES (1, '1999-01-08', 1000000000, 'x');

-- INSERT INTO users (
--   google_id, 
--   name, 
--   email 
-- )

-- VALUES (1, 'Bezos', 'bezos@bezos.com');

-- We want to reference "account_id" on users table

  -- "user_id" serial NOT NULL,
  -- "name" varchar NOT NULL, 
  -- "email" varchar NOT NULL, 
  -- "account_id" integer NOT NULL,
  -- CONSTRAINT "users_pk" PRIMARY KEY ("user_id")