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
  }
};

export default Contacts;
