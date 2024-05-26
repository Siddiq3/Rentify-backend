const mongoose = require('mongoose');
const User = require('./User'); // Assuming User model is in the same directory

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  rent: { type: Number, required: true },
  nearby: { type: String, required: true },
  address: { type: String, required: true },
  seller: { 
    type: String, 
    required: true,
    validate: {
      validator: async function(email) {
        const user = await User.findOne({ email: email, userType: 'seller' });
        return user !== null;
      },
      message: 'Seller email must be a registered user with seller role'
    }
  }
});

module.exports = mongoose.model('Property', propertySchema);
