const mongoose = require("mongoose");

const conservationSchema = new mongoose.Schema(
    {
member:{
    type: Array,
    },
  },
{timestamps: true} // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("conversation", conservationSchema);