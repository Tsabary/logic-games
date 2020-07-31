export class Equation {
  problem: string;
  answer: boolean;
  constructor(problem: string, answer: boolean) {
    this.problem = problem;
    this.answer = answer;
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
