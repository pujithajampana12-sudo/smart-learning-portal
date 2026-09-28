import { AptitudeQuestion } from '../types';

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: 'apt-q1',
    category: 'Quantitative',
    topic: 'Time and Work',
    question: 'A can do a piece of work in 12 days and B can do it in 18 days. If they work together on it for 4 days, what fraction of the total work is left?',
    options: ['1/3', '4/9', '5/9', '7/18'],
    correctIndex: 1,
    formula: 'Total Work = LCM(12, 18) = 36 units. Rate A = 3, Rate B = 2 units/day.',
    shortcutTrick: 'Combined rate = 3 + 2 = 5 units/day. In 4 days, work done = 4 * 5 = 20 units. Remaining = 36 - 20 = 16 units. Fraction = 16/36 = 4/9.',
    stepByStepSolution: `1. Find LCM of 12 and 18: LCM = 36 units (Total Work).
2. Rate of work done by A = 36 / 12 = 3 units/day.
3. Rate of work done by B = 36 / 18 = 2 units/day.
4. Combined work done per day = 3 + 2 = 5 units/day.
5. In 4 days, A and B together finish: 4 * 5 = 20 units.
6. Work remaining = 36 - 20 = 16 units.
7. Fraction of work remaining = 16 / 36 = 4/9.`,
  },
  {
    id: 'apt-q2',
    category: 'Quantitative',
    topic: 'Speed, Distance & Time',
    question: 'A train 150 meters long passes a telegraph pole in 10 seconds. What is the speed of the train in km/hr?',
    options: ['45 km/hr', '54 km/hr', '60 km/hr', '72 km/hr'],
    correctIndex: 1,
    formula: 'Speed = Distance / Time. To convert m/s to km/hr, multiply by 18/5.',
    shortcutTrick: 'Speed = 150 / 10 = 15 m/s. In km/hr: 15 * (18 / 5) = 3 * 18 = 54 km/hr.',
    stepByStepSolution: `1. Distance covered to pass a point pole = Length of the train = 150 meters.
2. Time taken = 10 seconds.
3. Speed in m/s = 150 m / 10 s = 15 m/s.
4. Converting m/s to km/hr: multiply by 18/5.
5. Speed = 15 * (18 / 5) = 3 * 18 = 54 km/hr.`,
  },
  {
    id: 'apt-q3',
    category: 'Quantitative',
    topic: 'Profit, Loss & Discount',
    question: 'A shopkeeper sells an article at a discount of 20% on the marked price and still gains 25%. If the cost price is $240, what is the marked price?',
    options: ['350', '375', '400', '420'],
    correctIndex: 1,
    formula: 'SP = CP * (100 + Gain%) / 100 = MP * (100 - Discount%) / 100',
    shortcutTrick: 'MP / CP = (100 + Gain%) / (100 - Discount%) = 125 / 80 = 25 / 16. MP = 240 * (25 / 16) = 15 * 25 = $375.',
    stepByStepSolution: `1. Cost Price (CP) = $240.
2. Desired gain is 25%: Selling Price (SP) = 240 * 1.25 = $300.
3. The Selling Price is after a 20% discount on Marked Price (MP): SP = 0.80 * MP.
4. 300 = 0.80 * MP => MP = 300 / 0.80 = $375.`,
  },
  {
    id: 'apt-q4',
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    question: 'Pointing to a photograph, a woman says: "He is the only son of the wife of my husband\'s father." How is the man in the photograph related to the woman?',
    options: ['Father-in-law', 'Husband', 'Brother-in-law', 'Son'],
    correctIndex: 1,
    formula: 'Break relationships backwards from the last term.',
    shortcutTrick: '"Husband\'s father" = Father-in-law -> "Wife of father-in-law" = Mother-in-law -> "Only son of mother-in-law" = Her husband.',
    stepByStepSolution: `1. Analyze "my husband's father" -> This is the woman's father-in-law.
2. "Wife of my husband's father" -> Mother-in-law.
3. "Only son of my mother-in-law" -> Since he is the ONLY son, he is her husband.
4. Therefore, the man in the photograph is her husband.`,
  },
  {
    id: 'apt-q5',
    category: 'Logical Reasoning',
    topic: 'Coding - Decoding',
    question: 'In a certain code language, "SYSTEM" is written as "SYSMET" and "NEARER" is written as "AENRER". How is "FRACTION" written in that code?',
    options: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'CRAFNOIT'],
    correctIndex: 0,
    formula: 'Divide the word into two equal halves and reverse each half.',
    shortcutTrick: 'FRACTION has 8 letters: First half "FRAC", second half "TION". Reverse first half: CARF. Reverse second half: NOIT. Combined: CARFNOIT.',
    stepByStepSolution: `1. Count letters in "SYSTEM": 6 letters. First half "SYS", second half "TEM".
2. Reverse first half: "SYS" reversed is "SYS".
3. Reverse second half: "TEM" reversed is "MET". Result = "SYSMET".
4. Count letters in "FRACTION": 8 letters.
5. First half = "FRAC" -> Reversed = "CARF".
6. Second half = "TION" -> Reversed = "NOIT".
7. Combine halves: "CARFNOIT".`,
  },
  {
    id: 'apt-q6',
    category: 'Verbal Ability',
    topic: 'Sentence Correction & Grammar',
    question: 'Select the sentence with correct grammatical agreement and syntax:',
    options: [
      'Neither of the two candidates have completed their technical assessment.',
      'Neither of the two candidates has completed his or her technical assessment.',
      'Neither of the two candidates were completing their technical assessment.',
      'Neither of the two candidates are completing his assessment.',
    ],
    correctIndex: 1,
    formula: 'Pronoun "Neither" is grammatically singular and takes a singular verb ("has", not "have").',
    shortcutTrick: '"Neither of [plural noun]" takes singular verb: "has", "is", "was".',
    stepByStepSolution: `1. The subject pronoun "Neither" is indefinite and singular when referring to two individuals.
2. Therefore, it requires a singular verb: "has", not "have" or "were" or "are".
3. The singular pronoun "his or her" agrees with the singular antecedent.
4. Hence, "Neither of the two candidates has completed..." is grammatically standard.`,
  },
];
