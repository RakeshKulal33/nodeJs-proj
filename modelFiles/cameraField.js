'use strict';

let db = require('mongoose')
var AutoIncrement = require('mongoose-sequence')(db);
const Schema = db.Schema

let camera = new Schema(
    {
        id: {
            type: Number
        },
        cameraname: {
            type: String,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
        },
        price: {
            type: String,
        },
        created_At: {
            type: String
        }
    }
)

camera.plugin(AutoIncrement, { id: 'camera_seq', inc_field: 'id' });
camera.set('collection', 'Camera')
let cameraModel = db.model('Camera', camera)

module.exports = cameraModel