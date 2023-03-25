const Message = require('../models/message');
const {body, validationResult} = require('express-validator');
const {DateTime} = require('luxon');

exports.index = async (req, res, next) => {
  try{
    let messages = await Message.find().sort({date_added: 1});
    res.render('index', {
      title: 'Mini messageboard',
      messages
    });
  } catch(err) {
    next(err);
  }
}

exports.message_create_get = (req, res, next) => {
  res.render('form')
}

exports.message_create_post = [
  body('message', 'Write something!').isLength({min:1}).escape(),
  body('username', 'Name yourself!').trim().isLength({min:1}).escape(),
  async (req, res, next) => {
    const msg = new Message({
      username: req.body.username,
      text: req.body.message,
      date_added: Date.now()
    });
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('form', {
        msg,
        errors: errors.array()
      });
    }
    try{
      await msg.save();
      res.redirect('/');
    } catch(err) {
      next(err)
    }
  }
]