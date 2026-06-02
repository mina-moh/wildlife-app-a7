var express = require('express');
var router = express.Router();
const { supabase } = require('../supabaseService.js')
const NodeCache = require('node-cache');
const myCache = new NodeCache();

router.get('/', async (req, res) => {
  let species = myCache.get('species');

  if (!species) {
    const { data, error } = await supabase
      .from('species')
      .select();

    if (error) {
      return res.status(500).send({ message: "Species data not found" });
    }

    species = data;

    myCache.set('species', species, 86400 * 7);
  }

  return res.status(200).send({ data: species });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const cacheKey = `species_${id}`;
  const cached = myCache.get(cacheKey);

  if (cached) {
    return res.status(200).send({ data: cached });
  }

  const { data, error } = await supabase
    .from('species')
    .select()
    .eq('"ID"', id)
    .single();

  if (error) {
    return res.status(404).send("Species with that ID not found");
  }

  myCache.set(cacheKey, data, 86400 * 7);

  return res.status(200).send({ data });
});


module.exports = router;
