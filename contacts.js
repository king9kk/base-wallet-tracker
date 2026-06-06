// Contacts / Address Book Module
const CONTACTS_KEY = 'wallet_contacts';

function getContacts() {
  try {
    return JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  } catch {
    return [];
  }
}

function addContact(address, name, note = '') {
  const result = validateAddress(address);
  if (!result.valid) {
    showError(result.error);
    return;
  }

  let contacts = getContacts();
  if (contacts.find(c => c.address === address)) {
    showError('Contact already exists!');
    return;
  }

  contacts.push({
    id: Date.now(),
    address,
    name,
    note,
    addedAt: new Date().toISOString()
  });

  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  showSuccess(`${name} added to contacts!`);
  renderContacts();
}

function removeContact(id) {
  let contacts = getContacts();
  contacts = contacts.filter(c => c.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  showSuccess('Contact removed!');
  renderContacts();
}

function getContactName(address) {
  const contacts = getContacts();
  const contact = contacts.find(c =>
    c.address.toLowerCase() === address.toLowerCase()
  );
  return contact?.name || null;
}

function renderContacts() {
  const container = document.querySelector('#contacts-container');
  if (!container) return;

  const contacts = getContacts();

  container.innerHTML = `
    <div class="contacts-card card">
      <h3>📒 Address Book</h3>
      ${contacts.length === 0
        ? '<p class="no-contacts">No contacts saved</p>'
        : contacts.map(contact => `
          <div class="contact-item">
            <div class="contact-avatar">
              ${contact.name.charAt(0).toUpperCase()}
            </div>
            <div class="contact-info">
              <span class="contact-name">${contact.name}</span>
              <span class="contact-address">${shortenAddress(contact.address)}</span>
              ${contact.note ? `<span class="contact-note">${contact.note}</span>` : ''}
            </div>
            <div class="contact-actions">
              <button onclick="copyAddress('${contact.address}')" 
                class="icon-btn">📋</button>
              <button onclick="searchWallet('${contact.address}')"
                class="icon-btn">🔍</button>
              <button onclick="removeContact(${contact.id})"
                class="icon-btn red">🗑️</button>
            </div>
          </div>
        `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderContacts);