'use client'

import { useState } from 'react'
import { contactReasons } from '@/content/site'
import { RevealText } from '@/components/motion/RevealText'
import { FadeIn } from '@/components/motion/FadeIn'
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
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 border-b border-[var(--line)] pb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">Contact</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.065em] text-[var(--text)] sm:text-5xl lg:text-6xl">
            <RevealText>
              When the brief is ambitious, the build should be too.
            </RevealText>
          </h2>
        </FadeIn>

        <div className="grid gap-14 lg:grid-cols-[0.84fr_1.16fr]">
          <FadeIn className="space-y-3">
            <p className="mb-6 text-sm leading-7 text-[var(--muted)]">
              If you need product judgment, engineering depth, and someone comfortable owning the hard middle, reach out.
            </p>
            {contactReasons.map((reason) => (
              <div
                key={reason}
                className="border-b border-[var(--line)] py-4 text-sm leading-7 text-[var(--muted)]"
              >
                {reason}
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.08}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  value={form.name}
                  onChange={(value) => setForm((c) => ({ ...c, name: value }))}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(value) => setForm((c) => ({ ...c, email: value }))}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]"
                >
                  Project context
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(event) =>
                    setForm((c) => ({ ...c, message: event.target.value.slice(0, 500) }))
                  }
                  required
                  rows={7}
                  className="w-full border-0 border-b border-[var(--line)] bg-transparent pb-4 text-sm text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:border-[var(--text)]/30 focus:outline-none"
                  placeholder="What are you building, what stage are you in, and where do you need leverage?"
                />
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--muted)]">
                  {status === 'success' && "Message sent. I’ll review it shortly."}
                  {status === 'error' && 'Something failed. Try again in a moment.'}
                  {status === 'idle' && 'Clear scope beats vague hype.'}
                  {status === 'loading' && 'Sending...'}
                </p>
                <MagneticButton type="submit" cursorLabel="SEND" disabled={status === 'loading'}>
                  Send enquiry
                </MagneticButton>
              </div>
            </form>
          </FadeIn>
        </div>
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
      <label
        htmlFor={id}
        className="mb-3 block text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="w-full border-0 border-b border-[var(--line)] bg-transparent pb-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:border-[var(--text)]/30 focus:outline-none"
      />
    </div>
  )
}
