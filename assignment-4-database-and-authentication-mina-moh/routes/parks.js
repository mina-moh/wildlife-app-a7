var express = require('express');
var router = express.Router();
const { supabase } = require('../supabaseService.js')
const NodeCache = require('node-cache')
const myCache = new NodeCache()

router.get('/', async function(req, res, next) {
  let parks = myCache.get('parks')

  if (!parks) {
    const { data, error } = await supabase
      .from('parks')
      .select()

    if (error) {
      return res.status(500).send('Parks data not found')
    }

    parks = data

    myCache.set('parks', parks, 86400)
  }

  return res.status(200).send({ data: parks })
})

router.get('/:id', async (req, res) => {
   const { id } = req.params;

  const { data, error } = await supabase
    .from('parks')
    .select()
    .eq('"ID"', id)
    .single();

  if (error) {
    return res.status(404).send({ message: error.message });
  }

  return res.status(200).send({ data });
});

module.exports = router;
