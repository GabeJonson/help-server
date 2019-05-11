const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  userName: String,
  userBirth: String,
});

const users = mongoose.model('users', UsersSchema);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allUsers = await users.find();

  res.json(allUsers.reverse());
});

router.post('/', async function(req, res) {
  const { userName, userBirth } = req.body;

  const newUser = new users({
    userName, userBirth
  });

  await newUser.save();
  const allUsers = await users.find();

  res.json(allUsers.reverse())
});

router.put('/:id', async function(req, res) {
  const { userName, userBirth } = req.body;
  const { id } = req.params;

  await users.findOneAndUpdate(id, { userName, userBirth });
  const allUsers = await users.find();

  res.json(allUsers.reverse())
});

router.delete('/:id', async function(req, res) {
  const { id } = req.params;

  await users.remove({_id: id});
  const allUsers = await users.find();

  res.json(allUsers.reverse())
});

module.exports = router;
