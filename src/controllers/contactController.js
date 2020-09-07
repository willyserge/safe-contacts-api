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
  },
  async getSingleContact(req, res, next) {
    const { contactId } = req.params;
    try {
      const contact = await Contact.findById(contactId);
      res.status(200).json({ contact });
    } catch (error) {
      next(createError(400, 'contact not found'));
    }
  }
};

export default Contacts;
