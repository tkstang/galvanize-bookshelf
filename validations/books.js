'use strict';

const Joi = require('joi');

module.exports.post = {
  body: { id: Joi.number()
						.integer()
						.min(1)
						.required(),
					title: Joi.string()
						.min(3)
						.max(30)
						.required(),
					author: Joi.string()
						.min(3)
						.max(20)
						.required(),
					genre: Joi.string()
						.min(3)
						.max(15)
						.required(),
					description: Joi.string()
						.min(10)
						.max(150)
						.required(),
					coverUrl: Joi.string()
						.min(5)
						.max(30)
						.required(),
					createdAt: Joi.string()
						.min(5)
						.max(20)
						.required(),
					updatedAt: Joi.string()
						.min(5)
						.max(20)
						.required(),
				 }
};
