'use strict';

const Joi = require('joi');

module.exports.post = {
  body: { bookId: Joi.number()
						.label('bookId')
						.integer()
						.min(1)
						.required(),
				 }
};
