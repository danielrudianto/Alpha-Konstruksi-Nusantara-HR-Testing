export interface Test {
  _id: string;
  name: string;
  description: string;
  questionCount: number;
  createdAt: Date;
  createdBy: string;
  createdByName: string;
  duration: number;
}
