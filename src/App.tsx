import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Search, Bell, Settings, User, Calendar, Activity,
  FileText, Clipboard, Microscope, Heart, Thermometer,
  Wind, Droplets, ChevronRight, Maximize2, X, Move,
  Download, Share2, Printer, Shield, Database,
  Cpu, Zap, Layers, Scan, Monitor, Info,
  ChevronDown, Filter, LayoutGrid, List, ArrowUpRight,
  Stethoscope, Pill, Hospital, AlertCircle, Clock,
  ShieldCheck, Users, HeartPulse, Radar, Lock, ClipboardList, FlaskConical, Stethoscope as DoctorIcon, Image as ImageIcon, User as UserIcon, Briefcase, ZoomIn, Hand, Contrast, Target, ArrowLeft, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { patientList, allRecords } from './data';

const DicomViewer = ({ onClose, time, patientSearch, setPatientSearch, filteredPatients, selectedPatient, setSelectedPatient }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[600] bg-[#020617]/95 backdrop-blur-md flex flex-col font-sans select-none">
    {/* Unified top bar matching the main app header */}
    <div className="h-12 bg-[#020617]/80 border-b border-white/8 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Radar size={18} className="text-blue-400" />
          <span className="text-white font-black text-sm tracking-tighter">健康数据共享中心</span>
          <div className="h-3.5 w-[1px] bg-white/20 mx-0.5" />
          <span className="text-blue-300/70 text-xs font-light tracking-widest uppercase">参保人全息视图</span>
        </div>
        <div className="h-3.5 w-[1px] bg-white/10" />
        <span className="text-[10px] text-slate-500 font-mono">DICOM · 张伟 · Head CT · 2024-05-10</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Search box mirroring header */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2.5" style={{ height: '30px', width: '160px' }}>
          <Search size={11} className="text-slate-500 shrink-0" />
          <span className="text-slate-600 text-[11px]">搜索患者...</span>
        </div>
        {/* Clock */}
        <div className="bg-white/5 border border-white/10 rounded px-2.5 flex items-center" style={{ height: '30px' }}>
          <span className="text-sm font-bold font-mono text-white tracking-widest tabular-nums">{time}</span>
        </div>
        {/* Viewer tools */}
        <div className="flex items-center gap-1 bg-white/4 px-2 py-1 rounded border border-white/8">
          <button className="p-1 text-slate-400 hover:text-white transition-colors rounded hover:bg-white/8"><ZoomIn size={13} /></button>
          <div className="w-[1px] h-3 bg-white/10" />
          <button className="p-1 text-slate-400 hover:text-white transition-colors rounded hover:bg-white/8"><Hand size={13} /></button>
          <div className="w-[1px] h-3 bg-white/10" />
          <button className="p-1 text-slate-400 hover:text-white transition-colors rounded hover:bg-white/8"><Contrast size={13} /></button>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition-all"><X size={15} /></button>
      </div>
    </div>
    <div className="flex-1 flex overflow-hidden">
      {/* Left sidebar — DICOM params */}
      <div className="w-14 bg-[#0d1117] border-r border-white/6 flex flex-col items-center py-3 gap-4 text-[8px] font-mono text-slate-600">
        <div className="text-center"><div className="text-orange-400/80 font-bold">120</div><div>kV</div></div>
        <div className="text-center"><div className="text-orange-400/80 font-bold">200</div><div>mA</div></div>
        <div className="text-center"><div className="text-blue-400/60 font-bold">5.0</div><div>mm</div></div>
        <div className="text-center"><div className="text-blue-400/60 font-bold">W:350</div><div>L:50</div></div>
        <div className="flex-1" />
        <div className="text-center text-slate-700"><div>12/28</div><div>SL</div></div>
      </div>

      {/* Main viewer */}
      <div className="flex-1 relative bg-[#060809] flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors z-10 bg-white/5 hover:bg-white/10 rounded p-1"><ChevronRight size={22} className="rotate-180" /></button>
        <div className="relative" style={{ width: 'min(70vh, 100%)', aspectRatio: '1' }}>
          {/* Real brain CT axial scan from Wikimedia Commons */}
          <img
            src="/dicom.png"
            alt="CT Scan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-yellow-400/15" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-yellow-400/15" />
            <div className="absolute top-2 left-2 text-[9px] font-mono text-yellow-300/70 leading-tight">
              <div>张伟 M 54Y</div><div>2024-05-10</div>
            </div>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-yellow-300/70 text-right leading-tight">
              <div>CT HEAD WO</div><div>SER:4 IMG:12</div>
            </div>
            <div className="absolute bottom-2 left-2 text-[9px] font-mono text-green-400/60">W:350 L:50</div>
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-green-400/60">Zoom: 1.0x</div>
          </div>
        </div>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors z-10 bg-white/5 hover:bg-white/10 rounded p-1"><ChevronRight size={22} /></button>
        <div className="absolute right-3 top-[10%] bottom-[10%] flex flex-col items-center gap-1">
          <div className="text-[8px] text-slate-600 font-mono">28</div>
          <div className="flex-1 w-1 bg-white/8 rounded-full relative cursor-pointer">
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-3 h-2 bg-blue-400/60 rounded-sm" />
          </div>
          <div className="text-[8px] text-slate-600 font-mono">1</div>
        </div>
      </div>

      {/* Right panel — AI report */}
      <div className="w-64 bg-[#0d1117] border-l border-white/6 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-white/6">
          <h3 className="text-white text-xs font-bold flex items-center gap-2"><Radar size={13} className="text-blue-400 animate-pulse" /> AI 辅助诊断报告</h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          <div className="bg-red-500/10 border border-red-500/25 p-3 rounded">
            <div className="flex items-center gap-1.5 text-red-400 text-[9px] font-bold mb-2 uppercase tracking-wider"><Activity size={10} /> 异常发现</div>
            <p className="text-[10px] text-slate-300 leading-relaxed">右侧基底节区可见斑点状低密度影，边界模糊，提示轻度腔隙性脑梗死。</p>
          </div>
          <div>
            <div className="text-blue-400/70 text-[9px] font-bold uppercase tracking-wider mb-2">影像所见</div>
            <ol className="text-[10px] text-slate-400 space-y-2 list-decimal pl-4 leading-relaxed">
              <li>两侧大脑半球对称，脑沟脑裂未见明显增宽。</li>
              <li>脑室系统大小形态正常，中线结构居中。</li>
              <li>未见明显异常密度影及占位效应。</li>
            </ol>
          </div>
          <div className="pt-2 border-t border-white/6">
            <div className="text-blue-400/70 text-[9px] font-bold uppercase tracking-wider mb-2">序列信息</div>
            <div className="space-y-1 text-[9px] font-mono text-slate-500">
              <div className="flex justify-between"><span>序列</span><span className="text-slate-400">4 / 6</span></div>
              <div className="flex justify-between"><span>层数</span><span className="text-slate-400">28</span></div>
              <div className="flex justify-between"><span>层厚</span><span className="text-slate-400">5.0mm</span></div>
              <div className="flex justify-between"><span>矩阵</span><span className="text-slate-400">512×512</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const VitalSignBox = ({ label, value, unit, icon: Icon, color, trend }) => {
  const path = trend ? `M ${trend.map((v, i) => `${(i / (trend.length - 1)) * 100} ${20 - (v / 100) * 20}`).join(' L ')}` : '';
  return (
    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 hover:border-blue-500/30 transition-all group backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg bg-blue-500/10 ${color}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold text-blue-400/80 uppercase tracking-tight">{label}</span>
        </div>
        <div className="text-[10px] font-mono text-blue-400/40">NORMAL</div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold font-mono drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] ${color}`}>{value}</span>
          <span className="text-[10px] text-blue-400/60 font-medium">{unit}</span>
        </div>
        <div className="w-20 h-6 opacity-50 group-hover:opacity-100 transition-opacity">
          <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className={color} />
          </svg>
        </div>
      </div>
    </div>
  );
};

const BodyAnnotation = ({ bodyImageSrc, style }: { bodyImageSrc: string, style: React.CSSProperties }) => {
  return (
    <div style={style} className="relative w-full h-full">
      <img src={bodyImageSrc} alt="Body" className="absolute top-0 left-0 w-full h-full object-contain" />
      <div className="absolute top-0 left-0 w-full h-full">
        <style>{`
          .anno-title{font-family:sans-serif;font-size:13px;font-weight:700;fill:#E8F4FF}
          .anno-date{font-family:sans-serif;font-size:11.5px;fill:#8AAECC}
          .anno-sep{stroke-width:0.5;opacity:0.3}
          .body-fill{fill:rgba(20,60,120,0.10);stroke:#3A7BC8;stroke-width:0.8;opacity:0.35}
          @keyframes rg{0%{opacity:.8}100%{opacity:0}}
          .ring{fill:none;stroke-width:2;opacity:0;animation:rg linear infinite}
        `}</style>
        <svg width="100%" height="100%" viewBox="0 0 680 510" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          {/* Annotations */}
          <circle className="ring" cx="358" cy="72" r="4" stroke="#5A8FAA" style={{ animationDuration: '5.4s', animationDelay: '0.4s' }}>
            <animate attributeName="r" from="4" to="36" dur="5.4s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="358" cy="72" r="3.5" fill="#5A8FAA" />
          <polyline points="358,72 428,72 455,50" fill="none" stroke="#5A8FAA" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="455" y="18" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="455,30 455,18 468,18" fill="none" stroke="#5A8FAA" strokeWidth="1" />
          <polyline points="633,54 645,54 645,84 633,84" fill="none" stroke="#5A8FAA" strokeWidth="1" />
          <line x1="455" y1="51" x2="645" y2="51" stroke="#5A8FAA" className="anno-sep" />
          <text x="467" y="38" className="anno-title">脑血管意外</text>
          <text x="467" y="72" className="anno-date">2023-10-27（门诊）</text>
          <circle className="ring" cx="350" cy="108" r="4" stroke="#9E8A50" style={{ animationDuration: '7.2s', animationDelay: '2.1s' }}>
            <animate attributeName="r" from="4" to="64" dur="7.2s" begin="2.1s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="108" r="3.5" fill="#9E8A50" />
          <polyline points="350,108 428,108 455,92" fill="none" stroke="#9E8A50" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="455" y="88" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="455,100 455,88 468,88" fill="none" stroke="#9E8A50" strokeWidth="1" />
          <polyline points="633,120 645,120 645,154 633,154" fill="none" stroke="#9E8A50" strokeWidth="1" />
          <line x1="455" y1="121" x2="645" y2="121" stroke="#9E8A50" className="anno-sep" />
          <text x="467" y="108" className="anno-title">脑梗死</text>
          <text x="467" y="142" className="anno-date">2023-05-26（住院）</text>
          <circle className="ring" cx="402" cy="185" r="4" stroke="#9E6060" style={{ animationDuration: '6.4s', animationDelay: '0.9s' }}>
            <animate attributeName="r" from="4" to="56" dur="6.4s" begin="0.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="402" cy="185" r="3.5" fill="#9E6060" />
          <polyline points="402,185 455,185 455,168" fill="none" stroke="#9E6060" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="455" y="160" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="455,172 455,160 468,160" fill="none" stroke="#9E6060" strokeWidth="1" />
          <polyline points="633,192 645,192 645,226 633,226" fill="none" stroke="#9E6060" strokeWidth="1" />
          <line x1="455" y1="193" x2="645" y2="193" stroke="#9E6060" className="anno-sep" />
          <text x="467" y="180" className="anno-title">高血压</text>
          <text x="467" y="214" className="anno-date">2023-02-17（门诊）</text>
          <circle className="ring" cx="410" cy="232" r="4" stroke="#5A8FAA" style={{ animationDuration: '4.4s', animationDelay: '3.3s' }}>
            <animate attributeName="r" from="4" to="28" dur="4.4s" begin="3.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="410" cy="232" r="3.5" fill="#5A8FAA" />
          <polyline points="410,232 455,232 455,234" fill="none" stroke="#5A8FAA" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="455" y="230" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="455,242 455,230 468,230" fill="none" stroke="#5A8FAA" strokeWidth="1" />
          <polyline points="633,262 645,262 645,296 633,296" fill="none" stroke="#5A8FAA" strokeWidth="1" />
          <line x1="455" y1="263" x2="645" y2="263" stroke="#5A8FAA" className="anno-sep" />
          <text x="467" y="250" className="anno-title">高血压</text>
          <text x="467" y="284" className="anno-date">2018-01-16（高血压专科）</text>
          <circle className="ring" cx="285" cy="235" r="4" stroke="#9E8A50" style={{ animationDuration: '6.0s', animationDelay: '1.5s' }}>
            <animate attributeName="r" from="4" to="48" dur="6.0s" begin="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="285" cy="235" r="3.5" fill="#9E8A50" />
          <polyline points="285,235 225,235 35,218" fill="none" stroke="#9E8A50" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="35" y="168" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="35,180 35,168 48,168" fill="none" stroke="#9E8A50" strokeWidth="1" />
          <polyline points="213,200 225,200 225,234 213,234" fill="none" stroke="#9E8A50" strokeWidth="1" />
          <line x1="35" y1="201" x2="225" y2="201" stroke="#9E8A50" className="anno-sep" />
          <text x="47" y="188" className="anno-title">尿毒症</text>
          <text x="47" y="222" className="anno-date">2023-10-27（住院）</text>
          <circle className="ring" cx="290" cy="290" r="4" stroke="#9E6060" style={{ animationDuration: '5.6s', animationDelay: '4.2s' }}>
            <animate attributeName="r" from="4" to="36" dur="5.6s" begin="4.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="290" cy="290" r="3.5" fill="#9E6060" />
          <polyline points="290,290 225,290 35,288" fill="none" stroke="#9E6060" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="35" y="238" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="35,250 35,238 48,238" fill="none" stroke="#9E6060" strokeWidth="1" />
          <polyline points="213,270 225,270 225,304 213,304" fill="none" stroke="#9E6060" strokeWidth="1" />
          <line x1="35" y1="271" x2="225" y2="271" stroke="#9E6060" className="anno-sep" />
          <text x="47" y="258" className="anno-title">糖尿病伴并发症</text>
          <text x="47" y="292" className="anno-date">2023-09-13（门诊）</text>
          <circle className="ring" cx="292" cy="455" r="4" stroke="#5A8FAA" style={{ animationDuration: '6.2s', animationDelay: '2.7s' }}>
            <animate attributeName="r" from="4" to="48" dur="6.2s" begin="2.7s" repeatCount="indefinite" />
          </circle>
          <circle cx="292" cy="455" r="3.5" fill="#5A8FAA" />
          <polyline points="292,455 225,455 35,438" fill="none" stroke="#5A8FAA" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="35" y="388" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="35,400 35,388 48,388" fill="none" stroke="#5A8FAA" strokeWidth="1" />
          <polyline points="213,420 225,420 225,454 213,454" fill="none" stroke="#5A8FAA" strokeWidth="1" />
          <line x1="35" y1="421" x2="225" y2="421" stroke="#5A8FAA" className="anno-sep" />
          <text x="47" y="408" className="anno-title">肢痛</text>
          <text x="47" y="442" className="anno-date">2018-05-26（门诊）</text>
          <circle className="ring" cx="378" cy="440" r="4" stroke="#9E8A50" style={{ animationDuration: '4.8s', animationDelay: '0.2s' }}>
            <animate attributeName="r" from="4" to="28" dur="4.8s" begin="0.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="378" cy="440" r="3.5" fill="#9E8A50" />
          <polyline points="378,440 455,440 455,434" fill="none" stroke="#9E8A50" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="455" y="368" width="190" height="66" rx="3" fill="rgba(6,18,48,0.84)" />
          <polyline points="455,380 455,368 468,368" fill="none" stroke="#9E8A50" strokeWidth="1" />
          <polyline points="633,400 645,400 645,434 633,434" fill="none" stroke="#9E8A50" strokeWidth="1" />
          <line x1="455" y1="401" x2="645" y2="401" stroke="#9E8A50" className="anno-sep" />
          <text x="467" y="388" className="anno-title">肱骨近端多发性骨折</text>
          <text x="467" y="422" className="anno-date">2023-10-29（门诊）</text>
        </svg>
      </div>
    </div>
  );
};

const VideoVisualization = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <BodyAnnotation
        bodyImageSrc="/body.png"
        style={{ width: '100%', height: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

const InsuranceArchive = () => {
  const [activeTab, setActiveTab] = useState('status');

  const tabs = [
    { id: 'status', label: '参保状态', icon: ShieldCheck },
    { id: 'commercial', label: '商业保险', icon: Briefcase },
    { id: 'longterm', label: '长护险', icon: HeartPulse },
  ];

  return (
    <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-5 flex flex-col relative backdrop-blur-md">
      <HUDCorners />
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          医保档案中心
        </h3>
      </div>

      <motion.div layoutRoot className="flex bg-[#020817]/60 p-1 rounded-xl border border-blue-500/20 mb-3.5 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold rounded-lg transition-colors z-10 ${activeTab === tab.id ? 'text-white' : 'text-blue-400/50 hover:text-blue-400'
              }`}
          >
            <tab.icon className={`w-3.5 h-3.5 transition-transform ${activeTab === tab.id ? 'scale-110' : ''}`} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] z-[-1]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      <div className="pr-1 relative pt-3.5">
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {activeTab === 'status' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-100 font-semibold tracking-widest text-xs uppercase">参保状态</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    <span className="text-[9px] font-bold text-green-400 tracking-wider">正常参保(在缴)</span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="mb-3"><p className="text-[9px] text-blue-400/60 uppercase mb-1 font-bold tracking-widest">参保类型</p><h3 className="text-lg font-bold text-white tracking-tight">职工基本医疗保险</h3></div>
                    <div><p className="text-[9px] text-blue-400/60 uppercase mb-1 font-bold tracking-widest">统筹区</p><p className="text-lg font-bold text-white tracking-tight">常州市 (3204)</p></div>
                  </div>
                  <div className="pt-2">
                    <p className="text-[11px] text-blue-400/60 uppercase mb-4 font-bold tracking-widest">医保年度累计</p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1.5 font-mono"><span className="text-slate-400">门诊统筹额度</span><span className="text-blue-400">1,900 / 10,000</span></div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[19%]" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1.5 font-mono"><span className="text-slate-400">住院统筹额度</span><span className="text-green-400">14,800 / 400,000</span></div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-600 to-green-400 w-[3.7%]" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-blue-500/15 pt-3 mt-1">
                    <div className="flex items-center gap-2 text-blue-400/70 mb-3"><Users size={12} /><span className="text-[10px] font-bold tracking-wider uppercase">家庭共济账户</span></div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex -space-x-2">
                        {['本', '妻', '子'].map((m, i) => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#061226] flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-blue-500/30 text-blue-200 border-blue-400/40' : 'bg-slate-700/50 text-slate-400'}`}>{m}</div>
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-slate-500 mb-0.5">家庭账户余额</p>
                        <p className="text-base font-black text-white font-mono leading-none">¥ 12,450<span className="text-blue-400/50 text-xs font-bold">.00</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'commercial' && (
              <div>
                <div className="mb-4"><span className="text-blue-100 font-semibold tracking-widest text-xs uppercase">商业保险</span></div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative h-28 rounded-md overflow-hidden bg-gradient-to-br from-[#2D1612] to-[#120807] border border-orange-950/50 p-3">
                    <div className="flex justify-between items-start"><div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center border border-orange-500/40"><Shield size={14} className="text-orange-500 fill-orange-500/40" /></div><button className="text-[10px] text-orange-400/80 border border-orange-400/30 px-2 py-0.5 rounded bg-orange-400/5 hover:bg-orange-400/20 transition-all">详情 &gt;</button></div>
                    <div className="mt-2"><p className="text-[10px] text-orange-400 font-bold mb-1">当前生效</p><h4 className="text-sm font-black text-white tracking-wide">江苏医惠保1号</h4></div>
                    <div className="absolute bottom-2 left-3"><p className="text-[10px] text-white/30 font-medium">共保体</p></div>
                  </div>
                  <div className="relative h-28 rounded-md overflow-hidden bg-gradient-to-br from-[#0B1E1C] to-[#040C0B] border border-teal-950/50 p-3">
                    <div className="flex justify-between items-start"><div className="w-6 h-6 rounded bg-teal-500/20 flex items-center justify-center border border-teal-500/40"><Shield size={14} className="text-teal-500 fill-teal-500/40" /></div><button className="text-[10px] text-teal-400/80 border border-teal-400/30 px-2 py-0.5 rounded bg-teal-400/5 hover:bg-teal-400/20 transition-all">详情 &gt;</button></div>
                    <div className="mt-2"><p className="text-[10px] text-teal-400 font-bold mb-1">当前生效</p><h4 className="text-sm font-black text-white tracking-wide">泰康乐享健康重疾险</h4></div>
                    <div className="absolute bottom-2 left-3"><p className="text-[10px] text-white/30 font-medium">泰康人寿</p></div>
                  </div>
                </div>

                {/* AI 医保条款分析建议 */}
                <div className="mt-4 bg-[#0a1628] border border-blue-500/20 rounded-md overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-blue-500/15 bg-blue-500/5">
                    <Cpu size={12} className="text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 tracking-wider">AI 医保条款分析建议</span>
                  </div>
                  <div className="px-3 py-2.5 space-y-2.5">
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold text-orange-400 shrink-0 mt-0.5">推荐用药提示：</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed">鉴于患者持有<span className="text-orange-300 font-bold">江苏医惠保1号</span>，保目录外费用可获报销，但有2万元免赔额。对于高额医疗费用，建议优先使用医保目录内药品以降低个人自付比例。</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold text-teal-400 shrink-0 mt-0.5">重疾保障提示：</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed"><span className="text-teal-300 font-bold">乐享健康重疾险</span>覆盖120种重疾，治疗中的诊断（高血压、肺结节）暂未触发理赔，但需注意肺结节随访情况，若发展为恶性肿瘤将触发全额赔付。</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'longterm' && (
              <div>
                <div className="mb-4"><span className="text-blue-100 font-semibold tracking-widest text-xs uppercase">长护险</span></div>
                <div className="bg-blue-500/5 border border-blue-500/15 rounded p-4 mb-4">
                  <p className="text-[9px] text-blue-400/60 uppercase font-bold tracking-widest mb-1">当前状态</p>
                  <h3 className="text-lg font-black text-white tracking-tight mb-1">未享受待遇</h3>
                  <p className="text-[10px] text-slate-500 font-mono">最近评估: 2024-01-15</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-blue-500/10"><span className="text-[11px] text-slate-400">日常生活活动能力 (ADL)</span><span className="text-[11px] font-bold text-blue-300 font-mono">100分</span></div>
                  <div className="flex items-center justify-between py-2"><span className="text-[11px] text-slate-400">认知能力</span><span className="text-[11px] font-bold text-blue-300">完好</span></div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const HUDCorners = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/80" />
    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/80" />
    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/80" />
    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-500/80" />
  </div>
);

// ── Lab record: same card style as exam (bg-blue-500/5 border border-white/5) ──
const LabRecordItem = ({ item, onOpen }) => {
  const hasMetrics = item.metrics && item.metrics.length > 0;
  const hasAbnormal = hasMetrics && item.metrics.some(m => m.flag);
  return (
    <div className="group relative bg-blue-500/5 border border-white/5 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500/20 hover:bg-blue-500/8 transition-all" onClick={() => onOpen && onOpen(item)}>
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${hasAbnormal ? 'bg-red-500/60' : 'bg-blue-500/45'}`} />
      {/* Header */}
      <div className="px-3 py-2.5 flex items-start justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-white tracking-wide">{item.name}</h4>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.date} · {item.hospital}</div>
        </div>
        {hasAbnormal
          ? <span className="text-[8px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded shrink-0 mt-0.5">异常提示</span>
          : <span className="text-[8px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded shrink-0 mt-0.5">正常</span>
        }
      </div>
      {/* Metrics — alternating rows, no border dividers */}
      {hasMetrics && (
        <div className="pb-1.5 border-t border-white/4">
          {item.metrics.map((m, mi) => (
            <div key={mi} className={`flex items-center justify-between px-3 py-1.5 text-[10px] ${mi % 2 === 0 ? 'bg-blue-500/[0.04]' : ''}`}>
              <span className="text-slate-400 flex-1 min-w-0 truncate">{m.label}</span>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className={`font-mono font-bold text-[11px] ${m.flag === 'high' ? 'text-red-400' : m.flag === 'low' ? 'text-yellow-400' : 'text-slate-300'}`}>{m.value}</span>
                <span className="text-slate-600 text-[9px] w-12 truncate">{m.unit}</span>
                {m.flag === 'high' && <span className="text-red-400 font-bold text-[10px] w-3">↑</span>}
                {m.flag === 'low' && <span className="text-yellow-400 font-bold text-[10px] w-3">↓</span>}
                {!m.flag && <span className="text-slate-700 text-[9px] w-3">—</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LabMetricItem = ({ label, value, unit, flag }: any) => (
  <div className="flex items-center justify-between p-2.5 bg-blue-500/5 border border-blue-500/10 rounded-lg hover:bg-blue-500/10 transition-colors">
    <div className="flex flex-col">
      <span className="text-[10px] text-blue-400/60 font-medium">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-sm font-bold font-mono ${flag ? 'text-red-400' : 'text-blue-100'}`}>{value}</span>
        <span className="text-[9px] text-blue-400/40">{unit}</span>
      </div>
    </div>
    {flag && (
      <div className="flex items-center gap-1 text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
        <ArrowUpRight className="w-3 h-3" />
        <span className="text-[8px] font-bold uppercase">{flag === 'high' ? '偏高' : '偏低'}</span>
      </div>
    )}
  </div>
);

// ── Modals ──
const TechModalLayout = ({ title, hospital, onClose, children, widthClass = "max-w-[1000px]" }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-[#020617]/60 backdrop-blur-sm flex items-center justify-center z-[150] p-4 font-sans text-slate-100">
    <div className={`relative bg-[#061226]/90 border border-blue-400/40 shadow-[0_0_50px_rgba(59,130,246,0.22)] w-full ${widthClass} h-[60vh] flex flex-col rounded-lg overflow-hidden`} style={{ animation: 'modal-in 0.2s ease-out' }}>
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400/60"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400/60"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400/60"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400/60"></div>
      <div className="flex-shrink-0 relative p-5 border-b border-blue-500/30 bg-gradient-to-r from-blue-900/40 to-transparent flex items-center justify-between">
        <div>
          <div className="text-blue-400/70 text-[10px] tracking-[0.4em] mb-1 font-bold">{hospital}</div>
          <h2 className="text-xl font-bold tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(96,165,250,0.7)] uppercase">{title}</h2>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors text-blue-400/60 hover:text-red-400"><X size={24} /></button>
      </div>
      <div className="overflow-y-auto custom-scrollbar flex-1 p-6 space-y-6 bg-[#061226]">{children}</div>
      <div className="flex-shrink-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-30"></div>
    </div>
    <style>{`@keyframes modal-in { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }`}</style>
  </motion.div>
);

const DataBlock = ({ label, children, full = false }) => (
  <div className={`${full ? 'col-span-full' : ''}`}>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1 h-3.5 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]"></div>
      <span className="text-blue-400/80 text-[11px] font-bold tracking-widest">{label}</span>
    </div>
    <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-sm text-slate-300 leading-relaxed text-sm">{children}</div>
  </div>
);

const InfoGrid = ({ data }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-5 border-b border-blue-500/10">
    {Object.entries(data).map(([k, v], i) => (
      <div key={i} className="flex flex-col">
        <span className="text-[10px] text-blue-400/40 uppercase tracking-tighter mb-0.5">{k}</span>
        <span className="text-[13px] text-blue-100 font-medium truncate">{v || '—'}</span>
      </div>
    ))}
  </div>
);

const OutpatientModal = ({ item, onClose }) => (
  <TechModalLayout title="门诊病历" hospital={item.hospital} onClose={onClose}>
    <InfoGrid data={{ '姓名': '张伟', '性别年龄': '男 / 54岁', '门诊号': 'MZ-CZ2-20240515', '就诊日期': item.date, '科室': item.dept, '主治医生': item.doctor, '病人ID': 'P88001235' }} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataBlock label="主诉">{item.chief || '复诊配药。'}</DataBlock>
      <DataBlock label="诊断"><span className="text-blue-300 font-bold">{item.desc || item.name}</span></DataBlock>
      <DataBlock label="现病史" full>患者病史明确，规律服药治疗中，近期无明显不适主诉，食欲及睡眠尚可，大小便正常。</DataBlock>
      <DataBlock label="既往史" full>有高血压病史，规律服药，血压控制稳定。否认药物过敏史。</DataBlock>
      <DataBlock label="体格检查" full>T: 36.4℃&nbsp;&nbsp;P: 72次/分&nbsp;&nbsp;R: 18次/分&nbsp;&nbsp;BP: 128/82mmHg。心肺听诊未见明显异常。</DataBlock>
      <DataBlock label="处理意见" full>继续原方案用药，定期随访，若有不适及时就诊。</DataBlock>
    </div>
    <div className="flex justify-between text-[10px] text-blue-400/30 pt-2 px-1 italic">
      <span>主治医生：{item.doctor}</span><span>就诊时间：{item.date}</span>
    </div>
  </TechModalLayout>
);

const InpatientModal = ({ item, onClose }: any) => (
  <TechModalLayout title="住院病案首页" hospital={item.hospital} onClose={onClose} widthClass="max-w-[1100px]">
    {/* 第一行：基本信息 */}
    <div className="grid grid-cols-12 gap-px bg-blue-500/15 border border-blue-500/20 rounded-sm overflow-hidden mb-4">
      {[
        { l: '医疗付费', v: '医保统筹', s: 2 },
        { l: '住院次数', v: '第 1 次住院', s: 2 },
        { l: '病案号', v: 'ZY2023111005', s: 2, b: true },
        { l: '住院天数', v: '3天', s: 1 },
        { l: '姓名', v: '张伟', s: 1 },
        { l: '性别', v: '男', s: 1 },
        { l: '出生日期', v: '1972-08-12', s: 2 },
        { l: '年龄', v: '51岁', s: 1 },
      ].map((c, i) => (
        <div key={i} className={`col-span-${c.s} bg-[#061226] p-2 border border-blue-500/10`}>
          <div className="text-[9px] text-blue-400/40 mb-1 leading-none">{c.l}</div>
          <div className={`text-[11px] ${(c as any).b ? 'text-blue-300 font-bold' : 'text-slate-200'}`}>{c.v}</div>
        </div>
      ))}
    </div>

    {/* 第二行：身份证/婚姻/职业/地址 */}
    <div className="grid grid-cols-12 gap-px bg-blue-500/15 border border-blue-500/20 rounded-sm overflow-hidden mb-4">
      {[
        { l: '身份证号', v: '320402197208XXXX', s: 3 },
        { l: '婚姻状况', v: '已婚', s: 2 },
        { l: '职业', v: '职员', s: 2 },
        { l: '现住址', v: '常州市天宁区和平北路1号', s: 5 },
      ].map((c, i) => (
        <div key={i} className={`col-span-${c.s} bg-[#061226] p-2 border border-blue-500/10`}>
          <div className="text-[9px] text-blue-400/40 mb-1 leading-none">{c.l}</div>
          <div className="text-[11px] text-slate-200">{c.v}</div>
        </div>
      ))}
    </div>

    {/* 第三行：科室/时间/诊断/过敏/血型 */}
    <div className="grid grid-cols-12 gap-px bg-blue-500/15 border border-blue-500/20 rounded-sm overflow-hidden mb-4">
      {[
        { l: '入院科室', v: '心内科', s: 2 },
        { l: '入院日期', v: '2024-03-10 ~ 2024-03-20 08:30', s: 2 },
        { l: '出院科室', v: '心内科', s: 2 },
        { l: '出院时间', v: '2023-11-13 10:00', s: 2 },
        { l: '主要诊断', v: item.desc || '急性心肌梗死 住院记录', s: 2, b: true },
        { l: '诊断代码', v: 'K63.500', s: 1 },
        { l: '药物过敏', v: '未发现', s: 1 },
      ].map((c, i) => (
        <div key={i} className={`col-span-${c.s} bg-[#061226] p-2 border border-blue-500/10`}>
          <div className="text-[9px] text-blue-400/40 mb-1 leading-none">{c.l}</div>
          <div className={`text-[11px] whitespace-pre-line ${(c as any).b ? 'text-blue-300 font-bold' : 'text-slate-200'}`}>{c.v}</div>
        </div>
      ))}
    </div>

    {/* 第四行：慢性疾病/血型 */}
    <div className="grid grid-cols-12 gap-px bg-blue-500/15 border border-blue-500/20 rounded-sm overflow-hidden mb-4">
      {[
        { l: '慢性疾病', v: '慢性胃炎；高血压', s: 6 },
        { l: 'ABO血型', v: 'A型 Rh(+)', s: 6 },
      ].map((c, i) => (
        <div key={i} className={`col-span-${c.s} bg-[#061226] p-2 border border-blue-500/10`}>
          <div className="text-[9px] text-blue-400/40 mb-1 leading-none">{c.l}</div>
          <div className="text-[11px] text-slate-200">{c.v}</div>
        </div>
      ))}
    </div>

    {/* 第五行：医护人员 */}
    <div className="grid grid-cols-4 gap-4 border-t border-blue-500/15 pt-4">
      {[
        { l: '科主任', v: item.doctor || '陈主任' },
        { l: '主治医生', v: '张主任' },
        { l: '住院医生', v: '李医生' },
        { l: '责任护士', v: '王护士' },
      ].map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-[11px]">
          <span className="text-blue-400/50 shrink-0">{p.l}</span>
          <span className="text-white font-bold">{p.v}</span>
        </div>
      ))}
    </div>
  </TechModalLayout>
);

const ExamReportModal = ({ item, onClose }) => (
  <TechModalLayout title="检查报告单" hospital={item.hospital} onClose={onClose}>
    <InfoGrid data={{ '姓名': '张伟', '性别年龄': '男 / 54岁', '病人ID': 'P88001235', '检查号': 'IMG20240520001', '就诊科室': item.dept || '放射科', '检查日期': item.date, '报告日期': item.date, '检查类型': item.type ? `${item.type}检查` : '影像检查' }} />
    <div className="space-y-6">
      <DataBlock label="检查部位">{item.name}</DataBlock>
      <DataBlock label="影像表现">胸廓对称，气管纵隔居中。双肺纹理增多、增粗，走行尚可。双肺野内未见明显实变影及磨玻璃密度影。肺门及纵隔未见明显肿大淋巴结。心脏形态大小在正常范围内。双侧胸膜无明显增厚及胸腔积液。扫描层面骨质未见明显异常。</DataBlock>
      <DataBlock label="诊断结论"><span className="text-blue-300 font-bold text-base">{item.desc ? item.desc.replace('诊断结论: ', '') : '双肺纹理增多；建议结合临床，必要时随访。'}</span></DataBlock>
    </div>
    <div className="flex justify-between text-[10px] text-blue-400/30 pt-4 px-2 italic">
      <span>报告医师：{item.doctor || '王医生'}</span><span>审核医师：刘主任</span>
    </div>
  </TechModalLayout>
);

const LabReportModal = ({ item, onClose }) => {
  const labItems = item.metrics ? item.metrics.map((m, i) => ({
    id: i + 1, name: m.label.split(' (')[0], short: m.label.match(/\(([^)]+)\)/)?.[1] || '', result: m.value, unit: m.unit, status: m.flag
  })) : [];
  return (
    <TechModalLayout title="检验报告单" hospital={item.hospital} onClose={onClose}>
      <InfoGrid data={{ '姓名': '张伟', '性别': '男', '采样时间': item.date, '样本': '全血/血清', '病人ID': 'P88001235' }} />
      <div className="mt-2 border border-blue-500/20 rounded-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="sticky top-0 z-10 bg-[#061226]">
            <tr className="bg-blue-500/10 text-blue-400/80 border-b border-blue-500/20 font-bold">
              <th className="py-2.5 px-4">检验项目</th>
              <th className="py-2.5 px-4 text-center">结果</th>
              <th className="py-2.5 px-4 text-center">参考范围</th>
              <th className="py-2.5 px-4 text-center">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-500/10">
            {labItems.map((row, i) => (
              <tr key={i} className="hover:bg-blue-500/5 transition-colors">
                <td className="py-2 px-4"><div className="text-slate-200 text-[11px]">{row.name}</div>{row.short && <div className="text-[8px] text-blue-400/40 font-mono uppercase leading-none mt-0.5">{row.short}</div>}</td>
                <td className={`py-2 px-4 text-center font-bold text-[13px] font-mono ${row.status === 'high' ? 'text-red-400' : row.status === 'low' ? 'text-yellow-400' : 'text-blue-100'}`}>
                  {row.result}{row.status === 'high' && <span className="text-[10px] ml-1 animate-pulse">↑</span>}{row.status === 'low' && <span className="text-[10px] ml-1">↓</span>}
                </td>
                <td className="py-2 px-4 text-center text-[10px] text-blue-400/40 italic">{row.unit}</td>
                <td className="py-2 px-4 text-center">
                  {row.status === 'high' && <span className="text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">偏高</span>}
                  {row.status === 'low' && <span className="text-[9px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-bold">偏低</span>}
                  {!row.status && <span className="text-[9px] text-blue-400/30">正常</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between text-[10px] text-blue-400/30 pt-2 italic">
        <span>检验医师：吴医生</span><span>报告时间：{item.date}</span>
      </div>
    </TechModalLayout>
  );
};

const MedicineModal = ({ item, onClose }) => {
  return (
    <TechModalLayout title="药耗处方单" hospital={item.hospital} onClose={onClose}>
      <InfoGrid data={{ '姓名': '张伟', '性别': '男', '开具时间': item.date, '处方类型': '西药/耗材', '病人ID': 'P88001235' }} />
      <div className="mt-2 border border-blue-500/20 rounded-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="sticky top-0 z-10 bg-[#061226]">
            <tr className="bg-blue-500/10 text-blue-400/80 border-b border-blue-500/20 font-bold">
              <th className="py-2.5 px-4">药品/耗材名称</th>
              <th className="py-2.5 px-4 text-center">用法用量</th>
              <th className="py-2.5 px-4 text-center">数量</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-500/10">
            {item.items?.map((row, i) => (
              <tr key={i} className="hover:bg-blue-500/5 transition-colors">
                <td className="py-2 px-4">
                  <div className="text-slate-200 text-[11px] font-bold">{row.name}</div>
                </td>
                <td className="py-2 px-4 text-center text-blue-100/70 font-mono text-[11px]">{row.dose}</td>
                <td className="py-2 px-4 text-center text-blue-100/70 font-mono text-[11px]">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between text-[10px] text-blue-400/30 pt-2 italic">
        <span>开具医师：李医生</span><span>执行时间：{item.date}</span>
      </div>
    </TechModalLayout>
  );
};

const GlowOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* 1. 径向渐变：从中心的深蓝色向边缘的黑色过渡 */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#001a3d_0%,_#000814_100%)]" />

    {/* 3. 科技网格：微弱的点状网格背景 */}
    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]" />
  </div>
);

export default function App() {
  const [selectedPatient, setSelectedPatient] = useState(patientList[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [showDicom, setShowDicom] = useState(false);
  const [viewMode, setViewMode] = useState('detail'); // 'detail' or 'full'
  const [recordTab, setRecordTab] = useState('outpatient');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [expandedLabIds, setExpandedLabIds] = useState(new Set());
  const toggleLabExpansion = (id) => {
    setExpandedLabIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const [expandedMedicineIds, setExpandedMedicineIds] = useState(new Set());
  const toggleMedicineExpansion = (id) => {
    setExpandedMedicineIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const [isVizExpanded, setIsVizExpanded] = useState(false);
  const [isRecordsExpanded, setIsRecordsExpanded] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientDrop, setShowPatientDrop] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [collapsedHealth, setCollapsedHealth] = useState(true);
  const [collapsedChronic, setCollapsedChronic] = useState(true);

  const headerFilteredPatients = useMemo(() => {
    return patientList.filter(p =>
      p.name.includes(patientSearch) || p.id.includes(patientSearch)
    );
  }, [patientSearch]);

  const time = currentTime.toLocaleTimeString([], { hour12: false });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredPatients = useMemo(() => {
    return patientList.filter(p =>
      p.name.includes(searchQuery) || p.id.includes(searchQuery)
    );
  }, [searchQuery]);

  const renderModal = () => {
    if (!activeModal) return null;
    const { type, item } = activeModal;
    switch (type) {
      case 'outpatient': return <OutpatientModal item={item} onClose={() => setActiveModal(null)} />;
      case 'inpatient': return <InpatientModal item={item} onClose={() => setActiveModal(null)} />;
      case 'exam': return <ExamReportModal item={item} onClose={() => setActiveModal(null)} />;
      case 'lab': return <LabReportModal item={item} onClose={() => setActiveModal(null)} />;
      case 'medicine': return <MedicineModal item={item} onClose={() => setActiveModal(null)} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-transparent text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      <GlowOverlay />
      {/* Top Navigation Bar */}
      <header className="relative flex justify-between items-center mb-2 z-[300] px-6 py-4 shrink-0">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Radar className="text-blue-400 animate-spin-slow" size={32} />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]" style={{ textShadow: '0 0 30px rgba(59,130,246,0.3)' }}>健康数据共享中心</h1>
            <div className="h-5 w-[2px] bg-gradient-to-b from-transparent via-blue-400/60 to-transparent" />
            <span className="text-lg font-medium tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-blue-300/90 via-cyan-200/80 to-blue-400/70 uppercase">参保人全息视图</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-2xl px-3 backdrop-blur-md w-48 focus-within:border-blue-400/50 focus-within:bg-blue-500/15 transition-all duration-300" style={{ height: '40px' }}>
              <Search size={13} className="text-blue-400/50 shrink-0" />
              <input type="text" value={patientSearch}
                onChange={e => { setPatientSearch(e.target.value); setShowPatientDrop(true); }}
                onFocus={() => setShowPatientDrop(true)}
                onBlur={() => setTimeout(() => setShowPatientDrop(false), 200)}
                placeholder="搜索患者..."
                className="bg-transparent text-white text-xs placeholder-blue-400/40 outline-none w-full font-mono tracking-wide" />
              {patientSearch && <button onClick={() => { setPatientSearch(''); setShowPatientDrop(false); }} className="text-blue-400/40 hover:text-blue-400 transition-colors shrink-0"><X size={12} /></button>}
            </div>
            {showPatientDrop && headerFilteredPatients.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[#061226] border border-blue-400/30 rounded overflow-hidden z-[200] shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
                <div className="px-3 py-2 border-b border-blue-500/20"><span className="text-[9px] text-blue-400/50 font-bold uppercase tracking-widest">参保人列表</span></div>
                {headerFilteredPatients.map((p, i) => (
                  <div key={i} onMouseDown={() => { setSelectedPatient(p); setPatientSearch(''); setShowPatientDrop(false); }}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors border-b border-blue-500/10 last:border-0 ${selectedPatient?.name === p.name ? 'bg-blue-500/15' : 'hover:bg-blue-500/10'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-xs font-bold shrink-0">{p.name[0]}</div>
                      <div><div className="text-white text-sm font-bold">{p.name}</div><div className="text-slate-500 text-[10px] font-mono">{p.id}</div></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[10px]">{p.gender} / {p.age}岁</span>
                      <span className="text-[9px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl px-3 backdrop-blur-md flex items-center" style={{ height: '40px' }}>
            <div className="text-base font-bold font-mono text-white tracking-widest tabular-nums">{time}</div>
          </div>
          <button className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400/70 transition-all shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            <User size={15} />
          </button>
        </div>
      </header>
      <div className="relative px-6 mb-4 z-[300]">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/35 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-blue-400/60 blur-sm" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Sidebar - Patient Context */}
        <aside className="w-[320px] flex flex-col gap-4 shrink-0 max-h-full overflow-y-auto custom-scrollbar">
          {/* Patient Profile Card */}
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-5 relative backdrop-blur-md">
            <HUDCorners />
            <p className="absolute top-5 right-5 text-[11px] font-mono text-blue-400/60 tracking-tight bg-blue-500/10 px-2 py-1 rounded-md">{selectedPatient?.id || '—'}</p>
            <div className="flex gap-4 mb-3">
              <div className="relative w-14 h-14 rounded bg-blue-500/5 border border-blue-400/30 p-1 flex items-center justify-center text-blue-400/60 shrink-0"><User size={32} strokeWidth={1.5} /></div>
              <div className="flex flex-col justify-center h-14">
                <h2 className="text-3xl font-bold text-white tracking-tight">{selectedPatient?.name || '—'}</h2>
                <span className="text-sm text-slate-400 font-medium">{selectedPatient ? `常州 · ${selectedPatient.gender} · ${selectedPatient.age}岁` : ''}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {[
                { icon: '❤️', label: '高血压 III级', color: 'border-red-500/25 bg-red-500/8 text-red-300' },
                { icon: '⭐', label: '特药备案', color: 'border-yellow-500/25 bg-yellow-500/8 text-yellow-300' },
                { icon: '✈️', label: '异地就医', color: 'border-blue-500/25 bg-blue-500/8 text-blue-300' },
                { icon: '✓', label: '签约医生', color: 'border-green-500/25 bg-green-500/8 text-green-300' },
              ].map((tag, i) => (
                <div key={i} className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded border ${tag.color} text-center`}>
                  <span className="text-sm leading-none">{tag.icon}</span>
                  <span className="text-[9px] font-bold leading-tight">{tag.label}</span>
                </div>
              ))}
            </div>

            {/* Balance cards */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="relative bg-[#061a2e] border border-blue-500/20 rounded p-3 overflow-hidden">
                <div className="absolute right-1.5 bottom-1.5 opacity-[0.07] pointer-events-none"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-blue-300"><rect x="2" y="5" width="20" height="14" rx="2" /></svg></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">个人账户余额</p>
                <p className="flex items-baseline gap-1 font-black font-mono leading-none">
                  <span className="text-blue-400/70 text-base">¥</span>
                  <span className="text-xl text-white">5,240</span>
                  <span className="text-blue-400/60 text-sm font-bold">.50</span>
                </p>
              </div>
              <div className="relative bg-[#061a2e] border border-blue-500/20 rounded p-3 overflow-hidden">
                <div className="absolute right-1.5 bottom-1.5 opacity-[0.07] pointer-events-none"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-blue-300"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" /></svg></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">本年统筹支付</p>
                <p className="flex items-baseline gap-1 font-black font-mono leading-none">
                  <span className="text-blue-400/70 text-base">¥</span>
                  <span className="text-xl text-white">1,850</span>
                  <span className="text-blue-400/60 text-sm font-bold">.00</span>
                </p>
              </div>
            </div>

            {/* 查看完整档案 button — toggles health summary & chronic disease */}
            <button
              onClick={() => setShowFullProfile(v => !v)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2 group"
            >
              {showFullProfile ? '收起档案' : '查看完整档案'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFullProfile ? 'rotate-180' : ''}`} />
            </button>

            {showFullProfile && (
              <div className="space-y-2.5 mt-4">
                {/* 健康摘要 */}
                <div className="bg-blue-900/25 rounded-md border border-blue-500/20 overflow-hidden">
                  <div className="flex items-center gap-2 text-blue-400/80 p-3.5">
                    <HeartPulse size={14} /><span className="text-sm font-bold tracking-wider uppercase">健康摘要</span>
                  </div>
                  <div className="px-4 pb-4 border-t border-blue-500/15">
                    <div className="space-y-1.5 text-[11px] mt-3 mb-3">
                      <div className="flex items-center"><span className="text-slate-500 mr-2 w-10 shrink-0">家族史</span><span className="text-slate-200">高血压家族史</span></div>
                      <div className="flex items-center"><span className="text-slate-500 mr-2 w-10 shrink-0">过敏史</span><span className="text-red-400 font-bold">青霉素过敏</span></div>
                      <div className="flex items-center"><span className="text-slate-500 mr-2 w-10 shrink-0">手术史</span><span className="text-slate-200">2023 结肠息肉切除术</span></div>
                    </div>
                    <div className="pt-2.5 border-t border-blue-500/15">
                      <div className="flex items-center gap-1.5 text-blue-400/70 mb-2"><Stethoscope size={12} /><span className="text-[10px] font-bold tracking-wider uppercase">家庭医生签约</span></div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center"><span className="text-slate-500 mr-2 w-14 shrink-0">签约医生</span><span className="text-slate-200">许医生</span><span className="ml-2 text-[9px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">履约中</span></div>
                        <div className="flex items-center"><span className="text-slate-500 mr-2 w-14 shrink-0">签约机构</span><span className="text-slate-200">华泾社区卫生服务中心</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 慢病管理 */}
                <div className="bg-blue-900/25 rounded-md border border-blue-500/20 overflow-hidden">
                  <div className="flex items-center gap-2 text-blue-400/80 p-3.5">
                    <Target size={14} /><span className="text-xs font-bold tracking-wider uppercase">慢病管理</span>
                  </div>
                  <div className="px-4 pb-4 border-t border-blue-500/15 space-y-4 pt-3">
                    <div>
                      <h5 className="text-[10px] text-blue-300/80 font-bold mb-2 flex items-center justify-between"><span>高血压</span><span className="text-[9px] text-blue-500 font-normal">三级高血压</span></h5>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[['三级管理', '管理等级'], ['一级高...', '血压分级'], ['高危', '危险等级']].map(([v, l]) => (
                          <div key={l} className="flex flex-col bg-blue-500/10 border border-blue-500/20 rounded-md overflow-hidden text-center">
                            <div className="py-1 px-0.5 text-[9px] text-white bg-blue-400/20 border-b border-blue-500/20 font-medium">{v}</div>
                            <div className="py-1 text-[8px] text-blue-400/60 uppercase scale-90">{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Insurance Archive Panel (Replaced Vital Signs) */}
          <InsuranceArchive />
        </aside>

        {/* Center - Visualization & Records */}
        <section className={`h-full flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${isRecordsExpanded ? 'flex-0 w-0 opacity-0' : 'flex-1'}`}>
          {/* Top Visualization Area */}
          <div className={`relative transition-all duration-500 ease-in-out ${isVizExpanded ? 'absolute inset-0 z-40 bg-[#020617]' : 'flex-1 min-h-0'}`}>
            {/* Video Visualization */}
            <div className="w-full h-full bg-blue-950/10 border border-blue-500/20 rounded-2xl relative overflow-hidden group">
              <HUDCorners />
              <div className="w-full h-full flex items-center justify-center">
                <BodyAnnotation
                  bodyImageSrc="/body.png"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
              </div>
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-lg p-3 w-48">
                  <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">实时体征监测</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse size={14} className="text-red-400/70 shrink-0" />
                      <div className="text-xs text-blue-100 leading-tight">
                        <span className="text-blue-400/60 text-[9px]">血压</span><br />
                        <span className="font-mono font-bold">128/82</span> <span className="text-blue-400/50">mmHg</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets size={14} className="text-green-400/70 shrink-0" />
                      <div className="text-xs text-blue-100 leading-tight">
                        <span className="text-blue-400/60 text-[9px]">血糖</span><br />
                        <span className="font-mono font-bold">5.8</span> <span className="text-blue-400/50">mmol/L</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FlaskConical size={14} className="text-yellow-400/70 shrink-0" />
                      <div className="text-xs text-blue-100 leading-tight">
                        <span className="text-blue-400/60 text-[9px]">血脂</span><br />
                        <span className="font-mono font-bold">4.2</span> <span className="text-blue-400/50">mmol/L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => setIsVizExpanded(!isVizExpanded)}
                  className="p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 transition-all"
                >
                  <Move className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom AI Insights Area (Formerly Medical Records Center position) */}
          {!isVizExpanded && (
            <div className="h-[210px] bg-blue-950/20 border border-blue-500/30 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden backdrop-blur-md shrink-0">
              <HUDCorners />
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                AI 辅助诊断中心
              </h3>

              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex flex-col justify-center hover:bg-blue-500/15 transition-colors">
                  <div className="text-[10px] text-blue-400/60 font-bold mb-2 uppercase tracking-wider">健康评分 (Health Score)</div>
                  <div className="flex items-end gap-2">
                    <div className="text-4xl font-bold text-white font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">72</div>
                    <div className="text-xs text-yellow-500 mb-1 flex items-center">
                      <ChevronDown className="w-3 h-3" /> 5%
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-blue-500/20 rounded-full mt-3 overflow-hidden">
                    <div className="w-[72%] h-full bg-gradient-to-r from-yellow-500 to-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex flex-col justify-center hover:bg-blue-500/15 transition-colors">
                  <div className="text-[10px] text-blue-400/60 font-bold mb-3 uppercase tracking-wider">风险预警评估</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-100">心血管风险</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold">高风险</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-100">代谢系统风险</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold">中风险</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-600/20 border border-blue-500/40 rounded-xl flex flex-col justify-center hover:bg-blue-600/25 transition-colors">
                  <div className="text-[10px] text-blue-300 font-bold mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    智能诊疗建议
                  </div>
                  <p className="text-xs text-blue-100/90 leading-relaxed italic">
                    "根据近期生化指标，LDL-C水平偏高，建议严格低脂饮食，并考虑调整他汀类药物剂量。心率波动尚在正常范围，建议增加有氧运动..."
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right Sidebar - Medical Records Center & Vital Signs */}
        <aside className={`h-full flex flex-col gap-4 shrink-0 transition-all duration-500 ease-in-out ${isVizExpanded && !isRecordsExpanded ? 'w-0 opacity-0 overflow-hidden' : isRecordsExpanded ? 'flex-1' : 'w-[450px]'}`}>
          {/* Medical Records Center */}
          <div className="flex-1 bg-blue-950/20 border border-blue-500/30 rounded-2xl flex flex-col overflow-hidden relative backdrop-blur-md">
            <HUDCorners />
            <div className="flex items-center justify-between p-4 pb-0 mb-5">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Database className="w-4 h-4" />
                临床诊疗中心
              </h3>
              <button
                onClick={() => setIsRecordsExpanded(!isRecordsExpanded)}
                className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded text-blue-400 transition-all"
              >
                <Move className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex bg-[#020817]/60 p-1 rounded-xl border border-blue-500/20 mx-4 mb-2 relative">
              {[
                { id: 'outpatient', label: '门诊', icon: Stethoscope },
                { id: 'inpatient', label: '住院', icon: Hospital },
                { id: 'exam', label: '检查', icon: Maximize2 },
                { id: 'lab', label: '检验', icon: Microscope },
                { id: 'medicine', label: '药耗', icon: Pill },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRecordTab(tab.id)}
                  className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold rounded-lg transition-colors z-10 ${recordTab === tab.id ? 'text-white' : 'text-blue-400/50 hover:text-blue-400'
                    }`}
                >
                  <tab.icon className={`w-3.5 h-3.5 transition-transform ${recordTab === tab.id ? 'scale-110' : ''}`} />
                  {tab.label}
                  {recordTab === tab.id && (
                    <motion.div
                      layoutId="recordTabBackground"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] z-[-1]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Subheader: time range & count - MODIFIED */}
            {(() => {
              const filtered = allRecords.filter(r => r.type === recordTab);
              const tabLabels: Record<string, string> = { outpatient: '门诊记录', inpatient: '住院记录', exam: '检查记录', lab: '检验记录', medicine: '药耗记录' };
              return (
                <div className="flex items-center justify-between px-4 mb-2 text-blue-100 font-semibold tracking-widest text-xs uppercase">
                  <span>近三月 {tabLabels[recordTab]}</span>
                  <span>数量: <span className="text-blue-300 font-bold">{filtered.length}</span></span>
                </div>
              );
            })()}

            <div className="flex-1 overflow-y-auto px-4 pb-3 custom-scrollbar">
              {(() => {
                const filtered = allRecords.filter(r => r.type === recordTab);
                if (filtered.length === 0) {
                  return (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 py-10">
                      <Database className="w-8 h-8 mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">暂无记录</span>
                    </div>
                  );
                }
                return (
                  <div className="relative">
                    {/* Timeline vertical line */}
                    <div className="absolute left-[5px] top-3 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent" />

                    {filtered.map((record, idx) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative pl-6 pb-5 last:pb-0"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-[6px] w-[11px] h-[11px] rounded-full border-2 border-cyan-400/80 bg-[#0a1628] z-10" />
                        <div className="absolute left-[2px] top-[9px] w-[7px] h-[7px] rounded-full bg-cyan-400/60 animate-pulse z-10" />

                        {/* Date & hospital header */}
                        <div className="flex items-center gap-3 mb-2 text-[11px]">
                          <span className="text-cyan-400/90 font-mono font-medium">{record.date}</span>
                          {record.hospital && <span className="text-blue-400/50">{record.hospital}</span>}
                        </div>

                        {/* Card - FULLY REFACTORED */}
                        <div
                          className="bg-gradient-to-br from-[#0a1628]/90 to-[#0c1a2f]/90 border border-blue-500/20 rounded-lg p-3 hover:border-blue-400/40 hover:bg-[#0d1d35]/90 transition-all cursor-pointer group shadow-lg hover:shadow-blue-500/10"
                          onClick={() => record.type !== 'lab' && setActiveModal({ type: record.type, item: record })}
                        >
                          {/* Header with Icon, Title, and Tags */}
                          <div className="flex items-start justify-between gap-2 mb-2" onClick={() => setActiveModal({ type: record.type, item: record })}>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-blue-100 group-hover:text-cyan-300 transition-colors leading-snug">
                              {record.type === 'outpatient' && <Stethoscope size={14} className="text-blue-400/70" />}
                              {record.type === 'inpatient' && <Hospital size={14} className="text-purple-400/70" />}
                              {record.type === 'exam' && <Maximize2 size={14} className="text-emerald-400/70" />}
                              {record.type === 'lab' && <Microscope size={14} className="text-orange-400/70" />}
                              {record.type === 'medicine' && <Pill size={14} className="text-rose-400/70" />}
                              {record.name}
                            </h4>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {record.type === 'outpatient' && (
                                <span className="text-[9px] px-2 py-0.5 rounded border border-blue-400/40 text-blue-300 bg-blue-500/10 font-bold">门诊</span>
                              )}
                              {record.type === 'inpatient' && (
                                <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${record.result ? 'border-green-400/40 text-green-300 bg-green-500/10' : 'border-yellow-400/40 text-yellow-300 bg-yellow-500/10'}`}>
                                  {record.result ? '已出院' : '住院中'}
                                </span>
                              )}
                              {record.type === 'exam' && (
                                <span className="text-[9px] px-2 py-0.5 rounded border border-emerald-400/40 text-emerald-300 bg-emerald-500/10 font-bold">{record.dept || '检查'}</span>
                              )}
                              {(() => {
                                if (record.type === 'lab') {
                                  const abnormalCount = record.metrics?.filter((m: any) => m.flag).length || 0;
                                  return (
                                    <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${abnormalCount > 0 ? 'border-red-400/40 text-red-300 bg-red-500/10' : 'border-green-400/40 text-green-300 bg-green-500/10'}`}>
                                      {abnormalCount > 0 ? `${abnormalCount}项异常` : '全部正常'}
                                    </span>
                                  );
                                }
                                return null;
                              })()}
                              {record.type === 'medicine' && (
                                <span className="text-[9px] px-2 py-0.5 rounded border border-rose-400/40 text-rose-300 bg-rose-500/10 font-bold">药耗</span>
                              )}
                            </div>
                          </div>

                          {/* Body with Concise Info */}
                          <div className="border-t border-blue-500/10 pt-2 text-xs text-blue-200/80 space-y-1.5">
                            {record.type === 'outpatient' && (
                              <div><span className="text-blue-400/60 mr-2">诊断:</span><span>{record.diagnosis || record.desc}</span></div>
                            )}
                            {record.type === 'inpatient' && (
                              <div><span className="text-blue-400/60 mr-2">主要诊断:</span><span>{record.process}</span></div>
                            )}
                            {record.type === 'exam' && (
                              <div className="truncate"><span className="text-blue-400/60 mr-2">结论:</span><span title={record.desc}>{record.desc}</span></div>
                            )}

                            {/* LAB RECORD - REFACTORED */}
                            {record.type === 'lab' && (() => {
                              const isExpanded = expandedLabIds.has(record.id);
                              const abnormalMetrics = record.metrics?.filter((m: any) => m.flag) || [];
                              const normalMetrics = record.metrics?.filter((m: any) => !m.flag) || [];

                              if (abnormalMetrics.length === 0 && normalMetrics.length === 0) {
                                return <div className="text-blue-300/50">无检验指标</div>;
                              }

                              const visibleNormalCount = abnormalMetrics.length === 0 ? 1 : 0;
                              const initiallyVisibleMetrics = [...abnormalMetrics, ...normalMetrics.slice(0, visibleNormalCount)];
                              const hiddenMetrics = normalMetrics.slice(visibleNormalCount);

                              return (
                                <div>
                                  <div className="flex flex-col gap-1">
                                    {initiallyVisibleMetrics.map((m: any, i: number) => (
                                      <div key={i} className={`flex justify-between items-center p-1.5 rounded-md text-[11px] ${m.flag ? 'bg-red-500/5 hover:bg-red-500/10' : 'bg-blue-500/5 hover:bg-blue-500/10'}`}>
                                        <span className={m.flag ? 'text-red-300/90' : 'text-blue-300/70'}>{m.label}</span>
                                        <span className={`font-mono font-bold ${m.flag ? 'text-red-200' : 'text-blue-200'}`}>{m.value} {m.unit} {m.flag === 'high' ? '↑' : m.flag === 'low' ? '↓' : ''}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {hiddenMetrics.length > 0 && (
                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                          animate={{ height: 'auto', opacity: 1, marginTop: '4px' }}
                                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="flex flex-col gap-1 pt-1 border-t border-blue-500/10">
                                            {hiddenMetrics.map((m: any, i: number) => (
                                              <div key={i} className="flex justify-between items-center bg-blue-500/5 hover:bg-blue-500/10 p-1.5 rounded-md text-[11px]">
                                                <span className="text-blue-300/70">{m.label}</span>
                                                <span className="font-mono font-bold text-blue-200">{m.value} {m.unit}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  )}

                                  {hiddenMetrics.length > 0 && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); toggleLabExpansion(record.id); }}
                                      className="w-full text-center mt-2 text-[10px] text-blue-400/60 hover:text-blue-300 font-bold flex items-center justify-center gap-1"
                                    >
                                      {isExpanded ? '收起' : `展开剩余 ${hiddenMetrics.length} 项指标`}
                                      <ChevronUp className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                  )}
                                </div>
                              );
                            })()}

                            {/* MEDICINE RECORD - REFACTORED */}
                            {record.type === 'medicine' && (() => {
                              const isExpanded = expandedMedicineIds.has(record.id);
                              const items = record.items || [];
                              if (items.length === 0) {
                                return <div className="text-blue-300/50">无药耗记录</div>;
                              }

                              const visibleItems = isExpanded ? items : items.slice(0, 2);
                              const hiddenCount = items.length - visibleItems.length;

                              return (
                                <div>
                                  <div className="flex flex-col gap-1">
                                    {visibleItems.map((item: any, i: number) => (
                                      <div key={i} className="flex justify-between items-center bg-blue-500/5 hover:bg-blue-500/10 p-1.5 rounded-md text-[11px]">
                                        <span className="text-blue-300/90">{item.name}</span>
                                        <span className="font-mono font-bold text-blue-200">x{item.count}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {hiddenCount > 0 && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); toggleMedicineExpansion(record.id); }}
                                      className="w-full text-center mt-2 text-[10px] text-blue-400/60 hover:text-blue-300 font-bold flex items-center justify-center gap-1"
                                    >
                                      展开剩余 {hiddenCount} 项
                                      <ChevronUp className={`w-3 h-3 transition-transform`} />
                                    </button>
                                  )}

                                  {isExpanded && items.length > 2 && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); toggleMedicineExpansion(record.id); }}
                                      className="w-full text-center mt-2 text-[10px] text-blue-400/60 hover:text-blue-300 font-bold flex items-center justify-center gap-1"
                                    >
                                      收起
                                      <ChevronUp className={`w-3 h-3 transition-transform rotate-180`} />
                                    </button>
                                  )}
                                </div>
                              );
                            })()}
                          </div>

                          {/* Action buttons (only for specific types) */}
                          {(record.type === 'exam' || record.type === 'inpatient') && (
                            <div className="flex flex-wrap gap-1.5 mt-3 border-t border-blue-500/10 pt-2">
                              {record.type === 'inpatient' && ['入院记录', '首次病程', '出院小结'].map((btn) => (
                                <button key={btn} className="text-[9px] px-2.5 py-1 rounded border border-purple-400/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-colors font-medium">
                                  {btn}
                                </button>
                              ))}
                              {record.type === 'exam' && (
                                <>
                                  <button className="text-[9px] px-2.5 py-1 rounded border border-emerald-400/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors font-medium flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    查看报告
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setShowDicom(true); }}
                                    className="text-[9px] px-2.5 py-1 rounded border border-emerald-400/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors font-medium flex items-center gap-1"
                                  >
                                    <Monitor className="w-3 h-3" />
                                    调阅影像
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

        </aside>
      </main>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {renderModal()}
        {showDicom && (
          <DicomViewer
            onClose={() => setShowDicom(false)}
            time={currentTime.toLocaleTimeString()}
            patientSearch={searchQuery}
            setPatientSearch={setSearchQuery}
            filteredPatients={filteredPatients}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
          />
        )}
      </AnimatePresence>

      {/* Footer / Status Bar */}
      <footer className="h-8 border-t border-blue-500/10 bg-[#020817] flex items-center justify-between px-6 text-[10px] text-blue-400/30 font-mono shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            系统运行正常 (Secure Node 08 Active)
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3" />
            数据同步: 2024-05-20 14:32:15
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3" />
            加密等级: AES-256-GCM
          </div>
          <div>© 2024 HEALTH DATA EXCHANGE CENTER</div>
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
