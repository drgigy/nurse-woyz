function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function input(placeholder = '') {
  return `<input type="text" placeholder="${escapeHtml(placeholder)}">`;
}

function dateTime() {
  return '<input type="datetime-local">';
}

function select(options, attrs = '') {
  return `<select ${attrs}>${options.map(option => {
    const label = typeof option === 'object' ? option.label : option;
    const score = typeof option === 'object' && option.score !== undefined ? ` data-score="${option.score}"` : '';
    return `<option${score}>${escapeHtml(label)}</option>`;
  }).join('')}</select>`;
}

function textarea(rows = 4, placeholder = '') {
  return `<textarea rows="${rows}" placeholder="${escapeHtml(placeholder)}"></textarea>`;
}

function row(label, control = input(), extraClass = '') {
  return `<div class="emr-row ${extraClass}"><label>${escapeHtml(label)}</label><div class="control">${control}</div></div>`;
}

function twoColRow(leftLabel, leftControl, rightLabel, rightControl) {
  return `<div class="emr-row two-col"><label>${escapeHtml(leftLabel)}</label><div class="control">${leftControl}</div><label>${escapeHtml(rightLabel)}</label><div class="control">${rightControl}</div></div>`;
}

function scoreRow(label, options = ['Select'], scorePlaceholder = '') {
  const placeholder = scorePlaceholder || 'Auto';
  return `<div class="score-row"><label>${escapeHtml(label)}</label><div>${select(options, 'class="score-select"')}</div><div><input class="score-value" type="text" placeholder="${escapeHtml(placeholder)}" readonly tabindex="-1" aria-label="Auto calculated score"></div></div>`;
}

function check(text) {
  return `<label class="check-row"><input type="checkbox"> <span>${escapeHtml(text)}</span></label>`;
}

function bar(text) {
  return `<div class="teal-bar">${escapeHtml(text)}</div>`;
}

function miniHeader(left, right = 'Auto Score') {
  return `<div class="mini-head"><span>${escapeHtml(left)}</span><span>${escapeHtml(right)}</span></div>`;
}

function scored(label, score) {
  return { label, score };
}

function calculatedResult(categoryLabel = 'Category / Result') {
  return `
    <div class="calculation-result">
      <div><label>Total Score</label><input class="auto-total" type="text" value="0" readonly tabindex="-1" aria-label="Auto calculated total score"></div>
      <div><label>${escapeHtml(categoryLabel)}</label><input class="auto-category" type="text" value="Not assessed" readonly></div>
    </div>`;
}

function patientHeader() {
  return `
    <div class="patient-grid">
      ${row('Patient Name', input('Patient name'))}
      ${row('UHID', input('UHID'))}
      ${row('Age / Gender', input('Age / Gender'))}
      ${row('Ward / Bed', input('Ward / Bed'))}
      ${row('Date / Time', dateTime())}
      ${row('Nurse Name', input('Nurse name'))}
    </div>`;
}

function fallRiskTemplate() {
  const standard = [
    'Apply the fall risk band for patients at moderate and high risk for fall',
    'Apply safety belt during transport on wheel chair / stretcher and side rails on bed',
    'Ensure wheel locks are on when transferring patient on bed, stretcher, wheelchair or any movable device',
    'Demonstrate the use of call bell in bath rooms',
    'Assist the patient as per need',
    'Patient and family education to minimize fall risk',
    'Explain factors that contribute to the increased risk of falling and potential consequences of falls',
    'Use assistive device consistently and correctly',
    'Get up slowly from bed and sit a while before mobilization',
    'Accompany the patient to the bathroom / toilet and keep the door unlocked'
  ];
  const moderate = [
    'Keep the items within easy reach, e.g. water, phone, spectacles etc.',
    'Instruct the patient to call for help if getting in or out of bed',
    'Instruct not to walk barefoot and wear appropriate size slippers / shoes and hospital dress',
    'If receiving high-risk medication or after any procedure, instruct the patient not to get up alone',
    "Two hourly patient rounding at night to check the 5 P's: pain, potty, position, possession, and pump",
    "If agitated, restraint with doctor's order; restrict toilet movement by offering bed pan / urinal"
  ];
  const high = [
    "Allot the room / bed near to the nurse's station, if possible",
    'Patient should not be left alone during mobilization or getting out of bed for any reason',
    'Hourly night rounds by HCA / assigned nurse / team leader'
  ];
  return `
    ${patientHeader()}
    ${bar('Hospital Fall Risk Assessment Tool')}
    ${row('Reason for re-assessment', select(['Select', 'As per Low Fall Risk Reassessment Policy', 'As per Moderate or High Fall Risk Reassessment Policy']))}
    ${bar('Select the appropriate Fall Risk intervention if the patient has any of the following conditions')}
    <div class="subbar">High Fall Risk - Implement High Fall Risk interventions per protocol</div>
    <div class="check-grid">
      ${check('History of more than one fall within 6 months before admission')}
      ${check('Patient has experienced a fall during this hospitalization')}
      ${check("Patient is deemed high fall risk in conditions such as post-anesthesia or sedation within 24 hours, seizures, Parkinson's disease, agitation, withdrawal symptoms, lower limb amputation, or diabetic patient with NPO / fasting status")}
    </div>
    <div class="subbar">Low Fall Risk - Implement Low Fall Risk interventions per protocol</div>
    <div class="check-grid">${check('Completely paralyzed or immobilized or comatose')}</div>
    ${bar('FALL RISK SCORE CALCULATION - Select the appropriate option in each category. Scores and risk category are calculated automatically.')}
    <div class="score-grid">
      ${scoreRow('Age', [scored('Select', 0), scored('Below 60', 0), scored('60 to 69', 1), scored('70 to 79', 2), scored('80 and above', 3)])}
      ${scoreRow('Fall history', [scored('Select', 0), scored('No fall history', 0), scored('One fall history', 2), scored('More than one fall history', 3)])}
      ${scoreRow('Elimination, bowel and urine', [scored('Select', 0), scored('No concern', 0), scored('Frequency / urgency', 1), scored('Incontinence / catheter care', 2)])}
      ${scoreRow('Medications: PCA, opioids, anticonvulsants, antihypertensives, diuretics, hypnotics, laxatives, sedatives, psychotropics', [scored('Select', 0), scored('None', 0), scored('One high fall risk medication', 3), scored('Two or more high fall risk medications', 5)])}
      ${scoreRow('Patient care equipment tethering patient: IV infusion, chest tube, indwelling catheter, SCDs, etc.', [scored('Select', 0), scored('None', 0), scored('With one device', 1), scored('With more than one device', 2)])}
      ${scoreRow('Mobility', [scored('Select', 0), scored('Steady gait', 0), scored('Unsteady gait', 2), scored('Needs assistance', 3)])}
      ${scoreRow('Cognition', [scored('Select', 0), scored('Oriented', 0), scored('Intermittently confused', 1), scored('Confused / impulsive', 2), scored('N/A', 0)])}
    </div>
    ${calculatedResult('Category of risk')}
    ${bar('Standard Fall Prevention Measures')}
    <div class="check-grid">${standard.map(check).join('')}</div>
    ${bar('Fall Prevention Measures for Moderate Risk')}
    <div class="check-grid">${moderate.map(check).join('')}</div>
    ${bar('Fall Prevention Measures for High Risk')}
    <div class="check-grid">${high.map(check).join('')}</div>
    ${row('Remarks / nurse verification', textarea(4, 'Document education, actions taken, and reassessment plan.'), 'full-row')}`;
}

function dvtTemplate() {
  const rows = [
    'Active cancer (patient receiving treatment for cancer within the previous six months or currently receiving palliative treatment)',
    'Paralysis, paresis or recent plaster immobilization of the lower extremities',
    'Recently bedridden for >=3 days or major surgery within past 12 weeks under general or regional anesthesia',
    'Localised tenderness along the distribution of the deep venous system',
    'Entire leg swollen',
    'Calf swelling >3 cm when compared with asymptomatic leg, measured 10 cm below tibial tuberosity',
    'Pitting edema greater than asymptomatic leg',
    'Collateral superficial veins, non-varicose',
    'Previously documented DVT',
    'Alternative diagnosis at least as likely as deep vein thrombosis'
  ];
  return `
    ${patientHeader()}
    ${bar('DVT Assessment - Modified WELLS Scoring')}
    ${row('Reason for re-assessment', select(['Select', 'As per Moderate Risk (1 to 2) and High Risk (>=3) DVT Policy']))}
    ${miniHeader('Clinical Characteristics')}
    <div class="score-grid">${rows.map((item, index) => {
      const yesScore = index === 9 ? -2 : 1;
      return scoreRow(item, [scored('Select', 0), scored('No', 0), scored('Yes', yesScore)]);
    }).join('')}</div>
    ${calculatedResult('Criteria of risk')}
    ${row('If score is >2, informed doctor', select(['Select', 'Yes', 'No', 'Not applicable']))}
    ${row('DVT prophylaxis / monitoring remarks', textarea(4, 'Compression device, anticoagulant status, Doppler pending, bleeding watch, or escalation.'), 'full-row')}`;
}

function bradenTemplate() {
  return `
    ${patientHeader()}
    ${bar('MODIFIED BRADEN PRESSURE INJURY RISK ASSESSMENT SCALE')}
    ${row('Reason for re-assessment', select(['Select', 'As per moderate or high skin injury risk policy']))}
    <div class="callout">Braden pressure injury risk assessment: score and risk category are calculated automatically from the selected entries.</div>
    ${miniHeader('Criteria')}
    <div class="score-grid">
      ${scoreRow('Sensory perception', [scored('Select', 0), scored('Completely limited', 1), scored('Very limited', 2), scored('Slightly limited', 3), scored('No impairment', 4)])}
      ${scoreRow('Moisture', [scored('Select', 0), scored('Constantly moist', 1), scored('Very moist', 2), scored('Occasionally moist', 3), scored('Rarely moist', 4)])}
      ${scoreRow('Activity', [scored('Select', 0), scored('Bedfast', 1), scored('Chairfast', 2), scored('Walks occasionally', 3), scored('Walks frequently', 4)])}
      ${scoreRow('Mobility', [scored('Select', 0), scored('Completely immobile', 1), scored('Very limited', 2), scored('Slightly limited', 3), scored('No limitation', 4)])}
      ${scoreRow('Nutrition', [scored('Select', 0), scored('Very poor', 1), scored('Probably inadequate', 2), scored('Adequate', 3), scored('Excellent', 4)])}
      ${scoreRow('Friction and shear', [scored('Select', 0), scored('Problem', 1), scored('Potential problem', 2), scored('No apparent problem', 3)])}
    </div>
    ${calculatedResult('Category of risk')}
    ${bar('Follow aSSKINg Care Bundle for risk assessment')}
    <div class="check-grid">
      ${check('a - Assess the risk of patient')}
      ${check('S - Surface: wrinkle-free bed, appropriate pillows, special mattress')}
      ${check('S - Skin: release any device used and do the skin assessment')}
      ${check('K - Keep moving: mobilization and 2 hourly position change')}
      ${check('I - In case of incontinence: keep skin neat and dry, apply barrier lotion, change soiled diaper / under pad immediately')}
      ${check('N - Nutrition / hydration: promote good nutrition and hydration')}
      ${check('g - Give information to patient, family, and the medical team')}
    </div>
    ${row('Bed selected as per the risk category', textarea(5), 'full-row')}`;
}

function neuroPartOneTemplate() {
  return `
    ${patientHeader()}
    ${bar('NEUROLOGICAL ASSESSMENT CHART PART I')}
    ${bar('1) GCS Score')}
    <div class="score-grid">
      ${scoreRow('Eye Opening', [scored('Select', 0), scored('No eye opening', 1), scored('To pain', 2), scored('To speech', 3), scored('Open spontaneously', 4)], 'E')}
      ${scoreRow('Verbal', [scored('Select', 0), scored('No verbal response', 1), scored('Incomprehensible sounds', 2), scored('Inappropriate words', 3), scored('Confused', 4), scored('Oriented', 5)], 'V')}
      ${scoreRow('Motor', [scored('Select', 0), scored('No motor response', 1), scored('Extension', 2), scored('Flexion', 3), scored('Withdraws', 4), scored('Localizes pain', 5), scored('Obeys commands', 6)], 'M')}
    </div>
    ${calculatedResult('GCS interpretation')}
    ${bar('Pupils')}
    <div class="pupil-panel">
      <div class="pupil-ref">${[1,2,3,4,5,6,7].map(size => `<span><i style="width:${size * 7}px;height:${size * 7}px"></i>${size} mm</span>`).join('')}</div>
      <div class="patient-grid">
        ${row('Right pupil size / reaction', input('Size and reaction'))}
        ${row('Left pupil size / reaction', input('Size and reaction'))}
        ${row('Pupil asymmetry', select(['Select', 'Absent', 'Present']))}
        ${row('Doctor informed if abnormal', select(['Select', 'Yes', 'No', 'Not applicable']))}
      </div>
    </div>
    ${bar('Limb Power and Safety')}
    <div class="patient-grid">
      ${row('Right upper limb', input('Power / movement'))}
      ${row('Left upper limb', input('Power / movement'))}
      ${row('Right lower limb', input('Power / movement'))}
      ${row('Left lower limb', input('Power / movement'))}
      ${row('Speech / swallow concern', input(''))}
      ${row('Observation frequency', input(''))}
    </div>`;
}

function neuroPartTwoTemplate() {
  return `
    ${patientHeader()}
    ${bar('NEUROLOGICAL ASSESSMENT CHART PART II')}
    <div class="patient-grid">
      ${row('Neurological trend compared with previous shift', select(['Select', 'Improved', 'Same', 'Worsened']))}
      ${row('Headache / vomiting / seizure activity', input(''))}
      ${row('Sensorium / behavior', input(''))}
      ${row('Pain score', input(''))}
    </div>
    ${bar('Feeding, Devices, and Risk Review')}
    <div class="patient-grid">
      ${row('Feeding route', select(['Select', 'Oral', 'Ryle tube', 'PEG', 'NPO']))}
      ${row('Aspiration precautions', select(['Select', 'Required', 'Not required']))}
      ${row('IV line / catheter / drain / tube', input(''))}
      ${row('Restraint / fall risk', input(''))}
      ${row('Pressure injury prevention', input(''))}
      ${row('Pending CT / MRI / review', input(''))}
    </div>
    ${row('Nurse neurological summary', textarea(5, 'Document abnormal findings, trend, escalation, and pending actions.'), 'full-row')}`;
}

function rhpassWardTemplate() {
  const rows = [
    ['Cognition', ['Alert / cooperative / complete sedation', 'Anxious / confused / light sedation / slightly agitated', 'Delirium / partial restraint / moderate sedation / moderately agitated', 'Severely agitated / combative / pulls out lines and tubes / complete restraint']],
    ['Mobility / Fall Risk', ['Independent / ambulant', 'Supervised mobility / low fall risk', 'Partially dependent / moderate fall risk', 'Completely dependent / high fall risk']],
    ['Medication', ['<5 medications', '5-10 medications', '10-15 medications', '>16 medications / any emergency medication']],
    ['IV Infusions', ['No IV medication or infusion', 'IV medications (1-2) / IV infusion (1)', 'IV medications (3-4) and IV infusions (2-3)', 'More than 4 IV medications and infusions / replacement of large fluid losses']],
    ['Personal Care', ['Independent', 'Supervised care', 'One-person assistance', 'Two-person assistance / specialised care / log-roll positioning']],
    ['Dressing', ['No dressing', 'Dressing daily once', 'Dressing twice a day', 'Dressing more than twice / multiple dressings']],
    ['Vital Signs', ['Routine monitoring every 4 hours', '2-hourly monitoring', 'Hourly monitoring', 'Continuous / frequent monitoring less than 1 hour']],
    ['Skin Integrity', ['Braden score 16-19', 'Braden score 14-15', 'Braden score 12-13', 'Braden score less than 12 / frequent position change']],
    ['Elimination', ['Independent', 'Incontinence / stoma with minimum assistance', '>3 times emptying stoma bag with full assistance', '>5 times complex stoma needs / continuous loose stools / melena']],
    ['Additional Procedures', ['No procedures', '1-3 procedures in the unit', '1-3 procedures outside the unit', 'Multiple procedures >3 inside and outside department / multiple specific interventions']],
    ['Hydration / Nutrition', ['Independent / oral intake', 'Feeding under supervision', 'Continuous NG / PEG / JJ feed', 'Frequent NG feed']],
    ['Airway Support', ['Spontaneous breathing', 'O2 <=5 L/min', 'O2 >5 L/min', 'Continuous or intermittent BiPAP / CPAP']],
    ['Admission Status / Education', ['Admission with standard education', 'Transfer in/out / specific transfer education', 'Discharge / education regarding discharge', 'New ward admission / isolation / immediate post-op']],
    ['Pain Management', ['Pain scale <3 with pain management', 'Pain scale 3-4 / medication with non-pharmacological management', 'Pain scale 5-6 with pain medication', 'Pain scale >6 with multiple pain medications (IV / IM / PO)']],
    ['Number of Lines & Tubes', ['No lines/tubes or any non-critical lines/tubes', '2-3 non-critical lines/tubes or 1 critical line', '2-3 critical lines', '>4 critical lines']]
  ];
  return `
    ${patientHeader()}
    ${bar('PASS WARD')}
    <div class="score-grid">${rows.map(([label, options]) => scoreRow(label, [scored('Select', 0), ...options.map((option, index) => scored(option, index + 1))])).join('')}</div>
    ${calculatedResult('Acuity / Recommended N:P')}
    ${row('Supervisor verification / remarks', textarea(4), 'full-row')}`;
}

function rhpassIcuTemplate() {
  const rows = [
    ['Immunocompromised / infectious / condition requiring 1:1 care', 0],
    ['Standard monitoring (hourly vital signs and IV fluid balance)', 5],
    ['Multiple vasoactive medication', 5],
    ['Multiple specific interventions in the ICU', 5],
    ['Mechanical ventilation', 5],
    ['IV replacement of large fluid losses (>3 litres/day)', 4],
    ['Central venous line', 4],
    ['Multiple intravenous medication', 3],
    ['Care of drains except nasogastric tube', 3],
    ['Specific interventions outside ICU', 3],
    ['Supplementary ventilator support: O2, CPAP, NIV, HFNC, BiPAP', 3],
    ['Care of artificial airways', 3],
    ['Hemofiltration / dialytic techniques', 3],
    ['Measurement of ICP / EVD', 3],
    ['Treatment of complicated metabolic acidosis / alkalosis', 3],
    ['Intravenous hyperalimentation (TPN)', 3],
    ['Laboratory investigations', 2],
    ['Dressing changes', 2],
    ['Arterial line / epidural', 2],
    ['Quantitative urine output measurement', 2],
    ['Active diuresis', 2],
    ['GRBS monitoring with insulin infusion', 2],
    ['Enteral feeding through tube / GI route', 2],
    ['Treatment to improve lung function', 1]
  ];
  return `
    ${patientHeader()}
    ${bar('PASS ICU')}
    <div class="score-grid">${rows.map(([item, points]) => scoreRow(item, [scored('Select', 0), scored('No', 0), scored('Yes', points)])).join('')}</div>
    ${calculatedResult('ICU acuity / ratio')}
    ${row('Recommended nurse ratio / supervisor verification', textarea(4), 'full-row')}`;
}

function restraintTemplate() {
  return `
    ${patientHeader()}
    ${bar('Restraint Monitoring Form (Physical and Chemical)')}
    <div class="patient-grid">
      ${row('Type of restraint', select(['Select', 'Physical', 'Chemical', 'Physical and chemical']))}
      ${row('Indication / reason', input('Risk of pulling lines, agitation, safety, etc.'))}
      ${row('Doctor order / authorization', select(['Select', 'Yes', 'No']))}
      ${row('Relative / bystander informed', select(['Select', 'Yes', 'No', 'Not applicable']))}
      ${row('Alternatives attempted', input(''))}
      ${row('Monitoring interval', input(''))}
    </div>
    ${bar('Monitoring Checklist')}
    <div class="check-grid">
      ${check('Circulation and skin under restraint checked')}
      ${check('Restraint released and range-of-motion checked as per policy')}
      ${check('Food, fluid, toileting, and comfort needs attended')}
      ${check('Patient behavior and sensorium reviewed')}
      ${check('Need for continuation reviewed')}
      ${check('Doctor / supervisor informed if concern noted')}
    </div>
    ${row('Monitoring remarks / discontinuation plan', textarea(5), 'full-row')}`;
}

function transferTemplate() {
  return `
    ${patientHeader()}
    ${bar('In House Transfer')}
    <div class="patient-grid">
      ${row('From unit / bed', input(''))}
      ${row('To unit / bed', input(''))}
      ${row('Reason for transfer', input(''))}
      ${row('Transfer time', dateTime())}
      ${row('Sending nurse', input(''))}
      ${row('Receiving nurse / unit', input(''))}
    </div>
    ${bar('Transfer Readiness')}
    <div class="check-grid">
      ${check('Patient identity verified')}
      ${check('Current vitals and clinical stability documented')}
      ${check('IV line / catheter / tube / drain secured')}
      ${check('Oxygen / monitor / transport equipment arranged if required')}
      ${check('Case sheet and reports sent')}
      ${check('Medications / infusion sent if applicable')}
      ${check('Consent / procedure documents sent if required')}
      ${check('Receiving unit informed')}
    </div>
    ${row('Transfer handover / pending tasks', textarea(5), 'full-row')}`;
}

function movementTemplate() {
  return `
    ${patientHeader()}
    ${bar('Patient Movement Form')}
    <div class="patient-grid">
      ${row('Destination', select(['Select', 'Investigation', 'Procedure room', 'OT', 'Cath Lab', 'ICU', 'Ward', 'Other']))}
      ${row('Reason for movement', input(''))}
      ${row('Time out', dateTime())}
      ${row('Expected return / completion time', input(''))}
      ${row('Accompanying staff', input(''))}
      ${row('Transport mode', select(['Select', 'Walking', 'Wheelchair', 'Stretcher', 'Bed transfer']))}
    </div>
    ${bar('Movement Checklist')}
    <div class="check-grid">
      ${check('Patient identity verified')}
      ${check('Request / appointment confirmed')}
      ${check('Consent and reports sent if required')}
      ${check('IV line, catheter, drain, and oxygen secured')}
      ${check('Escort and transport equipment arranged')}
      ${check('Return instructions documented')}
    </div>
    ${row('Condition on return / remarks', textarea(5), 'full-row')}`;
}

function initialAssessmentTemplate() {
  return `
    ${patientHeader()}
    ${bar('Nursing Initial Assessment - Adult')}
    <div class="patient-grid">
      ${row('Source of admission', select(['Select', 'OPD', 'Emergency', 'Transfer in', 'Post procedure', 'Other']))}
      ${row('Presenting complaint', input(''))}
      ${row('Diagnosis / working problem', input(''))}
      ${row('Allergy status', input(''))}
      ${row('Vital signs', input(''))}
      ${row('Pain score', input(''))}
      ${row('Sensorium', input(''))}
      ${row('Mobility / fall risk', input(''))}
      ${row('Skin / pressure area status', input(''))}
      ${row('Nutrition / feeding', input(''))}
      ${row('Urine / bowel status', input(''))}
      ${row('Lines / tubes / drains', input(''))}
    </div>
    ${bar('Immediate Nursing Plan')}
    ${row('Immediate concerns and escalation', textarea(4), 'full-row')}
    ${row('Patient / family education', textarea(4), 'full-row')}`;
}

const TEMPLATE_FORMS = {
  rhfra: {
    title: 'Hospital Fall Risk Assessment Tool',
    source: 'EMR-derived fall risk assessment template',
    html: fallRiskTemplate
  },
  dvt: {
    title: 'Modified DVT Assessment Tool',
    source: 'EMR-derived Modified WELLS DVT assessment template',
    html: dvtTemplate
  },
  rhpassIcu: {
    title: 'PASS ICU',
    source: 'ICU acuity scoring template',
    html: rhpassIcuTemplate
  },
  braden: {
    title: 'Pressure Injury Risk Assessment - Braden Score',
    source: 'EMR-derived modified Braden pressure injury template',
    html: bradenTemplate
  },
  restraint: {
    title: 'Restraint Monitoring Form (Physical and Chemical)',
    source: 'EMR-derived restraint monitoring template',
    html: restraintTemplate
  },
  rhpassWard: {
    title: 'PASS WARD',
    source: 'Ward acuity scoring template',
    html: rhpassWardTemplate
  },
  neuro1: {
    title: 'Adult Neurological Assessment Form - PART 1',
    source: 'EMR-derived neurological assessment chart part I',
    html: neuroPartOneTemplate
  },
  neuro2: {
    title: 'Adult Neurological Assessment Form - Part 2',
    source: 'EMR-derived neurological assessment chart part II',
    html: neuroPartTwoTemplate
  },
  inHouseTransfer: {
    title: 'In House Transfer',
    source: 'EMR-derived in-house transfer template',
    html: transferTemplate
  },
  movement: {
    title: 'Patient Movement Form',
    source: 'EMR-derived patient movement template',
    html: movementTemplate
  },
  initialAdult: {
    title: 'Nursing Initial Assessment - Adult',
    source: 'EMR-derived adult initial nursing assessment template',
    html: initialAssessmentTemplate
  }
};

function getTemplateId() {
  return document.body.dataset.template;
}

function renderTemplate() {
  const template = TEMPLATE_FORMS[getTemplateId()];
  if (!template) return;
  document.title = `Nurse WOYZ - ${template.title}`;
  document.getElementById('pageTitle').textContent = template.title;
  document.getElementById('pageSubtitle').textContent = 'Demo documentation template. Use blank fields for voice-recognition mapping.';
  document.getElementById('summary').innerHTML = `
    <div class="summary-card"><strong>Template Type</strong><span class="muted">Nurse documentation form</span></div>
    <div class="summary-card"><strong>Source</strong><span class="muted">${template.source}</span></div>
    <div class="summary-card"><strong>Voice Rule</strong><span class="muted">Capture only what the nurse dictates. Do not fill normal findings automatically.</span></div>
  `;
  document.getElementById('formSections').innerHTML = `<section class="emr-form">${template.html()}</section>`;
  attachScoring();
}

function categoryForTemplate(templateId, total) {
  if (!total && templateId !== 'dvt') return 'Not assessed';
  if (templateId === 'rhfra') {
    if (total <= 5) return 'Low Risk (0-5)';
    if (total <= 13) return 'Moderate Risk (6-13)';
    return 'High Risk (>13)';
  }
  if (templateId === 'dvt') {
    if (total <= 0) return '-2 to 0 : Low Risk';
    if (total <= 2) return '1 to 2 : Moderate Risk';
    return '>=3 : High Risk - inform doctor';
  }
  if (templateId === 'braden') {
    if (total >= 19) return 'None (19-23)';
    if (total >= 15) return 'Mild risk (15-18)';
    if (total >= 13) return 'Moderate risk (13-14)';
    if (total >= 10) return 'High risk (10-12)';
    return 'Severe risk (<=9)';
  }
  if (templateId === 'neuro1') {
    if (total >= 13) return 'GCS 13-15: mild / near normal';
    if (total >= 9) return 'GCS 9-12: moderate impairment';
    if (total >= 3) return 'GCS 3-8: severe impairment';
    return 'Not assessed';
  }
  if (templateId === 'rhpassWard') {
    if (total <= 15) return 'Acuity 1 - Recommended N:P 1:6';
    if (total <= 29) return 'Acuity 2 - Recommended N:P 1:5';
    if (total <= 44) return 'Acuity 3 - Recommended N:P 1:3';
    return 'Acuity 4 - Recommended N:P 1:2';
  }
  if (templateId === 'rhpassIcu') {
    const firstSelect = document.querySelector('.score-row .score-select');
    if (firstSelect && firstSelect.selectedIndex === 2) return '1:1 care required';
    return total >= 22 ? 'High acuity (score >=22)' : 'Low acuity (score <22)';
  }
  return 'Calculated';
}

function updateScores() {
  const templateId = getTemplateId();
  let total = 0;
  document.querySelectorAll('.score-row').forEach(rowElement => {
    const selectElement = rowElement.querySelector('.score-select');
    const scoreElement = rowElement.querySelector('.score-value');
    const selected = selectElement.options[selectElement.selectedIndex];
    const score = Number(selected.dataset.score || 0);
    total += score;
    scoreElement.value = selectElement.selectedIndex === 0 ? '' : score;
  });
  const totalElement = document.querySelector('.auto-total');
  const categoryElement = document.querySelector('.auto-category');
  if (totalElement) totalElement.value = total;
  if (categoryElement) categoryElement.value = categoryForTemplate(templateId, total);
}

function attachScoring() {
  document.querySelectorAll('.score-select').forEach(selectElement => {
    selectElement.addEventListener('change', updateScores);
  });
  updateScores();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function copyTemplate() {
  const template = TEMPLATE_FORMS[getTemplateId()];
  if (!template) return;
  const text = document.getElementById('formSections').innerText.trim();
  navigator.clipboard.writeText(text).then(() => showToast('Template copied')).catch(() => showToast('Text ready to copy'));
}

renderTemplate();
