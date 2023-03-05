const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const arrayOfContacts = await listContacts();
    return arrayOfContacts.find(
      (contact) => contact.id === contactId.toString()
    );
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const arrayOfContacts = await listContacts();
    const filteredArrayOfContacts = arrayOfContacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredArrayOfContacts));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const arrayOfContacts = await listContacts();
    arrayOfContacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(arrayOfContacts));
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    let updatedContact;
    const arrayOfContacts = await listContacts();
    arrayOfContacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        updatedContact = { ...contact };
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(arrayOfContacts));
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
