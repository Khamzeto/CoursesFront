interface Variant {
  id: number;
  variant: string;
}

interface Test {
  id: number;
  question: string;
  variants: Variant[];
  answerId: number;
}

interface Lecture {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  id: number;
  title: string;
  lectures: Lecture[];
  tests: Test[];
  createdAt: string;
  updatedAt: string;
}

interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  preview: string | null;
  chapters: Chapter[];
  complexity: string;
  createdAt: string;
  updatedAt: string;
}

export type { Variant, Test, Lecture, Lesson, Chapter, CourseData };
