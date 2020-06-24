const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: false},
        imagePath: {type: String, required: true}
    },
    {collection: 'image-uploader'}
);
module.exports = mongoose.model('Image', imageSchema);
