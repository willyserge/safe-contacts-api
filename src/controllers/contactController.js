import createError from 'http-errors';
import Contact from '../models/contact';


const Contacts = {
  async getAllContacts(req, res, next) {
    try {
      const contacts = await Contact.find({ createdBy: req.user.id });
      res.status(200).json({ contacts });
    } catch (error) {
      next(createError(500));
    }
  },
  async createContact(req, res, next) {
    const newContact = new Contact(req.body);
    newContact.createdBy = req.user.id;
    try {
      const contact = await newContact.save();
      res.status(201).json({
        message: 'new contact created successfully',
        contact
      });
    } catch (error) {
      next(createError(400));
    }
  }
};

export default Contacts;
