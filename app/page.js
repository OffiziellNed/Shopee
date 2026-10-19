'use client';
import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  CalendarDays,
  ShoppingBag,
  Users,
  Plus,
  Search,
  Copy,
  Check,
  ArrowUpRight,
  Zap,
  Target,
  BarChart3,
  Clock3,
  Link2,
  ShieldCheck,
  FileText,
  Calculator,
  Flame,
  Download,
  Eye,
  AlertCircle,
} from 'lucide-react';

// Types

  id;
  judul;
  platform: 'PS1' | 'PSP' | 'APK';
  trend;
  sumber: 'YouTube' | 'TikTok' | 'Google';
  status: 'Riset' | 'Approved' | 'Skip';
  views;
};

  id;
  game;
  day;
  time;
  platform: 'PS1' | 'PSP' | 'APK';
};

  id;
  title;
  platform: 'PS1' | 'PSP' | 'APK';
  size;
  linkHealth: 'green' | 'red' | 'yellow';
  status: 'Belum Upload' | 'Sudah' | 'Perlu Update Link';
};

const initialResearch = [
  { id: '1', judul: 'GTA San Andreas Definitive', platform: 'PSP', trend: 9.4, sumber: 'TikTok', status: 'Approved', views: '2.4M' },
  { id: '2', judul: 'Bully Anniversary Edition', platform: 'APK', trend: 8.7, sumber: 'YouTube', status: 'Riset', views: '1.1M' },
  { id: '3', judul: 'God of War II', platform: 'PS1', trend: 9.1, sumber: 'YouTube', status: 'Approved', views: '3.2M' },
  { id: '4', judul: 'Minecraft 1.21.1 Pojav', platform: 'APK', trend: 8.2, sumber: 'TikTok', status: 'Riset', views: '890K' },
  { id: '5', judul: 'Resident Evil 4 HD', platform: 'PS1', trend: 7.8, sumber: 'Google', status: 'Skip', views: '540K' },
  { id: '6', judul: 'Naruto Shippuden Ultimate Ninja 5', platform: 'PS1', trend: 8.9, sumber: 'TikTok', status: 'Approved', views: '1.7M' },
  { id: '7', judul: 'PES 2024 Patch', platform: 'PSP', trend: 7.2, sumber: 'YouTube', status: 'Riset', views: '620K' },
];

const initialSchedule = [
  { id: '1', game: 'GTA Vice City Stories', day: 'Sen', time: '09:00', platform: 'PSP' },
  { id: '2', game: 'Bully', day: 'Sen', time: '14:00', platform: 'APK' },
  { id: '3', game: 'God of War', day: 'Sel', time: '10:00', platform: 'PS1' },
  { id: '4', game: 'Minecraft', day: 'Rab', time: '09:30', platform: 'APK' },
  { id: '5', game: 'Tekken 5', day: 'Kam', time: '11:00', platform: 'PS1' },
  { id: '6', game: 'PES 2024', day: 'Jum', time: '15:00', platform: 'PSP' },
  { id: '7', game: 'Resident Evil 4', day: 'Sab', time: '10:00', platform: 'PS1' },
];

const initialQueue = [
  { id: '1', title: 'Gran Turismo 4', platform: 'PS1', size: '2.8 GB', linkHealth: 'green', status: 'Sudah' },
  { id: '2', title: 'Black - Mod HD', platform: 'PS1', size: '1.2 GB', linkHealth: 'red', status: 'Perlu Update Link' },
  { id: '3', title: 'God Hand', platform: 'PS1', size: '1.1 GB', linkHealth: 'green', status: 'Belum Upload' },
  { id: '4', title: 'GTA Liberty City', platform: 'PSP', size: '650 MB', linkHealth: 'green', status: 'Sudah' },
  { id: '5', title: 'Minecraft Java 1.21', platform: 'APK', size: '980 MB', linkHealth: 'yellow', status: 'Belum Upload' },
  { id: '6', title: 'Downhill Domination', platform: 'PS1', size: '890 MB', linkHealth: 'green', status: 'Sudah' },
];

const salesData = [
  { day: 'Sen', value: 42 },
  { day: 'Sel', value: 68 },
  { day: 'Rab', value: 55 },
  { day: 'Kam', value: 91 },
  { day: 'Jum', value: 74 },
  { day: 'Sab', value: 110 },
  { day: 'Min', value: 86 },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('overview');
  const [research, setResearch] = useState(initialResearch);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGame, setShowAddGame] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGamePlatform, setNewGamePlatform] = useState('PS1');

  // Pricing calculator
  const [modal, setModal] = useState(0);
  const [shopeeFee, setShopeeFee] = useState(6);
  const [affiliate, setAffiliate] = useState(10);
  const [hargaJual, setHargaJual] = useState(25000);
  const [presetActive, setPresetActive] = useState('PS1');

  // Operational
  const [schedule, setSchedule] = useState(initialSchedule);
  const [queue] = useState(initialQueue);
  const [sopChecks, setSopChecks] = useState([true, true, false, false, false]);
  const [calForm, setCalForm] = useState({ game: '', day: 'Sen', time: '09:00', platform: 'PS1' });
  const [showCalForm, setShowCalForm] = useState(false);

  // Admin
  const [templateMode, setTemplateMode] = useState('Email');
  const [tplJudul, setTplJudul] = useState('GTA San Andreas MOD - Full Misi');
  const [tplLink, setTplLink] = useState('https://drive.google.com/file/d/xxxxx');
  const [tplSize, setTplSize] = useState('1.4 GB');
  const [tplPlatform, setTplPlatform] = useState('PS1');
  const [copied, setCopied] = useState(null);

  const [uploadForm, setUploadForm] = useState({
    judul: '',
    deskripsi: '',
    harga: '25000',
    kategori: 'Game PS1',
    link: '',
    size: '',
  });

  const [navFlash, setNavFlash] = useState(null);
  const [exportFlash, setExportFlash] = useState(false);

  const pricing = useMemo(() => {
    const feeShopee = (shopeeFee / 100) * hargaJual;
    const feeAff = (affiliate / 100) * hargaJual;
    const profit = hargaJual - modal - feeShopee - feeAff;
    const margin = hargaJual > 0 ? (profit / hargaJual) * 100 : 0;
    return { feeShopee, feeAff, profit, margin };
  }, [modal, shopeeFee, affiliate, hargaJual]);

  const filteredResearch = research.filter(r =>
    r.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const omzet = 18450000;
  const target = 30000000;
  const omzetPct = (omzet / target) * 100;

  const handleAddGame = () => {
    if (!newGameTitle.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      judul: newGameTitle,
      platform: newGamePlatform,
      trend: Math.round((Math.random() * 3 + 7) * 10) / 10,
      sumber: 'TikTok',
      status: 'Riset',
      views: `${Math.floor(Math.random() * 900 + 100)}K`,
    };
    setResearch([newItem, ...research]);
    setNewGameTitle('');
    setShowAddGame(false);
  };

  const handleAddSchedule = () => {
    if (!calForm.game.trim()) return;
    setSchedule([...schedule, { id: Date.now().toString(), ...calForm }]);
    setCalForm({ game: '', day: 'Sen', time: '09:00', platform: 'PS1' });
    setShowCalForm(false);
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const templatePreview = useMemo(() => {
    const linkLine = tplPlatform === 'PS1' ? 'Link Game PS1' : tplPlatform === 'PSP' ? 'Link Game PSP' : 'Link Game APK';
    if (templateMode === 'Email') {
      return `*INSTRUKSI DOWNLOAD - COPY LINK DI BROWSER CHROME*

Halo kak, terima kasih sudah order 🙏

*DOWNLOAD DISINI*
Judul: ${tplJudul}
${linkLine}: ${tplLink}
Size: ${tplSize}

*CARA INSTAL:*
1. Copy link diatas paste di Chrome
2. Download via Drive
3. Ekstrak pakai Zarchiver
4. Instal / Load di emulator

Jika bingung balas email ini ya kak!
`;
    } else {
      return `Halo kak! 🎮 Orderan ${tplJudul} sudah siap!

📦 *Detail File:*
• Judul: ${tplJudul}
• Size: ${tplSize}
• ${linkLine}: ${tplLink}

⚠️ *PENTING:*
Copy link & buka di Chrome (jangan di Shopee langsung ya)

Panduan lengkap ada di deskripsi produk. Need help? Balas chat ini ya kak 🙏`;
    }
  }, [templateMode, tplJudul, tplLink, tplSize, tplPlatform]);

  const exportCsv = () => {
    const header = 'Judul,Platform,Trend,Sumber,Status,Views\n';
    const rows = research.map(r => `${r.judul},${r.platform},${r.trend},${r.sumber},${r.status},${r.views}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'riset-game-rame.csv';
    a.click();
    URL.revokeObjectURL(url);
    setExportFlash(true);
    setTimeout(() => setExportFlash(false), 2500);
  };

  const quickCalc = {
    orderPerDay: 40,
    avgPrice: 25000,
    daily: 40 * 25000,
    monthly: 40 * 25000 * 30,
  };

  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const handleNav = (tab: Tab) => {
    setActiveTab(tab);
    setNavFlash(tab);
    setTimeout(() => setNavFlash(null), 1200);
  };

  return (
    <div
      className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)] overflow-x-clip selection:bg-[var(--indigo-soft)]"
      style={{ paddingTop: 'var(--safe-area-inset-top)', boxSizing: 'border-box' }}
    >
      {(navFlash || exportFlash) && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex gap-2 pointer-events-none">
          {navFlash && (
            <div className="rounded-full bg-white text-black px-4 py-1.5 text-[12px] font-semibold shadow-xl border border-white/20 animate-in fade-in slide-in-from-top-2">
              → {navFlash === 'overview' ? 'Overview Performance' : navFlash === 'growth' ? 'Growth Workspace' : navFlash === 'operational' ? 'Operational Manager' : 'Admin Specialist'} • preview aktif
            </div>
          )}
          {exportFlash && (
            <div className="rounded-full bg-emerald-400 text-black px-4 py-1.5 text-[12px] font-semibold shadow-xl border border-emerald-300 animate-in fade-in slide-in-from-top-2">
              ✓ CSV ter-export • riset-game-rame.csv
            </div>
          )}
        </div>
      )}
      <div className="flex min-h-screen">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-[300px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg)] sticky top-0 h-screen">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 grid place-items-center font-bold text-black">S</div>
              <div>
                <div className="font-semibold tracking-tight leading-none">Shopee Mini OS</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 tracking-wide">GAME STORE OPERATIONS</div>
              </div>
            </div>

            {/* Target Card */}
            <div className="mt-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium tracking-widest text-[var(--text-muted)] flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> TARGET OMZET</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--emerald-soft)] text-emerald-400 border border-emerald-500/20">MEI 2025</span>
              </div>
              <div className="mono text-xl font-semibold">Rp {(omzet / 1000000).toFixed(1)}jt <span className="text-[var(--text-muted)] text-sm font-normal">/ 30jt</span></div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-[var(--surface-3)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-all" style={{ width: `${omzetPct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>{omzetPct.toFixed(1)}% tercapai</span>
                <span className="text-emerald-400">Sisa Rp {((target - omzet) / 1000000).toFixed(1)}jt</span>
              </div>
            </div>
          </div>

          <nav className="px-3 space-y-1 mt-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard, desc: 'KPI & breakdown' },
              { id: 'growth', label: 'Growth Lead', icon: TrendingUp, desc: 'Pricing & riset' },
              { id: 'operational', label: 'Operational', icon: CalendarDays, desc: 'Upload & queue' },
              { id: 'admin', label: 'Admin Specialist', icon: ShoppingBag, desc: 'Template & listing' },
            ].map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all border ${active ? 'bg-[var(--surface)] border-[var(--border-strong)] text-white' : 'border-transparent text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface)]'}`}
                >
                  <item.icon className={`h-5 w-5 shrink-0 ${active ? 'text-indigo-400' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-medium leading-none">{item.label}</div>
                    <div className="text-[11px] mt-1 opacity-60">{item.desc}</div>
                  </div>
                  {active && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/60 p-4">
              <div className="text-[11px] font-semibold tracking-widest text-[var(--text-muted)]">TEAM STATUS</div>
              <div className="mt-3 space-y-2.5">
                {[
                  { name: 'Growth Lead', role: 'Pricing & Trend', color: 'from-indigo-500 to-violet-500' },
                  { name: 'Operational Mgr', role: 'Jadwal Upload', color: 'from-emerald-500 to-teal-500' },
                  { name: 'Admin Shopee', role: 'Template & Chat', color: 'from-amber-400 to-orange-500' },
                ].map(m => (
                  <div key={m.name} className="flex items-center gap-2.5">
                    <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${m.color} grid place-items-center text-[11px] font-bold text-black`}>{m.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium leading-none">{m.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{m.role}</div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] p-3 text-[11px] text-[var(--text-muted)] leading-relaxed">
              <span className="text-white font-medium">Deploy:</span> Push to GitHub → Connect Vercel → Deploy. Semua data in-memory, aman buat preview tim.
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Topbar */}
          <header
            className="sticky z-20 backdrop-blur-xl bg-[var(--bg)]/80 border-b border-[var(--border)] px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-4"
            style={{ top: 'var(--safe-area-inset-top)' }}
          >
            <div className="flex items-center gap-3">
              <div className="lg:hidden h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 grid place-items-center font-bold text-black text-sm">S</div>
              <div>
                <h1 className="text-[15px] lg:text-[18px] font-semibold tracking-tight leading-none capitalize">
                  {activeTab === 'overview' ? 'Overview Performance' : activeTab === 'growth' ? 'Growth Lead Workspace' : activeTab === 'operational' ? 'Operational Manager' : 'Admin Marketplace'}
                </h1>
                <div className="hidden lg:flex items-center gap-2 mt-1.5 text-[11px] text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
                  <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 3 active members • Target 30jt</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
                <Users className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[12px] font-medium">Team: 3 Online</span>
              </div>
              <button onClick={exportCsv} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${exportFlash ? 'bg-emerald-400 text-black' : 'bg-white text-black hover:bg-zinc-200'}`}>
                <Download className="h-3.5 w-3.5" /> {exportFlash ? 'Exported ✓' : 'Export CSV'}
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="px-4 lg:px-8 py-5 lg:py-7 pb-28 lg:pb-8 space-y-6 max-w-[1280px] w-full mx-auto">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                {/* KPI */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  <div className="col-span-2 lg:col-span-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-5">
                    <div className="flex justify-between items-start">
                      <div className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">OMZET BULAN INI</div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">61% dari target</span>
                    </div>
                    <div className="mt-3 mono text-[22px] font-semibold">Rp 18.450.000</div>
                    <div className="mt-3 h-1.5 bg-[var(--surface-3)] rounded-full overflow-hidden">
                      <div className="h-full w-[61.5%] bg-gradient-to-r from-emerald-400 to-indigo-400 rounded-full" />
                    </div>
                    <div className="mt-2 text-[11px] text-[var(--text-muted)]">Target Rp 30.000.000 • Butuh push 11.5jt lagi</div>
                  </div>
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-5">
                    <div className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">TOTAL ORDER</div>
                    <div className="mt-3 mono text-[22px] font-semibold flex items-baseline gap-2">742 <span className="text-emerald-400 text-[12px] font-medium flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +18%</span></div>
                    <div className="mt-3 text-[11px] text-[var(--text-muted)]">Rata-rata 24.7 order/hari</div>
                  </div>
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-5">
                    <div className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">RATING TOKO</div>
                    <div className="mt-3 mono text-[22px] font-semibold flex items-center gap-2">4.9 <span className="text-[12px] text-amber-400">★★★★★</span></div>
                    <div className="mt-3 text-[11px] text-[var(--text-muted)]">Dari 612 ulasan bulan ini</div>
                  </div>
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-5">
                    <div className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">CHAT RESPONSE</div>
                    <div className="mt-3 mono text-[22px] font-semibold">92%</div>
                    <div className="mt-3 h-1.5 bg-[var(--surface-3)] rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-emerald-400 rounded-full" />
                    </div>
                    <div className="mt-2 text-[11px] text-emerald-400">Di atas standar Shopee (85%)</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {/* Chart */}
                  <div className="lg:col-span-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-indigo-400" /> Penjualan 7 Hari Terakhir</h3>
                        <p className="text-[12px] text-[var(--text-muted)] mt-1">Unit order harian • Sumber: Ringkasan Shopee (preview)</p>
                      </div>
                      <div className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mono">Total: 526 order</div>
                    </div>
                    <div className="flex items-end gap-2 lg:gap-3 h-[160px] lg:h-[200px] px-2">
                      {salesData.map(d => {
                        const max = Math.max(...salesData.map(s => s.value));
                        const h = (d.value / max) * 100;
                        return (
                          <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex justify-center">
                              <div className="text-[10px] mono text-[var(--text-muted)]">{d.value}</div>
                            </div>
                            <div className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600/60 to-emerald-400/80 border border-white/10 relative group transition-all hover:from-indigo-500 hover:to-emerald-300" style={{ height: `${h}%`, minHeight: '20px' }}>
                              <div className="absolute inset-0 rounded-t-xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                            </div>
                            <div className="text-[11px] font-medium text-[var(--text-muted)]">{d.day}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-[var(--surface-2)] border border-[var(--border)] p-3">
                        <div className="text-[10px] text-[var(--text-muted)] tracking-widest">HARI TERBAIK</div>
                        <div className="mono text-[13px] font-semibold mt-1">Sabtu • 110 order</div>
                      </div>
                      <div className="rounded-xl bg-[var(--surface-2)] border border-[var(--border)] p-3">
                        <div className="text-[10px] text-[var(--text-muted)] tracking-widest">AVG HARIAN</div>
                        <div className="mono text-[13px] font-semibold mt-1">75 order / hari</div>
                      </div>
                      <div className="rounded-xl bg-[var(--surface-2)] border border-[var(--border)] p-3">
                        <div className="text-[10px] text-[var(--text-muted)] tracking-widest">TREND</div>
                        <div className="mono text-[13px] font-semibold mt-1 text-emerald-400">↑ +12% vs minggu lalu</div>
                      </div>
                    </div>
                  </div>

                  {/* Calculator for target */}
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6 flex flex-col">
                    <h3 className="font-semibold flex items-center gap-2"><Calculator className="h-4 w-4 text-emerald-400" /> Kalkulator Target 30jt</h3>
                    <p className="text-[12px] text-[var(--text-muted)] mt-1 leading-relaxed">Hitungan real buat capai target. Asumsi rata-rata harga jual Rp 25rb.</p>

                    <div className="mt-5 rounded-xl bg-[#101012] border border-[var(--border)] p-4 space-y-4">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-[var(--text-muted)]">Target omzet</span>
                        <span className="mono font-semibold">Rp 30.000.000</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-[var(--text-muted)]">Harga rata-rata</span>
                        <span className="mono font-semibold">Rp {quickCalc.avgPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="h-px bg-[var(--border)]" />
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="font-medium">Butuh order / hari</span>
                        <span className="mono text-[18px] font-bold text-emerald-400">{quickCalc.orderPerDay}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-[var(--surface-2)] p-2.5 border border-[var(--border)]">
                          <div className="text-[10px] text-[var(--text-muted)]">HARIAN</div>
                          <div className="mono font-semibold mt-0.5">Rp {quickCalc.daily.toLocaleString('id-ID')}</div>
                        </div>
                        <div className="rounded-lg bg-[var(--surface-2)] p-2.5 border border-[var(--border)]">
                          <div className="text-[10px] text-[var(--text-muted)]">BULANAN (30h)</div>
                          <div className="mono font-semibold mt-0.5">Rp {quickCalc.monthly.toLocaleString('id-ID')}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-[var(--emerald-soft)] border border-emerald-500/20 p-3 flex gap-2.5">
                      <Zap className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed text-emerald-200/80"><span className="text-emerald-300 font-semibold">Insight:</span> Dengan 742 order sekarang, lo kurang ~458 order lagi bulan ini. Fokus upload 2-3 game trend tinggi tiap hari + push affiliate 10%.</p>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="text-[11px] font-medium tracking-widest text-[var(--text-muted)] mb-2">RUMUS CEPAT</div>
                      <div className="mono text-[11px] bg-[var(--surface-2)] border border-[var(--border)] rounded-lg p-2.5 text-[var(--text-muted)]">
                        order_hari = target / harga_avg / 30<br />
                        = 30jt / 25rb / 30 = 40 order/hari
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Pricing Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="lg:col-span-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2"><Calculator className="h-4 w-4 text-emerald-400" /> Pricing Calculator</h3>
                      <div className="flex gap-1.5">
                        {[
                          { id: 'PS1', label: 'PS1 • Rp 25k' },
                          { id: 'PSP', label: 'PSP • Rp 22k' },
                          { id: 'APK', label: 'APK • Rp 20k' },
                        ].map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setPresetActive(p.id);
                              if (p.id === 'PS1') { setModal(0); setShopeeFee(6); setAffiliate(10); setHargaJual(25000); }
                              if (p.id === 'PSP') { setModal(0); setShopeeFee(6); setAffiliate(8); setHargaJual(22000); }
                              if (p.id === 'APK') { setModal(0); setShopeeFee(7); setAffiliate(12); setHargaJual(20000); }
                            }}
                            className={`text-[11px] px-2.5 py-1.5 rounded-full border transition ${presetActive === p.id ? 'bg-white text-black border-white font-semibold' : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-muted)] hover:text-white'}`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-5">
                        <div>
                          <label className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">HARGA MODAL (Drive 0 = Rp 0)</label>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[13px] text-[var(--text-muted)]">Rp</span>
                            <input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 mono text-[14px] focus:outline-none focus:border-indigo-500/50" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <label className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">BIAYA SHOPEE %</label>
                            <span className="mono text-[12px] text-indigo-300">{shopeeFee}%</span>
                          </div>
                          <input type="range" min={4} max={8} step={0.5} value={shopeeFee} onChange={e => setShopeeFee(Number(e.target.value))} className="w-full mt-2 accent-indigo-500" />
                          <div className="flex justify-between text-[10px] text-[var(--text-faint)] mt-1"><span>4%</span><span>8%</span></div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <label className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">KOMISI AFFILIATE %</label>
                            <span className="mono text-[12px] text-amber-300">{affiliate}%</span>
                          </div>
                          <input type="range" min={0} max={20} step={1} value={affiliate} onChange={e => setAffiliate(Number(e.target.value))} className="w-full mt-2 accent-amber-500" />
                        </div>
                        <div>
                          <label className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">HARGA JUAL</label>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[13px] text-[var(--text-muted)]">Rp</span>
                            <input type="number" value={hargaJual} onChange={e => setHargaJual(Number(e.target.value))} className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 mono text-[14px] focus:outline-none focus:border-emerald-500/50" />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#101012] border border-[var(--border)] p-4 lg:p-5 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">HASIL HITUNG</div>
                          <div className="mt-4 space-y-3 text-[13px]">
                            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Biaya Shopee</span><span className="mono">- Rp {pricing.feeShopee.toLocaleString('id-ID')}</span></div>
                            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Affiliate</span><span className="mono">- Rp {pricing.feeAff.toLocaleString('id-ID')}</span></div>
                            <div className="h-px bg-[var(--border)] my-2" />
                            <div className="flex justify-between text-[15px] font-semibold"><span>Profit Bersih</span><span className={`mono ${pricing.profit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>Rp {pricing.profit.toLocaleString('id-ID')}</span></div>
                            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Margin</span><span className="mono font-semibold">{pricing.margin.toFixed(1)}%</span></div>
                          </div>
                          <div className={`mt-4 rounded-xl p-3 text-[11px] leading-relaxed border ${pricing.margin > 50 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200' : pricing.margin > 30 ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' : 'bg-red-500/10 border-red-500/20 text-red-200'}`}>
                            {pricing.margin > 50 ? '✅ Margin sehat. Gas upload & push affiliate.' : pricing.margin > 30 ? '⚠️ Margin tipis. Cek affiliate % atau naikin harga 2-3k.' : '🚨 Margin bahaya. Naikin harga atau turunin komisi affiliate.'}
                          </div>
                        </div>
                        <div className="mt-5 mono text-[10px] text-[var(--text-faint)] bg-[var(--surface-2)] rounded-lg p-2.5 border border-[var(--border)]">
                          profit = jual - modal - (fee% * jual) - (aff% * jual)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <h3 className="font-semibold flex items-center gap-2"><Eye className="h-4 w-4 text-[var(--text-muted)]" /> Baca Data Shopee (Preview)</h3>
                    <div className="mt-4 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)]/50 p-4 text-center">
                      <FileText className="h-6 w-6 mx-auto text-[var(--text-muted)] mb-2" />
                      <div className="text-[12px] font-medium">Upload CSV Shopee</div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-1">Drag file Bisnis Saya &gt; Analisis • Preview mode only</div>
                      <button className="mt-3 text-[11px] px-3 py-1.5 rounded-full bg-[var(--surface-3)] border border-[var(--border)] hover:bg-[var(--surface)] transition">Pilih File (Mock)</button>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[
                        { label: 'CTR', value: '4.2%', sub: 'vs 3.1% avg' },
                        { label: 'CVR', value: '8.7%', sub: 'vs 6.2% avg' },
                        { label: 'Keyword Rank', value: '#3', sub: 'Top 5 keyword' },
                      ].map(m => (
                        <div key={m.label} className="rounded-xl bg-[#101012] border border-[var(--border)] p-3">
                          <div className="text-[10px] tracking-widest text-[var(--text-muted)]">{m.label}</div>
                          <div className="mono text-[15px] font-semibold mt-1">{m.value}</div>
                          <div className="text-[10px] text-emerald-400 mt-1">{m.sub}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <div className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium mb-3">TOP KEYWORDS</div>
                      <div className="space-y-2">
                        {[
                          { kw: 'game ps1 hp', rank: 2, vol: '12k' },
                          { kw: 'gta san andreas mod', rank: 3, vol: '18k' },
                          { kw: 'psp iso android', rank: 5, vol: '9k' },
                          { kw: 'minecraft pojav', rank: 1, vol: '22k' },
                        ].map(k => (
                          <div key={k.kw} className="flex items-center justify-between text-[12px] bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-2">
                            <span className="font-medium">{k.kw}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-3)] mono">#{k.rank}</span>
                              <span className="text-[11px] text-[var(--text-muted)] mono">{k.vol}/mo</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Riset Table */}
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                  <div className="p-5 lg:p-6 border-b border-[var(--border)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2"><Flame className="h-4 w-4 text-orange-400" /> Riset Game Rame</h3>
                      <p className="text-[12px] text-[var(--text-muted)] mt-1">Track game yang lagi rame di TikTok / YouTube • Fokus trend score &gt; 8</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-faint)]" />
                        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Cari game..." className="pl-8 pr-3 py-2 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[12px] w-[160px] lg:w-[200px] focus:outline-none focus:border-indigo-500/50" />
                      </div>
                      <button onClick={() => setShowAddGame(true)} className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-2 text-[12px] font-semibold hover:bg-zinc-200 transition"><Plus className="h-3.5 w-3.5" /> Tambah</button>
                    </div>
                  </div>

                  {showAddGame && (
                    <div className="p-4 bg-[var(--surface-2)] border-b border-[var(--border)] flex flex-col lg:flex-row gap-3">
                      <input value={newGameTitle} onChange={e => setNewGameTitle(e.target.value)} placeholder="Judul game, cth: Bully Mod Indonesia" className="flex-1 bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-indigo-500/50" />
                      <select value={newGamePlatform} onChange={e => setNewGamePlatform(e.target.value)} className="bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[13px]">
                        <option>PS1</option><option>PSP</option><option>APK</option>
                      </select>
                      <div className="flex gap-2">
                        <button onClick={handleAddGame} className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black text-[12px] font-semibold hover:bg-emerald-400 transition">Simpan</button>
                        <button onClick={() => setShowAddGame(false)} className="px-4 py-2.5 rounded-xl bg-[var(--surface-3)] border border-[var(--border)] text-[12px]">Batal</button>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead className="bg-[#101012] text-[var(--text-muted)] text-[11px] tracking-widest">
                        <tr>
                          <th className="text-left font-medium px-5 py-3">JUDUL GAME</th>
                          <th className="text-left font-medium px-3 py-3">PLATFORM</th>
                          <th className="text-left font-medium px-3 py-3">TREND SCORE</th>
                          <th className="text-left font-medium px-3 py-3">SUMBER</th>
                          <th className="text-left font-medium px-3 py-3">VIEWS</th>
                          <th className="text-left font-medium px-3 py-3">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                        {filteredResearch.map(g => (
                          <tr key={g.id} className="hover:bg-[var(--surface-2)]/50 transition">
                            <td className="px-5 py-3.5 font-medium max-w-[240px] truncate">{g.judul}</td>
                            <td className="px-3 py-3.5"><span className={`text-[10px] px-2 py-1 rounded-full border font-medium ${g.platform === 'PS1' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : g.platform === 'PSP' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'}`}>{g.platform}</span></td>
                            <td className="px-3 py-3.5"><div className="flex items-center gap-2"><div className="h-1.5 w-16 bg-[var(--surface-3)] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full" style={{ width: `${g.trend * 10}%` }} /></div><span className="mono font-semibold">{g.trend}</span></div></td>
                            <td className="px-3 py-3.5 text-[var(--text-muted)]">{g.sumber}</td>
                            <td className="px-3 py-3.5 mono text-[var(--text-muted)]">{g.views}</td>
                            <td className="px-3 py-3.5">
                              <select
                                value={g.status}
                                onChange={e => setResearch(research.map(r => r.id === g.id ? { ...r, status: e.target.value } : r))}
                                className={`text-[11px] px-2.5 py-1 rounded-full border font-medium bg-transparent focus:outline-none ${g.status === 'Approved' ? 'border-emerald-500/30 text-emerald-300' : g.status === 'Riset' ? 'border-amber-500/30 text-amber-300' : 'border-[var(--border)] text-[var(--text-muted)]'}`}
                              >
                                <option className="bg-zinc-900">Riset</option>
                                <option className="bg-zinc-900">Approved</option>
                                <option className="bg-zinc-900">Skip</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'operational' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Calendar */}
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2"><CalendarDays className="h-4 w-4 text-indigo-400" /> Kalender Upload Mingguan</h3>
                      <p className="text-[12px] text-[var(--text-muted)] mt-1">Atur jadwal upload biar konsisten 2-3 game per hari • Preview draft lokal</p>
                    </div>
                    <button onClick={() => setShowCalForm(!showCalForm)} className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-2 text-[12px] font-semibold hover:bg-zinc-200 transition"><Plus className="h-3.5 w-3.5" /> Jadwal Baru</button>
                  </div>

                  {showCalForm && (
                    <div className="mb-5 rounded-xl bg-[#101012] border border-[var(--border)] p-4 grid grid-cols-1 lg:grid-cols-5 gap-3">
                      <input value={calForm.game} onChange={e => setCalForm({ ...calForm, game: e.target.value })} placeholder="Nama game" className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] focus:outline-none" />
                      <select value={calForm.day} onChange={e => setCalForm({ ...calForm, day: e.target.value })} className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]">{days.map(d => <option key={d}>{d}</option>)}</select>
                      <input type="time" value={calForm.time} onChange={e => setCalForm({ ...calForm, time: e.target.value })} className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]" />
                      <select value={calForm.platform} onChange={e => setCalForm({ ...calForm, platform: e.target.value })} className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]"><option>PS1</option><option>PSP</option><option>APK</option></select>
                      <button onClick={handleAddSchedule} className="rounded-xl bg-emerald-500 text-black text-[12px] font-semibold px-3 py-2.5 hover:bg-emerald-400 transition">Tambah ke Kalender</button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                    {days.map(day => {
                      const items = schedule.filter(s => s.day === day);
                      return (
                        <div key={day} className="rounded-2xl bg-[#101012] border border-[var(--border)] p-3 min-h-[160px]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[12px] font-semibold tracking-wide">{day}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mono">{items.length} upload</span>
                          </div>
                          <div className="space-y-2">
                            {items.length === 0 ? <div className="text-[11px] text-[var(--text-faint)] italic py-6 text-center">Belum ada jadwal</div> : items.map(it => (
                              <div key={it.id} className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-2.5">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className={`h-1.5 w-1.5 rounded-full ${it.platform === 'PS1' ? 'bg-indigo-400' : it.platform === 'PSP' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                  <span className="text-[10px] font-medium tracking-widest text-[var(--text-muted)]">{it.platform}</span>
                                  <span className="ml-auto text-[10px] mono text-[var(--text-muted)]">{it.time}</span>
                                </div>
                                <div className="text-[12px] font-medium leading-tight truncate">{it.game}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {/* Queue */}
                  <div className="lg:col-span-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2"><Link2 className="h-4 w-4 text-emerald-400" /> Queue Game <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mono text-[var(--text-muted)]">62 PS1 • 14 PSP • 3 APK</span></h3>
                      <span className="text-[11px] text-[var(--text-muted)]">Total 79 file • Preview lokal</span>
                    </div>
                    <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                      {queue.map(q => (
                        <div key={q.id} className="flex items-center gap-3 rounded-xl bg-[#101012] border border-[var(--border)] p-3 hover:border-[var(--border-strong)] transition">
                          <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${q.linkHealth === 'green' ? 'bg-emerald-400' : q.linkHealth === 'red' ? 'bg-red-400' : 'bg-amber-400'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-medium truncate">{q.title}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">{q.platform}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--text-muted)]">
                              <span className="mono">{q.size}</span>
                              <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
                              <span className={`${q.status === 'Sudah' ? 'text-emerald-400' : q.status === 'Perlu Update Link' ? 'text-red-400' : 'text-amber-300'}`}>{q.status}</span>
                            </div>
                          </div>
                          <div className="text-[10px] px-2 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)]">Drive OK</div>
                        </div>
                      ))}
                      <div className="rounded-xl border border-dashed border-[var(--border-strong)] p-3 text-center text-[11px] text-[var(--text-muted)]">
                        +73 file lain di Drive • List lengkap ada di Google Sheet tim (preview only di sini)
                      </div>
                    </div>
                  </div>

                  {/* SOP */}
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-400" /> SOP Checklist Harian</h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">Centang tiap hari sebelum jam 10 pagi</p>
                    <div className="mt-5 space-y-3">
                      {[
                        'Cek link Drive semua produk aktif (green)',
                        'Upload 2-3 game baru sesuai kalender',
                        'Update judul SEO < 70 karakter + keyword rame',
                        'Balas chat < 2 jam (target 92% response)',
                        'Cek affiliate dashboard & push komisi',
                      ].map((task, i) => (
                        <label key={i} className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition ${sopChecks[i] ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#101012] border-[var(--border)] hover:border-[var(--border-strong)]'}`}>
                          <input type="checkbox" checked={sopChecks[i]} onChange={e => { const copy = [...sopChecks]; copy[i] = e.target.checked; setSopChecks(copy); }} className="mt-0.5 h-4 w-4 rounded accent-emerald-500" />
                          <div className="flex-1">
                            <div className={`text-[12px] leading-snug ${sopChecks[i] ? 'text-emerald-200 line-through opacity-70' : 'text-[var(--text)]'}`}>{task}</div>
                            <div className="text-[10px] text-[var(--text-muted)] mt-1">{i < 2 ? 'Operational' : i === 2 ? 'Admin' : i === 3 ? 'Admin' : 'Growth'} • {sopChecks[i] ? 'Selesai' : 'Belum'}</div>
                          </div>
                          {sopChecks[i] && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                        </label>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] p-3 flex items-center justify-between">
                      <span className="text-[11px] text-[var(--text-muted)]">Progress hari ini</span>
                      <span className="mono text-[12px] font-semibold">{sopChecks.filter(Boolean).length}/5 selesai</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* Template Generator */}
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-400" /> Template Generator</h3>
                      <div className="flex rounded-full bg-[#101012] border border-[var(--border)] p-1">
                        {(['Email', 'WhatsApp']).map(m => (
                          <button key={m} onClick={() => setTemplateMode(m)} className={`text-[11px] px-3 py-1 rounded-full font-medium transition ${templateMode === m ? 'bg-white text-black' : 'text-[var(--text-muted)] hover:text-white'}`}>{m}</button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] tracking-widest text-[var(--text-muted)]">PLATFORM</label>
                          <select value={tplPlatform} onChange={e => setTplPlatform(e.target.value)} className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]">
                            <option>PS1</option><option>PSP</option><option>APK</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest text-[var(--text-muted)]">SIZE FILE</label>
                          <input value={tplSize} onChange={e => setTplSize(e.target.value)} className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-widest text-[var(--text-muted)]">JUDUL GAME</label>
                        <input value={tplJudul} onChange={e => setTplJudul(e.target.value)} className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-widest text-[var(--text-muted)]">LINK DRIVE</label>
                        <input value={tplLink} onChange={e => setTplLink(e.target.value)} className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] mono" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] tracking-widest text-[var(--text-muted)] font-medium">PREVIEW</span>
                        <button onClick={() => copyText(templatePreview, 'tpl')} className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] hover:bg-[var(--surface-3)] transition">
                          {copied === 'tpl' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />} {copied === 'tpl' ? 'Tersalin' : 'Copy Template'}
                        </button>
                      </div>
                      <div className="rounded-xl bg-[#0a0a0c] border border-[var(--border)] p-4 text-[12px] leading-relaxed whitespace-pre-wrap font-mono text-[var(--text-muted)] max-h-[260px] overflow-y-auto">
                        {templatePreview}
                      </div>
                      <div className="mt-3 text-[11px] text-[var(--text-muted)] flex gap-2">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>Format udah sesuai SOP lama: Instruksi copy link italic, Download section bold, detail Judul-Link-Size. Preview lokal, tinggal copy.</span>
                      </div>
                    </div>
                  </div>

                  {/* Upload Checklist */}
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                    <h3 className="font-semibold flex items-center gap-2"><ShoppingBag className="h-4 w-4 text-indigo-400" /> Upload Checklist Shopee</h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">Form validasi sebelum publish • Semua ceklis harus hijau</p>

                    <div className="mt-5 space-y-3">
                      <div>
                        <label className="text-[10px] tracking-widest text-[var(--text-muted)]">JUDUL SHOPEE (SEO &lt; 70 char)</label>
                        <input value={uploadForm.judul} onChange={e => setUploadForm({ ...uploadForm, judul: e.target.value })} placeholder="Contoh: GTA San Andreas MOD Indonesia PS1 - Full Misi + Save Data" className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]" />
                        <div className="mt-1.5 flex justify-between text-[10px]">
                          <span className={`${uploadForm.judul.length > 70 ? 'text-red-400' : uploadForm.judul.length > 0 ? 'text-emerald-400' : 'text-[var(--text-faint)]'}`}>{uploadForm.judul.length}/70 char {uploadForm.judul.length > 70 ? '• kepanjangan!' : uploadForm.judul.length > 0 ? '• OK' : ''}</span>
                          <span className="text-[var(--text-faint)]">Wajib ada keyword: PS1 / PSP / APK</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] tracking-widest text-[var(--text-muted)]">HARGA</label>
                          <input value={uploadForm.harga} onChange={e => setUploadForm({ ...uploadForm, harga: e.target.value })} className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] mono" />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest text-[var(--text-muted)]">KATEGORI</label>
                          <select value={uploadForm.kategori} onChange={e => setUploadForm({ ...uploadForm, kategori: e.target.value })} className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]">
                            <option>Game PS1</option><option>Game PSP</option><option>Game APK</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] tracking-widest text-[var(--text-muted)]">LINK DRIVE</label>
                          <input value={uploadForm.link} onChange={e => setUploadForm({ ...uploadForm, link: e.target.value })} placeholder="https://drive.google.com/..." className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] mono" />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest text-[var(--text-muted)]">SIZE</label>
                          <input value={uploadForm.size} onChange={e => setUploadForm({ ...uploadForm, size: e.target.value })} placeholder="1.4 GB" className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px]" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-widest text-[var(--text-muted)]">DESKRIPSI SINGKAT</label>
                        <textarea value={uploadForm.deskripsi} onChange={e => setUploadForm({ ...uploadForm, deskripsi: e.target.value })} rows={3} placeholder="Fitur, cara instal singkat, support..." className="mt-1 w-full bg-[#101012] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] resize-none" />
                      </div>
                      <div className="rounded-xl bg-[#101012] border border-[var(--border)] p-3">
                        <div className="text-[10px] tracking-widest text-[var(--text-muted)] font-medium mb-2.5">VALIDASI OTOMATIS</div>
                        <div className="space-y-2 text-[11px]">
                          {[
                            { ok: uploadForm.judul.length > 0 && uploadForm.judul.length <= 70, label: 'Foto cover 1:1 (mock checked)' },
                            { ok: uploadForm.judul.toLowerCase().includes('ps1') || uploadForm.judul.toLowerCase().includes('psp') || uploadForm.judul.toLowerCase().includes('apk'), label: 'Judul ada keyword PS1/PSP/APK' },
                            { ok: uploadForm.link.includes('drive.google'), label: 'Link Drive valid' },
                            { ok: uploadForm.size.length > 1, label: 'Size terisi' },
                            { ok: Number(uploadForm.harga) >= 15000, label: 'Harga >= Rp 15.000' },
                          ].map((v, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className={`h-4 w-4 rounded-full grid place-items-center border ${v.ok ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-faint)]'}`}>
                                {v.ok ? <Check className="h-3 w-3" /> : <span className="h-1 w-1 rounded-full bg-current" />}
                              </div>
                              <span className={v.ok ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}>{v.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => copyText(`Judul: ${uploadForm.judul}\nHarga: Rp ${uploadForm.harga}\nKategori: ${uploadForm.kategori}\nLink: ${uploadForm.link}\nSize: ${uploadForm.size}\nDeskripsi: ${uploadForm.deskripsi}`, 'upload')} className="flex-1 rounded-xl bg-white text-black py-2.5 text-[12px] font-semibold hover:bg-zinc-200 transition flex items-center justify-center gap-1.5">
                          {copied === 'upload' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied === 'upload' ? 'Draft Tersalin' : 'Copy Draft'}
                        </button>
                        <button onClick={() => setUploadForm({ judul: '', deskripsi: '', harga: '25000', kategori: 'Game PS1', link: '', size: '' })} className="rounded-xl bg-[var(--surface-2)] border border-[var(--border)] px-4 py-2.5 text-[12px]">Reset</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick WA/Email */}
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6">
                  <h3 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-amber-400" /> Template Cepat WA / Email</h3>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {[
                      { id: 'wa1', title: 'Balas Chat Link Error', text: 'Halo kak! Link yang error sudah kami update ya 🙏 Silakan coba lagi: [LINK BARU]. Buka via Chrome ya kak, jangan langsung di Shopee. Kalau masih kendala balas chat ini lagi ya!' },
                      { id: 'wa2', title: 'Konfirmasi Pesanan', text: 'Halo kak, orderan [JUDUL GAME] sudah kami proses! 🎮 Link download akan dikirim via chat dalam 5-15 menit. Pastikan Shopee chat aktif ya kak. Terima kasih!' },
                      { id: 'email1', title: 'Email Panduan Instal', text: 'Halo kak! Terima kasih order di toko kami. Untuk instal: 1) Copy link Drive paste di Chrome 2) Download & ekstrak pakai Zarchiver 3) Load di emulator. Video panduan: [LINK YOUTUBE]. Need help? Balas email ini ya!' },
                    ].map(t => (
                      <div key={t.id} className="rounded-xl bg-[#101012] border border-[var(--border)] p-4 flex flex-col">
                        <div className="text-[12px] font-medium">{t.title}</div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-2 leading-relaxed line-clamp-4">{t.text}</div>
                        <button onClick={() => copyText(t.text, t.id)} className="mt-3 inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] hover:bg-[var(--surface-3)] transition w-fit">
                          {copied === t.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />} {copied === t.id ? 'Tersalin' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 pb-2">
              <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/40 px-4 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Draft lokal only • Aman buat preview tim • Export CSV ready</span>
                <span className="mono">Push to GitHub → Connect to Vercel → Deploy → Target 30jt 🚀</span>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
        <div className="grid grid-cols-4 gap-1 p-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'growth', label: 'Growth', icon: TrendingUp },
            { id: 'operational', label: 'Operasional', icon: CalendarDays },
            { id: 'admin', label: 'Admin', icon: ShoppingBag },
          ].map(item => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => handleNav(item.id)} className={`flex flex-col items-center gap-1 rounded-xl py-2.5 transition ${active ? 'bg-[var(--surface)] text-white' : 'text-[var(--text-muted)]'}`}>
                <item.icon className={`h-5 w-5 ${active ? 'text-indigo-400' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
