// Tiny global toast: any file can call showToast('Copied!'); <Toaster /> shows it.
export const showToast = (message) =>
  window.dispatchEvent(new CustomEvent('app-toast', { detail: message }))