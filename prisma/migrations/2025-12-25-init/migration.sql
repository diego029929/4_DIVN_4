-- Table users
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table verification_tokens
CREATE TABLE "verification_tokens" (
    "id" SERIAL PRIMARY KEY,
    "token" VARCHAR(255) NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "expires" TIMESTAMP NOT NULL
);
