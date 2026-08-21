'use client'

import { useState } from 'react'

type State = 'idle' | 'sending' | 'sent' | 'error'

/** The reply card. Posts to a form endpoint; no server route required. */
export function ReplyForm({ endpoint }: { endpoint: string }) {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    setError('')

    const data = new FormData(event.currentTarget)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      setState('sent')
      event.currentTarget.reset()
    } catch {
      setState('error')
      setError('That did not send. Email contact@alexsouza.dev instead.')
    }
  }

  const field =
    'w-full border-0 border-b border-rule bg-transparent px-0 py-2.5 outline-none transition-colors duration-300 ease-press placeholder:text-ink-soft focus:border-ink'

  return (
    <form onSubmit={onSubmit} className="grid max-w-measure gap-6">
      <label className="block">
        <span className="sc text-[0.8rem] text-ink-soft">Name</span>
        <input name="name" required maxLength={200} className={field} />
      </label>

      <label className="block">
        <span className="sc text-[0.8rem] text-ink-soft">Email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          className={field}
        />
      </label>

      <label className="block">
        <span className="sc text-[0.8rem] text-ink-soft">Message</span>
        <textarea name="message" required maxLength={1200} rows={4} className={field} />
      </label>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <button
          type="submit"
          disabled={state === 'sending' || state === 'sent'}
          className="sc ink-bleed text-[1.05rem] transition-colors duration-300 ease-press hover:text-seal disabled:text-ink-soft"
        >
          {state === 'sending'
            ? 'Sending'
            : state === 'sent'
              ? 'Sent'
              : 'Send reply'}
        </button>

        {state === 'sent' ? (
          <span className="font-mono text-micro uppercase text-ink-soft">
            Received — expect a reply within two days
          </span>
        ) : null}
        {state === 'error' ? (
          <span className="font-mono text-micro uppercase text-seal">{error}</span>
        ) : null}
      </div>
    </form>
  )
}
