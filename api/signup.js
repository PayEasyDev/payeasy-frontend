import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { first_name, surname, email, phone_number, password } = req.body;

  try {
    const display_name = `${first_name} ${surname}`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name,
          first_name,
          surname,
          phone_number,
        },
        emailConfirm: true,
      },
    });

    if (error) throw error;

    res.status(200).json({ message: 'Signup successful. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}