import mongoose, {Schema} from 'mongoose'

// http://mongoosejs.com/docs/schematypes.html
const authorSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date,
        trim: true
    },
    nationality: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
});


authorSchema.methods = {
    view (type = 'list') {

        switch (type) {
            case 'list':
                // simple view
                return {
                    id: this.id,
                    name: this.name
                };
            default:
                // full view
                return {
                    id: this.id,
                    name: this.name,
                    birthday: this.birthday,
                    nationality: this.nationality
                }
        }
    }
};


const model = mongoose.model('Author', authorSchema);
export const schema = model.schema;
export default model


