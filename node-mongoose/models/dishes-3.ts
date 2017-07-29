import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema: mongoose.Schema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment:  {
        type: String,
        required: true,
    },
    author:  {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const dishSchema: mongoose.Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
}, { timestamps: true });

const Dishes: mongoose.Model<mongoose.Document> = mongoose.model('Dish', dishSchema);

export { Dishes };
