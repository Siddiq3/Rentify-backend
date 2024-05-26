const Property = require('../models/Property');
const User = require('../models/User');

exports.createProperty = async (req, res) => {
  const { title, description, location, bedrooms, bathrooms, rent,nearby, seller ,address} = req.body;
  try {
    const property = new Property({
      title,
      description,
      location,
      bedrooms,
      bathrooms,
      rent,
      nearby,
      address,
      seller,
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('seller');
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
    const { title } = req.params;
    const updates = req.body;
    try {
      const property = await Property.findOne({ title });
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      // Update each field specified in the request body
      for (const key in updates) {
        if (Object.hasOwnProperty.call(updates, key)) {
          property[key] = updates[key];
        }
      }
      const updatedProperty = await property.save();
      res.status(200).json(updatedProperty);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteProperty = async (req, res) => {
    const { title } = req.params;
    try {
      await Property.findOneAndDelete({ title });
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  exports.getPropertiesBySeller = async (req, res) => {
    const { seller } = req.params; // Access seller from route parameters
    
    
    //console.log('Seller email:', seller); // Log the seller's email extracted from the route parameter
    try {
        // Find properties by seller email
        const properties = await Property.find({ seller });
    //    console.log('Properties:', properties); // Log the fetched properties
        
        if (!properties || properties.length === 0) {
            return res.status(404).json({ message: 'Properties not found for the specified seller' });
        }
        
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error:', error); // Log any caught errors
        res.status(500).json({ error: error.message });
    }
};



  

  exports.getPropertyByTitle = async (req, res) => {
    const { title } = req.params;
    try {
      // Find the property by title
      const property = await Property.findOne({ title });
      
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Find the seller details using the email from the property
      const seller = await User.findOne({ email: property.seller, userType: 'seller' });
      
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      const result = {
        _id: seller._id,
        firstName: seller.firstName,
        lastName: seller.lastName,
        email: seller.email,
        phoneNumber: seller.phoneNumber,
        userType: seller.userType,
        __v: seller.__v,
      };
  
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };