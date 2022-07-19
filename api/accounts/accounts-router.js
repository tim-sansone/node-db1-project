const router = require('express').Router();
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => res.json(accounts))
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(account => res.status(201).json(account))
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(account => res.json(account))
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(number => res.json(req.account))
    .catch(next)
})



module.exports = router;
