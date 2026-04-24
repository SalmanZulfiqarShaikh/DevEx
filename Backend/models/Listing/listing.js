const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

    sellerId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    title: {type:String, required:true, maxlength: 80},
    description:{type:String, required:true, maxlength:1000},
    price:{type:Number, required:true},
    category:{type:String},
    demoUrl:{type:String},
    createdAt:{type: Date, default: Date.now}

})

module.exports = mongoose.model("Listing", listingSchema);