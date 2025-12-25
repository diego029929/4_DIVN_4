CREATE TABLE "User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  password TEXT NOT NULL,
  "isVerified" BOOLEAN DEFAULT FALSE
);
