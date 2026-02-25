// Toast Notification System
class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    if (!document.querySelector('.toast-container')) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector('.toast-container');
    }
  }

  show(type, title, message, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };

    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas ${icons[type]}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
      <div class="toast-progress"></div>
    `;

    this.container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.hide(toast));

    if (duration > 0) {
      setTimeout(() => this.hide(toast), duration);
    }

    return toast;
  }

  hide(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 400);
  }

  success(title, message, duration) {
    return this.show('success', title, message, duration);
  }

  error(title, message, duration) {
    return this.show('error', title, message, duration);
  }

  warning(title, message, duration) {
    return this.show('warning', title, message, duration);
  }

  info(title, message, duration) {
    return this.show('info', title, message, duration);
  }
}

// Initialize and make globally available
const toast = new ToastManager();
window.toast = toast;

console.log('Toast manager loaded successfully');