import { model, Document, Schema } from "mongoose";

export interface Expense extends Document {
  date: Date;
  description: string;
  amount: number;
  is_expense: boolean;
  category:string;
}

const expenseSchema: Schema = new Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  is_expense: { type: Boolean },
  category: {
    type: String,
    required: true,
  },
});

export const Expense = model<Expense>("expense", expenseSchema);
