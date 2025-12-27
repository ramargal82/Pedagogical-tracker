
import React, { useState, useEffect } from 'react';
import { 
  Language, 
  CoachInfo, 
  SessionInfo, 
  ActivityData, 
  SessionRecord, 
  PlayerLevel, 
  Certification,
  COUNTRIES
} from './types';
import { i18n } from './translations';
import { LanguageSelector } from './components/LanguageSelector';
import { OptionButton } from './components/OptionButton';
import { 
  User, 
  ClipboardList, 
  Plus, 
  Trash2, 
  Save, 
  History as HistoryIcon, 
  Calendar,
  Download,
  Edit2,
  XCircle,
  CheckCircle2,
  FolderOpen,
  Info,
  HelpCircle,
  Globe,
  Briefcase
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = i18n[lang];

  // Coach and Session State
  const [coach, setCoach] = useState<CoachInfo>({
    name: '',
    age: '',
    country: '',
    yearsExperience: '',
    certification: 'None'
  });

  const [session, setSession] = useState<SessionInfo>({
    date: new Date().toISOString().split('T')[0],
    numPlayers: '',
    playerLevel: 'Beginner'
  });

  // Registered Activities
  const [activities, setActivities] = useState<ActivityData[]>([]);
  
  // Current Activity Form State
  const [currentActivity, setCurrentActivity] = useState<ActivityData>({
    id: '',
    title: '',
    practiceOrganization: [],
    instruction: [],
    feedback: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pedagogical_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const saveToHistory = () => {
    if (activities.length === 0) {
      alert(lang === 'es' ? 'No hay actividades para guardar' : lang === 'pt' ? 'Sem atividades para salvar' : 'No activities to save');
      return;
    }
    const record: SessionRecord = {
      id: Math.random().toString(36).substr(2, 9),
      coach,
      session,
      activities,
      createdAt: new Date().toISOString()
    };
    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem('pedagogical_history', JSON.stringify(newHistory));
    alert(lang === 'es' ? 'Sesión guardada!' : lang === 'pt' ? 'Sessão salva!' : 'Session saved!');
  };

  const loadSession = (record: SessionRecord) => {
    setCoach(record.coach);
    setSession(record.session);
    setActivities(record.activities);
    setShowHistory(false);
  };

  const registerActivity = () => {
    if (isEditing) {
      setActivities(activities.map(a => a.id === currentActivity.id ? currentActivity : a));
      setIsEditing(false);
    } else {
      const activityLabel = lang === 'es' ? 'Actividad' : lang === 'pt' ? 'Actividade' : 'Activity';
      const autoTitle = `${activityLabel} ${activities.length + 1}`;
      const newActivity = { 
        ...currentActivity, 
        id: Math.random().toString(36).substr(2, 9),
        title: autoTitle
      };
      setActivities([...activities, newActivity]);
    }

    setCurrentActivity({
      id: '',
      title: '',
      practiceOrganization: [],
      instruction: [],
      feedback: []
    });
  };

  const startEdit = (activity: ActivityData) => {
    setCurrentActivity(activity);
    setIsEditing(true);
    const el = document.getElementById('coding-area');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentActivity({
      id: '',
      title: '',
      practiceOrganization: [],
      instruction: [],
      feedback: []
    });
  };

  const deleteActivity = (id: string) => {
    if (confirm(lang === 'es' ? '¿Borrar actividad?' : 'Delete activity?')) {
      const filtered = activities.filter(a => a.id !== id);
      const activityLabel = lang === 'es' ? 'Actividad' : lang === 'pt' ? 'Actividade' : 'Activity';
      const reindexed = filtered.map((a, idx) => ({
        ...a,
        title: `${activityLabel} ${idx + 1}`
      }));
      setActivities(reindexed);
      if (isEditing && currentActivity.id === id) cancelEdit();
    }
  };

  const toggleOption = (category: 'practiceOrganization' | 'instruction' | 'feedback', option: string) => {
    const currentList = currentActivity[category];
    const updated = currentList.includes(option)
      ? currentList.filter(o => o !== option)
      : [...currentList, option];
    setCurrentActivity({ ...currentActivity, [category]: updated });
  };

  const exportToCSV = () => {
    if (activities.length === 0) return;
    
    // Always use English for export
    const en = i18n.en;
    const practiceKeys = Object.keys(en.options.practice);
    const instructionKeys = Object.keys(en.options.instruction);
    const feedbackKeys = Object.keys(en.options.feedback);

    let csvContent = "data:text/csv;charset=utf-8,";
    
    const headers = [
      en.name, en.age, en.country, en.yearsExperience, en.certification, en.date, en.numPlayers, en.playerLevel, en.activityTitle,
      ...practiceKeys.map(k => `Org: ${en.options.practice[k].label}`),
      ...instructionKeys.map(k => `Inst: ${en.options.instruction[k].label}`),
      ...feedbackKeys.map(k => `Feed: ${en.options.feedback[k].label}`)
    ];
    csvContent += headers.map(h => `"${h}"`).join(",") + "\n";
    
    activities.forEach((a, idx) => {
      // For Activity Title, we export "Activity N"
      const activityTitleEn = `Activity ${idx + 1}`;
      
      const row = [
        `"${coach.name}"`, 
        `"${coach.age}"`, 
        `"${coach.country}"`, 
        `"${coach.yearsExperience}"`, 
        `"${en.certifications[coach.certification]}"`, 
        `"${session.date}"`, 
        `"${session.numPlayers}"`, 
        `"${en.levels[session.playerLevel]}"`, 
        `"${activityTitleEn}"`,
        ...practiceKeys.map(k => a.practiceOrganization.includes(k) ? "1" : "0"),
        ...instructionKeys.map(k => a.instruction.includes(k) ? "1" : "0"),
        ...feedbackKeys.map(k => a.feedback.includes(k) ? "1" : "0")
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    const safeCoachName = coach.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `kto_data_${safeCoachName || 'session'}_${session.date}.csv`;
    
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 md:pb-36 overflow-x-hidden">
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
            <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <XCircle className="w-8 h-8" />
            </button>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center pr-10">
              <HelpCircle className="w-6 h-6 mr-2 text-blue-600 shrink-0" />
              {t.methodology}
            </h3>
            <div className="space-y-3">
              {t.helpInstructions.map((instruction, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 md:h-24 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 md:w-6 md:h-6 text-blue-600 shrink-0" />
              <h1 className="text-sm md:text-xl font-bold text-slate-800 tracking-tight leading-tight">
                KTO: Teaching and Coaching Observation Tool
              </h1>
            </div>
            <p className="text-[9px] md:text-xs text-slate-500 mt-1 md:ml-8 italic leading-tight opacity-80">
              A practical tool by John Komar, Irfan Ismail & Jia Yi Chow, NIE, Singapore.
            </p>
          </div>
          <div className="flex items-center justify-between md:justify-end space-x-2 md:space-x-3">
            <LanguageSelector current={lang} onSelect={setLang} />
            <div className="flex space-x-1">
              <button onClick={() => setShowHelp(true)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}
              >
                <HistoryIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 md:pt-8 space-y-6 md:space-y-8">
        {showHistory ? (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center">
                <HistoryIcon className="w-6 h-6 mr-2 text-blue-600" />
                {t.history}
              </h2>
              <button onClick={() => setShowHistory(false)} className="text-sm font-semibold text-slate-500 hover:text-blue-600">
                {lang === 'es' ? 'Volver' : lang === 'pt' ? 'Voltar' : 'Back'}
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-center py-12 text-slate-400">{t.noHistory}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {history.map(record => (
                  <div key={record.id} className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800 text-base md:text-lg truncate max-w-[200px]">{record.coach.name || '---'}</p>
                      <div className="flex items-center text-xs text-slate-500 space-x-3">
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {record.session.date}</span>
                        <span className="flex items-center text-[10px] px-1.5 py-0.5 bg-slate-100 rounded-full">{record.activities.length} acts</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => loadSession(record)}
                      className="flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all w-full sm:w-auto"
                    >
                      <FolderOpen className="w-4 h-4 mr-1.5" />
                      {t.loadSession}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6">
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                  {t.coachSection}
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <input 
                      type="text" placeholder={t.name} value={coach.name}
                      onChange={e => setCoach({...coach, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <select 
                        value={coach.country}
                        onChange={e => setCoach({...coach, country: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm appearance-none"
                      >
                        <option value="">{t.country}</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l pl-2 border-slate-200">
                        <Plus className="w-3 h-3 text-slate-400 rotate-45" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <input 
                      type="number" placeholder={t.age} value={coach.age}
                      onChange={e => setCoach({...coach, age: e.target.value ? Number(e.target.value) : ''})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                    />
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input 
                        type="number" placeholder={t.yearsExperience} value={coach.yearsExperience}
                        onChange={e => setCoach({...coach, yearsExperience: e.target.value ? Number(e.target.value) : ''})}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.certification}</label>
                    <select 
                      value={coach.certification}
                      onChange={e => setCoach({...coach, certification: e.target.value as Certification})}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                    >
                      {(Object.keys(t.certifications) as Certification[]).map(c => <option key={c} value={c}>{t.certifications[c]}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6">
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                  {t.sessionSection}
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <input 
                    type="date" value={session.date}
                    onChange={e => setSession({...session, date: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.numPlayers}</label>
                      <input 
                        type="number" min="1" placeholder="1" value={session.numPlayers}
                        onChange={e => setSession({...session, numPlayers: e.target.value ? Math.max(1, Number(e.target.value)) : ''})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.playerLevel}</label>
                      <select 
                        value={session.playerLevel}
                        onChange={e => setSession({...session, playerLevel: e.target.value as PlayerLevel})}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                      >
                        {(Object.keys(t.levels) as PlayerLevel[]).map(lvl => <option key={lvl} value={lvl}>{t.levels[lvl]}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Area */}
            <section id="coding-area" className="bg-white rounded-3xl shadow-xl border border-blue-100 p-5 md:p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {isEditing ? t.updateActivity : t.activitySection}
                  </h2>
                  <span className="text-[10px] text-blue-600 font-bold tracking-widest mt-1">
                    {isEditing ? currentActivity.title : `${lang === 'es' ? 'Actividad' : lang === 'pt' ? 'Actividade' : 'Activity'} ${activities.length + 1}`}
                  </span>
                </div>
                {isEditing && (
                  <button onClick={cancelEdit} className="text-red-500 font-bold flex items-center text-sm bg-red-50 px-3 py-1.5 rounded-xl">
                    <XCircle className="w-4 h-4 mr-1" /> {t.cancelEdit}
                  </button>
                )}
              </div>

              <div className="space-y-6 md:space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                  {/* Practice Group */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.practiceOrg}</h3>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-slate-300 hover:text-blue-500 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-800 text-white text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl">
                          {t.methodology}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.practice).map(([key, data]) => (
                        <div key={key} className="group relative">
                          <OptionButton 
                            label={data.label} selected={currentActivity.practiceOrganization.includes(key)} 
                            onClick={() => toggleOption('practiceOrganization', key)} 
                          />
                          <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-slate-100 shadow-2xl text-slate-600 text-[10px] rounded-xl opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
                            {data.definition}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instruction Group */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.instruction}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.instruction).map(([key, data]) => (
                        <div key={key} className="group relative">
                          <OptionButton 
                            label={data.label} selected={currentActivity.instruction.includes(key)} 
                            onClick={() => toggleOption('instruction', key)} variant="gray"
                          />
                          <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-slate-100 shadow-2xl text-slate-600 text-[10px] rounded-xl opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
                            {data.definition}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Group */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-green-600 uppercase tracking-widest">{t.feedback}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.feedback).map(([key, data]) => (
                        <div key={key} className="group relative">
                          <OptionButton 
                            label={data.label} selected={currentActivity.feedback.includes(key)} 
                            onClick={() => toggleOption('feedback', key)} variant="green"
                          />
                          <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-slate-100 shadow-2xl text-slate-600 text-[10px] rounded-xl opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
                            {data.definition}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={registerActivity}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl md:rounded-3xl font-black text-base md:text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center border-b-4 border-blue-800"
                >
                  {isEditing ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-2" /> : <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2" />}
                  {isEditing ? t.updateActivity : t.addActivity}
                </button>
              </div>
            </section>

            {/* Registry Display */}
            <section className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-lg md:text-xl font-bold text-slate-800">{t.registeredActivities}</h2>
                <button 
                  onClick={exportToCSV} 
                  disabled={activities.length === 0} 
                  className="flex items-center px-3 md:px-4 py-2 bg-slate-800 text-white rounded-xl text-[10px] md:text-sm font-bold disabled:opacity-30 hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200"
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4 mr-2" /> {t.exportCSV}
                </button>
              </div>
              
              {/* Desktop View (Table) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-100/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">{t.activityTitle}</th>
                      <th className="px-6 py-4">{t.practiceOrg}</th>
                      <th className="px-6 py-4">{t.instruction}</th>
                      <th className="px-6 py-4">{t.feedback}</th>
                      <th className="px-6 py-4 text-center">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                        {lang === 'es' ? 'Empieza registrando una actividad' : lang === 'pt' ? 'Comece registrando uma atividade' : 'Start by registering an activity'}
                      </td></tr>
                    ) : (
                      activities.map(act => (
                        <tr key={act.id} className="hover:bg-blue-50/20 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-700 min-w-[120px]">{act.title}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.practiceOrganization.map(k => <span key={k} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold uppercase">{t.options.practice[k].label}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.instruction.map(k => <span key={k} className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase">{t.options.instruction[k].label}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.feedback.map(k => <span key={k} className="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded font-bold uppercase">{t.options.feedback[k].label}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center space-x-1">
                              <button onClick={() => startEdit(act)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title={t.editActivity}><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => deleteActivity(act.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title={t.removeActivity}><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card-based View */}
              <div className="md:hidden">
                {activities.length === 0 ? (
                  <div className="px-6 py-12 text-center text-slate-400 text-sm italic">
                     {lang === 'es' ? 'Empieza registrando una actividad' : lang === 'pt' ? 'Comece registrando uma atividade' : 'Start by registering an activity'}
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {activities.map(act => (
                      <div key={act.id} className="p-4 space-y-3 bg-white">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-800 text-sm bg-slate-100 px-2 py-0.5 rounded-lg">{act.title}</h4>
                          <div className="flex space-x-1">
                             <button onClick={() => startEdit(act)} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                             <button onClick={() => deleteActivity(act.id)} className="p-2 text-red-500 bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                           {act.practiceOrganization.length > 0 && (
                             <div className="flex flex-wrap gap-1 items-center">
                                <span className="text-[8px] font-black text-blue-400 uppercase mr-1">ORG:</span>
                                {act.practiceOrganization.map(k => <span key={k} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold">{t.options.practice[k].label}</span>)}
                             </div>
                           )}
                           {act.instruction.length > 0 && (
                             <div className="flex flex-wrap gap-1 items-center">
                                <span className="text-[8px] font-black text-slate-400 uppercase mr-1">INST:</span>
                                {act.instruction.map(k => <span key={k} className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold">{t.options.instruction[k].label}</span>)}
                             </div>
                           )}
                           {act.feedback.length > 0 && (
                             <div className="flex flex-wrap gap-1 items-center">
                                <span className="text-[8px] font-black text-green-400 uppercase mr-1">FEED:</span>
                                {act.feedback.map(k => <span key={k} className="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded font-bold">{t.options.feedback[k].label}</span>)}
                             </div>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 flex justify-center pointer-events-none z-40">
        {!showHistory && (
          <div className="bg-white/80 backdrop-blur-xl p-1.5 md:p-2 rounded-2xl shadow-2xl border border-white pointer-events-auto">
            <button 
              onClick={saveToHistory}
              className="flex items-center px-6 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 border-b-2 border-blue-800"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              {t.saveSession}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
