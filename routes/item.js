import express from "express";
import { Item } from "../models/models.js";

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/filter-items", async (req, res) => {
  try {
    const body = req.body;
    const items = await Item.find({ ...body });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/day/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const items = await Item.find({ date }, { _id: 0, __v: 0 });
    if (items.length > 0) {
      const obj = await Item.aggregate([
        {
          $match: {
            date,
          },
        },
        {
          $group: {
            _id: "",
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
          },
        },
      ]);
      const [response] = obj;

      response.items = items;

      res.json(response);
    } else {
      res.json({
        totalAmount: 0,
        items: [],
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function getDatesOfWeek(startDate) {
  const dates = [];
  const start = new Date(startDate); // Convert the input string to a Date object

  // Loop through the week (0 to 6 days)
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i); // Add i days to the start date
    dates.push(currentDate.toISOString().split("T")[0]); // Format to 'YYYY-MM-DD' and add to the array
  }

  return dates; // Return the array of dates
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
router.get("/week/:startDate", async (req, res) => {
  try {
    const dates = getDatesOfWeek(req.params.startDate);

    const items = await Item.find(
      {
        date: {
          $in: dates,
        },
      },
      {
        _id: 0,
        __v: 0,
      },
      {
        sort: {
          date: 1,
        },
      }
    );

    const value = await Item.aggregate([
      {
        $match: {
          date: {
            $in: dates,
          },
        },
      },
      {
        $group: {
          _id: "",
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);
    const [accVal] = value;

    const values = await Item.aggregate([
      {
        $match: {
          date: {
            $in: dates,
          },
        },
      },
      {
        $group: {
          _id: "$date",
          amount: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          date: "$_id",
          amount: 1,
          _id: 0,
        },
      },
    ]);

    const finalValues = dates.map((dStr) => {
      const weekDay = days[new Date(dStr).getDay()];
      const item = values.find((d) => {
        return d.date === dStr;
      });
      if (item) {
        return {
          ...item,
          weekDay,
        };
      } else {
        return {
          amount: 0,
          date: dStr,
          weekDay,
        };
      }
    });

    res.json({
      weekData: finalValues,
      items,
      totalAmount: accVal?.totalAmount || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function getDatesOfMonth(startDate) {
  const dates = [];
  const date = new Date(startDate); // Convert the input string to a Date object

  // Get the year and month from the date
  const year = date.getFullYear();
  const month = date.getMonth(); // Month is zero-indexed (0 = January, 1 = February, ...)

  // Get the last day of the month
  const lastDate = new Date(year, month + 1, 0).getDate(); // Day 0 of the next month gives last day of the current month

  // Loop through each day of the month
  for (let day = 2; day <= lastDate + 1; day++) {
    const currentDate = new Date(year, month, day);
    dates.push(currentDate.toISOString().split("T")[0]); // Format to 'YYYY-MM-DD'
  }

  return dates; // Return the array of dates
}

router.get("/month/:startDate", async (req, res) => {
  try {
    const dates = getDatesOfMonth(req.params.startDate);

    const items = await Item.find(
      {
        date: {
          $in: dates,
        },
      },
      {
        _id: 0,
        __v: 0,
      },
      {
        sort: {
          date: 1,
        },
      }
    );

    const value = await Item.aggregate([
      {
        $match: {
          date: {
            $in: dates,
          },
        },
      },
      {
        $group: {
          _id: "",
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);
    const [accVal] = value;

    const values = await Item.aggregate([
      {
        $match: {
          date: {
            $in: dates,
          },
        },
      },
      {
        $group: {
          _id: "$date",
          amount: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          date: "$_id",
          amount: 1,
          _id: 0,
        },
      },
    ]);

    const finalValues = dates.map((dStr) => {
      const weekDay = days[new Date(dStr).getDay()];
      const item = values.find((d) => {
        return d.date === dStr;
      });
      if (item) {
        return {
          ...item,
          weekDay,
        };
      } else {
        return {
          amount: 0,
          date: dStr,
          weekDay,
        };
      }
    });

    res.json({
      monthData: finalValues,
      items,
      totalAmount: accVal?.totalAmount || 0,
    });
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
});

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.findById(req.params.id);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new item
router.post("/", async (req, res) => {
  const { datetime, category, amount, type, date, time, paidTo } = req.body;

  const newItem = new Item({
    datetime,
    category,
    amount,
    type,
    date,
    time,
    paidTo,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) an item by ID
router.put("/:id", async (req, res) => {
  const { datetime, category, amount, type, date, time } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { datetime, category, amount, type, date, time },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an item by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
