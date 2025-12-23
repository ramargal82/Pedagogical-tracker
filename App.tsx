
import React, { useState, useEffect } from 'react';
import { 
  Language, 
  CoachInfo, 
  SessionInfo, 
  ActivityData, 
  SessionRecord, 
  PlayerLevel, 
  Certification 
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
  HelpCircle
} from 'lucide-react';

const App: React.FC = () => {
  // Set English as the default language as requested
  const [lang, setLang] = useState<Language>('en');
  const t = i18n[lang];

  // Coach and Session State
  const [coach, setCoach] = useState<CoachInfo>({
    name: '',
    age: '',
    certification: 'Play & Stay'
  });

  const [session, setSession] = useState<SessionInfo>({
    date: new Date().toISOString().split('T')[0],
    numPlayers: '',
    playerLevel: 'Iniciación'
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
    if (!currentActivity.title.trim()) {
      alert(lang === 'es' ? 'Introduce un título' : lang === 'pt' ? 'Insira um título' : 'Enter a title');
      return;
    }

    if (isEditing) {
      setActivities(activities.map(a => a.id === currentActivity.id ? currentActivity : a));
      setIsEditing(false);
    } else {
      const newActivity = { ...currentActivity, id: Math.random().toString(36).substr(2, 9) };
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
    window.scrollTo({ top: 400, behavior: 'smooth' });
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
    setActivities(activities.filter(a => a.id !== id));
    if (isEditing && currentActivity.id === id) cancelEdit();
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
    
    const practiceKeys = Object.keys(t.options.practice);
    const instructionKeys = Object.keys(t.options.instruction);
    const feedbackKeys = Object.keys(t.options.feedback);

    let csvContent = "data:text/csv;charset=utf-8,";
    
    const headers = [
      t.name,
      t.age,
      t.certification,
      t.date,
      t.numPlayers,
      t.playerLevel,
      t.activityTitle,
      ...practiceKeys.map(k => `Org: ${t.options.practice[k].label}`),
      ...instructionKeys.map(k => `Inst: ${t.options.instruction[k].label}`),
      ...feedbackKeys.map(k => `Feed: ${t.options.feedback[k].label}`)
    ];
    csvContent += headers.map(h => `"${h}"`).join(",") + "\n";
    
    activities.forEach(a => {
      const row = [
        `"${coach.name}"`,
        `"${coach.age}"`,
        `"${coach.certification}"`,
        `"${session.date}"`,
        `"${session.numPlayers}"`,
        `"${t.levels[session.playerLevel]}"`,
        `"${a.title}"`,
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
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button onClick={() => setShowHelp(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <XCircle className="w-8 h-8" />
            </button>
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
              {t.methodology}
            </h3>
            <div className="space-y-4">
              {t.helpInstructions.map((instruction, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
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
        <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <ClipboardList className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">KTO: Teaching and Coaching Observation Tool</h1>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 ml-8 italic leading-tight max-w-md sm:max-w-xl">
              A practical tool by John Komar, Irfan Ismail & Jia Yi Chow, National Institute of Education, Singapore.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSelector current={lang} onSelect={setLang} />
            <button onClick={() => setShowHelp(true)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <HelpCircle className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}
            >
              <HistoryIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-8">
        {showHistory ? (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <HistoryIcon className="w-6 h-6 mr-2 text-blue-600" />
                {t.history}
              </h2>
              <button onClick={() => setShowHistory(false)} className="text-sm font-semibold text-slate-500">
                {lang === 'es' ? 'Volver' : lang === 'pt' ? 'Voltar' : 'Back'}
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-center py-12 text-slate-400">{t.noHistory}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map(record => (
                  <div key={record.id} className="p-5 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 text-lg">{record.coach.name}</p>
                        <div className="flex items-center text-sm text-slate-500 space-x-3">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {record.session.date}</span>
                          <span className="flex items-center text-xs px-2 py-0.5 bg-slate-100 rounded-full">{record.activities.length} acts</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => loadSession(record)}
                        className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FolderOpen className="w-4 h-4 mr-1.5" />
                        {t.loadSession}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  {t.coachSection}
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text" placeholder={t.name} value={coach.name}
                    onChange={e => setCoach({...coach, name: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" placeholder={t.age} value={coach.age}
                      onChange={e => setCoach({...coach, age: e.target.value ? Number(e.target.value) : ''})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                    <select 
                      value={coach.certification}
                      onChange={e => setCoach({...coach, certification: e.target.value as Certification})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    >
                      {t.certifications.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  {t.sessionSection}
                </h2>
                <div className="space-y-4">
                  <input 
                    type="date" value={session.date}
                    onChange={e => setSession({...session, date: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" placeholder={t.numPlayers} value={session.numPlayers}
                      onChange={e => setSession({...session, numPlayers: e.target.value ? Number(e.target.value) : ''})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                    <select 
                      value={session.playerLevel}
                      onChange={e => setSession({...session, playerLevel: e.target.value as PlayerLevel})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    >
                      {(Object.keys(t.levels) as PlayerLevel[]).map(lvl => <option key={lvl} value={lvl}>{t.levels[lvl]}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Area */}
            <section className="bg-white rounded-3xl shadow-xl border-2 border-blue-50 p-8 space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-800">{isEditing ? t.updateActivity : t.activitySection}</h2>
                {isEditing && <button onClick={cancelEdit} className="text-red-500 font-bold flex items-center"><XCircle className="w-5 h-5 mr-1" /> {t.cancelEdit}</button>}
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.activityTitle}</label>
                  <input 
                    type="text" value={currentActivity.title}
                    onChange={e => setCurrentActivity({...currentActivity, title: e.target.value})}
                    className="w-full px-6 py-4 text-xl bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Practice Group */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">{t.practiceOrg}</h3>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-slate-300 hover:text-blue-500 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-800 text-white text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
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
                          <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-slate-100 shadow-xl text-slate-600 text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
                            {data.definition}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instruction Group */}
                  <div className="space-y-5">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.instruction}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.instruction).map(([key, data]) => (
                        <div key={key} className="group relative">
                          <OptionButton 
                            label={data.label} selected={currentActivity.instruction.includes(key)} 
                            onClick={() => toggleOption('instruction', key)} variant="gray"
                          />
                          <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-slate-100 shadow-xl text-slate-600 text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
                            {data.definition}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Group */}
                  <div className="space-y-5">
                    <h3 className="text-xs font-black text-green-600 uppercase tracking-widest">{t.feedback}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.feedback).map(([key, data]) => (
                        <div key={key} className="group relative">
                          <OptionButton 
                            label={data.label} selected={currentActivity.feedback.includes(key)} 
                            onClick={() => toggleOption('feedback', key)} variant="green"
                          />
                          <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-slate-100 shadow-xl text-slate-600 text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
                            {data.definition}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={registerActivity}
                  className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                  {isEditing ? <CheckCircle2 className="w-6 h-6 mr-2" /> : <Plus className="w-6 h-6 mr-2" />}
                  {isEditing ? t.updateActivity : t.addActivity}
                </button>
              </div>
            </section>

            {/* Registry Table */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">{t.registeredActivities}</h2>
                <button onClick={exportToCSV} disabled={activities.length === 0} className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold disabled:opacity-30">
                  <Download className="w-4 h-4 mr-2" /> {t.exportCSV}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
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
                      <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                        {lang === 'es' ? 'Empieza registrando una actividad' : lang === 'pt' ? 'Comece registrando uma atividade' : 'Start by registering an activity'}
                      </td></tr>
                    ) : (
                      activities.map(act => (
                        <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-700">{act.title}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.practiceOrganization.map(k => <span key={k} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold">{t.options.practice[k].label}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.instruction.map(k => <span key={k} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold">{t.options.instruction[k].label}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.feedback.map(k => <span key={k} className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded font-bold">{t.options.feedback[k].label}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center space-x-1">
                              <button onClick={() => startEdit(act)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => deleteActivity(act.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Floating Action */}
      <div className="fixed bottom-0 left-0 right-0 p-8 flex justify-center pointer-events-none z-40">
        {!showHistory && (
          <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white pointer-events-auto">
            <button 
              onClick={saveToHistory}
              className="flex items-center px-10 py-4 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
            >
              <Save className="w-5 h-5 mr-3" />
              {t.saveSession}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
