import { QuestionTypeEnum } from "../enums";

export interface Pitanje {
  id: number;
  text: string;
  type: QuestionTypeEnum;
  answer: string;
  isCorrect: boolean;
  isFeatured: boolean;
  dateCreated: Date;
  dateUpdated: Date;
  categories: number[];
}
