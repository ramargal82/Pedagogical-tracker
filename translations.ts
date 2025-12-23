
import { Translations } from './types';

export const i18n: Record<string, Translations> = {
  es: {
    title: "KTO Tracker Pro",
    coachSection: "Entrenador",
    sessionSection: "Sesión",
    activitySection: "Nueva Actividad",
    name: "Nombre",
    age: "Edad",
    certification: "Certificación",
    date: "Fecha",
    numPlayers: "Jugadores",
    playerLevel: "Nivel",
    addActivity: "Registrar Actividad",
    updateActivity: "Actualizar Actividad",
    cancelEdit: "Cancelar",
    removeActivity: "Eliminar",
    editActivity: "Editar",
    saveSession: "Guardar Sesión",
    loadSession: "Cargar",
    exportCSV: "Exportar CSV",
    history: "Historial",
    noHistory: "Vacío",
    practiceOrg: "Org. Práctica",
    instruction: "Instrucción",
    feedback: "Feedback",
    activityTitle: "Título de Actividad",
    registeredActivities: "Registro Actividades",
    actions: "Acciones",
    methodology: "Instrucciones de Uso",
    helpInstructions: [
      "Codifique las actividades durante la lección seleccionando los tres canales pedagógicos.",
      "Haga clic en 'Actualizar' cada vez que los estudiantes vayan a practicar.",
      "Cada observación representa un contenido nuevo (actividad pedagógica global).",
      "La información dada antes de que los alumnos practiquen se captura como una sola actividad global.",
      "Se excluyen instrucciones puras de organización (ej. 'poneos por parejas').",
      "Se excluye el feedback puramente motivacional (ej. elogios vacíos)."
    ],
    aiAnalysis: "Análisis IA",
    getInsights: "Obtener Insights",
    loading: "Cargando...",
    levels: {
      "Iniciación": "Iniciación",
      "Intermedio": "Intermedio",
      "Competición": "Competición",
      "Alta Competición": "Alta Competición"
    },
    certifications: ["Play & Stay", "Nivel 1", "Nivel 2", "Nivel 3"],
    options: {
      practice: {
        isolated: { label: "Habilidades aisladas", definition: "Práctica centrada en una técnica o habilidad en un entorno descontextualizado (ej. repetición sin oponente)." },
        representative: { label: "Habilidad representativa", definition: "Situaciones de aprendizaje que imitan situaciones de juego reales (ej. 1v1, 1v2)." },
        modified: { label: "Juego modificado", definition: "Simulación de juego con manipulación de restricciones (reglas, equipo)." },
        small: { label: "Espacio reducido", definition: "Juego en espacio reducido sin condiciones adicionales (ej. 5v5 fútbol reducido)." },
        regular: { label: "Juego regular", definition: "Actividad regular sin reglas específicas (ej. 5v5 baloncesto, 11v11 fútbol)." },
        repetitive: { label: "Tarea repetitiva", definition: "Repetición de un movimiento continuamente sin cambios." },
        variability: { label: "Espacio variabilidad", definition: "Permite variabilidad en el movimiento pero no es promovida directamente por el profesor." },
        space_var: { label: "Var. espacial", definition: "Variación intencionada del espacio dentro de una tarea o entre sucesivas." },
        player_var: { label: "Var. jugadores", definition: "Variación intencionada del número de jugadores oponentes." },
        equip_var: { label: "Var. equipamiento", definition: "Variación del equipamiento utilizado (pelotas, raquetas de distinto tamaño)." }
      },
      instruction: {
        prescriptive: { label: "Prescriptiva", definition: "Instrucciones de patrones de movimiento óptimos basados en investigación biomecánica." },
        analogy: { label: "Analogías", definition: "Uso de analogías para describir formas de movimiento (ej. 'lanza como un arcoíris')." },
        movement_forms: { label: "Formas mov.", definition: "Instrucción específica que se centra en un patrón de movimiento preferido." },
        outcomes: { label: "Resultados", definition: "Instrucciones que requieren centrarse en el resultado/efecto más que en la técnica." },
        oral_var: { label: "Promoción var.", definition: "Alentar a buscar soluciones de movimiento individualizadas (ej. '¡prueba otra cosa!')." }
      },
      feedback: {
        prescriptive: { label: "Prescriptivo", definition: "Feedback centrado en patrones de movimiento recomendados biomecánicamente." },
        analogy: { label: "Vía analogía", definition: "Uso de analogía para describir más que una forma de movimiento prescrita." },
        movement_forms: { label: "Sobre formas mov.", definition: "Feedback centrado en partes del cuerpo utilizadas en la acción." },
        outcomes: { label: "Sobre resultados", definition: "Feedback centrado en el efecto de la acción realizada en el entorno." },
        variability: { label: "Sobre variabilidad", definition: "Cuestionar a los alumnos sobre soluciones individualizadas que encontraron." }
      }
    }
  },
  en: {
    title: "KTO Tracker Pro",
    coachSection: "Coach",
    sessionSection: "Session",
    activitySection: "New Activity",
    name: "Name",
    age: "Age",
    certification: "Certification",
    date: "Date",
    numPlayers: "Players",
    playerLevel: "Level",
    addActivity: "Register Activity",
    updateActivity: "Update Activity",
    cancelEdit: "Cancel",
    removeActivity: "Delete",
    editActivity: "Edit",
    saveSession: "Save Session",
    loadSession: "Load",
    exportCSV: "Export CSV",
    history: "History",
    noHistory: "No records",
    practiceOrg: "Practice Org.",
    instruction: "Instruction",
    feedback: "Feedback",
    activityTitle: "Activity Title",
    registeredActivities: "Registered Activities",
    actions: "Actions",
    methodology: "Usage Instructions",
    helpInstructions: [
      "Code activities during the lesson by selecting the three pedagogical channels.",
      "Click 'Update' every time students go and practice.",
      "Each observation represents new content (global pedagogical activity).",
      "Information provided before practice is captured as a single global activity.",
      "Exclude pure organization instructions (e.g., 'get into pairs').",
      "Exclude purely motivational feedback (e.g., empty praises)."
    ],
    aiAnalysis: "AI Analysis",
    getInsights: "Get Insights",
    loading: "Loading...",
    levels: {
      "Iniciación": "Initiation",
      "Intermedio": "Intermediate",
      "Competición": "Competition",
      "Alta Competición": "High Performance"
    },
    certifications: ["Play & Stay", "Level 1", "Level 2", "Level 3"],
    options: {
      practice: {
        isolated: { label: "Isolated Skills", definition: "Practice focusing on one technique in a de-contextualized environment." },
        representative: { label: "Game Representative", definition: "Learning situations mimicking real game situations (e.g., 1v1, 1v2)." },
        modified: { label: "Modified Game", definition: "Simulation with manipulation of task constraints (rules, equipment)." },
        small: { label: "Small Sided", definition: "Small sided game without additional conditions (e.g., 5v5 soccer)." },
        regular: { label: "Regular Play", definition: "Activity without specific rules/conditions (e.g., full court play)." },
        repetitive: { label: "Repetitive Task", definition: "Repeating a movement continuously without change." },
        variability: { label: "Room for Var.", definition: "Allows variability in movement but not directly promoted by teacher." },
        space_var: { label: "Space Var.", definition: "Intentional variation of space within or between tasks." },
        player_var: { label: "Player Var.", definition: "Intentional variation of the number of opponents." },
        equip_var: { label: "Equip. Var.", definition: "Variation of equipment used (different sized balls/racquets)." }
      },
      instruction: {
        prescriptive: { label: "Prescriptive", definition: "Optimal movement patterns based on biomechanical research." },
        analogy: { label: "Use of Analogy", definition: "Using analogy rather than prescribed form (e.g., 'throw like a rainbow')." },
        movement_forms: { label: "Movement Form", definition: "Specific instruction focusing on a preferred movement pattern." },
        outcomes: { label: "Outcomes", definition: "Focus on results/effects rather than specific technique." },
        oral_var: { label: "Oral Promotion", definition: "Encourage search for individualized movement solutions." }
      },
      feedback: {
        prescriptive: { label: "Prescriptive", definition: "Feedback on optimal patterns based on biomechanical research." },
        analogy: { label: "Via Analogy", definition: "Using analogy to describe rather than prescribed movement form." },
        movement_forms: { label: "Body Forms", definition: "Feedback focusing on body parts used in the action." },
        outcomes: { label: "On Outcomes", definition: "Feedback focusing on the effect of the action on environment." },
        variability: { label: "On Variability", definition: "Questioning students on individualized solutions found." }
      }
    }
  },
  zh: {
    title: "KTO 教学追踪器",
    coachSection: "教练信息",
    sessionSection: "课程详情",
    activitySection: "新增活动",
    name: "姓名",
    age: "年龄",
    certification: "认证",
    date: "日期",
    numPlayers: "人数",
    playerLevel: "水平",
    addActivity: "登记活动",
    updateActivity: "更新活动",
    cancelEdit: "取消",
    removeActivity: "删除",
    editActivity: "编辑",
    saveSession: "保存课程",
    loadSession: "加载",
    exportCSV: "导出 CSV",
    history: "历史记录",
    noHistory: "暂无记录",
    practiceOrg: "练习组织",
    instruction: "指令",
    feedback: "反馈",
    activityTitle: "活动标题",
    registeredActivities: "已登记活动",
    actions: "操作",
    methodology: "使用说明",
    helpInstructions: [
      "通过选择三个教学频道在课堂期间对教学活动进行编码。",
      "每当学生去练习时，点击“更新”。",
      "每次观察代表课程中的新内容（全局教学活动）。",
      "在教师派学生去练习之前提供的所有信息都被捕获为一个全局活动。",
      "排除纯组织指令（例如“分成两组”）。",
      "排除纯动机反馈（例如空洞的赞扬）。"
    ],
    aiAnalysis: "AI 分析",
    getInsights: "获取洞察",
    loading: "加载中...",
    levels: {
      "Iniciación": "入门级",
      "Intermedio": "中级",
      "Competición": "竞技级",
      "Alta Competición": "高水平竞技"
    },
    certifications: ["Play & Stay", "1级", "2级", "3级"],
    options: {
      practice: {
        isolated: { label: "孤立技能", definition: "在脱离背景的环境中专注于一项技术或技能的练习。" },
        representative: { label: "代表性练习", definition: "模拟真实比赛情况的代表性学习情境。" },
        modified: { label: "改良比赛", definition: "通过操纵任务约束（规则、器材）进行比赛模拟。" },
        small: { label: "小场地比赛", definition: "没有额外条件的小场地比赛（如 5对5）。" },
        regular: { label: "常规比赛", definition: "没有特定规则/条件的常规活动（如全场比赛）。" },
        repetitive: { label: "重复性任务", definition: "不间断地重复一个动作。" },
        variability: { label: "变异空间", definition: "允许动作变异，但教师不直接促进这种变异。" },
        space_var: { label: "空间变异", definition: "在任务中或任务之间有目的地改变空间。" },
        player_var: { label: "球员变异", definition: "有目的地改变对手人数。" },
        equip_var: { label: "器材变异", definition: "所用器材的变化（不同尺寸的球/球拍）。" }
      },
      instruction: {
        prescriptive: { label: "规范性指导", definition: "基于生物力学研究的最佳动作模式指导。" },
        analogy: { label: "类比教学", definition: "使用类比而不是规定的动作形式。" },
        movement_forms: { label: "动作形式", definition: "专注于首选动作模式的特定指令。" },
        outcomes: { label: "结果导向", definition: "要求学生关注结果/影响而非特定技术。" },
        oral_var: { label: "促进多样性", definition: "鼓励学生寻找并探索个性化的动作解决方案。" }
      },
      feedback: {
        prescriptive: { label: "规范性反馈", definition: "关于生物力学推荐的最佳动作模式的反馈。" },
        analogy: { label: "类比反馈", definition: "使用类比来描述，而非规定动作形式。" },
        movement_forms: { label: "身体形式", definition: "关注动作中所用身体部位的反馈。" },
        outcomes: { label: "环境影响", definition: "关注所执行动作对环境产生的影响的反馈。" },
        variability: { label: "关于变异", definition: "就学生发现的个性化解决方案向其提问。" }
      }
    }
  },
  pt: {
    title: "KTO Tracker Pro",
    coachSection: "Treinador",
    sessionSection: "Sessão",
    activitySection: "Nova Atividade",
    name: "Nome",
    age: "Idade",
    certification: "Certificação",
    date: "Data",
    numPlayers: "Jogadores",
    playerLevel: "Nível",
    addActivity: "Registrar Atividade",
    updateActivity: "Atualizar Atividade",
    cancelEdit: "Cancelar",
    removeActivity: "Excluir",
    editActivity: "Editar",
    saveSession: "Salvar Sessão",
    loadSession: "Carregar",
    exportCSV: "Exportar CSV",
    history: "Histórico",
    noHistory: "Vazio",
    practiceOrg: "Org. Prática",
    instruction: "Instrução",
    feedback: "Feedback",
    activityTitle: "Título da Atividade",
    registeredActivities: "Registro de Atividades",
    actions: "Ações",
    methodology: "Instruções de Uso",
    helpInstructions: [
      "Codifique as atividades durante a aula selecionando os três canais pedagógicos.",
      "Clique em 'Atualizar' toda vez que os alunos forem praticar.",
      "Cada observação representa um novo conteúdo (atividade pedagógica global).",
      "Informações dadas antes da prática são capturadas como uma única atividade global.",
      "Exclua instruções puras de organização (ex: 'fiquem em duplas').",
      "Exclua feedbacks puramente motivacionais (ex: elogios vazios)."
    ],
    aiAnalysis: "Análise IA",
    getInsights: "Obter Insights",
    loading: "Carregando...",
    levels: {
      "Iniciación": "Iniciação",
      "Intermedio": "Intermediário",
      "Competición": "Competição",
      "Alta Competición": "Alta Competição"
    },
    certifications: ["Play & Stay", "Nível 1", "Nível 2", "Nível 3"],
    options: {
      practice: {
        isolated: { label: "Habilidades isoladas", definition: "Prática focada em uma técnica ou habilidade em um ambiente descontextualizado." },
        representative: { label: "Hab. representativa", definition: "Situações de aprendizagem que imitam situações reais de jogo (ex: 1v1, 1v2)." },
        modified: { label: "Jogo modificado", definition: "Simulação de jogo com manipulação de restrições (regras, equipamentos)." },
        small: { label: "Espaço reduzido", definition: "Jogo em espaço reduzido sem condições adicionais (ex: 5x5 futebol)." },
        regular: { label: "Jogo regular", definition: "Atividade regular sem regras específicas (ex: 5x5 basquete)." },
        repetitive: { label: "Tarefa repetitiva", definition: "Repetição de um movimento continuamente sem alterações." },
        variability: { label: "Espaço variabilidade", definition: "Permite variabilidade no movimento, mas não é promovida pelo professor." },
        space_var: { label: "Var. espacial", definition: "Variação intencional do espaço dentro de uma tarefa ou entre sucessivas." },
        player_var: { label: "Var. jogadores", definition: "Variação intencional do número de oponentes." },
        equip_var: { label: "Var. equipamento", definition: "Variação do equipamento utilizado (bolas/raquetes de tamanhos diferentes)." }
      },
      instruction: {
        prescriptive: { label: "Prescritiva", definition: "Instruções de padrões de movimento ideais baseados em pesquisa biomecânica." },
        analogy: { label: "Analogias", definition: "Uso de analogias para descrever formas de movimento (ex: 'lance como um arco-íris')." },
        movement_forms: { label: "Formas mov.", definition: "Instrução específica focada em um padrão de movimento preferido." },
        outcomes: { label: "Resultados", definition: "Instruções que exigem foco no resultado/efeito em vez da técnica." },
        oral_var: { label: "Promoção var.", definition: "Incentivar a busca por soluções de movimento individualizadas (ex: 'tente outra coisa!')." }
      },
      feedback: {
        prescriptive: { label: "Prescritivo", definition: "Feedback focado em padrões de movimento recomendados biomecanicamente." },
        analogy: { label: "Via analogia", definition: "Uso de analogia para descrever em vez de uma forma de movimento prescrita." },
        movement_forms: { label: "Sobre formas mov.", definition: "Feedback focado em partes do corpo utilizadas na ação." },
        outcomes: { label: "Sobre resultados", definition: "Feedback focado no efeito da ação realizada no ambiente." },
        variability: { label: "Sobre variabilidade", definition: "Questionar os alunos sobre soluções individualizadas encontradas." }
      }
    }
  }
};
