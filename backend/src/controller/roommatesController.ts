import { Request, Response } from "express";
import { RoomMates } from "../model/roomMatesModel";

export const addRoommates = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400).json({ name: "This field is required" });
    }
    const new_expense = new RoomMates({ name });
    await new_expense.save();

    res
      .status(201)
      .json({ data: new_expense, success: "New data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't posted" });
  }
};

export const getRoommatesWithoutPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const all_roommates = await RoomMates.find();
    res.status(200).json({
      results: all_roommates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't get" });
  }
};

// *************************with pagination ***************
export const getRoommates = async (req: Request, res: Response) => {
  try {
    // 1. Validate query parameters (page and limit)
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 5) || 5;

    // 2. Calculate skip value (offset for pagination)
    const skip = (page - 1) * limit;

    // 3. Fetch paginated results for the current page (assuming Mongoose schema)
    const [paginatedExpenses, total] = await Promise.all([
      RoomMates.find({}, null, { skip, limit }), // Assuming you have a Mongoose schema named RoomMates
      RoomMates.countDocuments({}), // Assuming you have a Mongoose schema named RoomMates
    ]);

    // 4. Send the paginated results with additional information
    res.status(200).json({
      results: paginatedExpenses,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Data retrieval failed" });
  }
};

export const updateRoommates = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Find the document by ID and update it with the provided data
    const updatedExpense = await RoomMates.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Roommate not found" });
    }

    // Send the updated document as the response
    res.status(200).json({
      data: updatedExpense,
      success: "Roommate name updated succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Data didn't update" });
  }
};

export const deleteRoommate = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const delete_expense = await RoomMates.findByIdAndDelete(id);

    if (!delete_expense) {
      return res.status(404).json({ message: "Room mate not found" });
    }
    res.status(200).json({ success: "Room mate deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data doesn't delete" });
  }
};
