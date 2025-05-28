/*
  # Create analytics table

  1. New Tables
    - `analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `platform` (text, not null)
      - `date` (date, not null)
      - `metrics` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `analytics` table
    - Add policies for authenticated users to manage their own analytics data
*/

CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  date date NOT NULL,
  metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform, date)
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own analytics"
  ON analytics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);
