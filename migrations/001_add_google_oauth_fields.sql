-- Migration: Add Google OAuth fields to users table
-- Date: 2025-12-01
-- Description: Adds googleId, firstName, lastName, and picture columns for Google OAuth support

-- Add new columns
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS "googleId" VARCHAR(255) UNIQUE,
  ADD COLUMN IF NOT EXISTS "firstName" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "lastName" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "picture" TEXT;

-- Make password nullable for Google OAuth users
ALTER TABLE users 
  ALTER COLUMN password DROP NOT NULL;

-- Create index on googleId for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users("googleId");

-- Add comment
COMMENT ON COLUMN users."googleId" IS 'Google OAuth unique identifier';
COMMENT ON COLUMN users."firstName" IS 'User first name from Google profile';
COMMENT ON COLUMN users."lastName" IS 'User last name from Google profile';
COMMENT ON COLUMN users."picture" IS 'User profile picture URL from Google';
