import { GPARule } from 'interfaces/gpa-rule';

export class DefaultGPARules {
  constructor() {}

  DefaultRules: GPARule[] = [
    { gradeGreaterThan: 90, correspondingGPA: 4 },
    { gradeGreaterThan: 85, correspondingGPA: 3.9 },
    { gradeGreaterThan: 80, correspondingGPA: 3.7 },
    { gradeGreaterThan: 77, correspondingGPA: 3.3 },
    { gradeGreaterThan: 73, correspondingGPA: 3 },
    { gradeGreaterThan: 70, correspondingGPA: 2.7 },
    { gradeGreaterThan: 67, correspondingGPA: 2.3 },
    { gradeGreaterThan: 63, correspondingGPA: 2 },
    { gradeGreaterThan: 60, correspondingGPA: 1.7 },
    { gradeGreaterThan: 57, correspondingGPA: 1.3 },
    { gradeGreaterThan: 53, correspondingGPA: 1 },
    { gradeGreaterThan: 50, correspondingGPA: 0.7 },
    { gradeGreaterThan: 40, correspondingGPA: 0 },
  ];
}
