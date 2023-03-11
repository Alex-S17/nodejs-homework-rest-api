const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactServices");

const getContacts = async (_, res) => {
  const listOfContacts = await listContacts();
  res.status(200).json({
    status: "200",
    listOfContacts,
  });
};

const getById = async (req, res) => {
  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  return res.status(200).json({
    status: "200",
    contactById,
  });
};

const addNewContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({
      status: "400",
      message: "missing some of required fields",
    });
  const newContact = { ...req.body };
  if (!newContact.favorite) {
    newContact.favorite = false;
  }

  await addContact(newContact);
  res.status(201).json({
    status: "201",
    newContact,
  });
};

const eraseContact = async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  await removeContact(contactById.id);
  res.status(200).json({
    status: "200",
    message: "contact deleted",
  });
};

const editContact = async (req, res, next) => {
  if (!req.body.name && !req.body.email && !req.body.phone)
    return res.status(400).json({
      status: "400",
      message: "missing fields",
    });

  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }

  await updateContact(contactById.id, req.body);
  const updatedContact = await getContactById(req.params.contactId);
  res.status(200).json({
    status: "200",
    updatedContact,
  });
};

const updateFavorite = async (req, res, next) => {
  if (!req.body && !req.body.favorite)
    return res.status(400).json({
      status: "400",
      message: "missing field favorite",
    });

  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }

  await updateStatusContact(contactById.id, req.body);
  const updatedContact = await getContactById(req.params.contactId);
  res.status(200).json({
    status: "200",
    updatedContact,
  });
};

module.exports = {
  getContacts,
  getById,
  addNewContact,
  eraseContact,
  editContact,
  updateFavorite,
};
