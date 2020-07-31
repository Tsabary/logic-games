import { GrammaticalReasoningRelationship } from "./classes";

// These are all the possible "relationships" between the square an the circle. Their values are based on what they mean for the first shape that is introduced.
// Value of 1 means that the first shape is bigger than the one following it, and 0 means that it is smaller.
export default [
  new GrammaticalReasoningRelationship("is bigger than", 1),
  new GrammaticalReasoningRelationship("is not bigger than", 0),
  new GrammaticalReasoningRelationship("is smaller than", 0),
  new GrammaticalReasoningRelationship("is not smaller than", 1),
  new GrammaticalReasoningRelationship("is contained by", 0),
  new GrammaticalReasoningRelationship("is not contained by", 1),
  new GrammaticalReasoningRelationship("encapsulates", 1),
  new GrammaticalReasoningRelationship("does not encapsulate", 0),
  new GrammaticalReasoningRelationship("is encapsulated by", 0),
  new GrammaticalReasoningRelationship("is not encapsulated by", 1),
  new GrammaticalReasoningRelationship("contains", 1),
  new GrammaticalReasoningRelationship("does not contain", 0),
];
