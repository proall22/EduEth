// import express from "express";
// import Course from "../models/course.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
// 	const { category, search } = req.query;
// 	let query = {};

// 	if (category) {
// 		query.category = category;
// 	}

// 	if (search) {
// 		query.name = { $regex: search, $options: "i" }; // Case-insensitive search
// 	}

// 	try {
// 		const courses = await Course.find(query);
// 		res.json(courses);
// 	} catch (error) {
// 		res.status(500).json({ error: "Failed to fetch courses" });
// 	}
// });

// router.get("/:id", async (req, res) => {
// 	try {
// 		const course = await Course.findById(req.params.id);
// 		if (!course) {
// 			return res.status(404).json({ error: "Course not found" });
// 		}
// 		res.json(course);
// 	} catch (error) {
// 		res.status(500).json({ error: "Failed to fetch course details" });
// 	}
// });

// export default router;
