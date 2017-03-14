'use strict';

const Joi = require('joi');

module.exports.post = {
  body: { id: Joi.number()
						.integer()
						.min(1)
						.required(),
					bookId: Joi.number()
						.integer()
						.min(1)
						.required(),
					userId: Joi.number()
						.integer()
						.min(1)
						.required(),
				 }
};
