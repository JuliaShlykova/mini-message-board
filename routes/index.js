var express = require('express');
var router = express.Router();
const {DateTime} = require('luxon');
const {body, validationResult} = require('express-validator');

const formattedDate = (d) => {
  return DateTime.fromJSDate(d).toLocaleString(DateTime.DATE_MED)
}

const Message = (text, user) => {
  const added = formattedDate(new Date());
  return {text, user, added};
}

let messages = [Message("Hi there!", "Amando"), Message("Hello World!","Charles")]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini messageboard', messages });
});

router.get('/new', function(req,res,next) {
  res.render('form');
});

router.post('/new',
  body('message', 'Write something!').isLength({min:1}).escape(),
  body('user', 'Name yourself!').trim().isLength({min:1}).escape(),
  function(req, res, next) {
    const msg = Message(req.body.message, req.body.user);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('form', {
        msg,
        errors: errors.array()
      })
    }
    messages.push(msg);
    res.redirect('/');
})

module.exports = router;
