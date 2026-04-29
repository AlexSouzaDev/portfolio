'use client'

import { useState } from 'react'
import { contactReasons } from '@/content/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contact"
            title="When the brief is ambitious, the build should be too."
            body="If you need product judgment, engineering depth, and someone comfortable owning the hard middle, reach out."
          />
          <div className="space-y-3">
            {contactReasons.map((reason) => (
              <div key={reason} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-white/63">
                {reason}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="name"
              label="Name"
              value={form.name}
              onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => setForm((current) => ({ ...current, email: value }))}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/46">
              Project context
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value.slice(0, 500) }))
              }
              required
              rows={7}
              className="w-full rounded-[1.4rem] border border-white/10 bg-slate-950/55 px-4 py-4 text-white placeholder:text-white/25 focus:border-cyan-200/40 focus:outline-none"
              placeholder="What are you building, what stage are you in, and where do you need leverage?"
            />
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/52">
              {status === 'success' && 'Message sent. I’ll review it shortly.'}
              {status === 'error' && 'Something failed on send. Try again in a moment.'}
              {status === 'idle' && 'Clear scope beats vague hype. Include the real challenge.'}
              {status === 'loading' && 'Sending...'}
            </div>
            <MagneticButton type="submit" cursorLabel="SEND" disabled={status === 'loading'}>
              Send enquiry
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/46">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="w-full rounded-[1.4rem] border border-white/10 bg-slate-950/55 px-4 py-4 text-white placeholder:text-white/25 focus:border-cyan-200/40 focus:outline-none"
      />
    </div>
  )
}
