const yup = require('yup');
const schema = require('../validation/schema');
const Accounts = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  const { name, budget } = req.body;
  try {
    await yup.reach(schema, 'name').validate(name)
  } catch(err){
    next({status: 400, message: err.errors[0]});
    return
  }
  try {
    await yup.reach(schema, "budget").validate(budget)
  } catch(err) {
    next({status: 400, message: err.errors[0]});
    return;
  }
    req.body.name = req.body.name.trim();
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const nameExists = await Accounts.getByName(req.body.name)
  if(nameExists){
    next({status: 400, message: "that name is taken"})
    return
  }
  next()
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id)
  if(account == null){
    next({status: 404, message: "account not found"});
    return;
  }
  req.account = account;
  next()
}
