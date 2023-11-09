const mongoose = require('mongoose');

const getCurrentDatePlus7Days = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);
  return currentDate;
};

const noteSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        admin_id:{type: String, required: true},
        url: { type: Array, default: [] },
        done: { type: Boolean, default: false },
        important: { type: Boolean, default: false },
        completionDate: { type: Date, default: getCurrentDatePlus7Days } 
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('notes', noteSchema, 'notes');
