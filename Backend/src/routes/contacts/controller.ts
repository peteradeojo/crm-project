import { IRequest, IResponse } from "../../interfaces"
import Contact from "../../models/Contact";

const debug = require('debug')('app:contacts-controller');

export default {
  updateContact: async (req: IRequest, res: IResponse) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, tel, address } = req.body;

    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      if (contact.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (name) contact.name = name;
      if (email) contact.email = email;
      if (tel) contact.tel = tel;
      if (address) contact.address = address;

      await contact.save();

      return res.status(200).json({ message: "Contact updated", data: { contact } });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

  createContact: async (req: IRequest, res: IResponse) => {
    const { name, email, tel, address } = req.body;

    const contact = new Contact({
      name,
      email,
      tel,
      address,
      user: req.user!._id,
    });

    try {
      await contact.save();
      return res.status(201).json({ message: "Contact created", data: { contact } });
    } catch (err: any) {
      debug(err);
      return res.status(500).json({ message: err.message });
    }
  },

  deleteContact: async (req: IRequest, res: IResponse) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      if (contact.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await contact.deleteOne();

      return res.status(200).json({ message: "Contact deleted", data: { contact } });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
}