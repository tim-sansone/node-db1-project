const yup = require('yup')

const schema = yup.object().shape({
  name: yup.string()
          .required("name and budget are required")
          .trim()
          .min(3, "name of account must be between 3 and 100")
          .max(100, "name of account must be between 3 and 100"),
  budget: yup.number()
            .required("name and budget are required")
            .typeError("budget of account must be a number")
            .min(0, "budget of account is too large or too small")
            .max(1000000, "budget of account is too large or too small")
})

module.exports = schema;
