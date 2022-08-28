const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        _id: { type: Number },
        title: { type: String, required: true },
        description: { type: String, default: '', required: true },
        slug: { type: String, slug: 'title', unique: true },
        poster: { type: Number, required: true, ref: 'User', default: 0 },
        // author: { type: Number, required: true, ref: 'Author', default: 0 },
        price: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 },
        sold: { type: Number, required: true, default: 0 },
        images: { type: Array, default: [] },
        deleted: { type: Boolean, default: false },
    },
    {
        _id: false,
        timestamps: true,
    },
);

mongoose.plugin(slug);

PostSchema.plugin(AutoIncrement, {
    id: 'book_id',
    inc_field: '_id',
});

module.exports = mongoose.model('Post', PostSchema);
