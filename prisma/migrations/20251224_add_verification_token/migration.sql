-- Migration manuelle pour créer la table VerificationToken
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    token TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);
