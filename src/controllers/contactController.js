import createError from 'http-errors';

const Contacts = {
  async getAllContacts(req, res, next) {
    try {
      res.send('all contacts')
    } catch (error) {
      next(createError(500));
    }
  },
};

export default Contacts;
