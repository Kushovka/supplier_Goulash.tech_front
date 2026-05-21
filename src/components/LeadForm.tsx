import { type FormEvent, useState } from 'react'
import { createLead, getApiErrorMessage } from '../api/equipment'

type LeadFormProps = {
  equipmentId?: string
  leadType?: string
  title?: string
}

type FormState = {
  customer_name: string
  phone: string
  email: string
  message: string
}

const initialState: FormState = {
  customer_name: '',
  phone: '',
  email: '',
  message: '',
}

const LeadForm = ({ equipmentId, leadType = 'quote', title = 'Request a Quote' }: LeadFormProps) => {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      await createLead({
        equipment_id: equipmentId ?? null,
        lead_type: leadType,
        customer_name: form.customer_name,
        phone: form.phone,
        email: form.email || null,
        message: form.message || null,
      })
      setForm(initialState)
      setStatus('success')
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Could not send the request. Check backend connection and try again.'))
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="premium-card space-y-4 p-6">
      <div>
        <p className="premium-kicker">Dealer Response</p>
        <h2 className="text-2xl font-extrabold text-stone-950">{title}</h2>
      </div>
      <label className="block text-sm font-semibold text-stone-700">
        Name
        <input
          required
          className="premium-input"
          value={form.customer_name}
          onChange={(event) => setForm({ ...form, customer_name: event.target.value })}
          placeholder="Contact or business name"
        />
      </label>
      <label className="block text-sm font-semibold text-stone-700">
        Phone
        <input
          required
          className="premium-input"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          placeholder="+1 (555) 000-0000"
        />
      </label>
      <label className="block text-sm font-semibold text-stone-700">
        Email
        <input
          type="email"
          className="premium-input"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="name@farm.com"
        />
      </label>
      <label className="block text-sm font-semibold text-stone-700">
        Message
        <textarea
          className="premium-input min-h-28"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          placeholder="Share equipment questions, delivery needs, or trade-in details."
        />
      </label>
      <button
        disabled={status === 'sending'}
        className="premium-button w-full disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {status === 'sending' ? 'Sending...' : 'Submit Request'}
      </button>
      {status === 'success' && <p className="text-sm font-bold text-emerald-700">Request sent. Our team will contact you shortly.</p>}
      {status === 'error' && <p className="text-sm font-bold text-red-700">{errorMessage}</p>}
    </form>
  )
}

export default LeadForm
