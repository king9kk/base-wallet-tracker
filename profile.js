// Wallet Profile Module
const PROFILE_KEY = 'wallet_profiles';

function getProfiles() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProfile(address, profileData) {
  const profiles = getProfiles();
  profiles[address] = {
    ...profileData,
    address,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
  showSuccess('Profile saved!');
  renderProfile(address);
}

function getProfile(address) {
  const profiles = getProfiles();
  return profiles[address] || {
    name: '',
    bio: '',
    avatar: '🦊',
    social: {}
  };
}

const AVATARS = ['🦊', '🐻', '🦁', '🐯', '🦄', 
                  '🐉', '🦅', '🐬', '🦋', '⬡'];

function renderProfile(address) {
  const container = document.querySelector('#profile-container');
  if (!container) return;

  const profile = getProfile(address);

  container.innerHTML = `
    <div class="profile-card card">
      <div class="profile-header">
        <div class="profile-avatar">${profile.avatar}</div>
        <div class="profile-info">
          <h3>${profile.name || shortenAddress(address)}</h3>
          <p class="profile-address">${shortenAddress(address, 8)}</p>
          ${profile.bio ? `<p class="profile-bio">${profile.bio}</p>` : ''}
        </div>
      </div>
      <div class="avatar-picker">
        ${AVATARS.map(avatar => `
          <span class="avatar-option ${avatar === profile.avatar ? 'selected' : ''}"
            onclick="selectAvatar('${address}', '${avatar}')">
            ${avatar}
          </span>
        `).join('')}
      </div>
      <div class="profile-form">
        <input type="text" id="profile-name" 
          placeholder="Your name" value="${profile.name}"
          class="profile-input">
        <textarea id="profile-bio" 
          placeholder="Short bio..." 
          class="profile-input">${profile.bio}</textarea>
        <button onclick="saveProfileForm('${address}')" 
          class="btn-primary">Save Profile</button>
      </div>
    </div>
  `;
}

function selectAvatar(address, avatar) {
  const profile = getProfile(address);
  saveProfile(address, { ...profile, avatar });
}

function saveProfileForm(address) {
  const name = document.querySelector('#profile-name')?.value || '';
  const bio = document.querySelector('#profile-bio')?.value || '';
  const profile = getProfile(address);
  saveProfile(address, { ...profile, name, bio });
}