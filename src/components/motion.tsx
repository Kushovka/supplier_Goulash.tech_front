import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

export const PageFade = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 12 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

export const Reveal = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)
