/*
  # Create automation logs table

  1. New Tables
    - `automation_logs`
      - `id` (uuid, primary key)
      - `automation_id` (uuid, references automations.id)
      - `user_id` (uuid, references profiles.id)
      - `action_type` (text, not null)
      - `target` (text)
      - `status` (text)
      - `details` (jsonb)
      - `created_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `automation_logs` table
    - Add policies for authenticated users to read their own automation logs
*/

CREATE TABLE IF NOT EXISTS automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id uuid REFERENCES automations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action_type text NOT NULL,
  target text,
  status text DEFAULT 'success',
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own automation logs"
  ON automation_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
