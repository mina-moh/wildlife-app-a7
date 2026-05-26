var express = require('express');
var router = express.Router();
const { supabase } = require('../supabaseService.js')

router.get('/', async (req, res) => {
  const { park, since, before } = req.query;

  let query = supabase.from('sightings').select('*');

  if (park) {
    query = query.eq('ParkID', park);
  }

  if (since) {
    query = query.gte('DateTime', since);
  }

  if (before) {
    query = query.lte('DateTime', before);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).send({ message: error.message });
  }

  return res.status(200).send(data);
});

router.get('/:user_id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sightings')
    .select()
    .eq('"UserID"', id)
    .single();

  if (error) {
    return res.status(404).send({ message: "Sighting with that ID not found" });
  }

  return res.status(200).send({ data });
});

router.post('/', async (req, res) => {
  const { accessToken, parkID, speciesID, date_time } = req.body;

  if (!accessToken || !parkID || !speciesID) {
    return res.status(422).send("Missing required params");
  }

  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: ''
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    return res.status(401).send("Invalid user");
  }

  const userId = userData.user.id;

  const { data, error } = await supabase
    .from('sightings')
    .insert([
      {
        ParkID: parkID,
        SpeciesID: speciesID,
        UserID: userId, 
        DateTime: date_time || new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(400).send(error.message);
  }

  return res.status(201).send(data);
});

module.exports = router;
