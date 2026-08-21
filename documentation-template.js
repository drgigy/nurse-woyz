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

function select(options) {
  return `<select>${options.map(option => `<option>${escapeHtml(option)}</option>`).join('')}</select>`;
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
  return `<div class="score-row"><label>${escapeHtml(label)}</label><div>${select(options)}</div><div>${input(scorePlaceholder)}</div></div>`;
}

function check(text) {
  return `<label class="check-row"><input type="checkbox"> <span>${escapeHtml(text)}</span></label>`;
}

function bar(text) {
  return `<div class="teal-bar">${escapeHtml(text)}</div>`;
}

function miniHeader(left, right = 'Score') {
  return `<div class="mini-head"><span>${escapeHtml(left)}</span><span>${escapeHtml(right)}</span></div>`;
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
    ${bar('FALL RISK SCORE CALCULATION - Select the appropriate option in each category. Add all points to calculate Fall Risk Score.')}
    <div class="score-grid">
      ${scoreRow('Age', ['Select', 'Below 60', '60 to 69', '70 to 79', '80 and above'])}
      ${scoreRow('Fall history', ['Select', 'No fall history', 'One fall history', 'More than one fall history'])}
      ${scoreRow('Elimination, bowel and urine', ['Select', 'No concern', 'Frequency / urgency', 'Incontinence / catheter care'])}
      ${scoreRow('Medications: PCA, opioids, anticonvulsants, antihypertensives, diuretics, hypnotics, laxatives, sedatives, psychotropics', ['Select', 'None', 'One high fall risk medication', 'Two or more high fall risk medications'])}
      ${scoreRow('Patient care equipment tethering patient: IV infusion, chest tube, indwelling catheter, SCDs, etc.', ['Select', 'None', 'With one device', 'With more than one device'])}
      ${scoreRow('Mobility', ['Select', 'Steady gait', 'Unsteady gait', 'Needs assistance'])}
      ${scoreRow('Cognition', ['Select', 'Oriented', 'Intermittently confused', 'Confused / impulsive', 'N/A'])}
    </div>
    ${twoColRow('Total Score', input('0'), 'Category of risk', select(['Select', 'Low Risk (0-5)', 'Moderate Risk (6-13)', 'High Risk (>13)']))}
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
    ${miniHeader('Clinical Characteristics', 'Score')}
    <div class="score-grid">${rows.map(item => scoreRow(item, ['Select', 'No', 'Yes'])).join('')}</div>
    ${row('Total Score', input('0'))}
    ${row('Criteria of risk', select(['Select', '-2 to 0 : Low Risk', '1 to 2 : Moderate Risk', '>=3 : High Risk']))}
    ${row('If score is >2, informed doctor', select(['Select', 'Yes', 'No', 'Not applicable']))}
    ${row('DVT prophylaxis / monitoring remarks', textarea(4, 'Compression device, anticoagulant status, Doppler pending, bleeding watch, or escalation.'), 'full-row')}`;
}

function bradenTemplate() {
  return `
    ${patientHeader()}
    ${bar('MODIFIED BRADEN PRESSURE INJURY RISK ASSESSMENT SCALE')}
    ${row('Reason for re-assessment', select(['Select', 'As per moderate or high skin injury risk policy']))}
    <div class="callout">Braden pressure ulcer risk assessment: Total Score Auto Calculated</div>
    ${miniHeader('Criteria', 'Score')}
    <div class="score-grid">
      ${scoreRow('Sensory perception', ['Select', 'Completely limited', 'Very limited', 'Slightly limited', 'No impairment'])}
      ${scoreRow('Moisture', ['Select', 'Constantly moist', 'Very moist', 'Occasionally moist', 'Rarely moist'])}
      ${scoreRow('Activity', ['Select', 'Bedfast', 'Chairfast', 'Walks occasionally', 'Walks frequently'])}
      ${scoreRow('Mobility', ['Select', 'Completely immobile', 'Very limited', 'Slightly limited', 'No limitation'])}
      ${scoreRow('Nutrition', ['Select', 'Very poor', 'Probably inadequate', 'Adequate', 'Excellent'])}
      ${scoreRow('Friction and shear', ['Select', 'Problem', 'Potential problem', 'No apparent problem'])}
    </div>
    ${twoColRow('Total Score', input(''), 'Category of risk', select(['Select', 'None (19-23)', 'Mild risk (15-18)', 'Moderate risk (13-14)', 'High risk (10-12)', 'Severe risk (<=9)']))}
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
      ${scoreRow('Eye Opening', ['Select', 'No eye opening', 'To pain', 'To speech', 'Open spontaneously'], 'E')}
      ${scoreRow('Verbal', ['Select', 'No verbal response', 'Incomprehensible sounds', 'Inappropriate words', 'Confused', 'Oriented'], 'V')}
      ${scoreRow('Motor', ['Select', 'No motor response', 'Extension', 'Flexion', 'Withdraws', 'Localizes pain', 'Obeys commands'], 'M')}
    </div>
    ${row('Total GCS Score', input(''))}
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
    ['Mobility / Fall Risk', ['Independent / ambulant', 'Supervised mobility / low fall risk', 'Partially dependent / moderate fall risk', 'Completely dependent / high fall risk']],
    ['Elimination', ['Independent', 'Needs assistance', 'Catheter / bowel support', 'Complete assistance / close monitoring']],
    ['Nutrition / Feeding', ['Self-feeding', 'Needs supervision', 'Assisted feeding / Ryle tube', 'Complex feeding / aspiration watch']],
    ['Medication / Infusion Complexity', ['Routine oral medication', 'Scheduled injections', 'IV infusion / antibiotics', 'Multiple infusions / high alert monitoring']],
    ['Monitoring Requirement', ['Routine vitals', '4 hourly vitals', 'Frequent vitals / intake output', 'Close monitoring / unstable']],
    ['Skin Integrity', ['Braden 16-19', 'Braden 14-15', 'Braden 12-13', 'Braden less than 12 / frequent position change']],
    ['Admission Status / Education', ['Standard education', 'Transfer education', 'Discharge education', 'New admission / isolation / immediate post-op']]
  ];
  return `
    ${patientHeader()}
    ${bar('RHPASS WARD')}
    <div class="score-grid">${rows.map(([label, options]) => scoreRow(label, ['Select', ...options])).join('')}</div>
    ${twoColRow('Total Score', input(''), 'Recommended nursing care requirement', select(['Select', 'Low dependency', 'Moderate dependency', 'High dependency', 'Very high dependency']))}
    ${row('Supervisor verification / remarks', textarea(4), 'full-row')}`;
}

function rhpassIcuTemplate() {
  const rows = [
    'Mechanical ventilation / advanced respiratory support',
    'High-flow oxygen / NIV / frequent suctioning',
    'Vasoactive drug / hemodynamic support',
    'Invasive arterial / central venous monitoring',
    'Hourly neurological or hemodynamic observation',
    'Renal replacement therapy / strict urine output monitoring',
    'Multiple drains / tubes / post-operative ICU care',
    'Isolation / infection control / complex wound care',
    'Frequent blood sampling / glucose monitoring',
    'High-alert medication or titratable infusion'
  ];
  return `
    ${patientHeader()}
    ${bar('RHPASS ICU')}
    <div class="score-grid">${rows.map(item => scoreRow(item, ['Select', 'No', 'Yes'])).join('')}</div>
    ${twoColRow('Total Score', input(''), 'ICU Acuity Category', select(['Select', 'Low ICU dependency', 'Moderate ICU dependency', 'High ICU dependency', 'Very high ICU dependency']))}
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
    title: 'Hospital Fall Risk Assessment Tool (RHFRA)',
    source: 'EMR-derived fall risk assessment template',
    html: fallRiskTemplate
  },
  dvt: {
    title: 'Modified DVT Assessment Tool',
    source: 'EMR-derived Modified WELLS DVT assessment template',
    html: dvtTemplate
  },
  rhpassIcu: {
    title: 'RHPASS (ICU)',
    source: 'RHPASS ICU acuity scoring template',
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
    title: 'RHPASS WARD',
    source: 'RHPASS ward acuity scoring template',
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
