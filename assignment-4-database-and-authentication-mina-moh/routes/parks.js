var express = require('express');
var router = express.Router();
const { supabase } = require('../supabaseService.js')

router.get('/', async function(req, res, next) {
  const { data, error } = await supabase
  .from('parks')
  .select()

  if (error) {
    return res.status(500).send( "Parks data not found");
  }

  return res.status(200).send({ data });
});

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
