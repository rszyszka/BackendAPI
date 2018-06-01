import mongoose, {Schema} from 'mongoose'

// http://mongoosejs.com/docs/schematypes.html
const bookSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    authors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Author'
    },
}, {
    timestamps: true,
});


bookSchema.methods = {
    view (type = 'full') {
        const full = {
            id: this.id,
            title: this.title,
            actors: this.authors
        };

        const list = {
            id: this.id,
            title: this.title
        };

        switch (type) {
            case 'full':
                return full;
            case 'list':
                return list;
        }

        return full;
    }
};

const model =  mongoose.model('Book', bookSchema);
export default model;
export const schema = model.schema;

