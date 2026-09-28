import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // ================= PYTHON =================
  {
    id: 'iq-py-01',
    subjectId: 'python',
    category: 'Memory & Internals',
    question: 'How does Python manage memory and what is the Global Interpreter Lock (GIL)?',
    difficulty: 'Intermediate',
    frequency: 'Very High',
    answer: `Python uses private heap memory managed by the Python Memory Manager. Memory management combines:
1. Reference Counting: Every object maintains a counter (ob_refcnt). When it drops to 0, memory is immediately reclaimed.
2. Generational Garbage Collector (GC): Detects cyclic references (e.g. A references B and B references A) across 3 generations (Gen 0, 1, 2).
3. GIL (Global Interpreter Lock): A mutex mechanism in CPython preventing multiple native OS threads from executing Python bytecode simultaneously. It exists because CPython memory management is not thread-safe. For CPU-bound tasks, developers use the multiprocessing module or process pools instead of threading.`,
    keyTakeaways: [
      'Reference counting is instant; cyclic GC runs periodically.',
      'GIL only affects multi-threaded CPU-bound code, NOT I/O-bound code (networking, disk I/O release GIL).',
      'Use multiprocessing for CPU parallelism, asyncio or threading for I/O concurrency.',
    ],
    commonMistakes: 'Believing threading speeds up heavy mathematical number crunching in Python without multiprocessing.',
  },
  {
    id: 'iq-py-02',
    subjectId: 'python',
    category: 'Language Core',
    question: 'Explain the difference between deepcopy and shallow copy in Python.',
    difficulty: 'Fresher',
    frequency: 'Very High',
    answer: `A shallow copy (copy.copy()) constructs a new compound object and inserts references into it to the objects found in the original.
A deep copy (copy.deepcopy()) constructs a new compound object and recursively inserts copies of the objects found in the original.`,
    codeSnippet: {
      language: 'python',
      code: `import copy

original = [[1, 2, 3], [4, 5, 6]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

shallow[0][0] = 999
print(original[0][0])  # 999 -> Original mutated!
print(deep[0][0])      # 1   -> Deep copy is completely isolated`,
    },
    keyTakeaways: [
      'Shallow copy duplicates the container, but shares nested child references.',
      'Deep copy duplicates all nested layers recursively.',
    ],
    commonMistakes: 'Assuming list.copy() or [:] creates an independent deep clone of nested arrays.',
  },
  {
    id: 'iq-py-03',
    subjectId: 'python',
    category: 'Language Core',
    question: 'What are Python decorators and how do they work behind the scenes?',
    difficulty: 'Intermediate',
    frequency: 'High',
    answer: `In Python, functions are first-class citizens (can be passed as arguments, assigned to variables, and returned from other functions).
A decorator is a syntactic sugar (@decorator) that wraps another function to modify or extend its behavior without altering its source code.
Behind the scenes, @my_decorator above def my_func() is equivalent to: my_func = my_decorator(my_func).`,
    keyTakeaways: [
      'Preserve metadata using @functools.wraps.',
      'Decorators can accept arguments by returning a three-level closure.',
    ],
    commonMistakes: 'Forgetting to return the inner wrapper function from the decorator body.',
  },

  // ================= JAVA =================
  {
    id: 'iq-java-01',
    subjectId: 'java',
    category: 'OOP Concepts',
    question: 'What is the difference between Method Overloading and Method Overriding in Java?',
    difficulty: 'Fresher',
    frequency: 'Very High',
    answer: `1. Method Overloading (Compile-time / Static Polymorphism):
- Occurs within the same class.
- Methods have the exact same name but DIFFERENT parameter lists (different types, number of parameters, or ordering).
- Return type can be different, but alone cannot distinguish overloaded methods.

2. Method Overriding (Runtime / Dynamic Polymorphism):
- Occurs between subclass and superclass.
- Method signature (name, parameter list, and return type or covariant subtype) must be IDENTICAL.
- Marked with @Override. Access modifier cannot be more restrictive than the overridden method.`,
    keyTakeaways: [
      'Overloading is decided at compile time by the compiler.',
      'Overriding is dispatched at runtime based on the actual object instance on the heap.',
    ],
    commonMistakes: 'Claiming that changing only the return type creates a valid method overload (it causes a compile error).',
  },
  {
    id: 'iq-java-02',
    subjectId: 'java',
    category: 'JVM & Concurrency',
    question: 'What is the volatile keyword in Java and how does it prevent memory visibility issues?',
    difficulty: 'Senior',
    frequency: 'High',
    answer: `In modern multi-core processors, each CPU core maintains its own L1/L2 hardware cache. Without synchronization, when Thread A updates a variable, Thread B running on another core may read a stale cached value.
The 'volatile' keyword guarantees:
1. Visibility: Reads and writes go directly to main RAM (bypassing thread local CPU caches).
2. Instruction Ordering: Establishes a "happens-before" memory barrier preventing the compiler and CPU from reordering instructions across the boundary.
Note: volatile does NOT guarantee atomicity for compound operations like count++ (which involves read-modify-write). For atomicity, use AtomicInteger or synchronized.`,
    keyTakeaways: [
      'Guarantees visibility of latest write to all threads.',
      'Prevents instruction reordering.',
      'Does NOT make i++ thread-safe (requires synchronization or AtomicInteger).',
    ],
    commonMistakes: 'Confusing volatile (visibility) with synchronized (visibility + mutual exclusion atomicity).',
  },

  // ================= C =================
  {
    id: 'iq-c-01',
    subjectId: 'c',
    category: 'Memory Management',
    question: 'What is a segmentation fault (core dumped) and what are its common causes?',
    difficulty: 'Fresher',
    frequency: 'Very High',
    answer: `A Segmentation Fault (SIGSEGV) is an OS hardware protection interrupt triggered when a C program attempts to access a virtual memory address that does not belong to its allocated address space or attempts an unauthorized access (e.g. writing to read-only code memory).
Common causes:
1. Dereferencing a NULL pointer: int *p = NULL; *p = 10;
2. Dereferencing a dangling pointer (accessing memory after free()).
3. Buffer overrun (writing past allocated bounds of an array).
4. Stack overflow from infinite recursion.
5. Attempting to modify a string literal: char *s = "hello"; s[0] = 'H'; (string literals are stored in read-only .rodata segment).`,
    keyTakeaways: [
      'Use GDB (GNU Debugger) or Valgrind to trace the exact line causing segfaults.',
      'Always initialize pointers to NULL and verify bounds before indexing.',
    ],
    commonMistakes: 'Believing char s[] = "hello" and char *s = "hello" have the same memory permissions (array is on stack and mutable; pointer points to read-only memory).',
  },
  {
    id: 'iq-c-02',
    subjectId: 'c',
    category: 'Keywords & Scopes',
    question: 'What does the static keyword do in C when applied to local variables, global variables, and functions?',
    difficulty: 'Intermediate',
    frequency: 'High',
    answer: `1. Local Variable with static:
- Stored in the Data/BSS segment instead of the stack.
- Retains its value between subsequent function calls throughout program lifespan.
- Initialized only once when program starts.

2. Global Variable or Function with static:
- Restricts internal linkage to the file (translation unit) in which it is defined.
- Cannot be accessed or linked by other .c files using extern. Encapsulates private module logic.`,
    keyTakeaways: [
      'Local static = persistent lifetime across calls.',
      'Global/function static = private file scope (encapsulation).',
    ],
    commonMistakes: 'Assuming static local variables are reinitialized every time the function is called.',
  },

  // ================= DBMS =================
  {
    id: 'iq-dbms-01',
    subjectId: 'dbms',
    category: 'Transactions & Concurrency',
    question: 'Explain the 4 ACID properties of database transactions with real-world examples.',
    difficulty: 'Fresher',
    frequency: 'Very High',
    answer: `ACID ensures database reliability during concurrent access and hardware crashes:
1. Atomicity ("All or Nothing"): A transaction is an indivisible unit. In a bank transfer of $100 from A to B, both debit from A and credit to B must succeed; if power fails mid-way, all steps rollback.
2. Consistency: Transactions bring database from one valid state to another, satisfying all foreign keys, unique constraints, and schema rules.
3. Isolation: Concurrent transactions execute without interfering. Transaction 1 cannot see incomplete/dirty writes made by Transaction 2.
4. Durability: Once a transaction commits, the updates permanently persist even in the event of sudden power loss or system reboot (written to Write-Ahead Log / WAL).`,
    keyTakeaways: [
      'A = All or Nothing',
      'C = Constraints validated',
      'I = Isolated from concurrent reads',
      'D = Durable on disk via WAL',
    ],
    commonMistakes: 'Thinking durability means data can never be deleted; it means committed transactions survive server crashes.',
  },
  {
    id: 'iq-dbms-02',
    subjectId: 'dbms',
    category: 'Indexing & Performance',
    question: 'Why do relational databases use B+ Trees instead of Binary Search Trees (BST) or Hash Maps for indexing?',
    difficulty: 'Intermediate',
    frequency: 'Very High',
    answer: `1. Why not BST?
A Binary Search Tree has a high tree height O(log2 N). Since disk I/O is thousands of times slower than RAM, reading a deep tree requires many random disk block lookups. B+ Trees have a huge branching factor (fan-out of 100+ keys per node), keeping height very low (typically 3 to 4 levels for millions of rows), meaning only 3-4 disk I/O operations per query.

2. Why not Hash Maps?
Hash indexes provide O(1) equality lookups (WHERE id = 5) but are incapable of efficient RANGE queries (WHERE age BETWEEN 20 AND 30) or ORDER BY queries. In a B+ Tree, all data records are stored exclusively in leaf nodes linked together sequentially by a doubly linked list, making range scans blazing fast.`,
    keyTakeaways: [
      'B+ Tree fanout minimizes expensive disk read operations.',
      'Leaf node linked lists enable ultra-fast range queries and sorting.',
      'Internal nodes store only keys and child pointers, maximizing keys stored per disk page.',
    ],
    commonMistakes: 'Saying Hash Maps are better for all SQL queries; they cannot do range queries (>, <, BETWEEN).',
  },

  // ================= HTML =================
  {
    id: 'iq-html-01',
    subjectId: 'html',
    category: 'Web Architecture',
    question: 'What is the critical rendering path in browsers and how do script tags block parsing?',
    difficulty: 'Intermediate',
    frequency: 'High',
    answer: `The Critical Rendering Path is the sequence of steps browsers take to convert HTML, CSS, and JS into visible pixels:
1. DOM Construction: HTML bytes -> Tokens -> Nodes -> DOM Tree.
2. CSSOM Construction: CSS stylesheets parsed into CSS Object Model (render-blocking).
3. Render Tree: Combines visible DOM nodes with computed CSSOM styles (display: none nodes excluded).
4. Layout (Reflow): Calculates exact geometric position and size of each element.
5. Paint: Fills pixels on screen layers (backgrounds, borders, text).
6. Composite: Blends layers onto GPU buffer.

Why <script> blocks:
When HTML parser hits a standard <script src="app.js">, it pauses DOM parsing, downloads the JS, and executes it immediately because JS could call document.write().
Solution: Use async (executes whenever downloaded, out of order) or defer (downloads in background, executes in strict order after DOM is parsed).`,
    keyTakeaways: [
      'Always put CSS in <head> (render-blocking) and scripts at bottom or with defer.',
      'defer preserves execution order; async executes whenever download finishes.',
    ],
    commonMistakes: 'Using async on scripts that depend on each other (e.g. jQuery and a jQuery plugin).',
  },

  // ================= HR =================
  {
    id: 'iq-hr-01',
    subjectId: 'hr',
    category: 'Opening Question',
    question: 'Tell me about yourself (Walk me through your resume).',
    difficulty: 'Fresher',
    frequency: 'Very High',
    answer: `The ideal formula is Present -> Past -> Future (keep it strictly within 90-120 seconds):
1. Present: "I am a graduating Computer Science senior with a strong focus on backend systems, Python, and scalable database design."
2. Past: "Over the last two years, I built a high-throughput mock banking transaction system with ACID compliance, and interned where I reduced API latency by 32% using Redis caching."
3. Future: "I saw that your team is currently scaling its distributed cloud infrastructure, and I am excited to apply my data structures and problem-solving skills to this exact challenge."`,
    keyTakeaways: [
      'Do not recite high school history or personal hobbies unless asked.',
      'Connect your past technical milestones directly to the job description.',
      'Practice speaking in a confident, conversational tone without reading notes.',
    ],
    commonMistakes: 'Monologuing for 5+ minutes or repeating every single line on the printed resume.',
  },
  {
    id: 'iq-hr-02',
    subjectId: 'hr',
    category: 'Conflict & Teamwork',
    question: 'Tell me about a time you had a disagreement with a team member. How did you resolve it?',
    difficulty: 'Intermediate',
    frequency: 'Very High',
    answer: `Use the STAR technique with empathy and data-driven objectivity:
- Situation: During our major college group project, my teammate wanted to use MongoDB while I advocated for PostgreSQL.
- Task: We had a fast-approaching milestone and needed an agreed database schema without stalling development.
- Action: Rather than arguing on preferences, I suggested we list our concrete query patterns. Since our application required multi-table transactional financial balances and strict foreign key integrity, I ran a quick benchmark showing ACID constraints in PostgreSQL. I also offered to handle the SQL migration scripts so my teammate wouldn’t bear extra workload.
- Result: My teammate agreed with the data-driven proposal, we completed the sprint on time, and our system handled 10,000 transactions with zero reconciliation discrepancies.`,
    keyTakeaways: [
      'Never badmouth your colleague or portray yourself as a victim/hero.',
      'Focus on objective data, user requirements, and collaboration.',
    ],
    commonMistakes: 'Saying "I have never had any disagreements with anyone" (sounds unrealistic and unreflective).',
  },
  {
    id: 'iq-hr-03',
    subjectId: 'hr',
    category: 'Self-Awareness',
    question: 'What is your greatest weakness?',
    difficulty: 'Fresher',
    frequency: 'Very High',
    answer: `Formula: Real technical/operational area + Real negative consequence + Concrete active remedy.
"Early in my programming journey, I had a tendency to dive directly into writing code before thoroughly mapping out architectural edge cases and test cases, which sometimes led to refactoring mid-sprint.
To fix this, I adopted a strict habit: before writing code for any feature, I now spend 20 minutes drafting interface contracts and writing unit test stubs first. This has cut down debugging time by over 40% and made my code much cleaner."`,
    keyTakeaways: [
      'Do not use humblebrag clichés like "I am too much of a perfectionist" or "I work too hard".',
      'Show that you are self-aware, receptive to feedback, and taking active steps to grow.',
    ],
    commonMistakes: 'Revealing a critical disqualifying flaw like "I struggle to wake up on time" or "I get angry when stressed".',
  },
];
