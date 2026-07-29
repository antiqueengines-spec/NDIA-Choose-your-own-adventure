import type { ParticipantId } from '../data/types'

interface Props {
  id: ParticipantId
  name: string
  accent: string
  size?: 'sm' | 'md' | 'lg'
}

/** Flat illustrated portraits — unique look per participant, tinted by accent. */
export function ParticipantPortrait({ id, name, accent, size = 'md' }: Props) {
  return (
    <span className={`portrait portrait-${size}`} aria-hidden="true" title={name}>
      <svg viewBox="0 0 96 96" role="img" focusable="false">
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="46" fill={`url(#bg-${id})`} />
        <circle cx="48" cy="48" r="46" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="2" />
        {renderFace(id, accent)}
      </svg>
    </span>
  )
}

function renderFace(id: ParticipantId, accent: string) {
  switch (id) {
    case 'maya':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="22" ry="26" fill="#f2c7a8" />
          <path d="M26 48c2-22 14-30 22-30s20 8 22 30c-6-8-14-10-22-10s-16 2-22 10z" fill="#1b1b27" />
          <path d="M28 42c4-10 12-16 20-16s16 6 20 16" fill="none" stroke="#1b1b27" strokeWidth="8" strokeLinecap="round" />
          <circle cx="40" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.2" fill="#1b1b27" />
          <path d="M44 62c2 2 6 2 8 0" fill="none" stroke="#c1285e" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M34 72h28c0 10-6 16-14 16s-14-6-14-16z" fill={accent} opacity="0.85" />
        </g>
      )
    case 'jordan':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="21" ry="25" fill="#e8b896" />
          <path d="M28 46c1-16 10-24 20-24s19 8 20 24c-5-6-12-8-20-8s-15 2-20 8z" fill="#3a2a1f" />
          <rect x="30" y="34" width="36" height="8" rx="4" fill="#5c4030" />
          <circle cx="40" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.2" fill="#1b1b27" />
          <path d="M44 62h8" stroke="#8a5a3a" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M34 72h28c0 10-6 16-14 16s-14-6-14-16z" fill="#2a4a5c" />
          <path d="M42 72h12v8H42z" fill="#d54f7f" opacity="0.7" />
        </g>
      )
    case 'sam':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="22" ry="26" fill="#8d5a3c" />
          <path d="M27 50c3-20 12-28 21-28s18 8 21 28c-6-7-13-9-21-9s-15 2-21 9z" fill="#1b1b27" />
          <circle cx="40" cy="54" r="2.3" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.3" fill="#1b1b27" />
          <path d="M43 63c2.5 2.5 7.5 2.5 10 0" fill="none" stroke="#5a3420" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M33 73h30c0 10-7 16-15 16s-15-6-15-16z" fill="#76abd6" />
        </g>
      )
    case 'aisha':
      return (
        <g>
          <ellipse cx="48" cy="60" rx="20" ry="22" fill="#d4a574" />
          <path
            d="M22 52c2-22 12-34 26-34s24 12 26 34c-4-2-8-3-10-3 0-10-6-16-16-16s-16 6-16 16c-2 0-6 1-10 3z"
            fill="#2a2a38"
          />
          <path d="M28 52c4-14 12-20 20-20s16 6 20 20" fill="none" stroke="#c1285e" strokeWidth="2.5" opacity="0.5" />
          <circle cx="40" cy="56" r="2.1" fill="#1b1b27" />
          <circle cx="56" cy="56" r="2.1" fill="#1b1b27" />
          <path d="M44 64c2 1.8 6 1.8 8 0" fill="none" stroke="#a86a4a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M34 74h28c0 9-6 15-14 15s-14-6-14-15z" fill={accent} />
        </g>
      )
    case 'riley':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="21" ry="25" fill="#f0c4a0" />
          <path d="M28 44c2-16 11-24 20-24s18 8 20 24c-5-5-12-7-20-7s-15 2-20 7z" fill="#1b1b27" />
          <path d="M34 36c4-6 10-9 14-9s10 3 14 9" fill="none" stroke="#1b1b27" strokeWidth="10" strokeLinecap="round" />
          <circle cx="40" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.2" fill="#1b1b27" />
          <path d="M42 36h12v3H42z" fill="#76abd6" opacity="0.8" />
          <path d="M44 62h8" stroke="#b07850" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M34 72h28c0 10-6 16-14 16s-14-6-14-16z" fill="#1b1b27" />
        </g>
      )
    case 'priya':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="21" ry="25" fill="#c98a5a" />
          <path d="M26 48c3-20 13-30 22-30s19 10 22 30c-6-8-14-11-22-11s-16 3-22 11z" fill="#1b1b27" />
          <path d="M30 40c6-12 14-16 18-16s12 4 18 16" fill="none" stroke="#1b1b27" strokeWidth="7" strokeLinecap="round" />
          <circle cx="40" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="62" cy="50" r="2.5" fill="#d54f7f" />
          <path d="M44 62c2 2 6 2 8 0" fill="none" stroke="#8a4a2a" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M34 72h28c0 10-6 16-14 16s-14-6-14-16z" fill={accent} />
        </g>
      )
    case 'lena':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="21" ry="25" fill="#e0a878" />
          <path d="M24 52c4-22 14-32 24-32s20 10 24 32c-7-9-15-12-24-12s-17 3-24 12z" fill="#4a2c18" />
          <path d="M22 54c0-4 4-6 8-4 3-8 10-12 18-12s15 4 18 12c4-2 8 0 8 4" fill="#4a2c18" />
          <circle cx="40" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.2" fill="#1b1b27" />
          <path d="M44 62c2 2 6 2 8 0" fill="none" stroke="#a86a40" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M34 72h28c0 10-6 16-14 16s-14-6-14-16z" fill="#5B8DB8" />
        </g>
      )
    case 'kai':
      return (
        <g>
          {/* Group / finance batch — three small faces */}
          <circle cx="30" cy="46" r="14" fill="#f2c7a8" />
          <path d="M18 42c1-10 6-14 12-14s11 4 12 14" fill="#1b1b27" />
          <circle cx="26" cy="44" r="1.4" fill="#1b1b27" />
          <circle cx="34" cy="44" r="1.4" fill="#1b1b27" />
          <path d="M22 56h16c0 6-4 10-8 10s-8-4-8-10z" fill="#76abd6" />

          <circle cx="66" cy="46" r="14" fill="#8d5a3c" />
          <path d="M54 42c1-10 6-14 12-14s11 4 12 14" fill="#1b1b27" />
          <circle cx="62" cy="44" r="1.4" fill="#1b1b27" />
          <circle cx="70" cy="44" r="1.4" fill="#1b1b27" />
          <path d="M58 56h16c0 6-4 10-8 10s-8-4-8-10z" fill="#d54f7f" />

          <circle cx="48" cy="62" r="15" fill="#e8b896" />
          <path d="M35 58c1-11 7-15 13-15s12 4 13 15" fill="#3a2a1f" />
          <circle cx="43" cy="60" r="1.5" fill="#1b1b27" />
          <circle cx="53" cy="60" r="1.5" fill="#1b1b27" />
          <path d="M40 74h16c0 7-4 11-8 11s-8-4-8-11z" fill="#1b1b27" />
        </g>
      )
    case 'noah':
      return (
        <g>
          <ellipse cx="48" cy="58" rx="21" ry="25" fill="#f0c4a0" />
          <path d="M30 42c1-14 9-22 18-22s17 8 18 22c-5-5-11-7-18-7s-13 2-18 7z" fill="#1b1b27" />
          <path d="M36 34c3-5 7-7 12-7s9 2 12 7" fill="none" stroke="#1b1b27" strokeWidth="9" strokeLinecap="round" />
          <circle cx="40" cy="54" r="2.2" fill="#1b1b27" />
          <circle cx="56" cy="54" r="2.2" fill="#1b1b27" />
          <path d="M44 62h8" stroke="#b07850" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="36" y="48" width="8" height="3" rx="1" fill="#76abd6" opacity="0.5" />
          <path d="M34 72h28c0 10-6 16-14 16s-14-6-14-16z" fill="#2f7d6d" />
        </g>
      )
    default:
      return (
        <g>
          <circle cx="48" cy="52" r="20" fill="#e8d5c4" />
          <circle cx="40" cy="50" r="2" fill="#1b1b27" />
          <circle cx="56" cy="50" r="2" fill="#1b1b27" />
        </g>
      )
  }
}
