import { SubjectId, TopicLesson } from '../types';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  tagline: string;
  description: string;
  badgeColor: string;
  iconName: string;
  topicsCount: number;
}

export const SUBJECTS_LIST: SubjectMeta[] = [
  {
    id: 'python',
    name: 'Python',
    tagline: 'Versatile, readable & powerful scripting',
    description: 'Master core syntax, data structures, OOP, list comprehensions, decorators, and generators.',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    iconName: 'Code',
    topicsCount: 5,
  },
  {
    id: 'java',
    name: 'Java',
    tagline: 'Enterprise OOP & JVM Architecture',
    description: 'JVM internals, class design, interfaces, collections framework, exception handling, and multi-threading.',
    badgeColor: 'text-orange-700 bg-orange-50 border-orange-200',
    iconName: 'Cpu',
    topicsCount: 5,
  },
  {
    id: 'c',
    name: 'C Programming',
    tagline: 'Low-Level Control & Memory Mastery',
    description: 'Pointer arithmetic, dynamic memory allocation (malloc/free), structs, recursion, and file manipulation.',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    iconName: 'Terminal',
    topicsCount: 5,
  },
  {
    id: 'dbms',
    name: 'DBMS & SQL',
    tagline: 'Relational Theory, Queries & Indexing',
    description: 'Relational algebra, complex SQL joins, 1NF/2NF/3NF/BCNF normalization, ACID transactions, and B-Tree indexing.',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    iconName: 'Database',
    topicsCount: 5,
  },
  {
    id: 'html',
    name: 'HTML & Web Core',
    tagline: 'Semantic Markup, Accessibility & DOM',
    description: 'HTML5 semantic architecture, accessible form controls, media elements, SEO meta tags, and DOM tree structures.',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    iconName: 'Globe',
    topicsCount: 4,
  },
  {
    id: 'aptitude',
    name: 'Quantitative Aptitude',
    tagline: 'Speed Math, Time-Work & Data Analysis',
    description: 'Formulas and shortcuts for time & work, speed/distance, profit & loss, mixtures, probability, and percentages.',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    iconName: 'Calculator',
    topicsCount: 4,
  },
  {
    id: 'reasoning',
    name: 'Logical Reasoning',
    tagline: 'Deductive, Analytical & Spatial Logic',
    description: 'Syllogisms, blood relations, seating arrangements, coding-decoding, series completion, and direction sense.',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    iconName: 'Brain',
    topicsCount: 4,
  },
  {
    id: 'hr',
    name: 'HR Interview Prep',
    tagline: 'STAR Framework, Behavioral & Etiquette',
    description: 'High-impact answers for behavioral questions, salary negotiation, strengths/weaknesses, and situational drills.',
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    iconName: 'Users',
    topicsCount: 4,
  },
];

export const TOPICS_DATA: TopicLesson[] = [
  // ================= PYTHON =================
  {
    id: 'py-01',
    subjectId: 'python',
    title: 'Python Core Syntax, Memory Model & Data Types',
    category: 'Fundamentals',
    duration: '42 min',
    level: 'Beginner',
    summary: 'Everything in Python is an object. Learn how dynamic typing, reference counting, and mutable vs immutable types behave under the hood.',
    videoId: '_uQrJ0TkZlc', // Mosh Python for Beginners
    videoChannel: 'Programming with Mosh',
    videoTitle: 'Python Tutorial for Beginners [Full Course]',
    timestamps: [
      { title: 'Variables and Memory References', time: '04:15', seconds: 255 },
      { title: 'Mutable vs Immutable Data Types', time: '12:30', seconds: 750 },
      { title: 'String Slicing & Format Strings', time: '21:00', seconds: 1260 },
      { title: 'Truthiness and Logical Operators', time: '33:10', seconds: 1990 },
    ],
    keyNotes: [
      'Variables do not hold values directly; they store memory references to objects on the heap.',
      'Immutable types: int, float, str, tuple, frozenset. Mutating them allocates a brand new object.',
      'Mutable types: list, dict, set. Modifications update the underlying memory buffer in-place.',
      'The "is" keyword compares memory address identity (id(a) == id(b)), whereas "==" evaluates equality of values.',
      'Python caches small integers (-5 to 256) through integer interning for instant pointer reuse.',
    ],
    codeSnippets: [
      {
        title: 'Mutable vs Immutable Reference Mutation',
        language: 'python',
        code: `# List mutation modifies original reference
a = [1, 2, 3]
b = a
b.append(4)
print(a)  # Output: [1, 2, 3, 4] -> Both point to the same memory!

# Integer rebinding allocates new memory
x = 1000
y = x
y += 1
print(x, y)  # Output: 1000 1001 (x is unchanged)`,
        explanation: 'Lists mutate in-place, while ints rebind to a new memory address.',
      },
      {
        title: 'List Comprehensions with Conditional Filtering',
        language: 'python',
        code: `# Fast concise list generation in C-level bytecode
squares = [x**2 for x in range(10) if x % 2 == 0]
# Result: [0, 4, 16, 36, 64]

# Dict comprehension for inverted lookup
lookup = {f"item_{i}": i * 10 for i in range(3)}
# Result: {'item_0': 0, 'item_1': 10, 'item_2': 20}`,
        explanation: 'List comprehensions run faster than manual append loops due to specialized LIST_APPEND bytecode.',
      },
    ],
    interviewTips: [
      'If an interviewer asks what happens when you pass a list to a function, explain "Pass by Object Reference" (also called call-by-sharing).',
      'Never use mutable default arguments like def func(items=[]): because the default list is evaluated once at module import and shared across invocations.',
    ],
    quiz: [
      {
        id: 'py-01-q1',
        question: 'What is the output of: a = [1, 2]; b = a; b += [3]; print(a)?',
        options: ['[1, 2]', '[1, 2, 3]', '[3]', 'TypeError: cannot modify list'],
        correctIndex: 1,
        explanation: 'The += operator calls __iadd__ on lists, which mutates the list in-place. Since b points to the same object as a, a is also [1, 2, 3].',
      },
      {
        id: 'py-01-q2',
        question: 'Which of the following data structures is immutable in Python?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctIndex: 3,
        explanation: 'Tuples are immutable sequences in Python; their elements cannot be reassigned or appended once instantiated.',
      },
    ],
  },
  {
    id: 'py-02',
    subjectId: 'python',
    title: 'Object-Oriented Programming (OOP) in Python',
    category: 'Architecture',
    duration: '48 min',
    level: 'Intermediate',
    summary: 'Deep dive into classes, inheritance, method resolution order (MRO), dunder methods (__init__, __str__, __repr__), and encapsulation.',
    videoId: 'Ej_02ICOIgs', // Corey Schafer OOP
    videoChannel: 'Corey Schafer',
    videoTitle: 'Python OOP Tutorials - Working with Classes and Instances',
    timestamps: [
      { title: 'Class vs Instance Attributes', time: '03:40', seconds: 220 },
      { title: 'Regular, Class, and Static Methods', time: '14:20', seconds: 860 },
      { title: 'Inheritance and super()', time: '26:50', seconds: 1610 },
      { title: 'Special Dunder Methods', time: '38:15', seconds: 2295 },
    ],
    keyNotes: [
      '__init__ is an initializer, not a constructor; __new__ is the actual constructor that creates the instance.',
      'The @classmethod decorator receives cls as its first argument; @staticmethod receives neither self nor cls.',
      'Multiple inheritance follows the C3 Linearization algorithm to determine Method Resolution Order (accessible via Class.__mro__).',
      'Name mangling with double underscores (e.g. __salary) prefixes the attribute with _ClassName to prevent accidental subclass override.',
    ],
    codeSnippets: [
      {
        title: 'Class vs Static vs Instance Methods',
        language: 'python',
        code: `class Employee:
    raise_amount = 1.05  # Class variable

    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary

    def apply_raise(self):
        self.salary = self.salary * self.raise_amount

    @classmethod
    def set_raise_amount(cls, amount: float):
        cls.raise_amount = amount

    @staticmethod
    def is_workday(day_of_week: int) -> bool:
        return day_of_week not in (5, 6)  # Mon=0, Sun=6`,
        explanation: 'Demonstrates clean separation between instance mutation, class-level policy, and static utility functions.',
      },
    ],
    interviewTips: [
      'Remember: Python does not have true "private" members like Java. Single underscore _var is a convention, and double underscore __var causes name mangling.',
    ],
    quiz: [
      {
        id: 'py-02-q1',
        question: 'Which method is called first when an object is created in Python?',
        options: ['__init__', '__new__', '__call__', '__build__'],
        correctIndex: 1,
        explanation: '__new__ creates and returns the new instance object before __init__ is called to initialize its properties.',
      },
    ],
  },
  {
    id: 'py-03',
    subjectId: 'python',
    title: 'Decorators, Generators & Functional Python',
    category: 'Advanced Patterns',
    duration: '52 min',
    level: 'Advanced',
    summary: 'Master closures, first-class functions, parameter-wrapping decorators, the yield keyword, and memory-efficient iterators.',
    videoId: 'FsAPt_9Bf3U',
    videoChannel: 'Corey Schafer',
    videoTitle: 'Decorators with Arguments in Python',
    timestamps: [
      { title: 'Closures and First-Class Functions', time: '02:10', seconds: 130 },
      { title: 'Writing Your First Decorator', time: '11:45', seconds: 705 },
      { title: 'functools.wraps preservation', time: '24:00', seconds: 1440 },
      { title: 'Generators with yield vs return', time: '35:30', seconds: 2130 },
    ],
    keyNotes: [
      'A decorator takes a function as argument, wraps behavior around it, and returns the modified wrapper function.',
      'Always import and apply @functools.wraps(func) on wrapper functions to preserve docstrings and __name__.',
      'Generators evaluate lazily. Instead of allocating a 10-million element array in RAM, yield produces one element on demand.',
    ],
    codeSnippets: [
      {
        title: 'Timing Decorator & Generator Stream',
        language: 'python',
        code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[BENCHMARK] {func.__name__} completed in {duration:.6f}s")
        return result
    return wrapper

# Lazy generator for infinite stream
def fibonacci_stream():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b`,
        explanation: 'Wraps callable execution with high precision timing, and yields infinite Fibonacci without memory bloat.',
      },
    ],
    interviewTips: [
      'Be prepared to write a retry decorator with a maximum attempts parameter on a whiteboard or online assessment.',
    ],
    quiz: [
      {
        id: 'py-03-q1',
        question: 'What happens to the internal execution state of a generator when it hits "yield"?',
        options: [
          'It terminates completely and deallocates memory',
          'It pauses execution and suspends local variables until next() is invoked',
          'It converts into a regular list',
          'It spawns a new background thread',
        ],
        correctIndex: 1,
        explanation: 'Generators preserve their entire frame state and instruction pointer, resuming immediately after the yield statement upon the next next() call.',
      },
    ],
  },

  // ================= JAVA =================
  {
    id: 'java-01',
    subjectId: 'java',
    title: 'Java Architecture: JVM, Memory Layout & OOP Foundation',
    category: 'Architecture',
    duration: '55 min',
    level: 'Beginner',
    summary: 'Understand the difference between JDK, JRE, and JVM. Explore Stack vs Heap memory, garbage collection roots, and core OOP principles.',
    videoId: 'grEKMHGYyns', // Telusko Java
    videoChannel: 'Telusko',
    videoTitle: 'Java Tutorial for Beginners [2024 Course]',
    timestamps: [
      { title: 'JDK vs JRE vs JVM internals', time: '06:00', seconds: 360 },
      { title: 'Stack vs Heap & String Constant Pool', time: '18:40', seconds: 1120 },
      { title: 'Polymorphism (Runtime vs Compile-time)', time: '34:10', seconds: 2050 },
      { title: 'Abstract Classes vs Interfaces', time: '46:00', seconds: 2760 },
    ],
    keyNotes: [
      'Bytecode (.class) is executed by the JVM bytecode interpreter and dynamically compiled to machine code via JIT (Just-In-Time) compiler.',
      'Stack stores primitive values and local method references; Heap stores all dynamic object allocations.',
      'Strings created with literal syntax String s = "abc" are interned in the String Pool inside the Heap to conserve memory.',
      'Java 8+ allows default and static methods inside interfaces, bridging the gap with abstract classes.',
    ],
    codeSnippets: [
      {
        title: 'String Pool Reference vs New Allocation',
        language: 'java',
        code: `public class StringDemo {
    public static void main(String[] args) {
        String s1 = "Hello";              // Interned in String Pool
        String s2 = "Hello";              // Reuses s1 reference from pool
        String s3 = new String("Hello");  // Forces new Heap allocation

        System.out.println(s1 == s2);      // true (same memory address)
        System.out.println(s1 == s3);      // false (distinct heap objects)
        System.out.println(s1.equals(s3)); // true (equivalent characters)
    }
}`,
        explanation: 'Shows why == checks reference identity and .equals() checks logical content equality.',
      },
    ],
    interviewTips: [
      'Explain the difference between final, finally, and finalize: final is a keyword for constants/immutability; finally is an execution block in try-catch; finalize was an old GC cleanup method (now deprecated).',
    ],
    quiz: [
      {
        id: 'java-01-q1',
        question: 'Where are Java objects physically stored during runtime?',
        options: ['CPU Registers', 'Thread Stack', 'Heap Memory', 'Method Area only'],
        correctIndex: 2,
        explanation: 'All object instances in Java reside on the Heap memory, managed by the Garbage Collector.',
      },
    ],
  },
  {
    id: 'java-02',
    subjectId: 'java',
    title: 'Java Collections Framework: ArrayList, HashMap & Generics',
    category: 'Data Structures',
    duration: '60 min',
    level: 'Intermediate',
    summary: 'Internal mechanics of HashMap collision handling (separate chaining to Red-Black tree conversion in Java 8), ArrayList resizing math, and HashSet uniqueness.',
    videoId: 'A74TOX803D0',
    videoChannel: 'Telusko',
    videoTitle: 'Java Collection Framework Mastery',
    timestamps: [
      { title: 'Collection Hierarchy & List vs Set', time: '04:00', seconds: 240 },
      { title: 'ArrayList internal growth factor (1.5x)', time: '16:30', seconds: 990 },
      { title: 'HashMap bucket hashing & collisions', time: '29:45', seconds: 1785 },
      { title: 'Treeify threshold (TREEIFY_THRESHOLD = 8)', time: '45:10', seconds: 2710 },
    ],
    keyNotes: [
      'ArrayList default initial capacity is 10. When full, it allocates a new array of capacity = oldCapacity + (oldCapacity >> 1) (1.5x factor).',
      'HashMap uses array of Node<K,V> buckets. When bucket depth reaches 8 nodes and total table capacity >= 64, it converts the linked list to a balanced Red-Black tree for O(log N) lookup.',
      'Always override both hashCode() and equals() together. Two equal objects according to equals() MUST return the exact same hashCode().',
    ],
    codeSnippets: [
      {
        title: 'Properly Overriding equals() and hashCode()',
        language: 'java',
        code: `import java.util.Objects;

public class Student {
    private final int id;
    private final String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student student)) return false;
        return id == student.id && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}`,
        explanation: 'Crucial for using custom objects as keys in HashMaps or items in HashSets.',
      },
    ],
    interviewTips: [
      'Why is String a popular choice for HashMap keys? Because String is immutable, so its hashCode is cached after computation and never changes.',
    ],
    quiz: [
      {
        id: 'java-02-q1',
        question: 'What is the time complexity of HashMap get(key) in the best/average case vs worst case in Java 8+?',
        options: ['O(1) average, O(N) worst', 'O(1) average, O(log N) worst', 'O(log N) average, O(N) worst', 'O(N) in both'],
        correctIndex: 1,
        explanation: 'In Java 8+, hash buckets convert to Red-Black trees when collisions exceed 8 nodes, guaranteeing O(log N) worst-case search instead of O(N).',
      },
    ],
  },

  // ================= C PROGRAMMING =================
  {
    id: 'c-01',
    subjectId: 'c',
    title: 'C Pointers, Memory Addresses & Pointer Arithmetic',
    category: 'Pointers & Memory',
    duration: '50 min',
    level: 'Beginner',
    summary: 'Demystify memory addresses, referencing (&), dereferencing (*), double pointers (**), and pointer arithmetic scaling.',
    videoId: 'KJgsSFOSQv0', // freeCodeCamp C Course
    videoChannel: 'freeCodeCamp.org',
    videoTitle: 'C Programming Tutorial for Beginners',
    timestamps: [
      { title: 'What is a memory address in RAM?', time: '02:00', seconds: 120 },
      { title: 'The & and * Operators explained', time: '14:20', seconds: 860 },
      { title: 'Pointer Arithmetic & sizeof scaling', time: '28:30', seconds: 1710 },
      { title: 'Passing Pointers to Functions', time: '41:00', seconds: 2460 },
    ],
    keyNotes: [
      'A pointer is simply a variable whose value is the hex memory address of another variable.',
      'The unary & operator extracts the memory address; unary * dereferences (fetches value at address).',
      'Pointer arithmetic scales by sizeof(data_type). If ptr is an int* at address 0x1000, ptr + 1 evaluates to 0x1004 on 32/64-bit systems where sizeof(int) is 4 bytes.',
      'Arrays decay to pointers to their first element when passed into functions.',
    ],
    codeSnippets: [
      {
        title: 'Pass-by-Reference in C using Pointers',
        language: 'c',
        code: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 42, b = 99;
    printf("Before: a=%d, b=%d\\n", a, b);
    swap(&a, &b);
    printf("After:  a=%d, b=%d\\n", a, b); // a=99, b=42
    return 0;
}`,
        explanation: 'C is strictly pass-by-value; to mutate variables in caller scope, pass their memory addresses.',
      },
    ],
    interviewTips: [
      'Distinguish: "const int *p" (pointer to constant int; data cannot change) vs "int * const p" (constant pointer; address cannot change).',
    ],
    quiz: [
      {
        id: 'c-01-q1',
        question: 'If int *ptr = 2000 and sizeof(int) == 4, what is the value of ptr + 2?',
        options: ['2002', '2004', '2008', '2016'],
        correctIndex: 2,
        explanation: 'Pointer addition increments address by (count * sizeof(type)). So 2000 + (2 * 4) = 2008.',
      },
    ],
  },
  {
    id: 'c-02',
    subjectId: 'c',
    title: 'Dynamic Memory Allocation (malloc, calloc, realloc, free)',
    category: 'Memory Management',
    duration: '45 min',
    level: 'Intermediate',
    summary: 'Heap management, avoiding memory leaks, dangling pointers, double-free bugs, and zero-initialization with calloc.',
    videoId: 'zuegQmMdy8M',
    videoChannel: 'Jacob Sorber',
    videoTitle: 'Dynamic Memory Allocation in C (malloc, free)',
    timestamps: [
      { title: 'Stack vs Heap in C binary layout', time: '03:15', seconds: 195 },
      { title: 'malloc() vs calloc() allocation', time: '15:00', seconds: 900 },
      { title: 'realloc() memory relocation and safety', time: '27:10', seconds: 1630 },
      { title: 'Dangling pointers and free()', time: '38:00', seconds: 2280 },
    ],
    keyNotes: [
      'malloc(size_t size) allocates uninitialized bytes (containing indeterminate garbage values).',
      'calloc(num, size) allocates memory AND zeroes out all allocated bytes.',
      'Always verify if allocation succeeded: if (ptr == NULL) { handle out-of-memory error; }.',
      'After free(ptr), the pointer still holds the old address (dangling pointer). Always set ptr = NULL immediately.',
    ],
    codeSnippets: [
      {
        title: 'Safe Heap Allocation & Cleanup Pattern',
        language: 'c',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));
    
    if (arr == NULL) {
        fprintf(stderr, "Heap memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    // Always free heap memory when done
    free(arr);
    arr = NULL; // Defend against dangling pointer access
    return 0;
}`,
        explanation: 'Standard robust pattern: check NULL after malloc, free when done, and set to NULL.',
      },
    ],
    interviewTips: [
      'What is a memory leak? Heap memory that is allocated via malloc but never released with free(), leading to depleted RAM over time.',
    ],
    quiz: [
      {
        id: 'c-02-q1',
        question: 'What is the primary difference between malloc() and calloc()?',
        options: [
          'malloc is faster and clears memory to zero',
          'calloc zeroes out allocated bytes, while malloc leaves memory uninitialized',
          'malloc is allocated on Stack, calloc on Heap',
          'calloc cannot be resized with realloc',
        ],
        correctIndex: 1,
        explanation: 'calloc initializes all allocated bytes to zero; malloc leaves memory with whatever residual garbage was in RAM.',
      },
    ],
  },

  // ================= DBMS & SQL =================
  {
    id: 'dbms-01',
    subjectId: 'dbms',
    title: 'Relational Database Concepts, SQL Joins & Aggregate Queries',
    category: 'SQL & Relations',
    duration: '52 min',
    level: 'Beginner',
    summary: 'Master primary keys, foreign keys, INNER vs OUTER joins, GROUP BY with HAVING, and order of SQL execution.',
    videoId: 'HXV3zeQKqGY', // freeCodeCamp SQL
    videoChannel: 'freeCodeCamp.org',
    videoTitle: 'SQL Tutorial - Full Database Course for Beginners',
    timestamps: [
      { title: 'Relational Tables & Constraints', time: '05:30', seconds: 330 },
      { title: 'INNER, LEFT, RIGHT, and FULL Joins', time: '21:15', seconds: 1275 },
      { title: 'GROUP BY vs WHERE vs HAVING clause', time: '36:40', seconds: 2200 },
      { title: 'Order of SQL Execution Breakdown', time: '48:10', seconds: 2890 },
    ],
    keyNotes: [
      'Logical SQL Order of Execution: FROM -> ON -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.',
      'WHERE filters rows BEFORE aggregation; HAVING filters groups AFTER aggregation.',
      'An INNER JOIN returns only records where keys match on both sides; a LEFT JOIN keeps all records from the left table even if right table is NULL.',
      'Primary Key enforces both UNIQUE and NOT NULL constraints automatically.',
    ],
    codeSnippets: [
      {
        title: 'Department Wise Salary Aggregation with HAVING',
        language: 'sql',
        code: `-- Find departments with more than 3 employees and average salary > 60k
SELECT 
    d.department_name,
    COUNT(e.id) AS total_employees,
    ROUND(AVG(e.salary), 2) AS average_salary
FROM departments d
INNER JOIN employees e ON d.id = e.department_id
WHERE e.is_active = TRUE
GROUP BY d.department_name
HAVING COUNT(e.id) >= 3 AND AVG(e.salary) > 60000
ORDER BY average_salary DESC;`,
        explanation: 'Highlights proper usage of WHERE (filters active rows) and HAVING (filters aggregated groups).',
      },
    ],
    interviewTips: [
      'Why cant you use aggregate functions like COUNT() or AVG() in a WHERE clause? Because WHERE executes before rows are grouped!',
    ],
    quiz: [
      {
        id: 'dbms-01-q1',
        question: 'Which SQL clause is evaluated FIRST by the relational query engine?',
        options: ['SELECT', 'WHERE', 'FROM', 'ORDER BY'],
        correctIndex: 2,
        explanation: 'The FROM clause is evaluated first to determine the working dataset and join sources.',
      },
    ],
  },
  {
    id: 'dbms-02',
    subjectId: 'dbms',
    title: 'Normalization (1NF, 2NF, 3NF, BCNF) & ACID Transactions',
    category: 'Database Design',
    duration: '48 min',
    level: 'Intermediate',
    summary: 'Eliminate update, insertion, and deletion anomalies through formal normal forms. Understand Atomicity, Consistency, Isolation, and Durability.',
    videoId: 'UrYLYV7WSHM',
    videoChannel: 'Gate Smashers',
    videoTitle: 'Normalization in DBMS (1NF, 2NF, 3NF, BCNF)',
    timestamps: [
      { title: 'Anomalies in Unnormalized Data', time: '03:00', seconds: 180 },
      { title: '1NF: Atomic Columns and No Repeating Groups', time: '12:20', seconds: 740 },
      { title: '2NF: Removal of Partial Dependency', time: '22:15', seconds: 1335 },
      { title: '3NF & BCNF: Removal of Transitive Dependency', time: '34:00', seconds: 2040 },
      { title: 'ACID Properties in Banking Transactions', time: '42:30', seconds: 2550 },
    ],
    keyNotes: [
      '1NF: Each column contains only atomic (indivisible) values; no multi-valued attributes or repeating groups.',
      '2NF: Must be in 1NF AND have no partial dependency (no non-prime attribute depends on a proper subset of candidate key).',
      '3NF: Must be in 2NF AND have no transitive dependency (X -> Y where Y is non-prime and X is not candidate key).',
      'ACID: Atomicity (All or Nothing), Consistency (Rules valid), Isolation (Concurrent transactions do not collide), Durability (Committed data persists power loss).',
    ],
    codeSnippets: [
      {
        title: 'ACID Transaction Control with Rollback',
        language: 'sql',
        code: `BEGIN TRANSACTION;

-- Deduct 500 from Account A
UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 'ACC_101' AND balance >= 500;

-- Credit 500 to Account B
UPDATE accounts 
SET balance = balance + 500 
WHERE account_id = 'ACC_202';

-- If both succeeded, commit to disk
COMMIT;
-- If any error occurs: ROLLBACK;`,
        explanation: 'Guarantees either both balance changes persist or neither does, satisfying Atomicity.',
      },
    ],
    interviewTips: [
      'Explain isolation levels: Read Uncommitted (dirty reads possible), Read Committed, Repeatable Read (phantom reads possible), and Serializable (strictest).',
    ],
    quiz: [
      {
        id: 'dbms-02-q1',
        question: 'A table where non-prime attributes depend only on the entire candidate key and have no partial dependencies is in which normal form?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctIndex: 1,
        explanation: '2NF specifically eliminates partial functional dependencies on composite candidate keys.',
      },
    ],
  },

  // ================= HTML & WEB =================
  {
    id: 'html-01',
    subjectId: 'html',
    title: 'HTML5 Semantic Elements, Forms & Accessibility (A11y)',
    category: 'Web Foundations',
    duration: '40 min',
    level: 'Beginner',
    summary: 'Construct meaningful web documents using <header>, <main>, <nav>, <article>, <aside>, accessible form controls, and ARIA roles.',
    videoId: 'kUMe1FH4CHE', // freeCodeCamp HTML
    videoChannel: 'freeCodeCamp.org',
    videoTitle: 'HTML Full Course - Build a Website Tutorial',
    timestamps: [
      { title: 'Why Semantic HTML matters for SEO & Screen Readers', time: '04:10', seconds: 250 },
      { title: 'Form Input Types, Regex Patterns, and Labels', time: '16:30', seconds: 990 },
      { title: 'The <picture> and srcset Responsive Images', time: '27:00', seconds: 1620 },
      { title: 'ARIA attributes and keyboard tab navigation', time: '35:15', seconds: 2115 },
    ],
    keyNotes: [
      'Never use <div> for everything (div-soup). Use <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.',
      'Always associate <label> elements with <input> using the "for" attribute matching the input "id".',
      'The "alt" attribute on <img> is mandatory for accessibility. If purely decorative, provide empty alt="".',
      'Use proper heading hierarchy (one single <h1> per page, followed progressively by <h2>, <h3>). Never skip levels.',
    ],
    codeSnippets: [
      {
        title: 'Accessible HTML5 Form with Native Validation',
        language: 'html',
        code: `<form action="/submit-application" method="POST" novalidate>
  <div class="field-group">
    <label for="student-email">University Email</label>
    <input 
      type="email" 
      id="student-email" 
      name="email" 
      required 
      pattern=".+@.+\\.edu"
      placeholder="student@univ.edu"
      aria-describedby="email-hint"
    />
    <p id="email-hint">Must end in a valid .edu domain</p>
  </div>
  <button type="submit">Submit Application</button>
</form>`,
        explanation: 'Shows explicit label binding, regular expression pattern validation, and aria-describedby for assistive tech.',
      },
    ],
    interviewTips: [
      'What is the difference between localStorage, sessionStorage, and cookies? localStorage has no expiration; sessionStorage clears on tab close; cookies (max ~4KB) are transmitted with every HTTP request.',
    ],
    quiz: [
      {
        id: 'html-01-q1',
        question: 'Which HTML5 element represents self-contained content that could theoretically be distributed independently (e.g. blog post, news story)?',
        options: ['<section>', '<article>', '<aside>', '<div>'],
        correctIndex: 1,
        explanation: '<article> is designated for standalone, self-contained syndicate-ready content.',
      },
    ],
  },

  // ================= APTITUDE =================
  {
    id: 'apt-01',
    subjectId: 'aptitude',
    title: 'Time & Work, Pipes & Cisterns: Shortcut Formulas',
    category: 'Quantitative Aptitude',
    duration: '35 min',
    level: 'Beginner',
    summary: 'Solve complex unit-work equations, efficiency ratios, alternate working days, and inlet/outlet pipe problems in under 60 seconds.',
    videoId: '20bVwNqO4mY',
    videoChannel: 'CareerRide',
    videoTitle: 'Time and Work Shortcuts & Tricks',
    timestamps: [
      { title: 'The LCM Unit-Work Method Explained', time: '02:30', seconds: 150 },
      { title: 'Alternate Days Working Problems', time: '13:45', seconds: 825 },
      { title: 'Efficiency Ratio Scaling', time: '23:00', seconds: 1380 },
      { title: 'Negative Work with Drain Pipes', time: '30:10', seconds: 1810 },
    ],
    keyNotes: [
      'The LCM method: Assume Total Work = LCM of individual times. Efficiency = Total Work / Individual Time.',
      'If A completes work in X days and B in Y days, combined time = (X * Y) / (X + Y).',
      'If A is 3 times as efficient as B, Ratio of Efficiency = 3:1, so Ratio of Time taken = 1:3.',
      'Pipes & Cisterns treat inlet pipe filling as positive work (+ units) and outlet leak draining as negative work (- units).',
    ],
    codeSnippets: [
      {
        title: 'LCM Method Calculation Formula',
        language: 'text',
        code: `Problem: A takes 12 days, B takes 18 days. Together?
Step 1: Total Work = LCM(12, 18) = 36 units
Step 2: A's 1-day work = 36 / 12 = 3 units/day
Step 3: B's 1-day work = 36 / 18 = 2 units/day
Step 4: Combined 1-day work = 3 + 2 = 5 units/day
Step 5: Total days = 36 / 5 = 7.2 days (7 days 4 hours)`,
        explanation: 'The fastest mental math method for competitive and placement exams.',
      },
    ],
    interviewTips: [
      'Always start by writing down individual efficiencies. Never work with fractions like 1/12 + 1/18 if you can use the LCM integer method.',
    ],
    quiz: [
      {
        id: 'apt-01-q1',
        question: 'Pipe A can fill a tank in 10 hrs and Pipe B can empty it in 15 hrs. If both are opened together, in how many hours will the tank be full?',
        options: ['25 hrs', '30 hrs', '12 hrs', '20 hrs'],
        correctIndex: 1,
        explanation: 'Capacity = LCM(10, 15) = 30 units. A fills +3 units/hr, B drains -2 units/hr. Net rate = +1 unit/hr. 30 / 1 = 30 hours.',
      },
    ],
  },

  // ================= REASONING =================
  {
    id: 'res-01',
    subjectId: 'reasoning',
    title: 'Syllogisms & Venn Diagram Deductive Reasoning',
    category: 'Logical Deduction',
    duration: '38 min',
    level: 'Beginner',
    summary: 'Master standard categorical syllogism rules: All A are B, Some A are B, No A are B, and the "Either/Or" complementary pair rules.',
    videoId: 'Yq2aJ2E67W8',
    videoChannel: 'Feel Free to Learn',
    videoTitle: 'Syllogism Tricks & Concepts in Reasoning',
    timestamps: [
      { title: 'Basic Statements & Minimum Overlap Venn', time: '03:15', seconds: 195 },
      { title: 'The Possibility Cases vs Definite Cases', time: '14:00', seconds: 840 },
      { title: 'Complementary Pairs (Either-Or)', time: '26:30', seconds: 1590 },
    ],
    keyNotes: [
      'Always draw the "Minimum Overlap" Venn Diagram first to test if a conclusion is definitely true.',
      'A conclusion is definitely true only if it holds across EVERY possible valid diagram.',
      'Possibility rule: If a conclusion has the word "can be" or "possibility", check if you can draw ANY valid diagram without violating statements.',
      'Either-Or condition requirements: 1. Both conclusions must be false individually; 2. Elements must be identical; 3. One must be affirmative, one negative (Some + No or Some + Some Not).',
    ],
    codeSnippets: [
      {
        title: 'Syllogism Analysis Matrix',
        language: 'text',
        code: `Statements:
1. All Mangoes are Fruits.
2. Some Fruits are Sweet.

Conclusions:
I. Some Mangoes are Sweet.   -> False (Not definitely true in basic Venn)
II. All Mangoes being Sweet is a possibility. -> True (Valid diagram exists!)`,
        explanation: 'Demonstrates definite vs possibility conclusions.',
      },
    ],
    interviewTips: [
      'In tech placement tests, watch out for keywords like "Only a few A are B" which means "Some A are B AND Some A are NOT B".',
    ],
    quiz: [
      {
        id: 'res-01-q1',
        question: 'Statements: "All dogs are mammals. No mammals are birds." Conclusion: "No dogs are birds."',
        options: ['Follows logically', 'Does not follow', 'Either/Or', 'Cannot be determined'],
        correctIndex: 0,
        explanation: 'Since all dogs are inside the mammal circle and mammals have zero overlap with birds, dogs can have zero overlap with birds. Follows 100%.',
      },
    ],
  },

  // ================= HR INTERVIEW =================
  {
    id: 'hr-01',
    subjectId: 'hr',
    title: 'The STAR Method & High-Yield Behavioral Questions',
    category: 'Behavioral Interviews',
    duration: '32 min',
    level: 'Beginner',
    summary: 'Structure your answers using Situation, Task, Action, and Result. Master questions like "Tell me about yourself" and "Overcoming failure".',
    videoId: '1mHjMNZZvFo',
    videoChannel: 'Jeff Su',
    videoTitle: 'How to Answer Interview Questions with the STAR Method',
    timestamps: [
      { title: 'Why HR Interviewers use Behavioral Evaluation', time: '02:00', seconds: 120 },
      { title: 'Breaking down S-T-A-R with percentage weights', time: '08:15', seconds: 495 },
      { title: 'Common Mistakes: Too much Situation, zero Action', time: '17:30', seconds: 1050 },
      { title: 'Quantifying Results: Metrics and Business Impact', time: '25:00', seconds: 1500 },
    ],
    keyNotes: [
      'Time allocation formula: Situation (15%), Task (10%), Action (60% - focus on YOUR role), Result (15% - quantified outcome).',
      'Avoid saying "We did this" repeatedly; interviewers are hiring YOU, not your whole team. Highlight "I architected...", "I identified...".',
      'For "Tell me about yourself": Present (current degree/role) -> Past (key project/milestone) -> Future (why this exact role).',
      'When addressing weaknesses, choose a genuine technical or procedural growth area and demonstrate the concrete steps you are actively taking to improve.',
    ],
    codeSnippets: [
      {
        title: 'STAR Method Blueprint Example',
        language: 'text',
        code: `Question: "Tell me about a time you handled a difficult deadline."
[SITUATION]: "During my final semester capstone, our database server crashed 72 hours before demo day."
[TASK]: "As the backend lead, I had to recover lost seed data and migrate to a resilient hosted instance."
[ACTION]: "I wrote a Python migration script to parse cached logs, set up automated schema validation, and held daily 15-min syncs."
[RESULT]: "We restored 100% of data 18 hours before deadline and earned an A grade with zero runtime errors."`,
        explanation: 'Concrete, concise, action-focused with clear quantified results.',
      },
    ],
    interviewTips: [
      'Always have 2-3 thoughtful questions ready when the interviewer asks "Do you have any questions for us?". E.g., "What does success look like in the first 90 days?"',
    ],
    quiz: [
      {
        id: 'hr-01-q1',
        question: 'Which part of the STAR framework should receive the largest share (approx 50-60%) of your speaking time?',
        options: ['Situation', 'Task', 'Action', 'Result'],
        correctIndex: 2,
        explanation: 'Action describes your specific thought process, engineering decisions, and personal contributions.',
      },
    ],
  },
];
