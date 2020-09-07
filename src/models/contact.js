import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  country_code: {
    type: String, required: true
  },
  phone_number: {
    type: String, required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  contact_picture: {
    type: String
  },
  is_favorite: {
    type: Boolean,
    default: false
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
