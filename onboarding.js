// Onboarding / Tutorial Module
const ONBOARDING_KEY = 'onboarding_complete';

const STEPS = [
  {
    title: '👋 Welcome to Base Wallet Tracker!',
    description: 'Track your wallet, tokens, NFTs and more on Base network.',
    target: '.navbar'
  },
  {
    title: '🔗 Connect Your Wallet',
    description: 'Click the Connect Wallet button to get started with MetaMask.',
    target: '.connect-btn'
  },
  {
    title: '🔍 Search Any Wallet',
    description: 'Enter any Base wallet address to view its activity.',
    target: '.search-input'
  },
  {
    title: '📊 View Your Portfolio',
    description: 'See your ETH balance and token values in real-time.',
    target: '#portfolio-container'
  },
  {
    title: '🎉 You are all set!',
    description: 'Explore all features and track your Base journey!',
    target: null
  }
];

let currentStep = 0;

function isOnboardingComplete() {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

function completeOnboarding() {
  localStorage.setItem(ONBOARDING_KEY, 'true');
  removeOnboardingUI();
}

function removeOnboardingUI() {
  document.querySelector('#onboarding-overlay')?.remove();
  document.querySelector('#onboarding-tooltip')?.remove();
}

function showOnboarding() {
  if (isOnboardingComplete()) return;
  currentStep = 0;
  renderStep();
}

function renderStep() {
  removeOnboardingUI();
  if (currentStep >= STEPS.length) {
    completeOnboarding();
    return;
  }

  const step = STEPS[currentStep];
  const tooltip = document.createElement('div');
  tooltip.id = 'onboarding-tooltip';
  tooltip.style.cssText = `
    position:fixed;bottom:24px;right:24px;
    background:#1a1b1f;border:1px solid #0052ff;
    border-radius:12px;padding:20px;
    max-width:300px;z-index:9999;
    box-shadow:0 8px 32px rgba(0,82,255,0.3)
  `;
  tooltip.innerHTML = `
    <div style="font-size:18px;font-weight:bold;margin-bottom:8px">
      ${step.title}
    </div>
    <p style="color:#888;font-size:14px;margin-bottom:16px">
      ${step.description}
    </p>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span style="color:#888;font-size:12px">
        ${currentStep + 1} / ${STEPS.length}
      </span>
      <div style="display:flex;gap:8px">
        <button onclick="completeOnboarding()"
          style="background:none;border:none;color:#888;
          cursor:pointer;font-size:13px">Skip</button>
        <button onclick="nextStep()"
          style="background:#0052ff;color:white;border:none;
          padding:8px 16px;border-radius:8px;cursor:pointer">
          ${currentStep === STEPS.length - 1 ? 'Finish 🎉' : 'Next →'}
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(tooltip);
}

function nextStep() {
  currentStep++;
  renderStep();
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(showOnboarding, 1000);
});