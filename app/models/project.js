const { Schema, model, Types } = require("mongoose");

const ProjectSchema = new Schema({
    title:{ type: String, required : true },
    text: { type: String },
    tags: { type: [String], default : [] },
    image:  { type: String, default : "/defaults/pngwing.com.png" },
    owner:  { type: Types.ObjectId, required: true },
    team:  { type: Types.ObjectId, required: true },
    private:  { type: Boolean, default: true },
  
  });
  
  const ProjectModle = model("user", ProjectSchema);
  
  module.exports =  ProjectModle ;

//   title
// text
// tags : [ ]
// image
// owner 
// team teamId
// private
