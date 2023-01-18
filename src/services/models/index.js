import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const userModel = mongoose.model('user', UserSchema);

export default userModel;