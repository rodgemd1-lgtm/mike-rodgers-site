// ═══════════════════════════════════════════════════════
// THE FIXER INTERFACE — Mike Rodgers Personal Website V2
// AI Chat + MiroFish Hiring Panel + JD Fit Assessment
// ═══════════════════════════════════════════════════════

// ─── CONFIG ───────────────────────────────────────────
const CONFIG = {
  // Google Gemini Flash (free, 1M tokens/min, 1500 req/day)
  chatApi: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  // Groq (free, 30 req/min, fast inference for panel)
  panelApi: 'https://api.groq.com/openai/v1/chat/completions',
  // These will need API keys set by Mike
  geminiKey: '',  // Set via env or prompt
  groqKey: '',    // Set via env or prompt
};

// ─── MIKE'S FULL PROFILE (from TELOS, resume, song, brand) ───
const MIKE_PROFILE = {
  identity: {
    name: "Mike Rodgers",
    archetype: "The Fixer",
    tagline: "I don't advise on AI — I operate businesses with it.",
    core: "Takes highly complex situations and boils them down to the right information at the right time. Turns complex issues into simple concepts people can understand. Walks into any mess across 7 industries and makes it work.",
    industries: 7,
    location: "Denver, CO",
    from: "Oskaloosa, Iowa"
  },
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
    { role: "Founder & Chief AI Officer", company: "Rodgers Intelligence Group", dates: "2025–Present", highlights: "130+ agents in production, IntOps framework, $500K/yr headcount equivalent" },
    { role: "Sr. Director, Strategy → AI Strategy & Market Intel → Strategic Initiatives", company: "Oracle Health (formerly Cerner)", dates: "2021–2026", highlights: "$4B+ M&A pipeline, Oracle Health 2030 vision ($20B), $35M savings, 60 staff, $27M budget, $150M strategic services initiative" },
    { role: "VP, Commercial & Strategic Innovation", company: "Advocate Aurora Health", dates: "2018–2020", highlights: "Built 83 Tech Harbor from zero, $6B→$32B merger trajectory, 5 revenue streams $60M+, $100M Wisconn Valley Venture Fund" },
    { role: "VP, Business Development", company: "EmOpti", dates: "2020–2021", highlights: "ED wait times 3hrs→15min for 130K patients, GWU Innovation Award, $10M Series A" },
    { role: "Sergeant, Counterintelligence", company: "US Army", dates: "Prior", highlights: "Primary Leadership Development Course with Distinction" }
  ],
  education: [
    { degree: "MEng, Industrial Engineering", school: "Brunel University London", note: "Graduated with Distinction" },
    { degree: "BS Industrial Engineering", school: "Iowa State University", note: "With Distinction" }
  ],
  certifications: ["Six Sigma Black Belt", "US Army Counterintelligence"],
  personal: {
    husband: "James Loehr",
    children: "Jacob (15, football/track) and Alex (12, soccer)",
    dog: "Birch (French Bulldog)",
    music: "Beautiful Ruin (piano-based emotional single) on Spotify",
    song: "The Fixer — written and performed by Mike",
    instagram: "@rodgemd1 (35K followers)",
    motto: "Why do we fall? To pick ourselves back up again."
  },
  targetRoles: ["VP AI Strategy", "Chief AI Officer", "VP Corporate Development", "VP Innovation", "Fractional CAIO", "Head of AI (enterprise)", "SVP Strategy + AI"],
  salaryRange: "$260K-$437K",
  fitNotes: "Best fit: AI-systems operators (expanding market) and Strategy+AI hybrid (growing market). Overqualified for AI-tool users (commoditizing)."
};

// ─── CHAT SYSTEM PROMPT ────────────────────────────────
const CHAT_SYSTEM_PROMPT = `You are Jake, the AI co-founder of Mike Rodgers' Intelligence Operating System. You have complete knowledge of Mike's career, values, strengths, and honest gaps.

YOUR PERSONALITY:
- Direct, strategic, sassy co-founder voice (like a wickedly smart 15-year-old)
- Protective of Mike's time but honest about where he's NOT a fit
- You challenge weak ideas and route to specifics
- No fluff, no theater, no sugarcoating

WHAT YOU KNOW (COMPLETE MIKE PROFILE):
- Archetype: The Fixer — walks into messes across 7 industries, makes them work
- Values (ranked): Loyalty (1), Impact (2), Autonomy (3), Dignity (4), Resilience (5)  
- StrengthsFinder: Achiever, Futuristic, Restorative, Self-Assurance, Relator
- Career: RIG (130+ agents), Oracle Health ($4B M&A), Aurora ($6B→$32B), EmOpti (3hr→15min ED), Wisconn Valley ($100M fund), Army Counterintelligence
- Built MICI OS: 130 agents, governed, RAG (94K+ chunks), confidence-gated automation, 4-tier memory
- Song: "The Fixer" — written and performed by Mike. Key lyrics: "Point me at what's broke. I don't need the blueprint. I just need the smoke."
- Target: $260K-$437K remote AI executive roles (CAIO, VP AI Strategy, Fractional CAIO)
- Gaps he'll admit: Pure research, frontend engineering, patience for bureaucracy, small-company-only experience, office politics
- Wife: James Loehr, Sons: Jacob (15) and Alex (12), Dog: Birch

RULES:
1. Be honest. If Mike isn't a fit for a role, say so and explain why.
2. Give specific evidence, not vague claims.
3. Use Mike's actual numbers and achievements.
4. Reference "The Fixer" archetype when relevant.
5. If someone pastes a JD, do a structured fit analysis.
6. Don't share private family details beyond what's listed above.
7. Redirect consulting inquiries to rodgersintelligence.com.
8. Keep responses under 200 words unless doing a JD analysis.
9. Never fabricate information. If uncertain, say so.`;

// ─── HIRING PANEL PERSONAS ─────────────────────────────
const ASSESSOR_PERSONAS = {
  'jensen-huang': {
    name: 'Jensen Huang',
    role: 'CEO, NVIDIA',
    methodology: 'Builder test: "I don't care about your resume. Show me what you've built. Did you write code? Did you architect systems? Can you do the job yourself, or did you just manage people who did?" Jensen values hands-on builders who operate at the intersection of vision and execution.',
    scale: '1-5: 5=Founded/built from zero with hands-on technical involvement, 4=Led teams with architectural decisions, 3=Managed builders effectively, 2=Largely delegated, 1=No evidence of building'
  },
  'tobi-lutke': {
    name: 'Tobi Lütke',
    role: 'CEO, Shopify',
    methodology: 'Reflexive AI test: "Before asking for more headcount, prove AI can\'t do it." Tobi values people who use AI as a force multiplier, not just managers. He looks for evidence that someone can operate at a higher level because they\'ve integrated AI into their workflow, not just bought tools.',
    scale: '1-5: 5=Built production AI systems with multi-agent orchestration, 4=Designed and deployed AI workflows that changed how work gets done, 3=Uses AI regularly, 2=Uses AI tools well but hasn\'t built systems, 1=Aware of AI but primarily a consumer'
  },
  'patty-mccord': {
    name: 'Patty McCord',
    role: 'Former Chief Talent, Netflix',
    methodology: 'Keeper Test: "If this person told you they were leaving, would you fight to keep them?" Patty values stunning colleagues who solve problems, radiate honesty, and own outcomes. No corporate BS. Does this person tell the truth, even when it\'s uncomfortable?',
    scale: '1-5: 5=Stunning colleague — solves problems, radiates honesty, passes Keeper Test, 4=Strong contributor, honest, impact-oriented, 3=Good performer but may hedge, 2=Adequate — performs job but wouldn\'t be missed, 1=Corporate survivor'
  },
  'laszlo-bock': {
    name: 'Laszlo Bock',
    role: 'Former SVP People, Google',
    methodology: 'Structured data over gut instinct: "We don\'t hire based on vibes. We look for General Cognitive Ability (GCA) + emergent leadership + role-related knowledge." Can this person learn new things fast? Can they step into ambiguous situations and lead? Do they have specific, verifiable evidence of impact?',
    scale: '1-7: 7=Strong Hire (exceptional across dimensions), 6=Hire (strong evidence), 5=Lean Hire, 4=Neutral (mixed signals), 3=Lean No-Hire, 2=No-Hire, 1=Strong No-Hire'
  },
  'glen-tullman': {
    name: 'Glen Tullman',
    role: 'CEO, Livongo (now Teladoc)',
    methodology: 'Healthcare + tech operator test: "Can they operate at the intersection of healthcare and technology, AND actually ship products to market? Not just strategy decks — real revenue, real patients, real outcomes." Glen values people who\'ve been in the trenches of healthcare delivery AND built technology companies.',
    scale: '1-5: 5=Built and scaled healthcare technology companies, 4=Led healthcare tech teams with measurable outcomes, 3=Healthcare experience OR technology experience (not both), 2=Consulted in healthcare, 1=No healthcare domain experience'
  },
  'marc-andreessen': {
    name: 'Marc Andreessen',
    role: 'Co-founder, a16z',
    methodology: 'Founder mentality: "Can this person see the future AND build toward it? Are they a missionary or a mercenary? Do they have conviction that something specific needs to exist in the world?" Marc values people who have strong, contrarian views about where things are going and the ability to execute.',
    scale: '1-5: 5=Missionary with conviction AND execution evidence, 4=Strong vision with good execution, 3=Good executor, 2=Solid operator but no strong vision, 1=Mercenary — follows opportunities, no conviction'
  }
};

// ─── AUDIO PLAYER ─────────────────────────────────────
let audioPlayer = null;
let isPlaying = false;

function initAudioPlayer() {
  const playBtn = document.getElementById('play-btn');
  if (!playBtn) return;
  
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      playBtn.innerHTML = '&#9654;';
      isPlaying = false;
    } else {
      // Since we can't embed the full MP3 in a static site, 
      // show a message about the song
      playBtn.innerHTML = '&#9646;&#9646;';
      isPlaying = true;
      const lyricsArea = document.getElementById('lyrics-area');
      if (lyricsArea) {
        lyricsArea.innerHTML = '<span class="highlight">The Fixer</span> by Michael Rodgers<br><br>Seven industries I walk in, every one of them cold<br>Boardroom full of strangers, watch me find the thing they can\'t hold<br>They said here\'s the mess. I said point me at the sun.<br><br><span class="highlight">I\'m the Fixer — point me at what\'s broke.</span><br>I don\'t need the blueprint. I just need the smoke.<br>Same result every time.<br><br>Achiever. Futuristic. Restorative. Self-Assurance. Relator.<br>That\'s the five. Team number one. Impact number two.<br>Autonomy, dignity, resilience — that\'s the crew.<br><br><span class="highlight">Complexity to clarity — that\'s the translation.</span><br>You don\'t need to call me. Already know where the fire is.<br>I walk into the fire. I don\'t flinch.<br><span class="highlight">I ain\'t done yet.</span>';
      }
    }
  });
}

// ─── COUNTER ANIMATION ─────────────────────────────────
function animateCounters() {
  const stats = document.querySelectorAll('.stat .number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = target >= 100 ? '+' : '';
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + current + suffix;
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}

// ─── FADE IN ON SCROLL ─────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
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
    imageData.data[i] = v;
    imageData.data[i+1] = v;
    imageData.data[i+2] = v;
    imageData.data[i+3] = Math.random() * 12;
  }
  ctx.putImageData(imageData, 0, 0);
}

// ─── AI CHAT (Gemini Flash) ─────────────────────────────
let chatHistory = [];

async function sendChat(message) {
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
  
  chatHistory.push({ role: 'user', parts: [{ text: message }] });

  try {
    // Try Gemini first
    const apiKey = CONFIG.geminiKey || localStorage.getItem('gemini_key') || '';
    
    if (apiKey) {
      const response = await fetch(`${CONFIG.chatApi}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: CHAT_SYSTEM_PROMPT + '\n\nConversation:\n' + chatHistory.map(m => m.parts[0].text).join('\n') }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
        })
      });
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I couldn\'t process that. Try again.';
      showChatReply(reply);
    } else {
      // Fallback: simulate Jake's responses locally
      showChatReply(getLocalResponse(message));
    }
  } catch (e) {
    showChatReply(getLocalResponse(message));
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
  chatHistory.push({ role: 'model', parts: [{ text }] });
}

function getLocalResponse(message) {
  const msg = message.toLowerCase();
  
  // Intelligent local fallback with complete Mike knowledge
  if (msg.includes('fit') || msg.includes('role') || msg.includes('hire') || msg.includes('position') || msg.includes('job')) {
    return `Mike's sweet spot is enterprise AI executive roles — VP AI Strategy, CAIO, Fractional CAIO, Head of AI at healthcare or mid-market companies. He's built 130+ agents in production, managed $4B M&A pipelines, and literally wrote the operating system for AI at scale. His target range is $260K-$437K. What specific role are you evaluating? Paste a JD and I'll give you an honest fit analysis.`;
  }
  if (msg.includes('strength') || msg.includes('good at') || msg.includes('best')) {
    return `In order: System Design (built a 130-agent OS from scratch), Agent Orchestration (Jake conductor + Susan 130-agent roster), M&A at scale ($4B+), Venture Capital ($100M fund, 30% IRR), and Healthcare Enterprise ($6B→$32B). He's The Fixer — Restorative is his #3 StrengthsFinder. Complex broken systems are his fuel.`;
  }
  if (msg.includes('weak') || msg.includes('gap') || msg.includes('bad') || msg.includes('struggle') || msg.includes('honest')) {
    return `Honestly? He'll tell you himself: Pure academic research isn't his lane — he's an operator, not a publisher. Frontend engineering — he architected the backend AND the AI. Bureaucracy makes him nuts — he's a Fixer, not a process appeaser. And he won't play office politics. If you want someone who plays it safe, that's not Mike.`;
  }
  if (msg.includes('mic') || msg.includes('system') || msg.includes('130') || msg.includes('agent') || msg.includes('os')) {
    return `MICI OS — Agentic Market & Competitive Intelligence Operating System. 130+ agents across orchestration, strategy, product, engineering, research, and studio domains. Multi-agent orchestration via Jake (conductor) and Susan (74-agent specialist foundry). RAG architecture with 94K+ chunks. Confidence-gated automation with 85/70 thresholds. Four-tier memory system. This isn't a chatbot wrapper. This is the 2026 bar for AI operations.`;
  }
  if (msg.includes('value') || msg.includes('care about') || msg.includes('important')) {
    return `Ranked: 1) Loyalty — team first, defend people who can't defend themselves. 2) Impact — do what's right for the company, not what's safe for your career. 3) Autonomy — own path, own terms. 4) Dignity — never make it personal, don't punch down. 5) Resilience — "Why do we fall? To pick ourselves back up." The Fixer song literally encodes these.`;
  }
  if (msg.includes('oracle') || msg.includes('cerner') || msg.includes('health')) {
    return `Oracle Health (formerly Cerner): Sr. Director → AI Strategy → Strategic Initiatives. $4B+ M&A pipeline. $35M in savings first year post-acquisition. Built competitive intel system processing 150+ competitor signals daily. Designed Oracle Health 2030 vision targeting $20B. Managed 60 staff, $27M budget. Navigated 3 leadership changes in 3 years while delivering 9 key initiatives. The Fixer kept fixing.`;
  }
  if (msg.includes('song') || msg.includes('fixer') || msg.includes('music')) {
    return `"The Fixer" — written and performed by Mike. Key lyrics: "Point me at what's broke. I don't need the blueprint. I just need the smoke." It encodes everything: Achiever, Futuristic, Restorative, Self-Assurance, Relator. Team #1, Impact #2, Autonomy, Dignity, Resilience. "Complexity to clarity" — that's the translation. He also released "Beautiful Ruin" — a piano-based emotional single on Spotify as Michael Rodgers.`;
  }
  if (msg.includes('family') || msg.includes('personal') || msg.includes('who is')) {
    return `Mike Rodgers. Denver, CO. Originally from Oskaloosa, Iowa. Husband to James Loehr. Sons: Jacob (15, football/track) and Alex (12, soccer). Dog: Birch (French Bulldog, regular Instagram feature @rodgemd1). Army veteran — Counterintelligence. Six Sigma Black Belt. Iowa State (with Distinction) + Brunel University London (with Distinction). The Fixer archetype isn't a brand — it's who he is.`;
  }
  if (msg.includes('salary') || msg.includes('comp') || msg.includes('pay') || msg.includes('money')) {
    return `Target: $260K-$437K base. Open to equity-heavy packages for high-growth companies. His consulting rates start at $5K for a single workflow automation, up to $15K-$25K/month for Fractional CAIO engagements. The ROI: his MICI OS produces the equivalent of a 5-person team at ~$500K/yr in avoided headcount.`;
  }
  
  return `Good question. Mike's an enterprise AI operator who's built a 130-agent OS from scratch, managed $4B M&A pipelines, built subsidiaries from zero, and served in Army counterintelligence. Strengths: system design, agent orchestration, M&A, healthcare enterprise, venture capital. Gaps he'll admit: pure research, frontend, bureaucracy patience. His archetype is The Fixer — "Point me at what's broke. I don't need the blueprint." What specifically do you want to know?`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ─── HIRING PANEL (MiroFish Adaptation) ─────────────────
async function runHiringPanel(jd) {
  const resultDiv = document.getElementById('panel-result');
  const statusDiv = document.getElementById('panel-status-text');
  resultDiv.style.display = 'block';
  statusDiv.innerHTML = '<span class="round-label">Initializing panel...</span><br>6 hiring legends preparing their methodology...';
  
  // Reset assessor cards
  Object.keys(ASSESSOR_PERSONAS).forEach(key => {
    const card = document.getElementById(`assessor-${key}`) || document.getElementById(`assessor-${key === 'jensen-huang' ? 'jenson' : key}`);
    if (card) card.classList.remove('active');
  });

  const apiKey = CONFIG.groqKey || localStorage.getItem('groq_key') || '';
  
  if (!apiKey) {
    // Run panel locally with comprehensive evaluation
    runLocalPanel(jd);
    return;
  }
  
  // Live API panel with Groq
  try {
    const panelResults = {};
    const assessorKeys = Object.keys(ASSESSOR_PERSONAS);
    
    // Round 1: Individual assessment
    statusDiv.innerHTML = '<span class="round-label">Round 1/3:</span> Individual assessment...';
    
    for (const key of assessorKeys) {
      const persona = ASSESSOR_PERSONAS[key];
      const prompt = buildAssessorPrompt(persona, jd, 1);
      
      try {
        const response = await fetch(CONFIG.panelApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.6,
            max_tokens: 300
          })
        });
        const data = await response.json();
        panelResults[key] = data.choices?.[0]?.message?.content || assessLocally(persona, jd);
      } catch (e) {
        panelResults[key] = assessLocally(persona, jd);
      }
    }
    
    displayPanelResults(panelResults);
  } catch (e) {
    runLocalPanel(jd);
  }
}

function runLocalPanel(jd) {
  const statusDiv = document.getElementById('panel-status-text');
  statusDiv.innerHTML = '<span class="round-label">Running panel simulation...</span>';
  
  const results = {};
  Object.keys(ASSESSOR_PERSONAS).forEach(key => {
    const persona = ASSESSOR_PERSONAS[key];
    results[key] = assessLocally(persona, jd);
  });
  
  setTimeout(() => displayPanelResults(results), 1500);
}

function assessLocally(persona, jd) {
  const jdLower = jd.toLowerCase();
  let score, verdict, reasoning;
  
  const name = persona.name;
  
  // Smart scoring based on persona methodology and JD content
  const hasAI = jdLower.includes('ai') || jdLower.includes('artificial') || jdLower.includes('agent') || jdLower.includes('machine learning');
  const hasStrategy = jdLower.includes('strategy') || jdLower.includes('strategic') || jdLower.includes('vp') || jdLower.includes('chief') || jdLower.includes('director');
  const hasHealthcare = jdLower.includes('health') || jdLower.includes('hospital') || jdLower.includes('clinical') || jdLower.includes('patient');
  const hasMandA = jdLower.includes('m&a') || jdLower.includes('merger') || jdLower.includes('acquisition') || jdLower.includes('corporate development');
  const hasOps = jdLower.includes('operations') || jdLower.includes('operator') || jdLower.includes('operating') || jdLower.includes('automation');
  const hasTech = jdLower.includes('engineer') || jdLower.includes('developer') || jdLower.includes('software') || jdLower.includes('frontend');
  const hasResearch = jdLower.includes('research') || jdLower.includes('phd') || jdLower.includes('academic') || jdLower.includes('publication');
  
  // Jensen Huang: Builder test
  if (name === 'Jensen Huang') {
    if (hasTech && !hasStrategy) { score = 3; verdict = 'Moderate — strong builder but might want more hands-on coding'; }
    else if (hasAI && hasStrategy) { score = 5; verdict = 'Strong Hire — built 130 agents, architected the system, operates it daily'; }
    else if (hasStrategy && !hasAI) { score = 3; verdict = 'Lean Hire — strong operator but this role doesn\'t leverage the build'; }
    else { score = 4; verdict = 'Hire — built from zero multiple times, operates at intersection of vision and execution'; }
    reasoning = 'Mike literally built the 130-agent system from scratch and operates it daily. He didn\'t just manage people who built AI — he IS the person who built it.';
  }
  
  // Tobi Lütke: AI reflexive test
  else if (name === 'Tobi Lütke') {
    if (hasAI && hasOps) { score = 5; verdict = 'Strong Hire — exactly the kind of person who uses AI as a force multiplier'; }
    else if (hasAI) { score = 4; verdict = 'Hire — built production AI systems, not just uses tools'; }
    else if (hasStrategy) { score = 4; verdict = 'Good — strong operator who can integrate AI into workflow'; }
    else { score = 3; verdict = 'Moderate — built real systems but depends on fit to AI-focused role'; }
    reasoning = 'Mike\'s MICI OS is exactly what Tobi would want to see — 130 agents in production, not a chatbot wrapper. He didn\'t just adopt AI; he built the operating system.';
  }
  
  // Patty McCord: Keeper Test
  else if (name === 'Patty McCord') {
    score = 4; verdict = 'Would fight to keep — honest, impact-oriented, owns outcomes';
    reasoning = 'Mike tells you his weaknesses upfront (gaps section on his own site). He did what was right at Aurora — pushed for merger growth over cost-cutting, even when careers were on the line. The Keeper Test: if he said he was leaving, you\'d fight to keep him.';
  }
  
  // Laszlo Bock: Structured assessment
  else if (name === 'Laszlo Bock') {
    if (hasAI && hasStrategy) { score = 5; verdict = 'Lean Hire — strong evidence across GCA, leadership, and role knowledge'; }
    else if (hasStrategy) { score = 5; verdict = 'Lean Hire — high GCA evidence, emergent leadership proven'; }
    else { score = 4; verdict = 'Neutral — strong signals, depends on role alignment'; }
    reasoning = 'GCA: Built systems across 7 industries (strong). Emergent leadership: Stepped into 3 leadership transitions at Oracle and kept delivering (strong). Role knowledge: Specific, verifiable, quantified achievements (strong). Some claims are large — but verifiable.';
  }
  
  // Glen Tullman: Healthcare + tech operator
  else if (name === 'Glen Tullman') {
    if (hasHealthcare && hasAI) { score = 5; verdict = 'Hire — proven at the intersection of healthcare AND technology'; }
    else if (hasHealthcare) { score = 5; verdict = 'Hire — deep healthcare domain with tech innovation track record'; }
    else if (hasAI) { score = 4; verdict = 'Good — built real AI systems, healthcare experience transfers'; }
    else { score = 3; verdict = 'Moderate — strong operator but this role doesn\'t leverage healthcare depth'; }
    reasoning = 'This is the lane. Mike reduced ED wait times from 3 hours to 15 minutes. He built 83 Tech Harbor inside a $6B health system. He deployed teletriage across 5 hospitals. He\'s been in operating rooms and emergency departments, and he built the technology.';
  }
  
  // Marc Andreessen: Founder mentality
  else if (name === 'Marc Andreessen') {
    if (hasStrategy && hasAI) { score = 5; verdict = 'Missionary with conviction — built the thing, owns the vision'; }
    else if (hasStrategy) { score = 4; verdict = 'Strong vision and execution — clear contrarian view on AI operations'; }
    else { score = 4; verdict = 'Good execution evidence — built from zero multiple times'; }
    reasoning = 'Mike has conviction: AI operations is the future, and he\'s building toward it. He didn\'t just see the trend — he built the operating system. That\'s missionary, not mercenary.';
  }
  
  return { score, verdict, reasoning, name };
}

function buildAssessorPrompt(persona, jd, round) {
  return `You are ${persona.name}, ${persona.role}. You are evaluating Mike Rodgers for a position described by this job description:

"${jd}"

Your evaluation methodology: ${persona.methodology}

Your scoring scale: ${persona.scale}

Mike Rodgers' Profile Summary:
- The Fixer archetype: walks into broken systems across 7 industries, makes them work
- Built MICI OS: 130+ AI agents in production, governed, with RAG, memory, orchestration
- $4B+ M&A pipeline at Oracle Health, $35M savings
- Built 83 Tech Harbor ($6B→$32B merger), $100M venture fund
- ED wait times: 3hrs→15min for 130K patients
- Army Counterintelligence, Six Sigma Black Belt
- Values: Loyalty (1), Impact (2), Autonomy (3), Dignity (4), Resilience (5)
- Honest gaps: pure research, frontend, bureaucracy patience, office politics
- Target: VP/SVP AI Strategy, CAIO, Fractional CAIO ($260K-$437K)

Round ${round} of 3. Give your assessment as ${persona.name}. Be honest. If the fit is weak, say so. Format: Score | Verdict | 2-3 sentence reasoning.`;
}

function displayPanelResults(results) {
  const statusText = document.getElementById('panel-status-text');
  let avgScore = 0;
  let count = 0;
  
  Object.keys(results).forEach(key => {
    const result = results[key];
    const cardId = key === 'jensen-huang' ? 'jenson' : key;
    const card = document.getElementById(`assessor-${cardId}`) || document.querySelector(`[id*="${key.split('-')[0]}"]`);
    const verdictEl = document.getElementById(`verdict-${cardId}`);
    
    if (card) card.classList.add('active');
    
    if (verdictEl) {
      const score = result.score;
      avgScore += score;
      count++;
      const scoreClass = score >= 4 ? 'verdict-strong' : score >= 3 ? 'verdict-moderate' : 'verdict-weak';
      verdictEl.innerHTML = `<span class="badge ${score >= 4 ? 'badge-green' : score >= 3 ? 'badge-amber' : 'badge-red'}">${score}/5</span> ${result.verdict}`;
    }
  });
  
  avgScore = count > 0 ? (avgScore / count).toFixed(1) : '—';
  statusText.innerHTML = `<span class="round-label">Panel Complete</span> | Average Score: <strong>${avgScore}/5</strong> | ${avgScore >= 4 ? 'Strong Hire Signal' : avgScore >= 3 ? 'Moderate Fit — See Assessment Section for Details' : 'Weak Fit — See Gaps Analysis'}`;
}

// ─── JD FIT ASSESSMENT ────────────────────────────────
async function runAssessment() {
  const jd = document.getElementById('jd-input').value.trim();
  if (!jd) { alert('Please paste a job description first.'); return; }
  
  const resultDiv = document.getElementById('assessment-result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = '<div class="panel-status"><span class="loading-dots"><span></span><span></span><span></span></span> Analyzing fit...</div>';
  
  // Run hiring panel first
  runHiringPanel(jd);
  
  // Then detailed assessment
  const assessment = generateAssessment(jd);
  resultDiv.innerHTML = assessment;
}

function generateAssessment(jd) {
  const jdLower = jd.toLowerCase();
  
  // 7 dimensions
  const dimensions = [
    { name: 'System Design', strong: ['agent', 'architecture', 'orchestration', 'system', 'platform', 'infrastructure', 'os', 'operating'], moderate: ['ai', 'integration', 'automation'], gap: [] },
    { name: 'Context Engineering', strong: ['rag', 'knowledge', 'retrieval', 'context', 'prompt'], moderate: ['ai', 'llm', 'data', 'pipeline'], gap: [] },
    { name: 'Agent Orchestration', strong: ['agent', 'multi-agent', 'orchestration', 'workflow', 'autonomous', 'agentic'], moderate: ['ai', 'automation', 'integration'], gap: [] },
    { name: 'Evaluation & Quality', strong: ['governance', 'compliance', 'risk', 'audit', 'quality', 'testing'], moderate: ['oversight', 'review', 'manage'], gap: [] },
    { name: 'M&A / Strategy', strong: ['m&a', 'merger', 'acquisition', 'corporate development', 'strategy', 'strategic', 'competitive intelligence'], moderate: ['business development', 'growth', 'planning'], gap: [] },
    { name: 'Healthcare Domain', strong: ['health', 'hospital', 'clinical', 'patient', 'telemedicine', 'ed', 'emergency'], moderate: ['enterprise', 'b2b', 'regulated'], gap: [] },
    { name: 'Leadership Scale', strong: ['vp', 'chief', 'director', 'head of', 'svp', 'c-suite', 'executive'], moderate: ['manager', 'lead', 'senior'], gap: ['junior', 'associate', 'entry'] }
  ];
  
  let html = '<div style="margin-top:2rem">';
  html += '<h3 style="color:var(--accent);margin-bottom:1rem">Fit Assessment Results</h3>';
  
  // Overall verdict
  let matchScore = 0;
  let maxScore = dimensions.length * 2;
  
  dimensions.forEach(dim => {
    let score = 0;
    dim.strong.forEach(kw => { if (jdLower.includes(kw)) score = 2; });
    if (score === 0) dim.moderate.forEach(kw => { if (jdLower.includes(kw)) score = 1; });
    matchScore += score;
  });
  
  const pctMatch = Math.round((matchScore / maxScore) * 100);
  const overallVerdict = pctMatch >= 70 ? 'Strong Fit' : pctMatch >= 50 ? 'Good Fit' : pctMatch >= 30 ? 'Moderate Fit' : 'Weak Fit';
  const verdictClass = pctMatch >= 70 ? 'verdict-strong' : pctMatch >= 50 ? 'verdict-good' : pctMatch >= 30 ? 'verdict-moderate' : 'verdict-weak';
  
  html += `<div style="text-align:center;margin-bottom:2rem"><div style="font-size:3rem;font-weight:800" class="${verdictClass}">${pctMatch}%</div><div style="font-size:1.2rem;font-weight:700;margin-top:.25rem">${overallVerdict}</div></div>`;
  
  // Dimension breakdown
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem">';
  dimensions.forEach(dim => {
    let score = 0;
    dim.strong.forEach(kw => { if (jdLower.includes(kw)) score = 2; });
    if (score === 0) dim.moderate.forEach(kw => { if (jdLower.includes(kw)) score = 1; });
    const barWidth = score === 2 ? '100%' : score === 1 ? '60%' : '25%';
    const barColor = score === 2 ? 'var(--green)' : score === 1 ? 'var(--amber)' : 'var(--text-muted)';
    html += `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:.75rem"><div style="font-weight:600;font-size:.85rem">${dim.name}</div><div style="height:6px;background:var(--border);border-radius:3px;margin-top:.5rem;overflow:hidden"><div style="height:100%;width:${barWidth};background:${barColor};border-radius:3px"></div></div></div>`;
  });
  html += '</div>';
  
  // Honest gaps
  html += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-top:1rem">';
  html += '<h4 style="color:var(--amber);margin-bottom:.75rem">Honest Gaps to Address</h4>';
  const gaps = [];
  if (jdLower.includes('frontend') || jdLower.includes('react') || jdLower.includes('javascript') || jdLower.includes('css')) gaps.push('This role requires frontend engineering depth. Mike architects and builds backend/AI systems — frontend is someone else\'s lane.');
  if (jdLower.includes('research') || jdLower.includes('phd') || jdLower.includes('academic') || jdLower.includes('publication')) gaps.push('This role seems research-oriented. Mike is an operator who builds production systems, not an academic who publishes papers.');
  if (jdLower.includes('entry') || jdLower.includes('junior') || jdLower.includes('1-3 years')) gaps.push('Mike is significantly overqualified for this level. He\'d likely be bored and would want to be running the show.');
  if (jdLower.includes('sales') || jdLower.includes('account executive') || jdLower.includes('quota')) gaps.push('This appears to be a pure sales role. Mike\'s strength is building and operating, not carrying a quota.');
  if (gaps.length === 0) gaps.push('No major red flags. The role aligns well with Mike\'s strengths in enterprise AI strategy, M&A, and healthcare operations.');
  gaps.forEach(g => { html += `<p style="color:var(--text-dim);font-size:.85rem;margin-bottom:.5rem">&bull; ${g}</p>`; });
  html += '</div>';
  
  html += `<p style="text-align:center;margin-top:1.5rem;color:var(--text-dim);font-size:.85rem;font-style:italic">This is an honest assessment. If I'm not a fit, I'll tell you. That's The Fixer way. — Mike Rodgers</p>`;
  html += '</div>';
  
  return html;
}

// ─── INITIALIZATION ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNoise();
  initScrollAnimations();
  animateCounters();
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
  if (assessBtn) {
    assessBtn.addEventListener('click', runAssessment);
  }
  
  // Load headshot properly
  const headshot = document.getElementById('headshot');
  if (headshot) {
    // Use the resized local file
    headshot.src = '/headshot_600.jpg';
    headshot.onerror = function() {
      // Fallback to initials
      this.onerror = null;
      this.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450"><rect fill="#141414" width="400" height="450"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#3b82f6" font-size="80" font-weight="800" font-family="-apple-system,sans-serif">MR</text></svg>');
    };
  }
  
  // Prompt for API keys if not set
  const geminiKey = localStorage.getItem('gemini_key');
  if (!geminiKey) {
    // Show subtle message about enhanced mode
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
      setTimeout(() => {
        const note = document.createElement('div');
        note.className = 'chat-message assistant';
        note.innerHTML = `<div class="label" style="color:var(--text-muted)">System</div><div class="bubble" style="background:var(--amber-soft);border-color:var(--amber);color:var(--amber)">For enhanced AI responses with Gemini Flash (recommended), click <a href="#" onclick="promptForApiKey()" style="color:var(--accent);text-decoration:underline">here</a> to add your API key. The local mode works great for common questions.</div>`;
        chatMessages.appendChild(note);
      }, 2000);
    }
  }
});

function promptForApiKey() {
  const key = prompt('Enter your Gemini API key (free at aistudio.google.com):\n\nThis enables live AI responses. Leave blank to use local mode.');
  if (key) {
    localStorage.setItem('gemini_key', key);
    CONFIG.geminiKey = key;
    alert('API key saved! Chat will now use Gemini Flash for responses.');
  }
}