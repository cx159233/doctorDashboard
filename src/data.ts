export const patientList = [
  { id: 'P88001235', name: '张伟', gender: '男', age: 54, status: '住院中', dept: '心内科', bed: '12-05', doctor: '李建国', risk: 'high' },
  { id: 'P88001236', name: '王芳', gender: '女', age: 42, status: '已出院', dept: '呼吸科', bed: '-', doctor: '陈晓梅', risk: 'low' },
  { id: 'P88001237', name: '李强', gender: '男', age: 68, status: '住院中', dept: '神经外科', bed: '08-12', doctor: '赵志强', risk: 'medium' },
  { id: 'P88001238', name: '刘洋', gender: '女', age: 29, status: '门诊', dept: '消化内科', bed: '-', doctor: '孙丽', risk: 'low' },
];

export const allRecords = [
  {
    id: 'r1',
    type: 'outpatient',
    date: '2024-05-15',
    hospital: '上海市第一人民医院',
    dept: '心血管内科',
    doctor: '李建国',
    name: '冠心病常规复诊',
    desc: '患者自述近期偶有胸闷，持续约3-5分钟，休息后缓解。',
    diagnosis: '1. 冠状动脉粥样硬化性心脏病\n2. 高血压病3级（极高危）',
    plan: '1. 继续服用阿司匹林、阿托伐他汀。\n2. 加用曲美他嗪片 20mg tid。\n3. 建议行冠脉CT检查。'
  },
  {
    id: 'r2',
    type: 'exam',
    date: '2024-05-16',
    hospital: '上海市第一人民医院',
    dept: '放射科',
    name: '胸部CT平扫',
    doctor: '王医生',
    desc: '诊断结论: 双肺纹理增多；建议结合临床，必要时随访。'
  },
  {
    id: 'r3',
    type: 'lab',
    date: '2024-05-16',
    hospital: '上海市第一人民医院',
    name: '生化常规检查',
    metrics: [
      { label: '谷丙转氨酶 (ALT)', value: '45', unit: 'U/L', flag: 'high' },
      { label: '总胆固醇 (TC)', value: '6.2', unit: 'mmol/L', flag: 'high' },
      { label: '低密度脂蛋白 (LDL-C)', value: '4.1', unit: 'mmol/L', flag: 'high' },
      { label: '空腹血糖 (GLU)', value: '5.4', unit: 'mmol/L', flag: '' },
      { label: '肌酐 (Cr)', value: '82', unit: 'μmol/L', flag: '' }
    ]
  },
  {
    id: 'r4',
    type: 'inpatient',
    date: '2024-03-10 ~ 2024-03-20',
    hospital: '复旦大学附属中山医院',
    dept: '心内科',
    doctor: '张主任',
    name: '急性心肌梗死住院记录',
    reason: '突发持续性胸痛4小时。',
    process: '入院后急诊行PCI术，于前降支植入支架一枚。术后予以抗血小板、调脂、改善心肌重构等治疗。',
    result: '好转出院。',
    orders: '1. 双抗治疗6个月。\n2. 定期复查心电图、心肌酶。'
  },
  {
    id: 'r5',
    type: 'exam',
    date: '2024-03-12',
    hospital: '复旦大学附属中山医院',
    dept: '超声科',
    name: '心脏彩超',
    doctor: '赵医生',
    desc: '诊断结论: 左房稍大，左室壁节段性运动异常，EF 52%。'
  },
  {
    id: 'r6',
    type: 'medicine',
    date: '2024-05-17',
    hospital: '上海市第一人民医院',
    name: '长期用药处方',
    items: [
      { name: '阿司匹林肠溶片', dose: '100mg qd', count: '1盒' },
      { name: '阿托伐他汀钙片', dose: '20mg qn', count: '2盒' },
      { name: '曲美他嗪片', dose: '20mg tid', count: '1盒' }
    ]
  },
  {
    id: 'r7',
    type: 'outpatient',
    date: '2024-03-22',
    hospital: '上海市中医医院',
    dept: '骨科',
    doctor: '李医生',
    name: '腰椎间盘突出治疗',
    desc: '腰痛伴左下肢放射痛2周，加重3天。',
    diagnosis: '腰椎间盘突出症（L4/L5）',
    plan: '1. 卧床休息，佩戴腰围。\n2. 口服塞来昔布、甲钴胺。\n3. 建议腰椎MRI进一步评估。'
  },
  {
    id: 'r8',
    type: 'inpatient',
    date: '2021-08-05 ~ 2021-08-12',
    hospital: '上海市中医医院',
    dept: '内分泌科',
    doctor: '陈医生',
    name: '血糖平衡调节',
    reason: '血糖持续偏高，住院调整方案。',
    process: 'II型糖尿病，血糖控制不佳',
    result: '好转出院。',
    orders: '1. 调整胰岛素方案。\n2. 饮食控制，定期监测血糖。'
  },
  {
    id: 'r9',
    type: 'exam',
    date: '2024-04-12',
    hospital: '上海市第二人民医院',
    dept: '超声科',
    name: '彩色多普勒超声',
    doctor: '周医生',
    desc: '颈动脉内膜毛糙，未见明显斑块。建议定期复查。'
  },
  {
    id: 'r10',
    type: 'lab',
    date: '2024-04-12',
    hospital: '上海市第二人民医院',
    name: '糖化血红蛋白',
    metrics: [
      { label: '糖化血红蛋白', value: '5.8', unit: '%', flag: '' }
    ]
  },
  {
    id: 'r11',
    type: 'medicine',
    date: '2024-04-15',
    hospital: '上海市第一人民医院',
    name: '门诊处方详单',
    items: [
      { name: '一次性使用无菌注射器 5ml', dose: '外用', count: '1具' }
    ]
  }
];
