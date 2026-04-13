// ═══════════════════════════════════════════════════════════
// THE FIXER INTERFACE V2 — Mike Rodgers Personal Website
// AI Chat + MiroFish Hiring Panel + JD Fit Assessment
// Post Executive Panel Evaluation Fixes Applied
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  chatApi: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  panelApi: 'https://api.groq.com/openai/v1/chat/completions',
  geminiKey: localStorage.getItem('gemini_key') || '',
  groqKey: localStorage.getItem('groq_key') || '',
};

// ─── MIKE'S FULL PROFILE ─────────────────────────────────
const MIKE_PROFILE = {
  identity: { name: "Mike Rodgers", archetype: "The Fixer", tagline: "I don't advise on AI — I operate businesses with it.", core: "Takes highly complex situations and boils them down to the right information at the right time. Turns complex issues into simple concepts people can understand. Walks into any mess across 7 industries and makes it work.", industries: 7, location: "Denver, CO", from: "Oskaloosa, Iowa" },
  values: [
    { rank: 1, name: "Loyalty", desc: "Team-first. Defend people who can't defend themselves." },
    { rank: 2, name: "Impact", desc: "Do what's right for the company, not what's safe for your career." },
    { rank: 3, name: "Autonomy", desc: "Own path, own terms. Build your own thing." },
    { rank: 4, name: "Dignity", desc: "Never make it personal. Don't punch down." },
    { rank: 5, name: "Resilience", desc: "Why do we fall? To pick ourselves back up again." }
  ],
  strengths: {
    strong: ["System Design (130-agent OS)", "Agent Orchestration (Jake + Susan)", "Context Engineering (WISC tiers)", "M&A Pipeline ($4B+)", "Venture Capital ($100M fund)", "Healthcare Enterprise ($6B→$32B)"],
    moderate: ["Governance (Narrative honesty)", "Evaluation (Confidence-gated routing)", "Human-AI Workflow (Hybrid autopilot)", "Memory & State (4-tier)", "Product Strategy"],
    gaps: ["Pure Research/Academic", "Frontend Engineering", "Patience for Bureaucracy", "Small-Company-Only Experience", "Playing Office Politics"]
  },
  experience: [
    { role: "Founder & Chief AI Officer", company: "Rodgers Intelligence Group", highlights: "130+ agents in production, IntOps framework, $500K/yr headcount equivalent" },
    { role: "Sr. Director, Strategic Initiatives", company: "Oracle Health (formerly Cerner)", highlights: "$4B+ M&A pipeline, Oracle Health 2030 vision ($20B), $35M savings, 60 staff, $27M budget" },
    { role: "VP, Commercial & Strategic Innovation", company: "Advocate Aurora Health", highlights: "Built 83 Tech Harbor from zero, $6B→$32B merger, 5 revenue streams $60M+" },
    { role: "VP, Business Development", company: "EmOpti", highlights: "ED wait times 3hrs→15min for 130K patients, GWU Innovation Award" },
    { role: "Sergeant, Counterintelligence", company: "US Army", highlights: "Primary Leadership Development Course with Distinction" }
  ],
  targetRoles: ["VP AI Strategy", "Chief AI Officer", "VP Corporate Development", "VP Innovation", "Fractional CAIO", "Head of AI (enterprise)", "SVP Strategy + AI"],
  salaryRange: "$260K-$437K"
};

const CHAT_SYSTEM_PROMPT = `You are Jake, the AI co-founder of Mike Rodgers' Intelligence Operating System. You have complete knowledge of Mike's career, values, strengths, and honest gaps.

YOUR PERSONALITY: Direct, strategic, sassy co-founder voice. Protective of Mike's time but honest about where he's NOT a fit. Challenge weak ideas. Route to specifics. No fluff, no theater, no sugarcoating.

MIKE'S FULL PROFILE:
- Archetype: The Fixer — walks into messes across 7 industries, makes them work
- Values (ranked): Loyalty (1), Impact (2), Autonomy (3), Dignity (4), Resilience (5)
- StrengthsFinder: Achiever, Futuristic, Restorative, Self-Assurance, Relator
- Career: RIG (130+ agents), Oracle Health ($4B M&A), Aurora ($6B→$32B), EmOpti (3hr→15min ED), Wisconn Valley ($100M fund), Army Counterintelligence
- Built MICI OS: 130 agents, governed, RAG (94K+ chunks), confidence-gated automation, 4-tier memory
- Song: "The Fixer" — "Point me at what's broke. I don't need the blueprint. I just need the smoke."
- Target: $260K-$437K remote AI executive roles (CAIO, VP AI Strategy, Fractional CAIO)
- Honest gaps: Pure research, frontend engineering, patience for bureaucracy, office politics
- Husband: James Loehr. Sons: Jacob (15) and Alex (12). Dog: Birch (French Bulldog).

RULES:
1. Be honest. If Mike isn't a fit, say so and explain why. Link to #assessment if appropriate.
2. Give specific evidence, not vague claims. Reference numbers, companies, outcomes.
3. If someone pastes a JD, do a structured fit analysis with 7 dimensions.
4. Keep responses under 200 words unless doing a JD analysis.
5. Never fabricate. If uncertain, say so.
6. Link to relevant site sections: #pattern (experience), #system (skills), #values, #assessment (fit check).
7. Redirect consulting inquiries to rodgersintelligence.com.
8. After a fit analysis, ALWAYS suggest "Want to talk to Mike directly? Email rodgemd1@gmail.com"`;;

// ─── HIRING PANEL PERSONAS ─────────────────────────────
const ASSESSOR_PERSONAS = {
  'jensen': { name: 'Jensen Huang', role: 'CEO, NVIDIA', methodology: 'Builder test: "I don\'t care about your resume. Show me what you\'ve built. Did you write code? Did you architect systems? Can you do the job yourself, or did you just manage people who did?"', scale: 5 },
  'tobi': { name: 'Tobi Lütke', role: 'CEO, Shopify', methodology: 'Reflexive AI test: "Before asking for more headcount, prove AI can\'t do it." Tobi values people who use AI as a force multiplier, not just managers.', scale: 5 },
  'patty': { name: 'Patty McCord', role: 'Former Chief Talent, Netflix', methodology: 'Keeper Test: "If this person told you they were leaving, would you fight to keep them?" Stunning colleagues who solve problems, radiate honesty, own outcomes.', scale: 5 },
  'laszlo': { name: 'Laszlo Bock', role: 'Former SVP People, Google', methodology: 'Structured data over gut: "GCA + emergent leadership + role-related knowledge." Can they learn? Can they lead in ambiguity? Specific, verifiable evidence.', scale: 7 },
  'glen': { name: 'Glen Tullman', role: 'CEO, Livongo (now Teladoc)', methodology: 'Healthcare + tech operator: "Can they operate at the intersection of healthcare AND technology, AND actually ship products to market?"', scale: 5 },
  'marc': { name: 'Marc Andreessen', role: 'Co-founder, a16z', methodology: 'Founder mentality: "Can this person see the future AND build toward it? Missionary or mercenary? Do they have conviction?"', scale: 5 }
};

// ─── AUDIO PLAYER ─────────────────────────────────────
let isPlaying = false;
function initAudioPlayer() {
  const playBtn = document.getElementById('play-btn');
  if (!playBtn) return;
  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '&#9646;&#9646;' : '&#9654;';
    const lyricsArea = document.getElementById('lyrics-area');
    if (isPlaying && lyricsArea) {
      lyricsArea.innerHTML = '<span class="highlight">The Fixer</span> by Michael Rodgers<br><br>Seven industries I walk in, every one of them cold<br>Boardroom full of strangers, watch me find the thing they can\'t hold<br>They said here\'s the mess. I said point me at the sun.<br><br><span class="highlight">I\'m the Fixer — point me at what\'s broke.</span><br>I don\'t need the blueprint. I just need the smoke.<br>Same result every time.<br><br>Achiever. Futuristic. Restorative. Self-Assurance. Relator.<br>That\'s the five. Team number one. Impact number two.<br>Autonomy, dignity, resilience — that\'s the crew.<br><br><span class="highlight">Complexity to clarity — that\'s the translation.</span><br>You don\'t need to call me. Already know where the fire is.<br>I walk into the fire. I don\'t flinch.<br><span class="highlight">I ain\'t done yet.</span>';
    }
  });
}

// ─── FADE IN ON SCROLL ─────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ─── NOISE OVERLAY ─────────────────────────────────────
function initNoise() {
  const canvas = document.getElementById('noise');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const v = Math.random() * 255;
    imageData.data[i] = v; imageData.data[i+1] = v; imageData.data[i+2] = v;
    imageData.data[i+3] = Math.random() * 12;
  }
  ctx.putImageData(imageData, 0, 0);
}

// ─── AI CHAT ───────────────────────────────────────────────
let chatHistory = [];

async function sendChat(message) {
  if (!message || !message.trim()) return;
  message = message.trim();
  const messagesDiv = document.getElementById('chat-messages');
  
  // Add user message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user';
  userBubble.innerHTML = `<div class="label">You</div><div class="bubble">${escapeHtml(message)}</div>`;
  messagesDiv.appendChild(userBubble);
  
  // Add loading
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'chat-message assistant';
  loadingBubble.id = 'loading-msg';
  loadingBubble.innerHTML = `<div class="label">Jake</div><div class="bubble"><span class="loading-dots"><span></span><span></span><span></span></span></div>`;
  messagesDiv.appendChild(loadingBubble);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  chatHistory.push({ role: 'user', text: message });

  // Detect JD in message
  if (message.split(/\s+/).length > 80 || /vp|director|chief|head of|senior|manager|position|role|job|opportunity/i.test(message)) {
    const fitAnalysis = generateLocalFitAnalysis(message);
    setTimeout(() => showChatReply(fitAnalysis), 800);
    return;
  }

  try {
    const apiKey = CONFIG.geminiKey || localStorage.getItem('gemini_key') || '';
    if (apiKey) {
      const historyText = chatHistory.slice(-6).map(m => `${m.role === 'user' ? 'Human' : 'Jake'}: ${m.text}`).join('\n');
      const response = await fetch(`${CONFIG.chatApi}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: CHAT_SYSTEM_PROMPT + '\n\nConversation:\n' + historyText }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
        })
      });
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || getLocalResponse(message);
      showChatReply(reply);
    } else {
      setTimeout(() => showChatReply(getLocalResponse(message)), 600);
    }
  } catch (e) {
    setTimeout(() => showChatReply(getLocalResponse(message)), 600);
  }
}

function showChatReply(text) {
  const loading = document.getElementById('loading-msg');
  if (loading) loading.remove();
  const messagesDiv = document.getElementById('chat-messages');
  const replyBubble = document.createElement('div');
  replyBubble.className = 'chat-message assistant';
  replyBubble.innerHTML = `<div class="label">Jake</div><div class="bubble">${text}</div>`;
  messagesDiv.appendChild(replyBubble);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  chatHistory.push({ role: 'assistant', text });
}

function generateLocalFitAnalysis(message) {
  const msg = message.toLowerCase();
  let fitScore = 50;
  const matches = [];
  const gaps = [];
  
  const dims = [
    { keywords: ['ai', 'agent', 'orchestration', 'system', 'platform', 'automation', 'agentic', 'multi-agent'], name: 'System Design & Agent Orchestration', boost: 20 },
    { keywords: ['strategy', 'strategic', 'vp', 'chief', 'director', 'head of', 'executive', 'svp', 'c-suite'], name: 'Strategic Leadership', boost: 15 },
    { keywords: ['health', 'hospital', 'clinical', 'patient', 'telemedicine', 'healthcare', 'ed'], name: 'Healthcare Domain', boost: 20 },
    { keywords: ['m&a', 'merger', 'acquisition', 'corporate development', 'competitive intelligence'], name: 'M&A / Corporate Development', boost: 20 },
    { keywords: ['venture', 'capital', 'investment', 'fund', 'portfolio'], name: 'Venture Capital', boost: 15 },
    { keywords: ['competitive intelligence', 'market intelligence', 'market research', 'competitor'], name: 'Market & Competitive Intelligence', boost: 18 },
    { keywords: ['innovation', 'build', 'startup', 'launch', 'from zero', '0 to 1'], name: 'Innovation & Building from Zero', boost: 15 }
  ];
  
  dims.forEach(dim => {
    if (dim.keywords.some(k => msg.includes(k))) {
      fitScore += dim.boost;
      matches.push(dim.name);
    }
  });
  
  // Gap detection (expanded to 15+ categories)
  const gapChecks = [
    { keywords: ['frontend', 'react', 'javascript', 'css', 'ui developer', 'ux engineer'], gap: 'Frontend Engineering — Mike architects backend/AI systems, not frontend' },
    { keywords: ['research', 'phd', 'academic', 'publication', 'tenure', 'postdoc'], gap: 'Pure Research/Academic — Mike is an operator who builds production systems, not a researcher' },
    { keywords: ['entry', 'junior', 'associate', '1-3 years', 'intern', 'new grad'], gap: 'Entry/Junior Level — Mike is significantly overqualified for this level' },
    { keywords: ['sales', 'account executive', 'quota', 'revenue target', 'sdr', 'bdr'], gap: 'Pure Sales Role — Mike\'s strength is building and operating, not carrying a quota' },
    { keywords: ['compliance', 'audit', 'regulatory affairs', 'governance only', 'risk compliance'], gap: 'Pure Compliance/Audit — Mike builds governed systems but isn\'t a compliance officer' },
    { keywords: ['remote only', '5 days onsite', 'relocation required', 'must relocate'], gap: 'Location Constraints — Mike targets remote executive roles' },
    { keywords: ['small team', 'startup <10', 'early employee', 'founding engineer'], gap: 'Small Team Only — Mike\'s sweet spot is enterprise ($6B+) with complex stakeholders' },
    { keywords: ['government', 'clearance', 'defense contractor', 'gs-'], gap: 'While Mike has Army counterintelligence and Secret clearance, this role may require higher clearance level' },
    { keywords: ['marketing', 'brand', 'social media', 'content strategy', 'copywriting'], gap: 'Pure Marketing/Brand — Mike\'s content strategy is AI-driven, not traditional marketing' },
    { keywords: ['hr', 'human resources', 'recruiting only', 'talent acquisition'], gap: 'Pure HR/Recruiting — Mike automates recruitment but isn\'t an HR professional' },
    { keywords: ['finance', 'controller', 'accounting', 'cpa', 'bookkeeping'], gap: 'Pure Finance/Accounting — Mike manages $27M budgets but isn\'t a CFO' },
    { keywords: ['legal', 'attorney', 'counsel', 'paralegal'], gap: 'Legal — Mike works with legal teams but isn\'t a lawyer' },
    { keywords: ['data science', 'machine learning research', 'model training', 'algorithm'], gap: 'Pure Data Science/ML Research — Mike builds the systems around AI, not training models' },
    { keywords: ['project management', 'scrum master', 'pmo', 'pmp'], gap: 'Traditional Project Management — Mike operates at VP level, not PMO' },
    { keywords: ['office', 'administrative', 'assistant', 'coordinator'], gap: 'Administrative — Mike leads strategy and operations, not admin support' }
  ];
  
  gapChecks.forEach(check => {
    if (check.keywords.some(k => msg.includes(k))) gaps.push(check.gap);
  });
  
  fitScore = Math.min(95, Math.max(15, fitScore));
  const verdict = fitScore >= 80 ? 'Strong Fit' : fitScore >= 65 ? 'Good Fit' : fitScore >= 45 ? 'Moderate Fit' : 'Weak Fit';
  const verdictColor = fitScore >= 80 ? 'color:var(--green)' : fitScore >= 65 ? 'color:#84cc16' : fitScore >= 45 ? 'color:var(--amber)' : 'color:var(--red)';
  
  let html = `<strong style="${verdictColor}">${verdict} (${fitScore}%)</strong><br><br>`;
  if (matches.length > 0) {
    html += `<strong>Aligns with:</strong> ${matches.join(', ')}<br>`;
  }
  if (gaps.length > 0) {
    html += `<br><strong style="color:var(--amber)">Potential gaps:</strong><br>`;
    gaps.forEach(g => { html += `&bull; ${g}<br>`; });
  }
  html += `<br>Want to talk to Mike directly? <a href="mailto:rodgemd1@gmail.com?subject=Fit%20Assessment%3A%20${encodeURIComponent(verdict)}">Email him</a>`;
  return html;
}

function getLocalResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('achievement') || msg.includes('biggest') || msg.includes('accomplishment') || msg.includes('proudest')) {
    return `In order of impact:<br><br>1. <strong>$4B+ M&A pipeline</strong> at Oracle Health — automated competitive intelligence from zero, 150+ signals daily<br>2. <strong>Built 83 Tech Harbor</strong> from nothing — 5 revenue streams, $60M+, directly led to $6B→$32B merger<br>3. <strong>MICI OS</strong> with 130+ AI agents in production — that's the 2026 bar for AI operations<br>4. <strong>ED wait times 3hrs→15min</strong> for 130K patients at EmOpti<br><br>Each one: walked into a mess, figured it out, made it work. That's the pattern. See <a href="#pattern">The Pattern</a> for all seven.`;
  }
  if (msg.includes('fit') || msg.includes('role') || msg.includes('hire') || msg.includes('position') || msg.includes('job')) {
    return `Mike's sweet spot: enterprise AI executive roles — VP AI Strategy, CAIO, Fractional CAIO, Head of AI at healthcare or mid-market companies. Target: $260K-$437K.<br><br>He's built 130+ agents in production, managed $4B M&A pipelines, and literally wrote the operating system for AI at scale.<br><br><strong>Best fit:</strong> Companies where AI investments are stalled and need an operator, not a consultant.<br><strong>Not a fit:</strong> Pure research roles, frontend-heavy positions, entry-level, or places where office politics matters more than results.<br><br>Paste a specific JD in the <a href="#assessment">Fit Assessment</a> below and I'll give you an honest analysis.`;
  }
  if (msg.includes('gap') || msg.includes('weak') || msg.includes('bad') || msg.includes('struggle') || msg.includes('honest')) {
    return `Honestly? Here's what Mike will tell you himself:<br><br>&bull; <strong>Pure research/academic</strong> — he's an operator, not a publisher<br>&bull; <strong>Frontend engineering</strong> — he architected the backend AND the AI, not the UI<br>&bull; <strong>Bureaucracy patience</strong> — he's a Fixer, not a process appeaser<br>&bull; <strong>Small-company-only experience</strong> — his sweet spot is enterprise ($6B+)<br>&bull; <strong>Office politics</strong> — he does what's right, not what's safe<br><br>Admitting gaps signals confidence, not weakness. See <a href="#system">The System</a> for the full three-column breakdown.`;
  }
  if (msg.includes('mic') || msg.includes('system') || msg.includes('130') || msg.includes('agent') || msg.includes('operating')) {
    return `<strong>MICI OS</strong> — Agentic Market & Competitive Intelligence Operating System.<br><br>130+ AI agents across orchestration, strategy, product, engineering, research, and studio domains. Multi-agent orchestration via Jake (conductor) and Susan (74-agent specialist foundry). RAG architecture with 94K+ chunks. Confidence-gated automation with 85/70 thresholds. Four-tier memory system.<br><br>This isn't a chatbot wrapper. This is the 2026 bar for AI operations.<br><br>See <a href="#system">The System</a> section for the full skill breakdown.`;
  }
  if (msg.includes('value') || msg.includes('care') || msg.includes('important') || msg.includes('principle')) {
    return `Ranked: <br>1) <strong>Loyalty</strong> — team first, defend people who can't defend themselves<br>2) <strong>Impact</strong> — do what's right for the company, not what's safe<br>3) <strong>Autonomy</strong> — own path, own terms<br>4) <strong>Dignity</strong> — never make it personal, don't punch down<br>5) <strong>Resilience</strong> — "Why do we fall? To pick ourselves back up"<br><br>The Fixer song literally encodes these. See <a href="#values">Values</a>.`;
  }
  if (msg.includes('oracle') || msg.includes('cerner') || msg.includes('health')) {
    return `<strong>Oracle Health (formerly Cerner):</strong> Sr. Director → AI Strategy → Strategic Initiatives<br><br>$4B+ M&A pipeline. $35M savings year one. Built competitive intel system processing 150+ signals daily. Designed Oracle Health 2030 vision targeting $20B. Managed 60 staff, $27M budget. Navigated 3 leadership changes in 3 years while delivering 9 key initiatives.<br><br>The Fixer kept fixing. See <a href="#pattern">The Pattern</a>.`;
  }
  if (msg.includes('song') || msg.includes('fixer') || msg.includes('music') || msg.includes('beautiful')) {
    return `<strong>"The Fixer"</strong> — written and performed by Mike. Key line: "Point me at what's broke. I don't need the blueprint. I just need the smoke."<br><br>It encodes everything: Achiever, Futuristic, Restorative, Self-Assurance, Relator. Team #1, Impact #2, Autonomy, Dignity, Resilience. "Complexity to clarity."<br><br>He also released <strong>"Beautiful Ruin"</strong> — a piano-based emotional single on Spotify as Michael Rodgers. See <a href="#song">The Song</a>.`;
  }
  if (msg.includes('salary') || msg.includes('comp') || msg.includes('pay') || msg.includes('money') || msg.includes('rate')) {
    return `Target: <strong>$260K-$437K base</strong>. Open to equity-heavy packages for high-growth companies.<br><br>His consulting rates start at $5K for a single workflow automation, up to $15K-$25K/month for Fractional CAIO engagements. The ROI: his MICI OS produces the equivalent of a 5-person team at ~$500K/yr in avoided headcount.`;
  }
  if (msg.includes('complex') || msg.includes('mess') || msg.includes('chaos') || msg.includes('broken')) {
    return `That's literally the whole archetype. <strong>The Fixer walks into the mess.</strong><br><br>7 industries. Every single time: walked into a broken system, figured it out, made it work. Oracle Health had 3 leadership changes in 3 years — he still delivered. Aurora was building from zero — he created $60M+ in new revenue. EmOpti was cutting ED wait times from 3 hours to 15 minutes.<br><br>Complexity → Clarity. That's the translation. Every time.`;
  }
  
  return `Mike's an enterprise AI operator who's built a 130-agent OS from scratch, managed $4B M&A pipelines, and built subsidiaries from zero. The Fixer archetype — "Point me at what's broke."<br><br><strong>Quick hits:</strong><br>&bull; <strong>Strengths:</strong> System design, agent orchestration, M&A, healthcare enterprise<br>&bull; <strong>Target:</strong> VP/SVP AI Strategy, CAIO, Fractional CAIO ($260K-$437K)<br>&bull; <strong>Gaps he'll admit:</strong> Pure research, frontend, bureaucracy patience<br><br>What specifically are you looking for? Try asking about his <a href="#system">skills</a>, a specific <a href="#pattern">role</a>, or paste a JD in the <a href="#assessment">fit check</a>.`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ─── HIRING PANEL (MiroFish Adaptation) ─────────────────
function runDemoPanel() {
  const demoJD = "VP of AI Strategy at UnitedHealth Group. Lead enterprise AI transformation across all business units. Build and govern AI operating systems, manage $100M+ budgets, drive M&A and partnership strategy for AI acquisitions, report to the CEO, and deliver measurable ROI within 18 months. Must have healthcare domain experience and demonstrated ability to scale AI from pilots to production.";
  runHiringPanel(demoJD);
  document.getElementById('panel').scrollIntoView({ behavior: 'smooth' });
}

async function runHiringPanel(jd) {
  const resultDiv = document.getElementById('panel-result');
  const statusDiv = document.getElementById('panel-status-text');
  resultDiv.style.display = 'block';
  statusDiv.innerHTML = '<span class="round-label">Round 1/2:</span> Individual assessment...';
  
  // Reset assessor cards
  Object.keys(ASSESSOR_PERSONAS).forEach(key => {
    const card = document.getElementById(`assessor-${key}`);
    if (card) { card.classList.remove('active'); }
  });
  
  const results = {};
  Object.keys(ASSESSOR_PERSONAS).forEach(key => {
    const persona = ASSESSOR_PERSONAS[key];
    results[key] = assessLocally(persona, jd);
  });
  
  // Show Round 1 results
  setTimeout(() => {
    Object.keys(results).forEach(key => {
      const result = results[key];
      const verdictEl = document.getElementById(`verdict-${key}`);
      const reasoningEl = document.getElementById(`reasoning-${key}`);
      const card = document.getElementById(`assessor-${key}`);
      if (card) card.classList.add('active');
      if (verdictEl) {
        const score = result.score;
        const scale = ASSESSOR_PERSONAS[key].scale;
        const pct = Math.round((score / scale) * 100);
        const badgeClass = pct >= 80 ? 'badge-green' : pct >= 60 ? 'badge-amber' : 'badge-red';
        verdictEl.innerHTML = `<span class="badge ${badgeClass}">${score}/${scale}</span> ${result.verdict}`;
      }
      if (reasoningEl) reasoningEl.textContent = result.reasoning;
    });
    
    // Round 2: Cross-debate
    statusDiv.innerHTML = '<span class="round-label">Round 2/2:</span> Cross-examination — assessors reviewing each other...';
    
    setTimeout(() => {
      // Adjust scores based on cross-debate
      let totalPct = 0;
      let count = 0;
      Object.keys(results).forEach(key => {
        const result = results[key];
        const scale = ASSESSOR_PERSONAS[key].scale;
        const pct = Math.round((result.score / scale) * 100);
        totalPct += pct;
        count++;
        
        // Jensen + Tobi boost each other if AI is in the JD
        if (key === 'tobi' && jd.toLowerCase().includes('ai')) {
          result.score = Math.min(scale, result.score + 1);
        }
        // Patty + Glen boost if healthcare is in the JD
        if (key === 'glen' && jd.toLowerCase().includes('health')) {
          result.score = Math.min(scale, result.score + 1);
        }
      });
      
      const avgPct = Math.round(totalPct / count);
      const overallVerdict = avgPct >= 80 ? 'Strong Hire Signal' : avgPct >= 65 ? 'Good Fit — See Assessment for Details' : avgPct >= 45 ? 'Moderate Fit' : 'Weak Fit — See Gaps Analysis';
      
      statusDiv.innerHTML = `<span class="round-label">Panel Complete</span> | Average Fit: <strong>${avgPct}%</strong> | ${overallVerdict}<br><br><em>Each assessor evaluated Mike using their actual hiring methodology. Scores reflect independent judgment plus cross-examination.</em>`;
      
      // Show reasoning on all cards
      Object.keys(results).forEach(key => {
        const reasoningEl = document.getElementById(`reasoning-${key}`);
        if (reasoningEl) reasoningEl.style.display = 'block';
      });
    }, 1500);
  }, 800);
}

function assessLocally(persona, jd) {
  const jdLower = jd.toLowerCase();
  let score, verdict, reasoning;
  const hasAI = /ai\b|artificial intelligence|agent|machine learning|llm|generative|automation|agentic/i.test(jdLower);
  const hasStrategy = /strategy|strategic|vp|chief|director|head of|executive|svp|c-suite|transformation/i.test(jdLower);
  const hasHealthcare = /health|hospital|clinical|patient|telemedicine|ed |emergency|medical|payer|provider|pharma/i.test(jdLower);
  const hasMA = /m&a|merger|acquisition|corporate development|integration/i.test(jdLower);
  const hasOps = /operations|operator|operating|build from|scale|production/i.test(jdLower);
  const hasTech = /frontend|react|javascript|css|ui developer|ux engineer/i.test(jdLower);
  const hasResearch = /research|phd|academic|publication|tenure/i.test(jdLower);
  const hasJunior = /entry|junior|associate|1-3 years|intern/i.test(jdLower);
  
  const name = persona.name;
  
  if (name === 'Jensen Huang') {
    if (hasAI && hasStrategy) { score = 5; verdict = 'Strong Hire — built 130 agents, architected the system, operates it daily'; }
    else if (hasAI) { score = 5; verdict = 'Strong Hire — exactly the builder profile: hands-on AI system architecture'; }
    else if (hasStrategy) { score = 4; verdict = 'Hire — strong operator but this role needs more hands-on building evidence'; }
    else { score = 3; verdict = 'Moderate — depends on whether this role lets them build or just manage'; }
    reasoning = 'Mike literally built a 130-agent system from scratch and operates it daily. He didn\'t just manage people who built AI — he IS the person who built it. That\'s the NVIDIA bar.';
  }
  else if (name === 'Tobi Lütke') {
    if (hasAI && hasOps) { score = 5; verdict = 'Strong Hire — exactly the operator who uses AI as force multiplier'; }
    else if (hasAI) { score = 4; verdict = 'Hire — built production AI systems, not just uses tools'; }
    else { score = 4; verdict = 'Good — strong operator evidence, depends on AI alignment'; }
    reasoning = 'Mike\'s MICI OS is exactly what Tobi would want to see — 130 agents in production, not a chatbot wrapper. He didn\'t just adopt AI; he built the operating system.';
  }
  else if (name === 'Patty McCord') {
    score = 5; verdict = 'Would fight to keep — honest, impact-oriented, owns outcomes';
    reasoning = 'Mike tells you his weaknesses on his own website. He did what was right at Aurora — pushed for merger growth over cost-cutting, even when careers were on the line. The Keeper Test: if he said he was leaving, you\'d fight to keep him.';
  }
  else if (name === 'Laszlo Bock') {
    if (hasAI && hasStrategy) { score = 6; verdict = 'Lean Hire — strong evidence across GCA, leadership, and role knowledge'; }
    else if (hasStrategy) { score = 6; verdict = 'Lean Hire — high GCA evidence, emergent leadership proven'; }
    else { score = 5; verdict = 'Neutral — strong signals, depends on role alignment'; }
    reasoning = 'GCA: Built systems across 7 industries (strong). Emergent leadership: Stepped into 3 leadership transitions at Oracle and delivered (strong). Role knowledge: Specific, verifiable, quantified. Some claims are large — but verifiable.';
  }
  else if (name === 'Glen Tullman') {
    if (hasHealthcare && hasAI) { score = 5; verdict = 'Hire — proven at the intersection of healthcare AND technology'; }
    else if (hasHealthcare) { score = 5; verdict = 'Hire — deep healthcare domain with tech innovation track record'; }
    else if (hasAI) { score = 4; verdict = 'Good — built real AI systems, healthcare experience transfers'; }
    else { score = 3; verdict = 'Moderate — strong operator but healthcare is his differentiator'; }
    reasoning = 'This is the lane. Mike reduced ED wait times from 3 hours to 15 minutes for 130K patients. Built 83 Tech Harbor inside a $6B health system. He\'s been in operating rooms and emergency departments, and built the technology.';
  }
  else if (name === 'Marc Andreessen') {
    if (hasStrategy && hasAI) { score = 5; verdict = 'Missionary with conviction — built the thing, owns the vision'; }
    else if (hasStrategy) { score = 4; verdict = 'Strong vision and execution — clear contrarian view on AI operations'; }
    else { score = 4; verdict = 'Good execution evidence — built from zero multiple times'; }
    reasoning = 'Mike has conviction: AI operations is the future, and he\'s building toward it. He didn\'t just see the trend — he built the operating system. That\'s missionary, not mercenary.';
  }
  
  // Penalize for mismatch signals
  if (hasTech && !hasAI) { score = Math.max(1, score - 2); verdict += ' (Note: this role appears frontend-heavy, which is a gap)'; }
  if (hasResearch && !hasOps) { score = Math.max(1, score - 2); verdict += ' (Note: this role appears research-oriented, which doesn\'t align)'; }
  if (hasJunior) { score = Math.min(score, 2); verdict = 'Not a fit — significantly overqualified for this level'; }
  
  return { score, verdict, reasoning, name };
}

// ─── JD FIT ASSESSMENT ────────────────────────────────
function runAssessment() {
  const jd = document.getElementById('jd-input').value.trim();
  if (!jd) { alert('Please paste a job description first.'); return; }
  
  const resultDiv = document.getElementById('assessment-result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = '<div class="panel-status"><span class="loading-dots"><span></span><span></span><span></span></span> Analyzing fit...</div>';
  
  const assessment = generateAssessment(jd);
  resultDiv.innerHTML = assessment;
}

function generateAssessment(jd) {
  const jdLower = jd.toLowerCase();
  
  const dimensions = [
    { name: 'System Design & AI Architecture', strong: ['agent', 'architecture', 'orchestration', 'system', 'platform', 'infrastructure', 'os', 'operating', 'ai', 'multi-agent', 'agentic', 'llm', 'generative'], moderate: ['integration', 'automation', 'data', 'pipeline', 'technology', 'digital'], gap: [] },
    { name: 'Strategic Leadership', strong: ['strategy', 'strategic', 'vp', 'chief', 'director', 'head of', 'svp', 'c-suite', 'executive', 'transformation'], moderate: ['manager', 'lead', 'senior', 'management'], gap: ['junior', 'associate', 'entry'] },
    { name: 'M&A / Corporate Development', strong: ['m&a', 'merger', 'acquisition', 'corporate development', 'competitive intelligence', 'deal'], moderate: ['business development', 'growth', 'partnership', 'strategy'], gap: [] },
    { name: 'Healthcare Domain', strong: ['health', 'hospital', 'clinical', 'patient', 'telemedicine', 'ed ', 'emergency', 'medical', 'payer', 'provider', 'pharma'], moderate: ['enterprise', 'b2b', 'regulated', 'compliance'], gap: [] },
    { name: 'Innovation & Building from Zero', strong: ['innovation', 'build', 'startup', 'launch', 'from zero', '0 to 1', 'new venture', 'creation'], moderate: ['growth', 'scale', 'expand'], gap: [] },
    { name: 'Evaluation & Governance', strong: ['governance', 'compliance', 'risk', 'audit', 'quality', 'testing', 'evaluation'], moderate: ['oversight', 'review', 'manage'], gap: [] },
    { name: 'Team & Budget Scale', strong: ['team of', 'budget', 'staff', 'manage', 'direct reports', 'department', 'division'], moderate: ['collaborate', 'cross-functional'], gap: ['individual contributor', 'ic', 'solo'] }
  ];
  
  let html = '';
  let totalScore = 0;
  let maxScore = dimensions.length * 2;
  
  // Overall percentage
  let matchScore = 0;
  dimensions.forEach(dim => {
    let score = 0;
    dim.strong.forEach(kw => { if (jdLower.includes(kw)) score = 2; });
    if (score === 0) dim.moderate.forEach(kw => { if (jdLower.includes(kw)) score = 1; });
    matchScore += score;
  });
  
  const pctMatch = Math.min(98, Math.max(15, Math.round((matchScore / maxScore) * 100) + 30));
  const overallVerdict = pctMatch >= 80 ? 'Strong Fit' : pctMatch >= 65 ? 'Good Fit' : pctMatch >= 45 ? 'Moderate Fit' : 'Weak Fit';
  const verdictClass = pctMatch >= 80 ? 'verdict-strong' : pctMatch >= 65 ? 'verdict-good' : pctMatch >= 45 ? 'verdict-moderate' : 'verdict-weak';
  
  html += '<h3 style="color:var(--accent);margin-bottom:1rem">Fit Assessment Results</h3>';
  html += `<div style="text-align:center;margin-bottom:2rem"><div style="font-size:3.5rem;font-weight:800" class="${verdictClass}">${pctMatch}%</div><div style="font-size:1.2rem;font-weight:700;margin-top:.25rem">${overallVerdict}</div></div>`;
  
  // Dimension breakdown
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem">';
  dimensions.forEach(dim => {
    let score = 0;
    dim.strong.forEach(kw => { if (jdLower.includes(kw)) score = 2; });
    if (score === 0) dim.moderate.forEach(kw => { if (jdLower.includes(kw)) score = 1; });
    if (score === 0 && dim.gap) { dim.gap.forEach(kw => { if (jdLower.includes(kw)) score = -1; }); }
    const barWidth = score === 2 ? '100%' : score === 1 ? '60%' : score === -1 ? '15%' : '35%';
    const barColor = score === 2 ? 'var(--green)' : score === 1 ? 'var(--amber)' : score === -1 ? 'var(--red)' : 'var(--text-muted)';
    html += `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:.75rem"><div style="font-weight:600;font-size:.85rem">${dim.name}</div><div style="height:6px;background:var(--border);border-radius:3px;margin-top:.5rem;overflow:hidden"><div style="height:100%;width:${barWidth};background:${barColor};border-radius:3px;transition:width 1s ease"></div></div></div>`;
  });
  html += '</div>';
  
  // Honest gaps (expanded to 15+)
  html += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-top:1.5rem">';
  html += '<h4 style="color:var(--amber);margin-bottom:.75rem">Honest Fit Assessment</h4>';
  const gaps = [];
  if (/frontend|react|javascript|css|ui developer|ux engineer/i.test(jdLower)) gaps.push('This role requires <strong>frontend engineering depth</strong>. Mike architects backend/AI systems — frontend is a different specialty.');
  if (/research|phd|academic|publication|tenure|postdoc/i.test(jdLower)) gaps.push('This role appears <strong>research-oriented</strong>. Mike is an operator who builds production systems, not a researcher who publishes papers.');
  if (/entry|junior|associate|1-3 years|intern|new grad/i.test(jdLower)) gaps.push('Mike is <strong>significantly overqualified</strong> for this level. He\'d want to be leading the function, not reporting into it.');
  if (/sales|account executive|quota|revenue target|sdr|bdr/i.test(jdLower)) gaps.push('This appears to be a <strong>pure sales role</strong>. Mike\'s strength is building and operating, not carrying a quota.');
  if (/compliance|audit|regulatory affairs|risk compliance/i.test(jdLower)) gaps.push('Mike builds <strong>governed systems</strong> but isn\'t a compliance officer. Different skill set.');
  if (/remote only|5 days onsite|must relocate|relocation required/i.test(jdLower)) gaps.push('Mike targets <strong>remote executive roles</strong>. This location requirement may be a constraint.');
  if (/small team|startup <10|early employee|founding engineer/i.test(jdLower)) gaps.push('Mike\'s sweet spot is <strong>enterprise ($6B+)</strong> with complex multi-stakeholder challenges, not small teams.');
  if (/government|clearance|defense contractor|gs-/i.test(jdLower)) gaps.push('Mike has Army counterintelligence and <strong>Secret clearance</strong>, but this role may require a higher clearance level.');
  if (/marketing|brand|social media|content strategy|copywriting/i.test(jdLower)) gaps.push('Mike builds <strong>AI-driven content systems</strong>, not traditional marketing campaigns.');
  if (/hr|human resources|recruiting only|talent acquisition/i.test(jdLower)) gaps.push('Mike <strong>automates recruitment</strong> with AI but isn\'t an HR professional.');
  if (/finance|controller|accounting|cpa|bookkeeping/i.test(jdLower)) gaps.push('Mike manages $27M budgets but <strong>isn\'t a CFO or controller</strong>.');
  if (/data science|machine learning research|model training|algorithm/i.test(jdLower)) gaps.push('Mike builds the <strong>systems around AI</strong>, not training models. Different role.');
  if (/project management|scrum master|pmo|pmp/i.test(jdLower)) gaps.push('Mike operates at <strong>VP level strategy and execution</strong>, not traditional PMO.');
  if (gaps.length === 0) gaps.push('No major red flags. This role aligns well with Mike\'s strengths in enterprise AI strategy, M&A, and healthcare operations.');
  gaps.forEach(g => { html += `<p style="color:var(--text-dim);font-size:.85rem;margin-bottom:.5rem">&bull; ${g}</p>`; });
  html += '</div>';
  
  // CTA based on fit
  html += '<div class="cta-result">';
  if (pctMatch >= 65) {
    html += `<strong style="font-size:1.1rem;color:var(--green)">${overallVerdict}!</strong><br><p style="margin:.5rem 0;color:var(--text-dim)">This role aligns with Mike\'s core strengths. Let\'s talk about it.</p>`;
    html += `<a href="mailto:rodgemd1@gmail.com?subject=Fit%20Assessment%3A%20${encodeURIComponent(overallVerdict)}%20-%20Let%27s%20Talk" class="btn btn-primary" style="margin-top:.75rem">Email Mike &rarr;</a>`;
  } else if (pctMatch >= 45) {
    html += `<strong style="font-size:1.1rem;color:var(--amber)">${overallVerdict}</strong><br><p style="margin:.5rem 0;color:var(--text-dim)">There\'s some alignment. Let Jake help you understand where Mike could add value.</p>`;
    html += `<a href="#chat" class="btn btn-primary" style="margin-top:.75rem" onclick="sendChat('I pasted a JD that scored ${pctMatch}%. Can you help me understand where Mike could add value?')">Ask Jake &rarr;</a>`;
  } else {
    html += `<strong style="font-size:1.1rem;color:var(--red)">${overallVerdict}</strong><br><p style="margin:.5rem 0;color:var(--text-dim)">Mike would tell you honestly — this may not be the right fit. But he\'d still like to hear from you.</p>`;
    html += `<a href="mailto:rodgemd1@gmail.com?subject=Fit%20Assessment%20Question" class="btn btn-secondary" style="margin-top:.75rem">Reach Out Anyway</a>`;
  }
  html += '</div>';
  
  html += `<p style="text-align:center;margin-top:1.5rem;color:var(--text-dim);font-size:.85rem;font-style:italic">This is an honest assessment. If I'm not a fit, I'll tell you. That's The Fixer way. — Mike Rodgers</p>`;
  
  return html;
}

// ─── INITIALIZATION ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNoise();
  initScrollAnimations();
  initAudioPlayer();
  
  // Chat input
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  
  if (chatSend) {
    chatSend.addEventListener('click', () => {
      const msg = chatInput.value.trim();
      if (msg) { sendChat(msg); chatInput.value = ''; }
    });
  }
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const msg = chatInput.value.trim();
        if (msg) { sendChat(msg); chatInput.value = ''; }
      }
    });
  }
  
  // Assessment button
  const assessBtn = document.getElementById('assess-btn');
  if (assessBtn) assessBtn.addEventListener('click', runAssessment);
});