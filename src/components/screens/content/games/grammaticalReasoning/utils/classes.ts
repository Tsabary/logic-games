import { ZeroOne } from "../../../../../utils/interfaces";

export class GrammaticalReasoningRelationship {
  text: string;
  value: ZeroOne;
  constructor(text: string, value: ZeroOne) {
    this.text = text;
    this.value = value;
  }
}

export class GrammaticalReasoningTest {
  illustration: {
    shapes: ZeroOne[];
    colors: ZeroOne[];
  };
  first: ZeroOne;
  last: ZeroOne;
  relationship: GrammaticalReasoningRelationship;

  constructor(illustration: any, first: any, last: any, relationship: any) {
    this.illustration = illustration;
    this.first = first;
    this.last = last;
    this.relationship = relationship;
  }
}
