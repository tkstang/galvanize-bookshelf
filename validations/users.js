'use strict';

const Joi = require('joi');

module.exports.post = {
  body: { password: Joi.string()
						.min(1)
						.max(20)
						.trim()
						.required(),
					email: Joi.string()
						.min(3)
						.max(15)
						.trim()
						.required()
				 }
};
