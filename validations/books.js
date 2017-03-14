'use strict';

const Joi = require('joi');

module.exports.post = {
  body: { id: Joi.number()
						.label('id')
						.integer()
						.min(1)
						.required(),
					title: Joi.string()
						.label('title')
						.min(3)
						.max(30)
						.required(),
					author: Joi.string()
						.label('author')
						.min(3)
						.max(20)
						.required(),
					genre: Joi.string()
						.label('genre')
						.min(3)
						.max(15)
						.required(),
					description: Joi.string()
						.label('description')
						.min(10)
						.max(150)
						.required(),
					coverUrl: Joi.string()
						.label('coverUrl')
						.min(5)
						.max(30)
						.required(),
				 }
};
