// User Feedback Module
const FEEDBACK_KEY = 'user_feedback';

function submitFeedback(type, message) {
  const feedback = {
    id: Date.now(),
    type,
    message,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  };

  let feedbacks = getAllFeedback();
  feedbacks.unshift(feedback);
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbacks));
  showSuccess('Feedback submitted! Thank you 🙏');
  renderFeedbackForm();
}

function getAllFeedback() {
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || [];
  } catch {
    return [];
  }
}

function renderFeedbackForm() {
  const container = document.querySelector('#feedback-container');
  if (!container) return;

  container.innerHTML = `
    <div class="card" style="max-width:500px;margin:24px auto">
      <h3>💬 Feedback</h3>
      <div style="display:flex;gap:8px;margin:16px 0">
        <button onclick="submitFeedback('bug','Found a bug')"
          style="background:#ff3d00;color:white;border:none;
          padding:8px 16px;border-radius:8px;cursor:pointer">
          🐛 Bug
        </button>
        <button onclick="submitFeedback('feature','Feature request')"
          style="background:#0052ff;color:white;border:none;
          padding:8px 16px;border-radius:8px;cursor:pointer">
          💡 Feature
        </button>
        <button onclick="submitFeedback('praise','Great app!')"
          style="background:#00c853;color:white;border:none;
          padding:8px 16px;border-radius:8px;cursor:pointer">
          ⭐ Praise
        </button>
      </div>
      <p style="color:#888;font-size:13px">
        Total feedback: ${getAllFeedback().length}
      </p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderFeedbackForm);