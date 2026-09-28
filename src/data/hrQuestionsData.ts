import { HRQuestion } from '../types';

export const HR_QUESTIONS: HRQuestion[] = [
  {
    id: 'hr-01',
    category: 'Behavioral',
    question: 'Why should we hire you over other qualified candidates?',
    intent: 'Assess your unique value proposition, confidence, self-awareness, and understanding of the company’s pain points.',
    sampleAnswer: `What sets me apart is the intersection of my strong foundational knowledge in backend data structures and my proactive approach to engineering reliability.
In my recent projects, I didn't just write functional code; I architected database schemas with proper normalization, benchmarked query performance under simulated loads, and documented clean APIs.
Furthermore, I have a proven track record of quick adaptability—when our team needed to implement caching last semester, I learned Redis in a weekend and reduced endpoint response times by 35%. I am eager to bring this same ownership and velocity to your team from day one.`,
    starFramework: {
      situation: 'Companies interview dozens of applicants with similar university degrees and basic coursework.',
      task: 'Differentiate with demonstrable execution speed, technical hygiene, and curiosity.',
      action: 'Highlighted concrete architectural habits (benchmarking, clean APIs, fast adoption of new tooling).',
      result: 'Demonstrated immediate contribution potential and high ROI for the hiring manager.',
    },
    dos: [
      'Focus on tangible problem-solving skills and cultural ownership.',
      'Tie your strengths directly to the core responsibilities in the job description.',
      'Highlight speed of learning and enthusiasm for the company’s domain.',
    ],
    donts: [
      'Do not say "Because I am the best" without concrete evidence.',
      'Never put down other candidates or past teammates.',
      'Avoid vague platitudes like "I am a hard worker".',
    ],
    followUpQuestions: [
      'What specific skills are you currently working on improving?',
      'How do you prioritize when given multiple competing technical tasks?',
    ],
  },
  {
    id: 'hr-02',
    category: 'Situation Handling',
    question: 'Describe a situation where a project failed or didn\'t go as planned. What did you learn?',
    intent: 'Examines accountability, emotional maturity, resilience, and post-mortem reflection.',
    sampleAnswer: `During our second-year software engineering project, our team built an automated course enrollment platform. We spent three weeks building elaborate UI features, but neglected to perform concurrency testing until 48 hours before the live pilot.
When 40 classmates attempted to register simultaneously, race conditions corrupted seat quotas and the server crashed.
Rather than placing blame, I called an emergency triage session, identified the missing database transaction locks, and implemented row-level locking with atomic rollback in PostgreSQL.
The key lesson I internalized was to design for concurrent edge cases and test system load early rather than treating scalability as an afterthought.`,
    starFramework: {
      situation: 'Course enrollment system crashed under concurrent user load during live pilot.',
      task: 'Fix critical race conditions and restore database integrity before the final evaluation.',
      action: 'Triaged logs objectively, implemented row-level locking in PostgreSQL, and added automated concurrency tests.',
      result: 'System stabilized, successfully handled subsequent stress tests of 100+ concurrent requests, and taught the team the value of shift-left testing.',
    },
    dos: [
      'Own your role in the shortcoming without making excuses.',
      'Focus 70% of your answer on the corrective action and subsequent growth.',
      'Show that you instituted permanent guardrails to prevent recurrence.',
    ],
    donts: [
      'Never choose a fake failure like "I failed because I tried too hard".',
      'Never blame teammates, professors, or clients.',
      'Do not pick a catastrophic ethical violation.',
    ],
    followUpQuestions: [
      'How do you incorporate load testing into your projects today?',
      'How did you communicate the issue to your stakeholders?',
    ],
  },
  {
    id: 'hr-03',
    category: 'Career Goals',
    question: 'Where do you see yourself in 3 to 5 years?',
    intent: 'Evaluates ambition, alignment with company growth trajectories, and retention likelihood.',
    sampleAnswer: `Over the next 2-3 years, my goal is to become an indispensable core contributor in this engineering organization—mastering our production systems, taking end-to-end ownership of major feature releases, and mentoring junior interns as they onboard.
By year 4 or 5, as I deepen my architectural intuition, I aspire to take on technical leadership responsibilities: participating in high-level system design decisions and collaborating closely with product managers to deliver scalable, high-impact features.`,
    starFramework: {
      situation: 'Hiring managers want to know if their investment in training you will lead to mutual growth.',
      task: 'Present a realistic, ambitious, and loyalty-oriented progression pathway.',
      action: 'Articulated milestone phases from individual contributor mastery to technical leadership.',
      result: 'Reassures the hiring team that you are seeking a sustained, productive home to grow.',
    },
    dos: [
      'Focus on expanding skills, technical scope, and mentorship.',
      'Align your goals with the technical challenges of the hiring team.',
    ],
    donts: [
      'Do not say "I want to have your job" or "I want to start my own startup in 18 months".',
      'Avoid vague answers like "I just want to be happy and rich".',
    ],
    followUpQuestions: [
      'What specific technologies or architectures do you want to master next?',
      'What type of management style brings out the best in you?',
    ],
  },
  {
    id: 'hr-04',
    category: 'Company Fit',
    question: 'Why do you want to join our organization specifically?',
    intent: 'Detects if you actually researched the company’s engineering culture, mission, and products, or just submitted 500 identical resumes.',
    sampleAnswer: `I’ve followed your engineering engineering blog and was especially impressed by your recent writeup on migrating from legacy monolith services to distributed event-driven microservices.
Many companies talk about scale, but your team’s emphasis on automated canary deployments and zero-downtime database migrations shows a genuine culture of engineering excellence.
I want to be in an environment where rigorous software craftsmanship is the default, and where my passion for writing performant, maintainable code can solve real user pain points at scale.`,
    starFramework: {
      situation: 'Candidate needs to demonstrate authentic interest in the company.',
      task: 'Connect personal technical enthusiasm with specific company achievements or products.',
      action: 'Cited real engineering blog topics, architectural methodologies, and shared values.',
      result: 'Stood out as a well-researched, genuinely motivated candidate.',
    },
    dos: [
      'Reference specific public articles, features, open source tools, or engineering blogs from the company.',
      'Explain how your values and goals align with their mission.',
    ],
    donts: [
      'Do not talk solely about salary, perks, snacks, or remote work flexibility.',
      'Never give a generic answer that could apply to any software firm.',
    ],
    followUpQuestions: [
      'Have you used our product yourself? What would you improve about it?',
    ],
  },
];
