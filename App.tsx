
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
import { getSessionInsights } from './services/geminiService';
import { 
  User, 
  ClipboardList, 
  Plus, 
  Trash2, 
  Save, 
  History as HistoryIcon, 
  Cpu, 
  Award,
  Calendar,
  Download,
  Edit2,
  XCircle,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
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
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

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
      alert(lang === 'es' ? 'No hay actividades para guardar' : 'No activities to save');
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
    alert(lang === 'es' ? 'Sesión guardada en el historial!' : 'Session saved to history!');
  };

  const loadSession = (record: SessionRecord) => {
    setCoach(record.coach);
    setSession(record.session);
    setActivities(record.activities);
    setShowHistory(false);
    setAiInsights(null);
  };

  const registerActivity = () => {
    if (!currentActivity.title.trim()) {
      alert(lang === 'es' ? 'Por favor introduce un título para la actividad' : 'Please enter an activity title');
      return;
    }

    if (isEditing) {
      setActivities(activities.map(a => a.id === currentActivity.id ? currentActivity : a));
      setIsEditing(false);
    } else {
      const newActivity = { ...currentActivity, id: Math.random().toString(36).substr(2, 9) };
      setActivities([...activities, newActivity]);
    }

    // Reset Form
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
    if (isEditing && currentActivity.id === id) {
      cancelEdit();
    }
  };

  const toggleOption = (category: 'practiceOrganization' | 'instruction' | 'feedback', option: string) => {
    const currentList = currentActivity[category];
    const updated = currentList.includes(option)
      ? currentList.filter(o => o !== option)
      : [...currentList, option];
    setCurrentActivity({ ...currentActivity, [category]: updated });
  };

  const handleAiAnalysis = async () => {
    if (activities.length === 0) return;
    setIsAiLoading(true);
    const insights = await getSessionInsights({ coach, session, activities, id: 'temp', createdAt: '' }, lang);
    setAiInsights(insights);
    setIsAiLoading(false);
  };

  const exportToCSV = () => {
    if (activities.length === 0) return;

    const practiceKeys = Object.keys(t.options.practice);
    const instructionKeys = Object.keys(t.options.instruction);
    const feedbackKeys = Object.keys(t.options.feedback);

    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Headers: Title + Every specific variable
    const headers = [
      t.activityTitle,
      ...practiceKeys.map(k => `Org: ${t.options.practice[k]}`),
      ...instructionKeys.map(k => `Inst: ${t.options.instruction[k]}`),
      ...feedbackKeys.map(k => `Feed: ${t.options.feedback[k]}`)
    ];
    csvContent += headers.map(h => `"${h}"`).join(",") + "\n";
    
    // Rows
    activities.forEach(a => {
      const row = [
        `"${a.title}"`,
        ...practiceKeys.map(k => a.practiceOrganization.includes(k) ? "1" : "0"),
        ...instructionKeys.map(k => a.instruction.includes(k) ? "1" : "0"),
        ...feedbackKeys.map(k => a.feedback.includes(k) ? "1" : "0")
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `session_pedagogical_data_${session.date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">{t.title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSelector current={lang} onSelect={setLang} />
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}
              title={t.history}
            >
              <HistoryIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-8">
        {showHistory ? (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <HistoryIcon className="w-6 h-6 mr-2 text-blue-600" />
                {t.history}
              </h2>
              <button onClick={() => setShowHistory(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
                {lang === 'es' ? 'Cerrar Historial' : 'Close History'}
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-center py-12 text-slate-400">{t.noHistory}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map(record => (
                  <div key={record.id} className="p-5 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 text-lg">{record.coach.name}</p>
                        <div className="flex items-center text-sm text-slate-500 space-x-3">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {record.session.date}</span>
                          <span className="flex items-center"><Award className="w-3 h-3 mr-1"/> {t.levels[record.session.playerLevel]}</span>
                        </div>
                        <p className="text-xs text-slate-400 pt-1">{record.activities.length} {t.registeredActivities.toLowerCase()}</p>
                      </div>
                      <button 
                        onClick={() => loadSession(record)}
                        className="flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-all"
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
            {/* Metadata Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  {t.coachSection}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.name}</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={coach.name}
                      onChange={e => setCoach({...coach, name: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.age}</label>
                      <input 
                        type="number" 
                        value={coach.age}
                        onChange={e => setCoach({...coach, age: e.target.value ? Number(e.target.value) : ''})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.certification}</label>
                      <select 
                        value={coach.certification}
                        onChange={e => setCoach({...coach, certification: e.target.value as Certification})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {t.certifications.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  {t.sessionSection}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.date}</label>
                    <input 
                      type="date" 
                      value={session.date}
                      onChange={e => setSession({...session, date: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.numPlayers}</label>
                      <input 
                        type="number" 
                        value={session.numPlayers}
                        onChange={e => setSession({...session, numPlayers: e.target.value ? Number(e.target.value) : ''})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.playerLevel}</label>
                      <select 
                        value={session.playerLevel}
                        onChange={e => setSession({...session, playerLevel: e.target.value as PlayerLevel})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {(Object.keys(t.levels) as PlayerLevel[]).map(lvl => <option key={lvl} value={lvl}>{t.levels[lvl]}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form Area */}
            <section className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-6 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Plus className="w-32 h-32" />
              </div>
              
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-800 flex items-center">
                  <Plus className="w-7 h-7 mr-2 text-blue-600" />
                  {isEditing ? t.updateActivity : t.activitySection}
                </h2>
                {isEditing && (
                  <button onClick={cancelEdit} className="text-red-500 flex items-center text-sm font-bold">
                    <XCircle className="w-4 h-4 mr-1" /> {t.cancelEdit}
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">{t.activityTitle}</label>
                  <input 
                    type="text"
                    value={currentActivity.title}
                    onChange={e => setCurrentActivity({...currentActivity, title: e.target.value})}
                    placeholder={lang === 'es' ? 'Nombre del ejercicio...' : 'Exercise name...'}
                    className="w-full px-5 py-3 text-lg bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">{t.practiceOrg}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.practice).map(([key, label]) => (
                        <OptionButton 
                          key={key} label={label} 
                          selected={currentActivity.practiceOrganization.includes(key)} 
                          onClick={() => toggleOption('practiceOrganization', key)} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.instruction}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.instruction).map(([key, label]) => (
                        <OptionButton 
                          key={key} label={label} 
                          selected={currentActivity.instruction.includes(key)} 
                          onClick={() => toggleOption('instruction', key)} 
                          variant="gray"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-green-600 uppercase tracking-widest">{t.feedback}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.options.feedback).map(([key, label]) => (
                        <OptionButton 
                          key={key} label={label} 
                          selected={currentActivity.feedback.includes(key)} 
                          onClick={() => toggleOption('feedback', key)} 
                          variant="green"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={registerActivity}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center"
                >
                  {isEditing ? <CheckCircle2 className="w-6 h-6 mr-2" /> : <Plus className="w-6 h-6 mr-2" />}
                  {isEditing ? t.updateActivity : t.addActivity}
                </button>
              </div>
            </section>

            {/* Registered Activities Table */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                  <ClipboardList className="w-6 h-6 mr-2 text-slate-400" />
                  {t.registeredActivities}
                </h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={exportToCSV}
                    disabled={activities.length === 0}
                    className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" /> {t.exportCSV}
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">{t.activityTitle}</th>
                      <th className="px-6 py-4">{t.practiceOrg}</th>
                      <th className="px-6 py-4">{t.instruction}</th>
                      <th className="px-6 py-4">{t.feedback}</th>
                      <th className="px-6 py-4 text-center">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                          {lang === 'es' ? 'Registra una actividad arriba para empezar' : 'Register an activity above to start'}
                        </td>
                      </tr>
                    ) : (
                      activities.map((act) => (
                        <tr key={act.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-700 block max-w-[150px] truncate">{act.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.practiceOrganization.map(k => (
                                <span key={k} className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                                  {t.options.practice[k]}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.instruction.map(k => (
                                <span key={k} className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                                  {t.options.instruction[k]}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {act.feedback.map(k => (
                                <span key={k} className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-600 rounded">
                                  {t.options.feedback[k]}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center space-x-2">
                              <button onClick={() => startEdit(act)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title={t.editActivity}>
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteActivity(act.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title={t.removeActivity}>
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* AI Insights Section */}
            <div className="bg-gradient-to-br from-indigo-700 to-blue-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Cpu className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                      <Cpu className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight">{t.aiAnalysis}</h2>
                      <p className="text-blue-200 text-sm font-medium">Analizando patrones pedagógicos...</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleAiAnalysis}
                    disabled={isAiLoading || activities.length === 0}
                    className={`px-8 py-3 bg-white text-blue-800 rounded-2xl font-black shadow-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all active:translate-y-0 ${isAiLoading || activities.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isAiLoading ? t.loading : t.getInsights}
                  </button>
                </div>
                {aiInsights && (
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 animate-in zoom-in-95 duration-500">
                    <div className="prose prose-invert max-w-none text-blue-50 leading-relaxed font-medium">
                      {aiInsights.split('\n').map((line, i) => (
                        <p key={i} className="mb-4">{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Persistent Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center z-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none">
        {!showHistory && (
          <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white shadow-blue-200 flex space-x-2 pointer-events-auto">
            <button 
              onClick={saveToHistory}
              className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Save className="w-5 h-5 mr-2" />
              {t.saveSession}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
