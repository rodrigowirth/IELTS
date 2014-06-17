'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Applicant Schema
 */
var ApplicantSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email cannot be blank'
    },    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Applicant', ApplicantSchema);