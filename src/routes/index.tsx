import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  BookOpen,
  LayoutDashboard,
  Library,
  ChartNoAxesCombined,
  PawPrint,
  Settings,
  LogOut,
  Plus,
  ArrowUpRight,
  ArrowRight,
  Flame,
  Coins,
  Zap,
  Search,
  ChevronDown,
  Download,
  Check,
  Target,
  Clock3,
  GraduationCap,
  ExternalLink,
  SlidersHorizontal,
  Bell,
  Sparkles,
  ChevronRight,
  CircleHelp,
} from 'lucide-react'
import type { User } from '@netlify/identity'
import {
  getUser,
  getSettings,
  handleAuthCallback,
  oauthLogin,
  login,
  signup,
  logout,
} from '@netlify/identity'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export const Route = createFileRoute('/')({ component: Home })
type Entry = {
  id: string
  subject: string
  board: string
  level: string
  year: string
  series: string
  paper: string
  marks: number
  total: number
  minutes: number
  allowed: number
  topics: string
  notes: string
  date: string
}
type Profile = {
  coins: number
  xp: number
  streak: number
  lastLogin: string
  pets: string[]
  equipped: string
}
const subjects = [
  'Mathematics',
  'Further Maths',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'Business',
  'English Language',
  'English Literature',
  'History',
  'Geography',
  'Psychology',
  'Sociology',
  'Accounting',
  'French',
  'Spanish',
  'German',
  'Religious Studies',
  'Art & Design',
  'Music',
  'Physical Education',
  'Design & Technology',
  'ICT',
  'Environmental Management',
  'Travel & Tourism',
  'Law',
  'Media Studies',
  'Statistics',
]
const boards = ['Edexcel', 'CAIE / Cambridge', 'AQA', 'OCR', 'WJEC', 'CCEA']
const components = [
  'Paper 1',
  'Paper 2',
  'Paper 3',
  'Paper 4',
  'Paper 5',
  'Paper 6',
  'Pure 1',
  'Pure 2',
  'Pure 3',
  'Pure 4',
  'Mechanics 1',
  'Mechanics 2',
  'Statistics 1',
  'Statistics 2',
  'Decision 1',
  'Practical',
  'Alternative to Practical',
  'Other component',
]
const demo: Entry[] = [
  {
    id: 'd1',
    subject: 'Mathematics',
    board: 'Edexcel',
    level: 'A-Level',
    year: '2023',
    series: 'Summer',
    paper: 'Pure 1',
    marks: 64,
    total: 75,
    minutes: 86,
    allowed: 90,
    topics: 'Integration by parts',
    notes: 'Remember the constant of integration.',
    date: '2026-11-10',
  },
  {
    id: 'd2',
    subject: 'Physics',
    board: 'CAIE / Cambridge',
    level: 'A-Level',
    year: '2022',
    series: 'Winter',
    paper: 'Paper 2',
    marks: 43,
    total: 60,
    minutes: 70,
    allowed: 75,
    topics: 'Momentum, Electric fields',
    notes: 'Review vector directions.',
    date: '2026-11-09',
  },
  {
    id: 'd3',
    subject: 'Computer Science',
    board: 'AQA',
    level: 'A-Level',
    year: '2023',
    series: 'Summer',
    paper: 'Paper 1',
    marks: 82,
    total: 100,
    minutes: 110,
    allowed: 120,
    topics: 'Recursion',
    notes: 'Trace recursive calls.',
    date: '2026-11-08',
  },
  {
    id: 'd4',
    subject: 'Further Maths',
    board: 'Edexcel',
    level: 'A-Level',
    year: '2022',
    series: 'Summer',
    paper: 'Pure 2',
    marks: 52,
    total: 75,
    minutes: 90,
    allowed: 90,
    topics: 'Complex numbers, Matrices',
    notes: 'Check arithmetic.',
    date: '2026-11-07',
  },
  {
    id: 'd5',
    subject: 'Mathematics',
    board: 'Edexcel',
    level: 'A-Level',
    year: '2021',
    series: 'Summer',
    paper: 'Mechanics 1',
    marks: 58,
    total: 75,
    minutes: 85,
    allowed: 90,
    topics: 'Momentum',
    notes: 'Draw clear diagrams.',
    date: '2026-11-06',
  },
]
const blank = {
  subject: 'Mathematics',
  board: 'Edexcel',
  level: 'A-Level',
  year: '2024',
  series: 'Summer',
  paper: 'Pure 1',
  marks: 0,
  total: 75,
  minutes: 0,
  allowed: 90,
  topics: '',
  notes: '',
}
const pct = (e: Entry) => (e.marks / e.total) * 100
function Owl({
  small = false,
  kind = 'owl',
}: {
  small?: boolean
  kind?: string
}) {
  return (
    <svg
      className={small ? 'owl small' : 'owl'}
      viewBox="0 0 200 190"
      role="img"
      aria-label={`${kind} study companion`}
    >
      <ellipse cx="100" cy="174" rx="58" ry="9" fill="#252530" />
      <path
        d="M50 69 43 26 78 45Q100 35 122 45L157 26 150 69Q177 132 140 159Q100 181 60 159Q23 132 50 69"
        fill={
          kind === 'fox' ? '#d99568' : kind === 'cat' ? '#a0b9b0' : '#b9b0e6'
        }
      />
      <path
        d="M54 104Q34 123 44 146L66 135M146 104Q166 123 156 146L134 135"
        fill="#8e83bc"
      />
      <ellipse cx="100" cy="127" rx="41" ry="37" fill="#dcd5f2" />
      <path
        d="M58 66Q77 49 100 72Q123 49 142 66Q159 97 132 111Q113 120 100 105Q87 120 68 111Q41 97 58 66"
        fill="#eeeaf8"
      />
      <ellipse cx="77" cy="85" rx="9" ry="12" fill="#302d45" />
      <ellipse cx="123" cy="85" rx="9" ry="12" fill="#302d45" />
      <circle cx="80" cy="81" r="3" fill="white" />
      <circle cx="126" cy="81" r="3" fill="white" />
      <path
        d="m94 101 6 10 6-10"
        fill={kind === 'owl' ? '#e5ba6a' : '#5a4149'}
      />
      {kind === 'cat' && (
        <g stroke="#6c8d80" strokeWidth="2.5" strokeLinecap="round">
          <path d="M60 103 39 98m21 12-23 3m103-10 21-5m-21 12 23 3" />
          <path d="m94 116 6 4 6-4" fill="none" />
        </g>
      )}
      {kind === 'fox' && <path d="m75 104 25 26 25-26-25 8Z" fill="#f1d5bb" />}
      {kind === 'fox' && <path d="m94 110 6 8 6-8Z" fill="#66414a" />}
      <path
        d="m73 163 8-3 8 3m23 0 8-3 8 3"
        stroke="#e5ba6a"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M92 131h16m-16 9h16"
        stroke="#b9b0e6"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
function Home() {
  const [tab, setTab] = useState('Overview')
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [entries, setEntries] = useState<Entry[]>(demo)
  const [profile, setProfile] = useState<Profile>({
    coins: 320,
    xp: 740,
    streak: 5,
    lastLogin: '',
    pets: ['owl'],
    equipped: 'owl',
  })
  const [modal, setModal] = useState('')
  const [form, setForm] = useState(blank)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All subjects')
  const [busy, setBusy] = useState(false)
  const [providers, setProviders] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [authError, setAuthError] = useState('')
  const [syncError, setSyncError] = useState('')
  const [paperFilter, setPaperFilter] = useState('All components')
  const [bounds, setBounds] = useState([90, 80, 70, 60, 50, 40])
  const [libSubject, setLibSubject] = useState('Mathematics')
  const [libBoard, setLibBoard] = useState('Edexcel')
  const [libYear, setLibYear] = useState('2024')
  const [libLevel, setLibLevel] = useState('A-Level')
  const [libPaper, setLibPaper] = useState('Paper 1')
  const [libSeries, setLibSeries] = useState('Summer')
  const grade = (n: number) =>
    ['A*', 'A', 'B', 'C', 'D', 'E'][bounds.findIndex((b) => n >= b)] || 'U'
  async function api(method = 'GET', body?: unknown) {
    const r = await fetch('/api/study', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await r.json()
    if (!r.ok) throw Error(data.error || 'Unable to sync. Please try again.')
    return data
  }
  async function sync() {
    let data
    try {
      data = await api()
      setSyncError('')
    } catch (error) {
      setSyncError(
        'Your study data could not be loaded. Please retry before adding more entries.',
      )
      throw error
    }
    setEntries(data.entries)
    setProfile(data.profile)
    if (data.boundaries) setBounds(data.boundaries)
  }
  useEffect(() => {
    ;(async () => {
      try {
        await handleAuthCallback()
        const u = await getUser()
        setUser(u)
        if (u) {
          setEntries([])
          setProfile({
            coins: 0,
            xp: 0,
            streak: 0,
            lastLogin: '',
            pets: ['owl'],
            equipped: 'owl',
          })
          await sync()
        }
        const s = await getSettings()
        setProviders(
          Object.entries(s.providers)
            .filter(([, v]) => v)
            .map(([k]) => k),
        )
      } catch {
        setAuthError(
          'Account services are temporarily unavailable. Please refresh to try again.',
        )
      } finally {
        setReady(true)
      }
    })()
  }, [])
  const requireLogin = () => {
    if (!user) {
      setModal('auth')
      return false
    }
    return true
  }
  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!requireLogin()) return
    setBusy(true)
    try {
      await api('POST', { action: 'entry', entry: form })
      await sync()
      setModal('')
      setForm(blank)
      toast.success('Paper logged. +50 XP and +20 coins!')
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function pet(name: string) {
    if (!requireLogin()) return
    setBusy(true)
    try {
      await api('POST', { action: 'pet', pet: name })
      await sync()
      toast.success('Your study companion is ready!')
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function authenticate(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    try {
      if (register) {
        const newUser = await signup(email, password, {
          full_name: email.split('@')[0],
        })
        if (newUser.confirmedAt) {
          setUser(newUser)
          setEntries([])
          setProfile({
            coins: 0,
            xp: 0,
            streak: 0,
            lastLogin: '',
            pets: ['owl'],
            equipped: 'owl',
          })
          await sync()
          setModal('')
          toast.success('Your workspace is ready.')
        } else {
          toast.success('Check your email to confirm your account.')
        }
      } else {
        const u = await login(email, password)
        setUser(u)
        setEntries([])
        setProfile({
          coins: 0,
          xp: 0,
          streak: 0,
          lastLogin: '',
          pets: ['owl'],
          equipped: 'owl',
        })
        await sync()
        setModal('')
        toast.success('Welcome back. Your workspace is synced.')
      }
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setBusy(false)
    }
  }
  const avg = entries.length
    ? entries.reduce((a, e) => a + pct(e), 0) / entries.length
    : 0
  const filtered = entries.filter(
    (e) =>
      (filter === 'All subjects' || e.subject === filter) &&
      (paperFilter === 'All components' || e.paper === paperFilter) &&
      `${e.subject} ${e.paper} ${e.year} ${e.board}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  const subjectStats = [...new Set(entries.map((e) => e.subject))]
    .map((s) => ({
      name: s,
      avg:
        entries.filter((e) => e.subject === s).reduce((a, e) => a + pct(e), 0) /
        entries.filter((e) => e.subject === s).length,
    }))
    .sort((a, b) => a.avg - b.avg)
  const topicCounts: Record<string, number> = {}
  entries.forEach((e) =>
    e.topics
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => (topicCounts[t] = (topicCounts[t] || 0) + 1)),
  )
  function resource(source: string, kind: string) {
    const q = `${libSubject} ${libBoard} ${libLevel} ${libYear} ${libSeries} ${libPaper} ${kind}`
    return `https://www.google.com/search?q=${encodeURIComponent(`site:${source === 'PMT' ? 'physicsandmathstutor.com' : 'paperlord.com'} ${q}`)}`
  }
  function exportCSV() {
    const keys = [
      'date',
      'subject',
      'board',
      'level',
      'year',
      'series',
      'paper',
      'marks',
      'total',
      'minutes',
      'allowed',
      'topics',
      'notes',
    ] as const
    const quote = (v: unknown) =>
      `"${String(v ?? '')
        .replace(/^[=+@-]/, "'$&")
        .replaceAll('"', '""')}"`
    const text = [
      keys.join(','),
      ...entries.map((e) => keys.map((k) => quote(e[k])).join(',')),
    ].join('\r\n')
    const url = URL.createObjectURL(
      new Blob([text], { type: 'text/csv;charset=utf-8;' }),
    )
    const a = document.createElement('a')
    a.href = url
    a.download = 'papertrail-study-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }
  const nav = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Paper library', icon: Library },
    { name: 'My paper logs', icon: BookOpen },
    { name: 'Analytics', icon: ChartNoAxesCombined },
    { name: 'Study streaks', icon: Flame },
    { name: 'Pet shop', icon: PawPrint },
  ]
  const renderTable = () => (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>SUBJECT & PAPER</th>
            <th>EXAM BOARD</th>
            <th>MARKS</th>
            <th>GRADE</th>
            <th>TIME</th>
            <th>DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, tab === 'Overview' ? 4 : undefined).map((e) => (
            <tr key={e.id}>
              <td>
                <div
                  className={
                    'subject-icon ' +
                    (e.subject === 'Physics'
                      ? 'pink'
                      : e.subject === 'Computer Science'
                        ? 'blue'
                        : 'purple')
                  }
                >
                  {e.subject === 'Physics' ? (
                    <Zap size={18} />
                  ) : e.subject === 'Computer Science' ? (
                    <span>⌘</span>
                  ) : (
                    <span>ƒx</span>
                  )}
                </div>
                <div>
                  <b>{e.subject}</b>
                  <small>
                    {e.year} {e.series} · {e.paper}
                  </small>
                </div>
              </td>
              <td>{e.board}</td>
              <td>
                <b>
                  {e.marks}
                  <span className="muted"> / {e.total}</span>
                </b>
                <small>{pct(e).toFixed(1)}%</small>
              </td>
              <td>
                <span className={'grade ' + (pct(e) < 75 ? 'amber' : '')}>
                  {grade(pct(e))}
                </span>
              </td>
              <td>
                {e.minutes} <span className="muted">/ {e.allowed}m</span>
              </td>
              <td>
                {new Date(e.date + 'T12:00:00').toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </td>
              <td>
                <button
                  className="icon-button"
                  aria-label="View entry"
                  onClick={() => {
                    setForm(e)
                    setModal('detail')
                  }}
                >
                  <ChevronRight size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!filtered.length && (
        <div className="empty">
          <BookOpen />
          <h3>Your next chapter starts here</h3>
          <p>
            {entries.length
              ? 'No papers match your search.'
              : 'Log your first paper to start tracking your progress.'}
          </p>
          <button
            className="primary"
            onClick={() => {
              if (requireLogin()) {
                setForm(blank)
                setModal('entry')
              }
            }}
          >
            Log a paper
          </button>
        </div>
      )}
    </div>
  )
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/">
          <span className="brand-icon">
            <BookOpen size={22} />
          </span>
          papertrail<span className="brand-dot">.</span>
        </a>
        <div className="workspace-label">YOUR STUDY SPACE</div>
        <nav>
          {nav.map((n) => (
            <button
              key={n.name}
              className={tab === n.name ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setTab(n.name)
                setQuery('')
                setFilter('All subjects')
                setPaperFilter('All components')
              }}
            >
              <n.icon size={19} />
              {n.name}
              {n.name === 'Pet shop' && <span className="new-badge">NEW</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="level-card">
            <div>
              <span className="level-icon">
                <GraduationCap size={19} />
              </span>
              <b>Level {Math.floor(profile.xp / 500) + 1} scholar</b>
              <Sparkles size={15} />
            </div>
            <div className="progress">
              <i style={{ width: `${(profile.xp % 500) / 5}%` }} />
            </div>
            <small>{profile.xp % 500} / 500 XP to next level</small>
          </div>
          <button className="nav-item" onClick={() => setModal('settings')}>
            <Settings size={19} />
            Settings
          </button>
          <button className="nav-item" onClick={() => setModal('help')}>
            <CircleHelp size={19} />
            Help & resources
            <ArrowUpRight size={14} />
          </button>
          <div className="sidebar-footer">
            <span className="online-dot" /> A little progress, every day.
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            My workspace <ChevronRight size={14} />
            <span>{tab}</span>
          </div>
          <div className="top-actions">
            <span className="top-streak">
              <Flame size={17} />
              {profile.streak} day streak
            </span>
            <span className="coin-pill">
              <Coins size={17} />
              {profile.coins}
              <span>coins</span>
            </span>
            <div className="top-divider" />
            {user && (
              <span className="profile-name">{user.name || 'Scholar'}</span>
            )}
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() =>
                toast('You’re all caught up. Time for your next paper!')
              }
            >
              <Bell size={19} />
            </button>
            <button
              className="avatar"
              aria-label={user ? 'Account and log out' : 'Sign in'}
              onClick={() => setModal(user ? 'account' : 'auth')}
            >
              {user?.pictureUrl ? (
                <img src={user.pictureUrl} alt="Your profile" />
              ) : user ? (
                (user.name || user.email || 'S')[0].toUpperCase()
              ) : (
                'S'
              )}
            </button>
            {user ? (
              <button
                className="icon-button"
                aria-label="Log out"
                onClick={() => setModal('account')}
              >
                <LogOut size={16} />
              </button>
            ) : (
              <ChevronDown size={14} />
            )}
          </div>
        </header>
        <main>
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span /> YOUR EFFORT. YOUR PROGRESS.
              </div>
              <h1>
                {tab === 'Overview'
                  ? `Let’s make progress${user?.name ? ', ' + user.name.split(' ')[0] : ''}.`
                  : tab}
              </h1>
              <p>
                {tab === 'Overview'
                  ? 'Every paper is a step closer. Make this one count.'
                  : tab === 'Paper library'
                    ? 'Find your next challenge. Every subject, one place.'
                    : tab === 'Pet shop'
                      ? 'A little company for the long study sessions.'
                      : tab === 'Study streaks'
                        ? 'Small steps, consistently. That’s where the magic happens.'
                        : 'Turn practice into progress, one paper at a time.'}
              </p>
            </div>
            <button
              className="primary log-button"
              onClick={() => {
                if (requireLogin()) {
                  setForm(blank)
                  setModal('entry')
                }
              }}
            >
              <Plus size={18} /> Log a paper
            </button>
          </div>
          {user && syncError && (
            <div className="sync-error" role="alert">
              <span>{syncError}</span>
              <button
                onClick={() => {
                  void sync().catch(() =>
                    toast.error(
                      'Still unable to connect. Please try again shortly.',
                    ),
                  )
                }}
              >
                Retry sync <ArrowRight size={14} />
              </button>
            </div>
          )}
          {!user && (
            <div className="preview-banner">
              <span>
                <span className="preview-dot" /> You’re exploring a sample
                workspace. <b>Your study story starts here.</b>
              </span>
              <button onClick={() => setModal('auth')}>
                Sign in to get started <ArrowRight size={15} />
              </button>
            </div>
          )}
          {tab === 'Overview' && (
            <>
              <section className="hero-grid">
                <div className="welcome-card">
                  <div className="hero-tag">
                    <Sparkles size={14} /> SMALL STEPS. BIG RESULTS.
                  </div>
                  <h2>
                    Your future self
                    <br />
                    will thank you.
                  </h2>
                  <p>
                    A paper today. A little more confidence tomorrow.
                    <br />
                    Keep showing up — it’s working.
                  </p>
                  <button
                    className="light-button"
                    onClick={() => {
                      setTab('Paper library')
                    }}
                  >
                    Find your next paper <ArrowRight size={16} />
                  </button>
                  <div className="hero-art">
                    <div className="orbital one" />
                    <div className="orbital two" />
                    <span className="spark a">✦</span>
                    <span className="spark b">✧</span>
                    <div className="floating-paper p-back">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="floating-paper p-front">
                      <div className="paper-head">
                        <BookOpen size={19} />
                        <span>PAST PAPER</span>
                      </div>
                      <b>
                        One paper
                        <br />
                        at a time.
                      </b>
                      <div className="paper-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="paper-check">
                        <Check size={25} />
                      </div>
                    </div>
                    <span className="spark c">+</span>
                  </div>
                </div>
                <div className="streak-card">
                  <div className="card-top">
                    <span className="flame-box">
                      <Flame size={21} />
                    </span>
                    <span className="mini-label">CONSISTENCY IS KEY</span>
                  </div>
                  <h2>
                    {profile.streak} <span>day streak</span>
                    <Flame className="flame-inline" size={27} />
                  </h2>
                  <p>You’re building a brilliant habit. Keep it going!</p>
                  <div className="week-days">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i}>
                        <span>{d}</span>
                        <i
                          className={
                            i < Math.min(profile.streak, 7) ? 'done' : ''
                          }
                        >
                          {i < Math.min(profile.streak, 7) ? (
                            <Check size={13} />
                          ) : (
                            <span />
                          )}
                        </i>
                      </div>
                    ))}
                  </div>
                  <div className="streak-footer">
                    <Zap size={14} />
                    <span>
                      {user
                        ? 'Log a paper to keep your momentum.'
                        : 'Sign in to start your own streak.'}
                    </span>
                  </div>
                </div>
              </section>
              <section className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">
                    Papers completed <BookOpen size={17} />
                  </div>
                  <div className="stat-value">
                    {entries.length}
                    <span className="stat-tag">
                      <ArrowUpRight size={12} /> Keep going
                    </span>
                  </div>
                  <small>Every attempt counts</small>
                </div>
                <div className="stat-card">
                  <div className="stat-label">
                    Average score <Target size={17} />
                  </div>
                  <div className="stat-value">
                    {avg.toFixed(1)}
                    <span className="unit">%</span>
                    <span className="stat-tag">{grade(avg)} average</span>
                  </div>
                  <small>Across all your papers</small>
                </div>
                <div className="stat-card">
                  <div className="stat-label">
                    Time invested <Clock3 size={17} />
                  </div>
                  <div className="stat-value">
                    {Math.floor(
                      entries.reduce((a, e) => a + e.minutes, 0) / 60,
                    )}
                    <span className="unit">h</span>{' '}
                    {entries.reduce((a, e) => a + e.minutes, 0) % 60}
                    <span className="unit">m</span>
                  </div>
                  <small>Time well spent on your future</small>
                </div>
                <div className="stat-card">
                  <div className="stat-label">
                    Total experience <Zap size={17} />
                  </div>
                  <div className="stat-value">
                    {profile.xp.toLocaleString()}
                    <span className="unit">XP</span>
                    <span className="xp-badge">
                      LEVEL {Math.floor(profile.xp / 500) + 1}
                    </span>
                  </div>
                  <small>Learning looks good on you</small>
                </div>
              </section>
              <section className="middle-grid">
                <div className="panel performance">
                  <div className="panel-heading">
                    <div>
                      <h3>Your performance</h3>
                      <p>A little better with every attempt.</p>
                    </div>
                    <button
                      className="subtle"
                      onClick={() => setTab('Analytics')}
                    >
                      All papers <ChevronDown size={13} />
                    </button>
                  </div>
                  <div className="chart">
                    <div className="chart-labels">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    <div className="chart-body">
                      <div className="chart-grid">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <svg
                        viewBox="0 0 600 130"
                        preserveAspectRatio="none"
                        aria-label="Paper scores from oldest to newest"
                      >
                        <defs>
                          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="#a99be0"
                              stopOpacity=".22"
                            />
                            <stop
                              offset="100%"
                              stopColor="#a99be0"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d={
                            entries.length
                              ? `M ${[...entries]
                                  .reverse()
                                  .map(
                                    (e, i) =>
                                      `${(i * 600) / Math.max(entries.length - 1, 1)},${130 - pct(e) * 1.3}`,
                                  )
                                  .join(' L ')} L 600,130 L 0,130 Z`
                              : ''
                          }
                          fill="url(#area)"
                        />
                        <polyline
                          points={[...entries]
                            .reverse()
                            .map(
                              (e, i) =>
                                `${(i * 600) / Math.max(entries.length - 1, 1)},${130 - pct(e) * 1.3}`,
                            )
                            .join(' ')}
                          fill="none"
                          stroke="#b4a4eb"
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                        />
                        {[...entries].reverse().map((e, i) => (
                          <circle
                            key={e.id}
                            cx={(i * 600) / Math.max(entries.length - 1, 1)}
                            cy={130 - pct(e) * 1.3}
                            r="4"
                            fill="#bcb0ef"
                            stroke="#25242c"
                            strokeWidth="2"
                          >
                            <title>
                              {e.subject}: {pct(e).toFixed(1)}%
                            </title>
                          </circle>
                        ))}
                      </svg>
                      <div className="chart-dates">
                        {[...entries].reverse().map((e) => (
                          <span key={e.id}>
                            {new Date(e.date + 'T12:00:00').toLocaleDateString(
                              'en-GB',
                              { day: 'numeric', month: 'short' },
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    <i /> Paper score{' '}
                    <span>
                      Progress isn’t always a straight line. Keep going.
                    </span>
                  </div>
                </div>
                <div className="panel companion">
                  <div className="panel-heading">
                    <h3>Your study buddy</h3>
                    <span className="online-dot" />
                  </div>
                  <div className="pet-scene">
                    <span className="pet-star star-one">✧</span>
                    <Owl kind={profile.equipped} />
                    <span className="pet-star star-two">✦</span>
                    <div>
                      <b>
                        {profile.equipped === 'owl'
                          ? 'Olive the owl'
                          : profile.equipped === 'fox'
                            ? 'Fern the fox'
                            : 'Clover the cat'}
                      </b>
                      <small>Here for every little win.</small>
                    </div>
                  </div>
                  <button
                    className="pet-link"
                    onClick={() => setTab('Pet shop')}
                  >
                    Meet your next study buddy <ArrowRight size={15} />
                  </button>
                </div>
              </section>
            </>
          )}
          {(tab === 'Overview' || tab === 'My paper logs') && (
            <section className="panel logs">
              <div className="panel-heading">
                <div>
                  <h3>
                    {tab === 'Overview'
                      ? 'Recent papers'
                      : 'Your paper history'}{' '}
                    <span className="count">{entries.length}</span>
                  </h3>
                  <p>Your hard work, all in one place.</p>
                </div>
                <button
                  className="text-link"
                  onClick={() =>
                    tab === 'Overview' ? setTab('My paper logs') : exportCSV()
                  }
                >
                  {tab === 'Overview' ? 'View all logs' : 'Export CSV'}{' '}
                  {tab === 'Overview' ? (
                    <ArrowRight size={15} />
                  ) : (
                    <Download size={15} />
                  )}
                </button>
              </div>
              <div className="table-tools">
                <div className="search-field">
                  <Search size={16} />
                  <input
                    placeholder="Search your papers..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <select
                  aria-label="Filter by subject"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All subjects</option>
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <select
                  aria-label="Filter by component"
                  value={paperFilter}
                  onChange={(e) => setPaperFilter(e.target.value)}
                >
                  <option>All components</option>
                  {components.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button className="subtle" onClick={() => setModal('settings')}>
                  <SlidersHorizontal size={15} /> Grade boundaries
                </button>
              </div>
              {renderTable()}
            </section>
          )}
          {tab === 'Paper library' && (
            <>
              <div className="library-intro">
                <Library size={26} />
                <div>
                  <h3>A world of practice, at your fingertips.</h3>
                  <p>
                    Browse repositories for 29 subjects, 6 boards and every year
                    from 2000. Availability varies by board and qualification.
                  </p>
                </div>
              </div>
              <section className="panel library-filters">
                <label>
                  Subject
                  <select
                    value={libSubject}
                    onChange={(e) => setLibSubject(e.target.value)}
                  >
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Exam board
                  <select
                    value={libBoard}
                    onChange={(e) => setLibBoard(e.target.value)}
                  >
                    {boards.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Qualification
                  <select
                    value={libLevel}
                    onChange={(e) => setLibLevel(e.target.value)}
                  >
                    {[
                      'A-Level',
                      'International A-Level',
                      'GCSE',
                      'IGCSE',
                      'AS-Level',
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Year
                  <select
                    value={libYear}
                    onChange={(e) => setLibYear(e.target.value)}
                  >
                    {Array.from({ length: 27 }, (_, i) => 2026 - i).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Series
                  <select
                    value={libSeries}
                    onChange={(e) => setLibSeries(e.target.value)}
                  >
                    {[
                      'Summer',
                      'Winter',
                      'January',
                      'February / March',
                      'May / June',
                      'October / November',
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Component
                  <select
                    value={libPaper}
                    onChange={(e) => setLibPaper(e.target.value)}
                  >
                    {components.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </section>
              <div className="resource-grid">
                {['PMT', 'Paperlord'].map((source) => (
                  <section className="panel resource-card" key={source}>
                    <div className="resource-logo">
                      {source === 'PMT' ? (
                        <span>pmt</span>
                      ) : (
                        <BookOpen size={31} />
                      )}
                    </div>
                    <h2>
                      {source === 'PMT' ? 'Physics & Maths Tutor' : 'Paperlord'}
                    </h2>
                    <p>
                      {libSubject} · {libBoard}
                      <br />
                      {libLevel} · {libYear} · {libPaper}
                    </p>
                    <div className="resource-actions">
                      {[
                        ['Question paper', 'QP'],
                        ['Mark scheme', 'MS'],
                        ['Examiner report', 'ER'],
                      ].map(([name, short]) => (
                        <a
                          key={short}
                          href={resource(source, name)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>{short}</span>
                          {name}
                          <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                    <small>
                      Opens a targeted repository search. Check the syllabus and
                      session before downloading.
                    </small>
                  </section>
                ))}
              </div>
              <h3 className="section-title">Explore every subject</h3>
              <div className="subject-grid">
                {subjects
                  .filter(
                    (s) =>
                      !query || s.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((s, i) => (
                    <button
                      key={s}
                      onClick={() => {
                        setLibSubject(s)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      <span
                        className={
                          'subject-icon ' + ['purple', 'pink', 'blue'][i % 3]
                        }
                      >
                        <BookOpen size={18} />
                      </span>
                      {s}
                      <ArrowUpRight size={16} />
                    </button>
                  ))}
              </div>
              <div className="library-note">
                Can’t find a component? Use “Other component” when logging a
                paper. Repositories may not carry every subject or restricted
                paper.
              </div>
            </>
          )}
          {tab === 'Analytics' && (
            <>
              <div className="analytics-summary">
                <section className="panel">
                  <Target />
                  <h2>{avg.toFixed(1)}%</h2>
                  <p>Average across {entries.length} papers</p>
                </section>
                <section className="panel">
                  <GraduationCap />
                  <h2>{grade(avg)}</h2>
                  <p>With your current grade boundaries</p>
                </section>
              </div>
              <div className="resource-grid">
                <section className="panel analytics-panel">
                  <h3>Subject breakdown</h3>
                  <p>Start with the subjects that need a little more love.</p>
                  {subjectStats.map((s) => (
                    <div className="subject-stat" key={s.name}>
                      <div>
                        <b>{s.name}</b>
                        <span>{s.avg.toFixed(1)}%</span>
                      </div>
                      <div className="progress">
                        <i style={{ width: `${s.avg}%` }} />
                      </div>
                    </div>
                  ))}
                  {!subjectStats.length && (
                    <p>Log a paper to see your breakdown.</p>
                  )}
                </section>
                <section className="panel analytics-panel">
                  <h3>Topics to revisit</h3>
                  <p>Your most frequently tagged weak areas.</p>
                  {Object.entries(topicCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, n]) => (
                      <div className="topic-row" key={name}>
                        <span>
                          <Target size={15} />
                          {name}
                        </span>
                        <b>
                          {n} {n === 1 ? 'paper' : 'papers'}
                        </b>
                      </div>
                    ))}
                  {!Object.keys(topicCounts).length && (
                    <p>Add weak topics to your next paper log.</p>
                  )}
                </section>
              </div>
            </>
          )}
          {tab === 'Study streaks' && (
            <>
              <section className="streak-feature panel">
                <Flame size={46} />
                <h2>{profile.streak} days of showing up.</h2>
                <p>
                  Earn 10 coins for your first sign-in each UTC day. Log a paper
                  for 50 XP and 20 coins.
                </p>
                <div className="week-days">
                  {[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ].map((d, i) => (
                    <div key={d}>
                      <i className={i < profile.streak ? 'done' : ''}>
                        {i < profile.streak ? <Check size={20} /> : <span />}
                      </i>
                      <span>{d.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </section>
              <div className="resource-grid">
                <section className="panel analytics-panel">
                  <h3>This week’s paper goal</h3>
                  <h2>
                    {
                      entries.filter(
                        (e) =>
                          Date.now() - new Date(e.date).getTime() <
                          7 * 86400000,
                      ).length
                    }{' '}
                    <span className="muted">/ 5 papers</span>
                  </h2>
                  <div className="progress">
                    <i
                      style={{
                        width: `${Math.min(100, entries.filter((e) => Date.now() - new Date(e.date).getTime() < 7 * 86400000).length * 20)}%`,
                      }}
                    />
                  </div>
                  <p>Five focused sessions. One stronger you.</p>
                </section>
                <section className="panel analytics-panel">
                  <h3>Your scholar journey</h3>
                  <h2>Level {Math.floor(profile.xp / 500) + 1}</h2>
                  <div className="progress">
                    <i style={{ width: `${(profile.xp % 500) / 5}%` }} />
                  </div>
                  <p>
                    {500 - (profile.xp % 500)} XP to the next level. Every paper
                    adds 50 XP.
                  </p>
                </section>
              </div>
              <p className="library-note">
                Daily streaks follow consecutive UTC sign-in dates. The week
                display illustrates streak length; the paper goal covers the
                last seven days.
              </p>
            </>
          )}
          {tab === 'Pet shop' && (
            <>
              <div className="shop-banner">
                <div>
                  <span className="eyebrow">
                    GOOD COMPANY. GREAT STUDY SESSIONS.
                  </span>
                  <h2>Find your desk companion.</h2>
                  <p>Turn your daily effort into a little joy.</p>
                </div>
                <span className="coin-pill">
                  <Coins size={21} />
                  {profile.coins} coins
                </span>
              </div>
              <div className="pet-grid">
                {[
                  {
                    id: 'owl',
                    name: 'Olive the owl',
                    desc: 'A wise little friend for late-night breakthroughs.',
                    cost: 0,
                  },
                  {
                    id: 'fox',
                    name: 'Fern the fox',
                    desc: 'Curious, clever, and always cheering you on.',
                    cost: 150,
                  },
                  {
                    id: 'cat',
                    name: 'Clover the cat',
                    desc: 'A calm presence for your most focused sessions.',
                    cost: 250,
                  },
                ].map((p) => (
                  <section className="panel shop-pet" key={p.id}>
                    <Owl kind={p.id} />
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <button
                      disabled={busy || profile.equipped === p.id}
                      className={
                        profile.equipped === p.id ? 'subtle' : 'primary'
                      }
                      onClick={() => pet(p.id)}
                    >
                      {profile.equipped === p.id ? (
                        <>
                          <Check size={16} /> Your companion
                        </>
                      ) : profile.pets.includes(p.id) ? (
                        'Choose companion'
                      ) : (
                        <>
                          <Coins size={16} />
                          {p.cost} coins · Adopt
                        </>
                      )}
                    </button>
                  </section>
                ))}
              </div>
            </>
          )}
          <footer className="main-footer">
            <span>Made for the way you learn.</span>
            <span>
              One paper closer. <BookOpen size={13} />
            </span>
          </footer>
        </main>
      </div>
      <Dialog
        open={!!modal}
        onOpenChange={(v) => {
          if (!v) setModal('')
        }}
      >
        <DialogContent
          className={`app-dialog ${modal === 'entry' ? 'entry-dialog' : ''}`}
        >
          <DialogTitle>
            {modal === 'auth'
              ? 'Your next chapter starts here.'
              : modal === 'entry'
                ? 'Log a paper'
                : modal === 'settings'
                  ? 'Make it your own'
                  : modal === 'detail'
                    ? 'Paper reflection'
                    : modal === 'account'
                      ? 'Your workspace'
                      : 'A little help along the way'}
          </DialogTitle>
          <DialogDescription>
            {modal === 'auth'
              ? 'Sign in to sync your papers, earn rewards, and make progress anywhere.'
              : modal === 'entry'
                ? 'Capture your effort. Learn from the little things.'
                : modal === 'settings'
                  ? 'Set your percentage thresholds. These are study estimates, not official exam grades.'
                  : modal === 'detail'
                    ? `${form.subject} · ${form.year} ${form.series} · ${form.paper}`
                    : modal === 'account'
                      ? 'Your papers and rewards are synced to your account.'
                      : 'Make every paper a useful step forward.'}
          </DialogDescription>
          {modal === 'auth' && (
            <div className="auth-content">
              {authError && (
                <p className="auth-info" role="alert">
                  {authError}
                </p>
              )}
              <div className="auth-owl">
                <Owl small />
              </div>
              {providers.includes('google') ? (
                <button
                  className="google-button"
                  onClick={() => {
                    try {
                      oauthLogin('google')
                    } catch {
                      toast.error(
                        'Google sign-in could not start. Please try email sign-in.',
                      )
                    }
                  }}
                >
                  <span className="google-g">G</span> Sign in with Google
                </button>
              ) : (
                <div className="auth-info">
                  Google sign-in is not enabled yet. Use email to start your
                  workspace.
                </div>
              )}
              <div className="auth-divider">or continue with email</div>
              <form onSubmit={authenticate}>
                <label>
                  Email address
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </label>
                <button className="primary full" disabled={busy || !ready}>
                  {busy
                    ? 'Please wait…'
                    : register
                      ? 'Create your account'
                      : 'Sign in'}
                </button>
              </form>
              <button
                className="auth-toggle"
                onClick={() => setRegister(!register)}
              >
                {register
                  ? 'Already have an account? Sign in'
                  : 'New here? Create an account'}
              </button>
              <p className="auth-foot">
                Your effort belongs to you. So does your data.
              </p>
            </div>
          )}
          {modal === 'entry' && (
            <form onSubmit={save} className="entry-form">
              <div className="form-grid">
                {[
                  ['subject', 'Subject', subjects],
                  ['board', 'Exam board', boards],
                  [
                    'level',
                    'Qualification',
                    [
                      'A-Level',
                      'International A-Level',
                      'GCSE',
                      'IGCSE',
                      'AS-Level',
                    ],
                  ],
                  [
                    'year',
                    'Year',
                    Array.from({ length: 27 }, (_, i) => String(2026 - i)),
                  ],
                  [
                    'series',
                    'Series',
                    [
                      'Summer',
                      'Winter',
                      'January',
                      'February / March',
                      'May / June',
                      'October / November',
                    ],
                  ],
                  ['paper', 'Paper / component', components],
                ].map(([key, label, options]) => (
                  <label key={key as string}>
                    {label as string}
                    <select
                      value={form[key as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [key as string]: e.target.value })
                      }
                    >
                      {(options as string[]).map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <div className="form-grid four">
                {[
                  ['marks', 'Marks achieved'],
                  ['total', 'Total marks'],
                  ['minutes', 'Time taken (min)'],
                  ['allowed', 'Time allowed (min)'],
                ].map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <input
                      type="number"
                      required
                      min={key === 'total' || key === 'allowed' ? 1 : 0}
                      max={key === 'marks' ? form.total : 10000}
                      value={form[key as 'marks']}
                      onChange={(e) =>
                        setForm({ ...form, [key]: Number(e.target.value) })
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="live-grade">
                <span>Your result</span>
                <b>
                  {(form.total ? (form.marks / form.total) * 100 : 0).toFixed(
                    1,
                  )}
                  %{' '}
                  <span className="grade">
                    {grade(form.total ? (form.marks / form.total) * 100 : 0)}
                  </span>
                </b>
                <small>Based on your custom boundaries</small>
              </div>
              <label>
                Topics to revisit{' '}
                <span className="muted">(separate with commas)</span>
                <input
                  maxLength={1000}
                  value={form.topics}
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
                  placeholder="e.g. Integration by parts, Momentum"
                />
              </label>
              <label>
                Reflection & notes
                <textarea
                  maxLength={5000}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="What went well? What would you do differently?"
                />
              </label>
              <button className="primary full" disabled={busy}>
                {busy ? 'Saving your progress…' : 'Save entry · +50 XP'}
                <Check size={16} />
              </button>
            </form>
          )}
          {modal === 'settings' && (
            <div>
              <div className="boundary-grid">
                {['A*', 'A', 'B', 'C', 'D', 'E'].map((g, i) => (
                  <label key={g}>
                    Grade {g} (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={bounds[i]}
                      onChange={(e) =>
                        setBounds(
                          bounds.map((b, j) =>
                            i === j ? Number(e.target.value) : b,
                          ),
                        )
                      }
                    />
                  </label>
                ))}
              </div>
              <p className="library-note">
                Set thresholds from highest to lowest. Official boundaries vary
                by paper, year, and exam board.
              </p>
              <button
                className="primary full"
                onClick={async () => {
                  if (
                    bounds.some(
                      (b, i) =>
                        b < 0 || b > 100 || (i > 0 && b >= bounds[i - 1]),
                    )
                  ) {
                    toast.error(
                      'Boundaries must descend from A* to E between 0 and 100.',
                    )
                    return
                  }
                  if (user) {
                    try {
                      await api('POST', {
                        action: 'boundaries',
                        boundaries: bounds,
                      })
                    } catch (e) {
                      toast.error((e as Error).message)
                      return
                    }
                  }
                  setModal('')
                  toast.success(
                    user
                      ? 'Boundaries saved.'
                      : 'Preview boundaries updated. Sign in to save them.',
                  )
                }}
              >
                Save boundaries
              </button>
            </div>
          )}
          {modal === 'detail' && (
            <div className="detail">
              <div className="live-grade">
                <b>
                  {form.marks}/{form.total} ·{' '}
                  {((form.marks / form.total) * 100).toFixed(1)}%
                </b>
                <span className="grade">
                  {grade((form.marks / form.total) * 100)}
                </span>
              </div>
              <h4>Topics to revisit</h4>
              <p>{form.topics || 'No topics tagged.'}</p>
              <h4>Your reflection</h4>
              <p>{form.notes || 'No notes added.'}</p>
              <p className="muted">
                {form.minutes} minutes taken · {form.allowed} minutes allowed
              </p>
            </div>
          )}
          {modal === 'account' && (
            <div className="detail">
              <h3>{user?.name || 'Scholar'}</h3>
              <p>{user?.email}</p>
              <button
                className="primary full"
                onClick={async () => {
                  await logout()
                  setUser(null)
                  setEntries(demo)
                  setProfile({
                    coins: 320,
                    xp: 740,
                    streak: 5,
                    lastLogin: '',
                    pets: ['owl'],
                    equipped: 'owl',
                  })
                  setModal('')
                  toast.success('Signed out. Your progress is saved.')
                }}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
          {modal === 'help' && (
            <div className="detail">
              <h4>Practice with purpose</h4>
              <p>
                Choose a paper in the library, complete it under timed
                conditions, and use “Log a paper” to record your marks and weak
                topics.
              </p>
              <h4>Build your habit</h4>
              <p>
                Sign in daily for 10 coins. Every logged paper earns 50 XP and
                20 coins. Spend your coins on study companions in the pet shop.
              </p>
              <h4>Keep your history</h4>
              <p>
                Open My paper logs to search, filter and export your full
                history as CSV. Your data is private to your signed-in account.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
