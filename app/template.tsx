/* Plate change. A remounting template plus one CSS animation —
   no AnimatePresence, no client component, no JS at all. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="plate">{children}</div>
}
