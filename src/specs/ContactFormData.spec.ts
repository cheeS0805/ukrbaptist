export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  errorMessage?: string
}
