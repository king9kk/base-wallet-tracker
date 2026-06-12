// Internationalization Module
const TRANSLATIONS = {
  en: {
    connect: 'Connect Wallet',
    disconnect: 'Disconnect',
    balance: 'Balance',
    transactions: 'Transactions',
    portfolio: 'Portfolio',
    settings: 'Settings',
    search: 'Search wallet...',
    loading: 'Loading...',
    noData: 'No data found',
    copied: 'Copied!',
    error: 'Something went wrong',
    refresh: 'Refresh',
    export: 'Export',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  bn: {
    connect: 'ওয়ালেট সংযুক্ত করুন',
    disconnect: 'সংযোগ বিচ্ছিন্ন করুন',
    balance: 'ব্যালেন্স',
    transactions: 'লেনদেন',
    portfolio: 'পোর্টফোলিও',
    settings: 'সেটিংস',
    search: 'ওয়ালেট খুঁজুন...',
    loading: 'লোড হচ্ছে...',
    noData: 'কোনো ডেটা পাওয়া যায়নি',
    copied: 'কপি হয়েছে!',
    error: 'কিছু একটা ভুল হয়েছে',
    refresh: 'রিফ্রেশ',
    export: 'এক্সপোর্ট',
    save: 'সেভ করুন',
    cancel: 'বাতিল',
    confirm: 'নিশ্চিত করুন'
  },
  zh: {
    connect: '连接钱包',
    disconnect: '断开连接',
    balance: '余额',
    transactions: '交易记录',
    portfolio: '投资组合',
    settings: '设置',
    search: '搜索钱包...',
    loading: '加载中...',
    noData: '未找到数据',
    copied: '已复制！',
    error: '出现错误',
    refresh: '刷新',
    export: '导出',
    save: '保存',
    cancel: '取消',
    confirm: '确认'
  }
};

let currentLang = localStorage.getItem('app_lang') || 'en';

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] ||
    TRANSLATIONS['en'][key] || key;
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  applyTranslations();
  showSuccess(`Language changed!`);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

function renderLanguagePicker() {
  const container = document.querySelector('#lang-picker');
  if (!container) return;

  container.innerHTML = `
    <select onchange="setLanguage(this.value)"
      style="background:var(--card);border:1px solid var(--border);
      color:var(--text);padding:6px 12px;border-radius:8px;font-size:13px">
      <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
      <option value="bn" ${currentLang === 'bn' ? 'selected' : ''}>🇧🇩 বাংলা</option>
      <option value="zh" ${currentLang === 'zh' ? 'selected' : ''}>🇨🇳 中文</option>
    </select>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderLanguagePicker();
});