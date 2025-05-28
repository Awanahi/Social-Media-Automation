/*
  # Create social accounts table

  1. New Tables
    - `social_accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `platform` (text, not null)
      - `username` (text, not null)
      - `access_token` (text)
      - `refresh_token` (text)
      - `token_expires_at` (timestamp with time zone)
      - `status` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `social_accounts` table
    - Add policies for authenticated users to manage their own social accounts
*/

CREATE TABLE IF NOT EXISTS social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  username text NOT NULL,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform, username)
);

ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own social accounts"
  ON social_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);
