'use strict';

const Joi = require('joi');

module.exports.post = {
  body: { id: Joi.number()
						.integer()
						.min(1)
						.required(),
					firstName: Joi.string()
						.min(3)
						.max(15)
						.required(),
					lastName: Joi.string()
						.min(3)
						.max(15)
						.required(),
					email: Joi.string()
						.min(3)
						.max(15)
						.trim()
						.required()
				 }
};
