DROP TABLE IF EXISTS users;
CREATE TABLE users (
  "user_id" serial NOT NULL,
  "name" varchar NOT NULL, 
  "email" varchar NOT NULL, 
  "account_id" integer NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS accounts cascade;
CREATE TABLE accounts (
  "account_id" serial NOT NULL,
  "date_opened" timestamp NOT NULL,
  "balance" int NOT NULL CHECK (balance >= 0), 
  "history" varchar, 
  CONSTRAINT "accounts_pk" PRIMARY KEY ("account_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  "transaction_id" serial NOT NULL,
  "type" varchar NOT NULL,
  "sender_id" integer NOT NULL,
  "recipient_id" integer NOT NULL, 
  "amount" integer NOT NULL, 
  "date" timestamp NOT NULL, 
  "memo" varchar, 
  CONSTRAINT "transactions_pk" PRIMARY KEY("transaction_id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE public.people ADD CONSTRAINT "people_fk0" FOREIGN KEY ("species_id") REFERENCES  public.species("_id");

ALTER TABLE users ADD CONSTRAINT "users_fk" FOREIGN KEY ("account_id") REFERENCES accounts("account_id");

ALTER TABLE transactions ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("sender_id") REFERENCES accounts("account_id");

ALTER TABLE transactions ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("recipient_id") REFERENCES accounts("account_id");

INSERT INTO accounts
VALUES (1, '1999-01-08', 1000000000, 'x');

INSERT INTO users 
VALUES (1, 'Bezos', 'bezos@bezos.com', 1);



  -- "user_id" serial NOT NULL,
  -- "name" varchar NOT NULL, 
  -- "email" varchar NOT NULL, 
  -- "account_id" integer NOT NULL,
  -- CONSTRAINT "users_pk" PRIMARY KEY ("user_id")