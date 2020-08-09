export class Equation {
  problem: string;
  answer: boolean;
  id: number;
  constructor(problem: string, answer: boolean, id: number) {
    this.problem = problem;
    this.answer = answer;
    this.id = id;
  }
}

export class Asset {
  id: string;
  icon: JSX.Element;
  constructor(id: string, icon: JSX.Element) {
    this.id = id;
    this.icon = icon;
  }
}
