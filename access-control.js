(function () {
  const ACCESS_KEY = 'nurseWoyzAccess';
  const ACCESS_USERS = [
    { username: 'admin', password: '1234' },
    { username: 'nurse', password: '2222' }
  ];
  const SESSION_HOURS = 12;

  function isFilePreview() {
    return window.location.protocol === 'file:';
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(ACCESS_KEY) || 'null');
    } catch (err) {
      return null;
    }
  }

  function hasAccess() {
    const session = getSession();
    if (!session || !session.expiresAt) return false;
    return Date.now() < Number(session.expiresAt);
  }

  function grantAccess(username) {
    const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
    sessionStorage.setItem(ACCESS_KEY, JSON.stringify({ username, expiresAt }));
  }

  function clearAccess() {
    sessionStorage.removeItem(ACCESS_KEY);
    window.location.href = './index.html';
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      html.nw-auth-locked body > :not(.nw-auth-overlay) {
        filter: blur(3px);
        pointer-events: none !important;
        user-select: none !important;
      }
      .nw-auth-overlay {
        position: fixed;
        inset: 0;
        z-index: 999999;
        display: grid;
        place-items: center;
        padding: 22px;
        background: linear-gradient(180deg, rgba(255,244,245,0.97), rgba(255,255,255,0.98));
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        color: #162033;
      }
      .nw-auth-card {
        width: min(420px, 100%);
        background: #fff;
        border: 1px solid #d7e1ef;
        border-radius: 24px;
        padding: 26px;
        box-shadow: 0 24px 70px rgba(20,40,70,0.18);
      }
      .nw-auth-mark {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        background: #a6192e;
        color: #fff;
        font-size: 22px;
        font-weight: 900;
        margin-bottom: 16px;
      }
      .nw-auth-title {
        color: #a6192e;
        font-size: 30px;
        font-weight: 900;
        letter-spacing: -0.04em;
        margin: 0 0 6px;
      }
      .nw-auth-sub {
        color: #61738a;
        font-size: 14px;
        line-height: 1.45;
        margin-bottom: 18px;
      }
      .nw-auth-label {
        display: block;
        color: #61738a;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 12px 0 6px;
      }
      .nw-auth-input {
        width: 100%;
        border: 1.5px solid #c8d4e4;
        border-radius: 14px;
        padding: 13px 14px;
        color: #162033;
        font: inherit;
        font-size: 16px;
        outline: none;
      }
      .nw-auth-input:focus {
        border-color: #a6192e;
        box-shadow: 0 0 0 4px rgba(166,25,46,0.09);
      }
      .nw-auth-btn {
        width: 100%;
        margin-top: 18px;
        border: 0;
        border-radius: 16px;
        background: #a6192e;
        color: #fff;
        padding: 14px;
        font: inherit;
        font-size: 16px;
        font-weight: 900;
        cursor: pointer;
        box-shadow: 0 16px 34px rgba(166,25,46,0.2);
      }
      .nw-auth-error {
        min-height: 20px;
        margin-top: 10px;
        color: #b91c1c;
        font-size: 13px;
        font-weight: 800;
      }
      .nw-lock-btn {
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 999998;
        border: 1px solid #e5b7be;
        background: rgba(255,255,255,0.92);
        color: #981b2d;
        border-radius: 999px;
        padding: 8px 12px;
        font: 800 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(20,40,70,0.13);
      }
      @media print {
        .nw-auth-overlay, .nw-lock-btn { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderLogin() {
    document.documentElement.classList.add('nw-auth-locked');
    const overlay = document.createElement('div');
    overlay.className = 'nw-auth-overlay';
    overlay.innerHTML = `
      <form class="nw-auth-card" id="nwAuthForm" autocomplete="off">
        <div class="nw-auth-mark">NW</div>
        <h1 class="nw-auth-title">Nurse WOYZ</h1>
        <div class="nw-auth-sub">Permission required. Please enter the access credentials to open this demo.</div>
        <label class="nw-auth-label" for="nwAuthUser">Username</label>
        <input class="nw-auth-input" id="nwAuthUser" name="username" type="text" autocapitalize="none" autocomplete="username" required>
        <label class="nw-auth-label" for="nwAuthPass">Password / PIN</label>
        <input class="nw-auth-input" id="nwAuthPass" name="password" type="password" inputmode="numeric" autocomplete="current-password" required>
        <button class="nw-auth-btn" type="submit">Open Nurse WOYZ</button>
        <div class="nw-auth-error" id="nwAuthError" role="alert"></div>
      </form>
    `;
    document.body.appendChild(overlay);

    const form = document.getElementById('nwAuthForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = String(form.username.value || '').trim().toLowerCase();
      const password = String(form.password.value || '').trim();
      const allowed = ACCESS_USERS.some((item) => item.username === username && item.password === password);
      if (!allowed) {
        document.getElementById('nwAuthError').textContent = 'Access denied. Please check the username and PIN.';
        form.password.value = '';
        form.password.focus();
        return;
      }
      grantAccess(username);
      document.documentElement.classList.remove('nw-auth-locked');
      overlay.remove();
      addLockButton();
    });
    setTimeout(() => document.getElementById('nwAuthUser')?.focus(), 50);
  }

  function addLockButton() {
    if (document.querySelector('.nw-lock-btn')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nw-lock-btn';
    button.textContent = 'Lock';
    button.addEventListener('click', clearAccess);
    document.body.appendChild(button);
  }

  function init() {
    injectStyles();
    if (isFilePreview()) {
      addLockButton();
      return;
    }
    if (hasAccess()) addLockButton();
    else renderLogin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
