const TEMPLATE_FORMS = {
  rhfra: {
    title: 'Rajagiri Hospital Fall Risk Assessment Tool (RHFRA)',
    purpose: 'Screen fall risk factors and document the prevention bundle selected for the patient.',
    usedBy: 'Ward nurse, ICU nurse, shift supervisor',
    voiceRule: 'The nurse may dictate fall history, sensorium, gait, toileting need, sedation, lines, and intervention started. Capture only what is dictated and leave missing items blank for nurse verification.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time', 'Assessment / reassessment reason'] },
      { title: 'Fall Risk Factors', checks: ['Previous fall', 'Unsteady gait', 'Needs assistance for transfer', 'Confusion or altered sensorium', 'Sedation or high-risk medication', 'Frequent toileting need', 'Visual or hearing impairment', 'IV line, catheter, drain, or oxygen tubing'] },
      { title: 'Risk Score and Category', fields: ['Total score', 'Risk category', 'Risk communicated to patient / bystander', 'Supervisor informed if high risk'] },
      { title: 'Fall Prevention Interventions', checks: ['Call bell within reach', 'Bed low and brakes locked', 'Side rails as per policy', 'Non-slip footwear', 'Assisted toileting', 'Mobility aid provided', 'Fall risk signage / band if used', 'Hourly or frequent safety rounds'] },
      { title: 'Nurse Verification', fields: ['Nurse name and ID', 'Signature', 'Reassessment due', 'Remarks'] }
    ]
  },
  dvt: {
    title: 'Modified DVT Assessment Tool',
    purpose: 'Document DVT risk, Modified Wells-style assessment cues, prophylaxis status, and escalation needs.',
    usedBy: 'Ward nurse, ICU nurse, supervisor',
    voiceRule: 'The nurse can dictate limb symptoms, mobility, DVT pump use, anticoagulation status, bleeding concern, and reassessment reason. Do not calculate or assume risk unless the score is dictated or entered.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time', 'Reason for assessment / reassessment'] },
      { title: 'Clinical Cues', checks: ['Leg swelling', 'Calf pain or tenderness', 'Warmth or redness', 'Reduced mobility', 'Recent surgery or procedure', 'Previous DVT / PE', 'Active malignancy if known', 'Alternative diagnosis more likely'] },
      { title: 'Risk Scoring', fields: ['Modified Wells score', 'Risk category: low / moderate / high', 'Policy pathway selected', 'Doctor informed if required'] },
      { title: 'Prophylaxis and Monitoring', checks: ['DVT pump / compression device in use', 'Limb elevation', 'Mobilization encouraged if allowed', 'Anticoagulant ordered', 'Bleeding watch needed', 'Doppler / investigation pending'] },
      { title: 'Nurse Verification', fields: ['Nurse name and ID', 'Action taken', 'Next review time', 'Remarks'] }
    ]
  },
  rhpassIcu: {
    title: 'RHPASS (ICU)',
    purpose: 'Assess ICU patient acuity, organ support, monitoring intensity, and nursing dependency.',
    usedBy: 'ICU nurse, ICU in-charge, nursing supervisor',
    voiceRule: 'The nurse may dictate organ support, monitoring frequency, devices, oxygen or ventilator status, hemodynamic support, urine output, and dependency. Use dictated values only.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'ICU / bed', 'Date and time', 'Primary clinical problem'] },
      { title: 'Respiratory and Airway Support', fields: ['Airway status', 'Oxygen device / ventilator mode', 'SpO2 target / current trend', 'Suction / secretion concern'] },
      { title: 'Circulation and Monitoring', fields: ['Hemodynamic status', 'Vasoactive drug support', 'Invasive line / arterial line', 'Monitoring frequency'] },
      { title: 'Neurological / Renal / Device Dependency', fields: ['Sensorium / GCS trend', 'Urine output / renal support', 'Drains / tubes / wounds', 'Isolation / infection-control need'] },
      { title: 'Acuity Result', fields: ['Total score', 'ICU acuity category', 'Recommended nurse ratio', 'Supervisor verification'] }
    ]
  },
  braden: {
    title: 'Pressure Injury Risk Assessment - Braden Score',
    purpose: 'Assess pressure injury risk and document prevention interventions.',
    usedBy: 'Ward nurse, ICU nurse, wound-care nurse',
    voiceRule: 'The nurse may dictate mobility, moisture, activity, nutrition, sensory perception, friction, and existing skin findings. Do not invent skin status if not dictated.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time', 'Assessment reason'] },
      { title: 'Braden Domains', fields: ['Sensory perception score', 'Moisture score', 'Activity score', 'Mobility score', 'Nutrition score', 'Friction / shear score'] },
      { title: 'Skin Assessment', fields: ['Pressure areas inspected', 'Redness / wound / blister', 'Moisture or incontinence concern', 'Existing dressing / wound care'] },
      { title: 'Prevention Plan', checks: ['Repositioning schedule', 'Pressure-relieving mattress / cushion', 'Skin kept clean and dry', 'Nutrition support', 'Heel protection', 'Wound-care referral if needed'] },
      { title: 'Nurse Verification', fields: ['Total Braden score', 'Risk category', 'Nurse name and ID', 'Next reassessment time'] }
    ]
  },
  restraint: {
    title: 'Restraint Monitoring Form (Physical and Chemical)',
    purpose: 'Document indication, authorization, monitoring, release checks, and safety review for restraint use.',
    usedBy: 'Ward nurse, ICU nurse, supervisor',
    voiceRule: 'Capture only the reason, type of restraint, monitoring observations, release checks, skin checks, and doctor review that the nurse dictates. Do not justify restraint automatically.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time'] },
      { title: 'Restraint Details', fields: ['Type: physical / chemical / both', 'Reason / indication', 'Doctor order / authorization', 'Consent / relative informed if applicable'] },
      { title: 'Monitoring', fields: ['Sensorium / agitation level', 'Circulation and skin under restraint', 'Food / fluid / toileting needs', 'Release and range-of-motion check', 'Fall or injury prevention'] },
      { title: 'Review and Discontinuation', fields: ['Alternatives attempted', 'Need for continuation', 'Doctor / supervisor review', 'Time restraint removed'] },
      { title: 'Nurse Verification', fields: ['Nurse name and ID', 'Monitoring interval', 'Remarks', 'Signature'] }
    ]
  },
  rhpassWard: {
    title: 'RHPASS WARD',
    purpose: 'Assess ward patient acuity and nursing dependency for staffing and prioritization.',
    usedBy: 'Ward nurse, ward in-charge, nursing supervisor',
    voiceRule: 'The nurse may dictate mobility, fall risk, feeding, elimination, oxygen, lines, wounds, monitoring frequency, and dependency. Scores should be nurse-entered or verified.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time', 'Reason for reassessment'] },
      { title: 'Dependency Areas', fields: ['Mobility / fall risk', 'Feeding / nutrition support', 'Elimination / catheter care', 'Respiratory support', 'Lines / drains / tubes / wounds', 'Medication or infusion complexity'] },
      { title: 'Monitoring Requirement', fields: ['Vital frequency', 'Neurological / glucose / intake-output monitoring', 'Procedure / transfer pending', 'Isolation or infection-control need'] },
      { title: 'Acuity Result', fields: ['Total score', 'Acuity category', 'Recommended nurse ratio', 'Supervisor verification'] }
    ]
  },
  neuro1: {
    title: 'Adult Neurological Assessment Form - PART 1',
    purpose: 'Document core neurological observations including consciousness, GCS, pupils, and limb power.',
    usedBy: 'Ward nurse, ICU nurse, neurology nurse',
    voiceRule: 'The nurse may dictate sensorium, orientation, GCS, pupils, limb power, speech, swallowing, seizure activity, and observation frequency. Preserve exact abnormal findings.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time'] },
      { title: 'Consciousness and GCS', fields: ['Alert / drowsy / confused / unconscious', 'Orientation', 'Eye response', 'Verbal response', 'Motor response', 'Total GCS'] },
      { title: 'Pupils and Cranial Cues', fields: ['Right pupil size / reaction', 'Left pupil size / reaction', 'Pupil asymmetry', 'Speech / swallowing concern'] },
      { title: 'Motor Assessment', fields: ['Right upper limb power', 'Left upper limb power', 'Right lower limb power', 'Left lower limb power', 'New weakness or change'] },
      { title: 'Escalation', fields: ['Doctor informed', 'Neuro observation frequency', 'Pending CT / MRI / review', 'Remarks'] }
    ]
  },
  neuro2: {
    title: 'Adult Neurological Assessment Form - Part 2',
    purpose: 'Continue neurological assessment with trend, safety, devices, feeding route, and pending neurological care.',
    usedBy: 'Ward nurse, ICU nurse, neurology nurse',
    voiceRule: 'The nurse may dictate comparison with previous shift, device care, feeding route, aspiration risk, mobility safety, and pending neuro review. Do not add normal findings unless dictated.',
    sections: [
      { title: 'Neurological Trend', fields: ['Compared with previous shift', 'Improving / same / worsening', 'Headache / vomiting / seizure', 'Behavior or agitation'] },
      { title: 'Feeding and Aspiration Risk', fields: ['Oral / Ryle tube / PEG / NPO', 'Swallow concern', 'Aspiration precautions', 'Feeding tolerance'] },
      { title: 'Devices and Support', fields: ['IV line', 'Catheter', 'Drain / tube', 'Oxygen support', 'Restraint if applicable'] },
      { title: 'Safety and Rehabilitation', fields: ['Fall risk', 'Mobility status', 'Physiotherapy plan', 'Pressure-area care'] },
      { title: 'Pending / Escalation', fields: ['Pending investigation', 'Doctor review', 'Escalation trigger', 'Nurse verification'] }
    ]
  },
  inHouseTransfer: {
    title: 'In House Transfer',
    purpose: 'Prepare and document safe transfer between hospital areas.',
    usedBy: 'Ward nurse, ICU nurse, transfer nurse, receiving unit nurse',
    voiceRule: 'The nurse may dictate source, destination, reason, stability, lines, oxygen, documents, consent, reports, medications, and receiving handover. Keep pending items visible.',
    sections: [
      { title: 'Transfer Identification', fields: ['Patient name', 'UHID', 'From unit / bed', 'To unit / bed', 'Date and time', 'Reason for transfer'] },
      { title: 'Clinical Stability', fields: ['Current vitals / stability', 'Oxygen or monitoring need', 'Pain / sensorium concern', 'Infection-control precaution'] },
      { title: 'Lines, Devices, and Documents', checks: ['IV line secured', 'Catheter / drain / tube secured', 'Oxygen cylinder / device arranged', 'Case sheet sent', 'Reports sent', 'Consent sent', 'Medication / infusion sent'] },
      { title: 'Handover', fields: ['Sending nurse', 'Receiving nurse / unit', 'Pending tasks', 'Remarks'] }
    ]
  },
  movement: {
    title: 'Patient Movement Form',
    purpose: 'Track patient movement for investigation, procedure, transfer, OT, cath lab, imaging, or return to ward.',
    usedBy: 'Ward nurse, transport team, OT / cath lab / imaging staff',
    voiceRule: 'The nurse may dictate movement destination, reason, time out, escort, equipment, documents, and return status. Do not assume arrival or return unless dictated.',
    sections: [
      { title: 'Movement Details', fields: ['Patient name', 'UHID', 'Ward / room / bed', 'Destination', 'Reason for movement', 'Date and time out'] },
      { title: 'Preparation Checklist', checks: ['Patient identity verified', 'Procedure / investigation request checked', 'Consent if required', 'Reports / file sent', 'IV line secured', 'Oxygen / monitor arranged', 'Escort assigned'] },
      { title: 'During Movement', fields: ['Accompanying staff', 'Equipment sent', 'Patient condition during transfer', 'Delay or issue noted'] },
      { title: 'Return / Completion', fields: ['Return time', 'Condition on return', 'Report / instruction received', 'Pending follow-up', 'Nurse verification'] }
    ]
  },
  initialAdult: {
    title: 'Nursing Initial Assessment - Adult',
    purpose: 'Document the adult patient baseline nursing assessment at admission or first ward contact.',
    usedBy: 'Admission nurse, ward nurse, ICU nurse',
    voiceRule: 'The nurse may dictate presenting complaint, allergies, vitals, sensorium, pain, fall risk, skin, nutrition, elimination, devices, medication, and education needs. Keep unspoken fields blank.',
    sections: [
      { title: 'Patient Identification', fields: ['Patient name', 'UHID', 'Age / Gender', 'Ward / room / bed', 'Date and time of admission', 'Source of admission'] },
      { title: 'Initial Clinical Status', fields: ['Presenting complaint', 'Diagnosis / working problem if known', 'Allergy status', 'Vitals', 'Pain score', 'Sensorium'] },
      { title: 'System and Safety Assessment', fields: ['Respiratory status', 'Cardiovascular status', 'Neurological status', 'Mobility and fall risk', 'Skin / pressure injury risk', 'Nutrition / feeding', 'Urine / bowel status'] },
      { title: 'Lines, Medications, and Education', fields: ['IV line / catheter / tube / drain', 'Current medications or infusions', 'Investigations pending', 'Patient / family education', 'Bystander details if needed'] },
      { title: 'Nurse Verification', fields: ['Nurse name and ID', 'Immediate nursing concerns', 'Escalation done if any', 'Signature'] }
    ]
  }
};

function escapeHtml(value) {
  return String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function getTemplateId() {
  return document.body.dataset.template;
}

function renderField(field) {
  return `<div class="field"><label>${escapeHtml(field)}</label><div class="blank-line"></div></div>`;
}

function renderChecks(items) {
  return `<div class="field" style="grid-column: 1 / -1;"><label>Checklist</label><div class="check-list">${items.map(item => `<div class="check-item">${escapeHtml(item)}</div>`).join('')}</div></div>`;
}

function renderTemplate() {
  const template = TEMPLATE_FORMS[getTemplateId()];
  if (!template) return;
  document.title = `Nurse WOYZ - ${template.title}`;
  document.getElementById('pageTitle').textContent = template.title;
  document.getElementById('pageSubtitle').textContent = 'Clean documentation template for nurse dictation and manual entry.';
  document.getElementById('summary').innerHTML = `
    <div class="summary-card"><strong>Purpose</strong><span class="muted">${escapeHtml(template.purpose)}</span></div>
    <div class="summary-card"><strong>Used By</strong><span class="muted">${escapeHtml(template.usedBy)}</span></div>
    <div class="summary-card"><strong>Voice Rule</strong><span class="muted">${escapeHtml(template.voiceRule)}</span></div>
  `;
  document.getElementById('formSections').innerHTML = template.sections.map(section => `
    <section class="form-section">
      <h2>${escapeHtml(section.title)}</h2>
      <div class="field-grid">
        ${(section.fields || []).map(renderField).join('')}
        ${section.checks ? renderChecks(section.checks) : ''}
      </div>
    </section>
  `).join('');
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
  const text = [
    template.title,
    '',
    'Purpose: ' + template.purpose,
    'Used by: ' + template.usedBy,
    'Voice recognition rule: ' + template.voiceRule,
    '',
    ...template.sections.flatMap(section => [
      section.title.toUpperCase(),
      ...(section.fields || []).map(field => '- ' + field + ':'),
      ...(section.checks || []).map(item => '- [ ] ' + item),
      ''
    ])
  ].join('\n');
  navigator.clipboard.writeText(text).then(() => showToast('Template copied')).catch(() => showToast('Text ready to copy'));
}

renderTemplate();
