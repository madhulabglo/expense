import { Request, Response } from "express";
import { onlyExpenseData } from "../model/onlyexpenseModel";
import { RoomMates } from "../model/roomMatesModel";

export const addonlyexpense = async (req: Request, res: Response) => {
  const { name, date, description, amount, amount_details } = req.body;

  try {
    if (!name || !date || !description || !amount) {
      return res.status(400).json({ message: "This fields are required" });
    }

    const new_expense = new onlyExpenseData({
      name,
      date,
      description,
      amount,
      amount_details,
    });
    await new_expense.save();

    res.status(201).json({
      data: new_expense,
      success: "The new Expense created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't posted" });
  }
};

export const onlyexpenselistWithoutPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const all_expense_list = await onlyExpenseData.find();
    if (all_expense_list.length > 0) {
      const total_expense = all_expense_list.reduce(
        (acc, expense) => acc + parseInt(expense.amount),
        0
      );
      res.status(200).json({
        results: all_expense_list,
        total_expense,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't get" });
  }
};

export const onlyExpenselistWithPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 5) || 5;
    const fromdate = req.query.fromdate as string;
    const todate = req.query.todate as string;
    const search = req.query.search as string;

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

    // Log the constructed date filter for debugging

    // Fetch all expenses within the date range
    const allExpenses = await onlyExpenseData.find(dateFilter);

    // Calculate total income and total expenses
    const totalExpenses = allExpenses.reduce(
      (acc, expense) => acc + parseInt(expense.amount),
      0
    );

    // Fetch paginated results for the current page
    const paginatedExpenses = await onlyExpenseData
      .find(dateFilter)
      .skip(skip)
      .limit(limit);

    // Fetch total count for pagination purposes
    const total = await onlyExpenseData.countDocuments(dateFilter);

    // Send the paginated results along with pagination info and totals
    res.status(200).json({
      results: paginatedExpenses,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      totalExpenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't get" });
  }
};

export const specifiPersonCalculation = async (req: Request, res: Response) => {
  try {
    const fromdate = req.query.fromdate as string;
    const todate = req.query.todate as string;
    const name = req.query.name as string;
    const split = req.query.split as string;
    let dateFilter: any = {};

    // Construct date filter based on provided query parameters
    if (fromdate) {
      dateFilter.date = { ...dateFilter.date, $gte: new Date(fromdate) };
    }
    if (todate) {
      dateFilter.date = { ...dateFilter.date, $lte: new Date(todate) };
    }

    const filter = name !== "" ? { ...dateFilter, name: name } : dateFilter;

    const get_room_mates = await RoomMates.find();
    const room = get_room_mates?.map((ele) => ele?.name);

    // Fetch all expenses within the date range
    const specific_date = await onlyExpenseData.find(filter);

    const get_roommates_expense_amount = specific_date
      ?.filter((el) => el?.amount_details?.length > 0)
      ?.map((ele) => ele?.amount_details)
      .flat();
    const get_own_expense_amount = specific_date
      ?.filter((el) => el?.amount_details.length === 0)
      ?.reduce((acc, el) => acc + parseFloat(el?.amount), 0);

    const spliting_amount =
      name && split ? get_own_expense_amount / parseInt(split) : 0;

    interface Totals {
      [key: string]: number;
    }

    const totals = room.reduce<Totals>((acc, person) => {
      acc[person] = get_roommates_expense_amount
        .filter((obj) => obj.name === person)
        .reduce((sum, obj) => sum + parseFloat(obj.amount), 0);
      return acc;
    }, {});

    const non_person_totals = room.reduce<Totals>((acc, person) => {
      // Check if the current person is the same as the passed name
      if (person !== name) {
        // If not, calculate the total expense for this person
        const personTotal = get_roommates_expense_amount
          .filter((obj) => obj.name !== name) // Exclude expenses for the passed name
          .reduce((sum, obj) => sum + parseFloat(obj.amount), 0); // Calculate sum

        // Add the total expense for this person to the accumulator
        acc[person] = personTotal;
      }

      return acc;
    }, {});

    res.status(200).json({
      results: specific_date,
      total_expense_amount: specific_date.reduce(
        (acc, expense) => acc + parseInt(expense.amount),
        0
      ),
      person_expense_total: get_roommates_expense_amount.reduce(
        (acc, expense) => acc + parseInt(expense.amount),
        0
      ),
      person_own_expense: [totals],
      other_person_expense: [non_person_totals],
      buy_expense_amount: get_own_expense_amount,
      person_spliting_amount: spliting_amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't get" });
  }
};

export const onlyExpenseUpdate = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Find the document by ID and update it with the provided data
    const updatedExpense = await onlyExpenseData.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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

export const onlyExpenseDelete = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const delete_expense = await onlyExpenseData.findByIdAndDelete(id);

    if (!delete_expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ success: "Expense deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't delete" });
  }
};
