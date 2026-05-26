var express = require('express');
var router = express.Router();
const { supabase } = require('../supabaseService.js')

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('species')
    .select();

  if (error) {
    return res.status(500).send({ message: "Species data not found" });
  }

  return res.status(200).send({ data });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('species')
    .select()
    .eq('"ID"', id)
    .single();

  if (error) {
    return res.status(404).send("Species with that ID not found");
  }

  return res.status(200).send({ data });
});


module.exports = router;
