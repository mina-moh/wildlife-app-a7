var express = require('express');
var router = express.Router();
const { supabase } = require('../supabaseService.js')

router.post('/signout', async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  return res.status(200).send({});
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).send({ message: error.message });
  }

  return res.status(200).send({
    data: {
      session: {
        token: data.session.access_token,
        expires_at: data.session.expires_at
      }
    }
  });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(201).send({ data: data.user });
});

module.exports = router;