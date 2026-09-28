import { CodingProblem } from '../types';

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-01',
    title: 'Two Sum',
    subjectId: 'python',
    difficulty: 'Easy',
    category: 'Arrays & Hash Maps',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 2 + 4 = 6.',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Use a HashMap for O(n) lookup
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Brute force or hash table approach
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                res[0] = i;
                res[1] = j;
                return res;
            }
        }
    }
    return NULL;
}`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
    },
    solution: {
      language: 'python',
      code: `def twoSum(nums: list[int], target: int) -> list[int]:
    prevMap = {} # val -> index

    for i, n in enumerate(nums):
        diff = target - n
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i
    return []`,
      approach: 'Hash Map (Single Pass): As we iterate through nums, we calculate the required complement (target - num). If the complement is already in our hash map, we found our pair. Otherwise, we store the current number with its index.',
      complexityAnalysis: 'Time Complexity: O(N) since hash table lookups take O(1) average time. Space Complexity: O(N) to store up to N elements in the map.',
    },
    hints: [
      'A brute force O(N^2) checks every pair (i, j). Can you do better with extra memory?',
      'Can you use a hash map to check if (target - current_number) has already been seen?',
    ],
    testCases: [
      { id: 'tc-1', input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { id: 'tc-2', input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { id: 'tc-3', input: '[3, 3], 6', expectedOutput: '[0, 1]' },
    ],
  },
  {
    id: 'prob-02',
    title: 'Valid Parentheses',
    subjectId: 'java',
    difficulty: 'Easy',
    category: 'Stack & Strings',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false' },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"',
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      c: `bool isValid(char* s) {
    int len = strlen(s);
    char stack[len + 1];
    int top = -1;
    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) return false;
            char open = stack[top--];
            if (c == ')' && open != '(') return false;
            if (c == '}' && open != '{') return false;
            if (c == ']' && open != '[') return false;
        }
    }
    return top == -1;
}`,
      javascript: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
    },
    solution: {
      language: 'java',
      code: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
      approach: 'Stack (LIFO): For every open bracket, push its expected closing bracket onto the stack. When encounter a closing bracket, pop the top of the stack and check if it matches.',
      complexityAnalysis: 'Time Complexity: O(N) since we inspect each character once. Space Complexity: O(N) in the worst case (e.g. "((((").',
    },
    hints: [
      'Think about the Last-In First-Out (LIFO) property of matching nested brackets.',
      'What data structure naturally models LIFO?',
    ],
    testCases: [
      { id: 'tc-1', input: '"()"', expectedOutput: 'true' },
      { id: 'tc-2', input: '"()[]{}"', expectedOutput: 'true' },
      { id: 'tc-3', input: '"(]"', expectedOutput: 'false' },
      { id: 'tc-4', input: '"([)]"', expectedOutput: 'false' },
    ],
  },
  {
    id: 'prob-03',
    title: 'Reverse a String in C using Pointers',
    subjectId: 'c',
    difficulty: 'Easy',
    category: 'Pointers & Memory',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: `Write a function that reverses a null-terminated C string in-place without allocating auxiliary memory, using two pointer variables (left and right).`,
    examples: [
      { input: 's = "hello"', output: '"olleh"' },
      { input: 's = "SmartLearn"', output: '"nraeLtramS"' },
    ],
    constraints: [
      '1 <= strlen(s) <= 10^5',
      'The string must be modified in-place.',
      'Must use pointer arithmetic (*left, *right).',
    ],
    starterCode: {
      python: `def reverseString(s: str) -> str:
    # Python equivalent
    return s[::-1]`,
      java: `class Solution {
    public String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}`,
      c: `void reverseString(char* s) {
    if (s == NULL) return;
    char *left = s;
    char *right = s + strlen(s) - 1;
    while (left < right) {
        char temp = *left;
        *left = *right;
        *right = temp;
        left++;
        right--;
    }
}`,
      javascript: `function reverseString(s) {
    let arr = s.split('');
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr.join('');
}`,
    },
    solution: {
      language: 'c',
      code: `void reverseString(char* s) {
    if (!s || !*s) return;
    char *start = s;
    char *end = s;
    while (*end) end++;
    end--; // Move off the null terminator '\\0'

    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}`,
      approach: 'Two-Pointer Technique: Initialize start at the beginning of the memory buffer and end at the last valid character before the null-terminator. Swap the dereferenced values and increment start while decrementing end.',
      complexityAnalysis: 'Time Complexity: O(N) to traverse string length. Space Complexity: O(1) auxiliary space.',
    },
    hints: [
      'Remember that in C, strings end with the null terminator character \\0.',
      'Move the right pointer to strlen(s) - 1 so you don’t accidentally swap \\0 into the front!',
    ],
    testCases: [
      { id: 'tc-1', input: '"hello"', expectedOutput: '"olleh"' },
      { id: 'tc-2', input: '"algorithm"', expectedOutput: '"mhtirogla"' },
    ],
  },
  {
    id: 'prob-04',
    title: 'Second Highest Salary (SQL/DBMS)',
    subjectId: 'dbms',
    difficulty: 'Medium',
    category: 'SQL Subqueries',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
    description: `Write a SQL query to find the second highest distinct salary from the \`Employee\` table. If there is no second highest salary, return \`NULL\`.

Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+`,
    examples: [
      {
        input: 'Employee table: [{id: 1, salary: 100}, {id: 2, salary: 200}, {id: 3, salary: 300}]',
        output: '200',
        explanation: 'The highest salary is 300, and the second highest is 200.',
      },
      {
        input: 'Employee table: [{id: 1, salary: 100}]',
        output: 'NULL',
        explanation: 'There is only one salary, so no second highest exists.',
      },
    ],
    constraints: [
      'Must handle duplicates correctly with DISTINCT.',
      'Must return NULL if fewer than two distinct salaries exist.',
    ],
    starterCode: {
      python: `def secondHighestSalary(salaries: list[int]):
    unique_salaries = sorted(list(set(salaries)), reverse=True)
    return unique_salaries[1] if len(unique_salaries) >= 2 else None`,
      java: `// Equivalent Java stream solution
public Integer getSecondHighest(List<Integer> salaries) {
    return salaries.stream()
        .distinct()
        .sorted(Comparator.reverseOrder())
        .skip(1)
        .findFirst()
        .orElse(null);
}`,
      c: `// C array approach
int getSecondHighest(int* salaries, int n) {
    int max1 = -1, max2 = -1;
    for (int i = 0; i < n; i++) {
        if (salaries[i] > max1) {
            max2 = max1;
            max1 = salaries[i];
        } else if (salaries[i] > max2 && salaries[i] != max1) {
            max2 = salaries[i];
        }
    }
    return max2;
}`,
      sql: `SELECT 
    (SELECT DISTINCT salary 
     FROM Employee 
     ORDER BY salary DESC 
     LIMIT 1 OFFSET 1) AS SecondHighestSalary;`,
      javascript: `function secondHighestSalary(salaries) {
    const unique = [...new Set(salaries)].sort((a, b) => b - a);
    return unique.length >= 2 ? unique[1] : null;
}`,
    },
    solution: {
      language: 'sql',
      code: `SELECT 
    MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
      approach: 'Subquery Approach: Find the maximum salary that is strictly less than the overall maximum salary in the table. If no such record exists, MAX() naturally returns NULL.',
      complexityAnalysis: 'Time Complexity: O(N) with two table scans, or O(log N) if an index on salary exists. Space Complexity: O(1).',
    },
    hints: [
      'Be careful with duplicate top salaries! e.g. [300, 300, 200] -> the second highest distinct salary is 200, not 300.',
      'Wrap your query in a subquery or use MAX() to ensure NULL is returned if there is only 1 row.',
    ],
    testCases: [
      { id: 'tc-1', input: '[100, 200, 300]', expectedOutput: '200' },
      { id: 'tc-2', input: '[100]', expectedOutput: 'null' },
      { id: 'tc-3', input: '[300, 300, 200]', expectedOutput: '200' },
    ],
  },
  {
    id: 'prob-05',
    title: 'Debounce Search Input (HTML/JS)',
    subjectId: 'html',
    difficulty: 'Medium',
    category: 'Web DOM & Async',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: `Implement a \`debounce\` function that delays invoking a callback until after \`delayMs\` milliseconds have elapsed since the last time the debounced function was invoked. This is crucial in web applications for search autocomplete inputs to prevent hitting servers on every single keystroke.`,
    examples: [
      {
        input: 'Calls at 0ms, 50ms, 100ms with delay = 200ms',
        output: 'Only the 100ms call executes at 300ms',
        explanation: 'Earlier calls are canceled because subsequent keystrokes arrived before delay expired.',
      },
    ],
    constraints: [
      'delayMs >= 0',
      'Should forward arguments and context properly.',
    ],
    starterCode: {
      python: `import time
# Concept: Throttle/Debounce in Python
def debounce(fn, wait):
    # Simulated debounce timer
    pass`,
      java: `// ScheduledExecutorService implementation in Java`,
      c: `// C timer event implementation`,
      javascript: `function debounce(fn, delay) {
    let timerId = null;
    return function(...args) {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}`,
    },
    solution: {
      language: 'javascript',
      code: `function debounce(fn, delay) {
    let timerId = null;
    return function(...args) {
        const context = this;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}`,
      approach: 'Closure with clearTimeout: Keep a persistent timerId reference inside the outer closure. Whenever the returned function is called, reset the previous timer before starting a new one.',
      complexityAnalysis: 'Time Complexity: O(1) per keystroke invocation. Space Complexity: O(1) closure state.',
    },
    hints: [
      'Use a closure to keep track of the active timer ID.',
      'clearTimeout() cancels any pending timeout before setting a new one with setTimeout().',
    ],
    testCases: [
      { id: 'tc-1', input: 'Single call with delay 100ms', expectedOutput: 'Executed once' },
      { id: 'tc-2', input: 'Burst of 5 keystrokes within 50ms', expectedOutput: 'Executed once after final keystroke' },
    ],
  },
  {
    id: 'prob-06',
    title: 'Valid Palindrome',
    subjectId: 'python',
    difficulty: 'Easy',
    category: 'Strings & Two Pointers',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.',
    ],
    starterCode: {
      python: `def isPalindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
      c: `bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}`,
      javascript: `function isPalindrome(s) {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let l = 0, r = clean.length - 1;
    while (l < r) {
        if (clean[l] !== clean[r]) return false;
        l++;
        r--;
    }
    return true;
}`,
    },
    solution: {
      language: 'python',
      code: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`,
      approach: 'Two Pointers in-place: Increment left and decrement right while skipping non-alphanumeric characters. Compare lowercased characters directly to achieve O(1) auxiliary memory.',
      complexityAnalysis: 'Time Complexity: O(N). Space Complexity: O(1) in-place pointers.',
    },
    hints: [
      'Two pointers moving towards each other can avoid allocating a new string in memory.',
      'Check char.isalnum() to skip punctuation and whitespace.',
    ],
    testCases: [
      { id: 'tc-1', input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { id: 'tc-2', input: '"race a car"', expectedOutput: 'false' },
      { id: 'tc-3', input: '" "', expectedOutput: 'true' },
    ],
  },
];
