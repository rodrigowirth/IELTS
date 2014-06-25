﻿'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var ExamSchema = new Schema({
    applicantId : {
        type: Schema.ObjectId,
        ref: 'Applicant'
    },
    editionId : {
        type: Schema.ObjectId,
        ref: 'Edition'
    },
    writing: {
        type: Number
    },
    reading : {
        type: Number
    },
    speaking: {
        type: Number
    },
    listening: {
        type: Number
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Exam', ExamSchema);