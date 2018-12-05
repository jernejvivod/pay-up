//do not forget to add this sheme in db.js
var mongoose = require("mongoose");

var loanShema = new mongoose.Schema({
  loaner: {type: String, required: true},
  recipient: {type: String, required: true},
  dateIssued: {type: Date, "default": Date.now()},
  deadline: Date,
  amount: {type: Number, required: true},
  currency: {type: String, required: true},
  interest: {type: Number, required: true},
  compoundInterest: {type: Boolean, "default": false, required: true}, // false ~ simple interest; true ~ interest on interest
  status: {type: Number, "default": 0, required: true} // 0 ~ pending; 1 ~ active; 2 ~ resolved
});

var userShema = new mongoose.Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: Email, required: true},
  gender: {type: Boolean, required: true}, // true ~ male; false ~ female
  dateJoined: {type: Date, "default": Date.now()},
  status: {type: Number, "default": 0}, // 0 ~ activated_no; 1 ~ activated_yes; 2 ~ terminated
  proDefauld: {type: Boolean, "default": false}, // false ~ default; true ~ pro
  defaultCurrency: {type: String, "default": "EUR"},
  nightmode: {type: Boolean, "default": false} // false ~ off; true ~ on
});

// TODO: Zment se a so oznacbe cool.
mongoose.model('User', userShema, 'Users');
mongoose.model('Loan', loanShema, 'Loans');