const { Schema, model, Types } = require("mongoose");

const TeamSchema = new Schema({
    name:{ type: String, required : true },
    desciption: { type: String },
    users: { type: [Types.ObjectId], default : [] },
    owner:  { type: Types.ObjectId, required: true },
  
  });
  
  const TeamModle = model("user", TeamSchema);
  
  module.exports =  TeamModle ;