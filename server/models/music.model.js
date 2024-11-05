import mongoose from "mongoose";

const musicSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    isFavorite : {
        type : Boolean,
        default : false,
        required : true
    },
    isPlaying: {
        type : Boolean,
        default : false,
    },
    artist :{
        type : String,
        required:true
    },
    duration :{
        type : Number,
        required : true
    },
    fileUrl:{
        type : String,
    },
    plays : {
        type : Number,
        default : 0
    }
}, 
    {
        timestamps : true
    }
)

const Music = mongoose.model('Music', musicSchema)
export default Music