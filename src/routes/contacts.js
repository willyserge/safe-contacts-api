import express from 'express';
import Contacts from '../controllers/contactController';
import auth from '../middleware/auth';


const contactsRouter = express.Router();
contactsRouter.get('/', auth, Contacts.getAllContacts);
contactsRouter.post('/create', auth, Contacts.createContact);


export default contactsRouter;
