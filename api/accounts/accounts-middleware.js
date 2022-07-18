const schema = require('../validation/schema');
const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  yup.reach(schema, 'name').validate(name)
    .then(res => console.log(res))
    .catch(err => {
      next({status: 400, message: err.errors[0]});
      return;
    })
  yup.reach(schema, "budget").validate(budget)
    .then(res => console.log(res))
    .catch(err => {
      next({status: 400, message: err.errors[0]});
      return;
    })
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id)
  console.log(account)
  if(account == null){
    console.log("ping from account == null")
    next({status: 404, message: "account not found"});
    return;
  }
  req.account = account;
  next()
}
