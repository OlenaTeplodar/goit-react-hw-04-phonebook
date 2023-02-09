import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

// import contacts from 'initialContacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublication = (name, number) => {
    const nameNormalized = name.toLowerCase();
    const numberNormalized = number.trim();
    const duble = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === nameNormalized || numberNormalized === number
      );
    });
    return Boolean(duble);
  };

  const handleSubmit = ({ name, number }) => {
    if (isDublication({ name, number })) {
      alert(`${name} or ${number}  is already in contacts`);
      return false;
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFindContacts = () => {
    if (!filter) {
      return contacts;
    }
    const findNormalized = filter.toLowerCase();
    const data = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(findNormalized);
    });
    return data;
  };

  const filteredContacts = getFindContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter handleChange={handleFilter} value={filter} />
      {isContacts && (
        <ContactList contacts={contacts} removeContact={removeContact} />
      )}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );
};

export default App;
