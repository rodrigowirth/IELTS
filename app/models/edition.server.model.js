'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 	 Schema = mongoose.Schema;

 /**
  * Edition Schema
  */
  var EditionSchema = new Schema({
  		title: {
  			type: String,
  			default: '',
  			required: 'Title cannot be blank'
  		},
  		date: {
  			type: Date,
  			default: Date.now
  		},
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		}
  });

  mongoose.model('Edition', EditionSchema);