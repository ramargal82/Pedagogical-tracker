
import { Translations } from './types';

export const i18n: Record<string, Translations> = {
  es: {
    title: "KTO: Teaching and Coaching Observation Tool",
    coachSection: "Entrenador",
    sessionSection: "Sesión",
    activitySection: "Nueva Actividad",
    name: "Nombre",
    age: "Edad",
    country: "País",
    yearsExperience: "Años de experiencia",
    certification: "Nivel de certificación",
    date: "Fecha",
    numPlayers: "Número de jugadores",
    playerLevel: "Nivel de los jugadores",
    seasonPhase: "Fase de la temporada",
    wheelchair: "Silla de ruedas",
    duration: "Duración (min)",
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
    activityTitle: "Actividad",
    registeredActivities: "Registro Actividades",
    actions: "Acciones",
    methodology: "Instrucciones de Uso",
    helpInstructions: [
      "Codifique las actividades durante la lección seleccionando los tres canales pedagógicos.",
      "Haga clic en 'Registrar' cada vez que los estudiantes vayan a practicar.",
      "Cada observación representa un contenido nuevo (actividad pedagógica global).",
      "La información dada antes de que los alumnos practiquen se captura como una sola actividad global.",
      "Se excluyen instrucciones puras de organización (ej. 'poneos por parejas').",
      "Se excluye el feedback puramente motivacional (ej. elogios vacíos)."
    ],
    levels: {
      "Beginner": "Principiante",
      "Intermediate": "Intermedio",
      "Advanced": "Avanzado",
      "High performance": "Alto Rendimiento"
    },
    certifications: {
      'None': "Ninguna",
      'Play & Stay or equivalent': "Play & Stay o equivalente",
      'Level 1 or equivalent': "Nivel 1 o equivalente",
      'Level 2 or equivalent': "Nivel 2 o equivalente",
      'Level 3 or equivalent': "Nivel 3 o equivalente",
      'Others': "Otras"
    },
    seasonPhases: {
      'Preparation': 'Preparación',
      'Pre-competition': 'Pre-competición',
      'Competition': 'Competición',
      'Recovery': 'Recuperación'
    },
    options: {
      practice: {
        isolated: { label: "Habilidades aisladas", definition: "Práctica centrada en una técnica o habilidad en un entorno descontextualizado (ej. repetición sin oponente)." },
        representative: { label: "Habilidad representativa", definition: "Situaciones de aprendizaje que imitan situaciones de juego reales (ej. 1v1, 1v2)." },
        modified: { label: "Juego modificado", definition: "Simulación de juego con manipulación de restricciones (reglas, equipo)." },
        small: { label: "Espacio reducido", definition: "Juego en espacio reducido sin condiciones adicionales (ej. 5v5 fútbol reducido)." },
        regular: { label: "Juego regular", definition: "Actividad regular sin reglas específicas (ej. 5v5 baloncesto, 11v11 fútbol)." },
        repetitive: { label: "Tarea repetitiva", definition: "Repetición de un movimiento continuamente sin cambios." },
        variability: { label: "Espacio variabilidad", definition: "Permite variabilidad en el movimiento pero no es promovida directamente por el profesor." },
        space_var: { label: "Variabilidad espacial", definition: "Variación intencionada del espacio dentro de una tarea o entre sucesivas." },
        player_var: { label: "Variabilidad de jugadores", definition: "Variación intencionada del número de jugadores oponentes." },
        equip_var: { label: "Variabilidad de equipamiento", definition: "Variación del equipamiento utilizado (pelotas, raquetas de distinto tamaño)." }
      },
      instruction: {
        prescriptive: { label: "Prescriptiva", definition: "Instrucciones de patrones de movimiento óptimos basados en investigación biomecánica." },
        analogy: { label: "Analogías", definition: "Uso de analogías para describir formas de movimiento (ej. 'lanza como un arcoíris')." },
        movement_forms: { label: "Formas mov.", definition: "Instrucción específica que se centra en un patrón de movimiento preferido." },
        outcomes: { label: "Resultados", definition: "Instrucciones que requieren centrarse en el resultado/efecto más que en la técnica." },
        oral_var: { label: "Promoción variabilidad", definition: "Alentar a buscar soluciones de movimiento individualizadas (ej. '¡prueba otra cosa!')." }
      },
      feedback: {
        prescriptive: { label: "Prescriptivo", definition: "Feedback centrado en patrones de movimiento recomendados biomecanicamente." },
        analogy: { label: "Vía analogía", definition: "Uso de analogía para describir más que una forma de movimiento prescrita." },
        movement_forms: { label: "Sobre formas mov.", definition: "Feedback centrado en partes del cuerpo utilizadas en la acción." },
        outcomes: { label: "Sobre resultados", definition: "Feedback centrado en el efecto de la acción realizada en el entorno." },
        variability: { label: "Sobre variabilidad", definition: "Cuestionar a los alumnos sobre soluciones individualizadas que encontraron." }
      }
    }
  },
  en: {
    title: "KTO: Teaching and Coaching Observation Tool",
    coachSection: "Coach",
    sessionSection: "Session",
    activitySection: "New Activity",
    name: "Name",
    age: "Age",
    country: "Country",
    yearsExperience: "Years of experience",
    certification: "Certification level",
    date: "Date",
    numPlayers: "Number of players",
    playerLevel: "Player level",
    seasonPhase: "Season phase",
    wheelchair: "Wheelchair",
    duration: "Duration (min)",
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
    activityTitle: "Activity",
    registeredActivities: "Registered Activities",
    actions: "Actions",
    methodology: "Usage Instructions",
    helpInstructions: [
      "Code activities during the lesson by selecting the three pedagogical channels.",
      "Click 'Register' every time students go and practice.",
      "Each observation represents new content (global pedagogical activity).",
      "Information provided before practice is captured as a single global activity.",
      "Exclude pure organization instructions (e.g., 'get into pairs').",
      "Exclude purely motivational feedback (e.g., empty praises)."
    ],
    levels: {
      "Beginner": "Beginner",
      "Intermediate": "Intermediate",
      "Advanced": "Advanced",
      "High performance": "High performance"
    },
    certifications: {
      'None': "None",
      'Play & Stay or equivalent': "Play & Stay or equivalent",
      'Level 1 or equivalent': "Level 1 or equivalent",
      'Level 2 or equivalent': "Level 2 or equivalent",
      'Level 3 or equivalent': "Level 3 or equivalent",
      'Others': "Others"
    },
    seasonPhases: {
      'Preparation': 'Preparation',
      'Pre-competition': 'Pre-competition',
      'Competition': 'Competition',
      'Recovery': 'Recovery'
    },
    options: {
      practice: {
        isolated: { label: "Isolated Skills", definition: "Practice focusing on one technique in a de-contextualized environment." },
        representative: { label: "Game Representative", definition: "Learning situations mimicking real game situations (e.g., 1v1, 1v2)." },
        modified: { label: "Modified Game", definition: "Simulation with manipulation of task constraints (rules, equipment)." },
        small: { label: "Small Sided", definition: "Small sided game without additional conditions (e.g., 5v5 soccer)." },
        regular: { label: "Regular Play", definition: "Activity without specific rules/conditions (e.g., full court play)." },
        repetitive: { label: "Repetitive Task", definition: "Repeating a movement continuously without change." },
        variability: { label: "Room for Variability", definition: "Allows variability in movement but not directly promoted by teacher." },
        space_var: { label: "Space Variability", definition: "Intentional variation of space within or between tasks." },
        player_var: { label: "Player Variability", definition: "Intentional variation of the number of opponents." },
        equip_var: { label: "Equipment Variability", definition: "Variation of equipment used (different sized balls/racquets)." }
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
    title: "KTO: Teaching and Coaching Observation Tool",
    coachSection: "教练信息",
    sessionSection: "课程详情",
    activitySection: "新增活动",
    name: "姓名",
    age: "年龄",
    country: "国家/地区",
    yearsExperience: "执教年限",
    certification: "认证级别",
    date: "日期",
    numPlayers: "球员人数",
    playerLevel: "球员水平",
    seasonPhase: "赛季阶段",
    wheelchair: "轮椅模式",
    duration: "时长 (分钟)",
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
    activityTitle: "活动",
    registeredActivities: "已登记活动",
    actions: "操作",
    methodology: "使用说明",
    helpInstructions: [
      "通过选择三个教学频道在课堂期间对教学活动进行编码。",
      "每当学生去练习时，点击“登记”。",
      "每次观察代表课程中的新内容（全局教学活动）。",
      "在教师派学生去练习之前提供的所有信息都被捕获为一个全局活动。",
      "排除纯组织指令（例如“分成两组”）。",
      "排除纯动机反馈（例如空洞的赞扬）。"
    ],
    levels: {
      "Beginner": "初学者",
      "Intermediate": "中级",
      "Advanced": "高级",
      "High performance": "高水平"
    },
    certifications: {
      'None': "无",
      'Play & Stay or equivalent': "Play & Stay 或同等水平",
      'Level 1 or equivalent': "1级 或同等水平",
      'Level 2 or equivalent': "2级 或同等水平",
      'Level 3 or equivalent': "3级 或同等水平",
      'Others': "其他"
    },
    seasonPhases: {
      'Preparation': '准备期',
      'Pre-competition': '赛前期',
      'Competition': '比赛期',
      'Recovery': '恢复期'
    },
    options: {
      practice: {
        isolated: { label: "孤立技能", definition: "在脱离背景的环境中专注于一项技术或技能的练习。" },
        representative: { label: "代表性练习", definition: "模拟真实比赛情况的代表性学习情境。" },
        modified: { label: "改良比赛", definition: "通过操纵任务约束（规则、器材）进行比赛模拟。" },
        small: { label: "小场地比赛", definition: "没有额外条件的小场地比赛（如 5对5）。" },
        regular: { label: "常规比赛", definition: "没有特定规则/条件的常规活动（如全场比赛）。" },
        repetitive: { label: "重复性任务", definition: "不间断地重复一个动作。" },
        variability: { label: "变异空间", definition: "允许动作变异，但教师不直接促进这种变异。" },
        space_var: { label: "空间变异性", definition: "在任务中或任务之间有目的地改变空间。" },
        player_var: { label: "球员变异性", definition: "有目的地改变对手人数。" },
        equip_var: { label: "器材变异性", definition: "所用器材的变化（不同尺寸的球/球拍）。" }
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
    title: "KTO: Teaching and Coaching Observation Tool",
    coachSection: "Treinador",
    sessionSection: "Sessão",
    activitySection: "Nova Atividade",
    name: "Nome",
    age: "Idade",
    country: "País",
    yearsExperience: "Anos de experiência",
    certification: "Nível de certificação",
    date: "Data",
    numPlayers: "Número de jogadores",
    playerLevel: "Nível dos jogadores",
    seasonPhase: "Fase da temporada",
    wheelchair: "Silla de rodas",
    duration: "Duração (min)",
    addActivity: "Registrar Actividade",
    updateActivity: "Atualizar Actividade",
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
    activityTitle: "Actividade",
    registeredActivities: "Registro de Actividades",
    actions: "Ações",
    methodology: "Instruções de Uso",
    helpInstructions: [
      "Codifique as actividades durante a aula seleccionando los tres canales pedagógicos.",
      "Clique em 'Registrar' cada vez que os alunos forem praticar.",
      "Cada observação representa um novo conteúdo (actividade pedagógica global).",
      "Informações dadas antes da prática são capturadas como uma única actividade global.",
      "Exclua instruções puras de organização (ex: 'fiquem em duplas').",
      "Exclua feedbacks puramente motivacionais (ex: elogios vazios)."
    ],
    levels: {
      "Beginner": "Principiante",
      "Intermediate": "Intermediário",
      "Advanced": "Avançado",
      "High performance": "Alto desempenho"
    },
    certifications: {
      'None': "Nenhuma",
      'Play & Stay or equivalent': "Play & Stay ou equivalente",
      'Level 1 or equivalent': "Nível 1 ou equivalente",
      'Level 2 or equivalent': "Nível 2 ou equivalente",
      'Level 3 or equivalent': "Nível 3 ou equivalente",
      'Others': "Outras"
    },
    seasonPhases: {
      'Preparation': 'Preparação',
      'Pre-competition': 'Pré-competição',
      'Competition': 'Competição',
      'Recovery': 'Recuperação'
    },
    options: {
      practice: {
        isolated: { label: "Habilidades isoladas", definition: "Prática focada em uma técnica ou habilidade num ambiente descontextualizado." },
        representative: { label: "Hab. representativa", definition: "Situações de aprendizagem que imitam situações reais de juego (ex: 1v1, 1v2)." },
        modified: { label: "Jogo modificado", definition: "Simulação de jogo com manipulação de restrições (regras, equipamentos)." },
        small: { label: "Espaço reduzido", definition: "Jogo em espaço reduzido sem condiciones adicionais (ex: 5x5 futebol)." },
        regular: { label: "Jogo regular", definition: "Actividade regular sem reglas específicas (ex: 5x5 basquete)." },
        repetitive: { label: "Tarefa repetitiva", definition: "Repetição de um movimento continuamente sem alterações." },
        variability: { label: "Espaço variabilidade", definition: "Permite variabilidade no movimento, mas não é promovida pelo professor." },
        space_var: { label: "Variabilidade espacial", definition: "Variação intencional do espacio dentro de una tarea o entre sucesivas." },
        player_var: { label: "Variabilidade de jogadores", definition: "Variação intencional do número de oponentes." },
        equip_var: { label: "Variabilidade de equipamento", definition: "Variação do equipamento utilizado (bolas/raquetes de tamanhos diferentes)." }
      },
      instruction: {
        prescriptive: { label: "Prescritiva", definition: "Instruções de padrões de movimiento ideais baseados em pesquisa biomecânica." },
        analogy: { label: "Analogias", definition: "Uso de analogias para descrever formas de movimento (ex: 'lance como um arco-íris')." },
        movement_forms: { label: "Formas mov.", definition: "Instrução específica focada num patrón de movimiento preferido." },
        outcomes: { label: "Resultados", definition: "Instruções que exigem foco no resultado/efeito em vez da técnica." },
        oral_var: { label: "Promoção variabilidade", definition: "Incentivar a busca por soluções de movimento individualizadas (ex: 'tente outra coisa!')." }
      },
      feedback: {
        prescriptive: { label: "Prescritivo", definition: "Feedback focado em patrones de movimiento recomendados biomecanicamente." },
        analogy: { label: "Via analogia", definition: "Uso de analogia para descrever em vez de uma forma de movimiento prescrita." },
        movement_forms: { label: "Sobre formas mov.", definition: "Feedback focado em partes do corpo utilizadas na acção." },
        outcomes: { label: "Sobre resultados", definition: "Feedback focado no efeito da acção realizada no ambiente." },
        variability: { label: "Sobre variabilidade", definition: "Questionar os alunos sobre soluções individualizadas encontradas." }
      }
    }
  }
};
