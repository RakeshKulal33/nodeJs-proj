'use strict';

let db = require('mongoose')
var AutoIncrement = require('mongoose-sequence')(db);
const Schema = db.Schema

let cameraNetwork = new Schema(
    {
        id: {
            name: Number
        },
        name: {
            type: String,
        },
        cameraid: {
            type: Number
        },
        description: {
            type: String,
        },
        cameras: {
            type: Array,
        },
        created_At: {
            type: String
        }
    }
)

cameraNetwork.plugin(AutoIncrement, { id: 'cameraNet_seq', inc_field: 'id' });
cameraNetwork.set('collection', 'CameraNet')
let cameraNetModel = db.model('CameraNet', cameraNetwork)

module.exports = cameraNetModel