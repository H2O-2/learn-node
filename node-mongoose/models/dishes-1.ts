import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
}, { timestamps: true });

const Dishes: mongoose.Model<mongoose.Document> = mongoose.model('Dish', dishSchema);

export { Dishes };
