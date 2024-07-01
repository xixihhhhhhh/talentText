interface QuesData {
  ratioA: number;
  ratioB: number;
  ratioC: number;
  ratioD: number;
  ratioE: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  questionName: string;
  questionType: string;
}

export interface Question {
  id: number;
  careerField: string;
  careerAdvantages: string;
  competency: string;
  quesData: QuesData;
  create_time: string;
  update_time: string;
}

export interface Answer {
  careerField: string;
  careerAdvantages: string;
  competency: string;
  score: number;
  value: string;
}
