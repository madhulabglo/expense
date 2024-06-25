import { Request, Response } from "express";
import { Expense } from "../model/expenseModal";

export const addExpense = async (req: Request, res: Response) => {
  const { date, description, amount, is_expense, category } = req.body;

  try {
    if (!date || !description || !amount || !category) {
      res.status(400).json({ message: "This field is required" });
    }
    const new_expense = new Expense({
      date,
      description,
      amount,
      is_expense,
      category,
    });
    await new_expense.save();

    res
      .status(201)
      .json({ data: new_expense, success: "New data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't posted" });
  }
};

// ****************** without pagination *****************

export const getExpenseWithoutPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const all_expense = await Expense.find();
    if (all_expense.length > 0) {
      const income = all_expense.filter((expense) => !expense.is_expense);
      const expenses = all_expense.filter((expense) => expense.is_expense);

      // Calculate total income and total expenses
      const totalIncome = income.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      const totalExpenses = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );

      // Calculate available balance
      const availableBalance = totalIncome - totalExpenses;
      res.status(200).json({
        results: all_expense,
        totalIncome,
        totalExpenses,
        availableBalance,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't get" });
  }
};

// *************************with pagination ***************
export const getExpense = async (req: Request, res: Response) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 5) || 5;
    const fromdate = req.query.fromdate as string;
    const todate = req.query.todate as string;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;
    let dateFilter: any = {};

    // Construct date filter based on provided query parameters
    if (fromdate) {
      dateFilter.date = { ...dateFilter.date, $gte: new Date(fromdate) };
    }
    if (todate) {
      dateFilter.date = { ...dateFilter.date, $lte: new Date(todate) };
    }

    // Fetch all expenses within the date range
    const allExpenses = await Expense.find(dateFilter);

    // Separate income and expenses
    const income = allExpenses.filter((expense) => !expense.is_expense);
    const expenses = allExpenses.filter((expense) => expense.is_expense);

    // Calculate total income and total expenses
    const totalIncome = income.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // Calculate available balance
    const availableBalance = totalIncome - totalExpenses;

    // Fetch paginated results for the current page
    const paginatedExpenses = await Expense.find(dateFilter)
      .skip(skip)
      .limit(limit);

    // Fetch total count for pagination purposes
    const total = await Expense.countDocuments(dateFilter);

    // Send the paginated results along with pagination info and totals
    res.status(200).json({
      results: paginatedExpenses,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      totalIncome,
      totalExpenses,
      availableBalance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Data retrieval failed" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Find the document by ID and update it with the provided data
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Send the updated document as the response
    res
      .status(200)
      .json({ data: updatedExpense, success: "Expense updated succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Data didn't update" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const delete_expense = await Expense.findByIdAndDelete(id);

    if (!delete_expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ success: "Expense deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't delete" });
  }
};
