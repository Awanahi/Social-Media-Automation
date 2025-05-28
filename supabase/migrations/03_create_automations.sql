/*
  # Create automations table

  1. New Tables
    - `automations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `name` (text, not null)
      - `description` (text)
      - `platform` (text, not null)
      - `status` (text)
      - `actions` (jsonb)
      - `targets` (jsonb)
      - `schedule` (jsonb)
      - `limits` (jsonb)
      - `stats` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `automations` table
    - Add policies for authenticated users to manage their own automations
*/

CREATE TABLE IF NOT EXISTS automations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  platform text NOT NULL,
  status text DEFAULT 'active',
  actions jsonb DEFAULT '{}'::jsonb,
  targets jsonb DEFAULT '[]'::jsonb,
  schedule jsonb DEFAULT '{}'::jsonb,
  limits jsonb DEFAULT '{}'::jsonb,
  stats jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE automations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own automations"
  ON automations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);
