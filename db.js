const  mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email : String,
    password : String,
    firstName : String,
    lastname : String,
    _id : ObjectId
});

const adminSchema = new Schema({
    email : String,
    password : String,
    firstName : String,
    lastname : String,
    _id : ObjectId
});

const courseSchema = new Schema({
    title : String,
    desciption : String,
    price : Number,
    imageUrl : String,
    CreatorId : ObjectId,
    _id : ObjectId
});

const purchaseSchema = new Schema({
    courseId : ObjectId,
    userId : ObjectId,
    _id : ObjectId
});


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel 
}