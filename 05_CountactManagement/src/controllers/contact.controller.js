import asyncHandler from "express-async-handler";
import Contact from "../models/contact.models.js";

/* These two functions are handling the routes for getting and creating contacts in a contact
management system. Here's a breakdown of what each function does: */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

const createContacts = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const contact = await Contact.create({ name, email, phone,user_id: req.user.id });

    res.status(200).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedContact);
});

/* The `deleteContact` function is handling the route for deleting a contact in the contact management
system. Here's a breakdown of what the function does: */
const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
       res.status(400);
       throw new Error("Contact not found");
   }
   if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
   }
   await Contact.deleteOne({_id: req.params.id});
  res.status(200).json(contact,{msg:"User deleted successfully"});
});

export {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
