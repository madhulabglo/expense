import { Schema, Document, model } from "mongoose";

interface AmountArray {
  name: string;
  amount: string;
}

export interface OnlyExpense extends Document {
  name: string;
  date: Date;
  description: string;
  amount: string;
  amount_details: AmountArray[];
}

const amountArraySchema = new Schema<AmountArray>({
  name: { type: String},
  amount: { type: String},
});

const onlyExpenseSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: String, required: true },
  amount_details: { type: [amountArraySchema] },
});

export const onlyExpenseData = model<OnlyExpense>("OnlyExpense", onlyExpenseSchema);
