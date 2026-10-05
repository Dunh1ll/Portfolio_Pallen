// Every link and contact detail in one place, so the Contact section, the footer
// and the command palette can never disagree.
export const EMAIL = 'cpe.pallen.princedunhill@gmail.com'
export const PHONE_DISPLAY = '0950 464 7074'
export const PHONE_LINK = '+639504647074'
export const RESUME_URL = 'https://drive.google.com/file/d/1392cs0UZbuROHIWIG9S2tzfpIGLvuulo/view?usp=drive_link'

export const SOCIALS = {
  facebook: { label: 'Facebook', url: 'https://www.facebook.com/dnhll.plln' },
  github: { label: 'GitHub', url: 'https://github.com/Dunh1ll' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pallen-prince-dunhill/' },
  instagram: { label: 'Instagram', url: 'https://www.instagram.com/nturdanii?igsh=eGxsdmVwc3BwMGt5' },
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers / blocked clipboard: fall back to a temporary text field.
    try {
      const field = document.createElement('textarea')
      field.value = text
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(field)
      return ok
    } catch {
      return false
    }
  }
}