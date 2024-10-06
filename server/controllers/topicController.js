const Topic = require("../models/topicModel");
const Tag = require("../models/tagModel");
const Comment = require("../models/commentModel");
const Space = require("../models/spaceModel");

module.exports = {
  getAllTopics: async (req, res) => {
    try {
      const { search, sort, page = 1, limit = 10, searchUser } = req.query; // Add page and limit query parameters
      let sortOptions = {};
      let searchQuery = {};
      
      if (searchUser) {
        searchQuery.owner = searchUser;
      }

      if (search && search.length > 0) {
        searchQuery.title = new RegExp(search, "i"); // Add search query to filter by title
      }
     
      // Sorting options logic
      if (sort === "latest") {
        sortOptions = { createdAt: -1 };
      }
      if (sort === "popular") {
        sortOptions = { viewsCount: -1 };
      }
      if (sort === "most_replied") {
        sortOptions = { totalComments: -1 };
      }
      if (sort === "most_upvoted") {
        sortOptions = { upvotes: -1 };
      }

      // Pagination logic
      const skip = (page - 1) * limit;
      const totalTopics = await Topic.countDocuments(searchQuery); // Get the total count of topics for pagination
      let topics = await Topic.find(searchQuery)
        .sort(sortOptions)
        .skip(skip) // Skip topics for the previous pages
        .limit(parseInt(limit)) // Limit the number of topics returned
        .populate("tags")
        .populate({ path: "author", select: { password: 0, __v: 0 } })
        .lean()
        .exec();

      
      return res.json({
        topics, // The topics for the current page
        totalTopics, // Total number of topics for pagination
        currentPage: parseInt(page), // Current page number
        totalPages: Math.ceil(totalTopics / limit), // Total pages based on the limit
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "An error occurred." });
    }
  },
  getTopic: async (req, res) => {
    const { slug } = req.params;
    try {
      const topic = await Topic.findOneAndUpdate(
        { slug },
        {
          $inc: { viewsCount: 1 },
        },
        { returnOriginal: false }
      )
        .populate("tags")
        .populate({ path: "author", select: { password: 0, __v: 0 } })
        .lean()
        .exec();
      return res.status(200).json(topic);
    } catch (err) {
      console.log(err.message);
    }
  },
  addTopic: async (req, res) => {
    try {
      const { title, content, selectedSpace, selectedTags } = req.body;

      let createdTags = [];

      for (let index = 0; index < selectedTags.length; index++) {
        let name = selectedTags[index].value;
        let tagFound = await Tag.findOne({ name });
        if (!tagFound) {
          let tag = await Tag.create({
            name: name,
            createdBy: req.user.username,
          });
          createdTags.push(tag._id);
        } else {
          createdTags.push(tagFound._id);
        }
      }

      const slug = title
        .toString()
        .normalize("NFKD")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\_/g, "-")
        .replace(/\-\-+/g, "-")
        .replace(/\-$/g, "");

      let topic = await Topic.create({
        owner: req.user.username,
        title: title.trim(),
        content: content.trim(),
        slug: slug.trim(),
        tags: createdTags,
      });
      topic = await topic.populate({
        path: "author",
        select: { password: 0, __v: 0 },
      });
      return res.status(201).json({
        topic: topic,
        message: "Topic successfully created!",
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message || "An error occurred while creating the topic.",
      });
    }
  },

  deleteTopic: async (req, res) => {
    try {
      const { id } = req.params;
      const topic = await Topic.findById(id).populate("author", {
        _id: 0,
        username: 1,
      });
      if (!topic) {
        return res.status(404).json({
          message: "Could not find topic for the provided ID.",
        });
      }
      if (req.user.username !== topic.author.username) {
        return res.status(403).json({
          message: "You are not allowed to delete this topic",
        });
      }
      await Comment.deleteMany({ parentTopic: id });
      await Topic.findByIdAndDelete(id);
      return res.json({ topicId: id, message: "Topic deleted successfully!" });
    } catch (err) {
      console.log(err.message);
    }
  },
  toggleUpvoteTopic: async (req, res) => {
    const { id } = req.params;
    try {
      const topic = await Topic.findById(id);
      if (!topic) {
        return res.status(404).json({
          message: "Topic not found!",
        });
      }
      if (topic.upvotes.includes(req.user.username)) {
        topic.upvotes.pull(req.user.username);
        await topic.save();
        return res.status(200).json({
          topicId: id,
          username: req.user.username,
          message: "Topic was upvoted successfully.",
        });
      } else {
        topic.upvotes.push(req.user.username);
        topic.downvotes.pull(req.user.username);
        await topic.save();
        return res.status(200).json({
          topicId: id,
          username: req.user.username,
          message: "Topic was upvoted successfully.",
        });
      }
    } catch (err) {
      return res.status(403).json({
        Error: err.message,
      });
    }
  },
  toggleDownvoteTopic: async (req, res) => {
    const { id } = req.params;
    try {
      const topic = await Topic.findById(id);
      if (!topic) {
        return res.status(404).json({
          message: "Topic not found!",
        });
      }
      if (topic.downvotes.includes(req.user.username)) {
        topic.downvotes.pull(req.user.username);
        await topic.save();
        return res.status(200).json({
          topicId: id,
          username: req.user.username,
          message: "Topic was downvoted successfully.",
        });
      } else {
        topic.downvotes.push(req.user.username);
        topic.upvotes.pull(req.user.username);
        await topic.save();
        return res.status(200).json({
          topicId: id,
          username: req.user.username,
          message: "Topic was downvoted successfully.",
        });
      }
    } catch (err) {
      return res.status(403).json({
        Error: err.message,
      });
    }
  },
  getTopContributors: async (req, res) => {
    try {
      let topContributors = await Topic.aggregate([
        { $group: { _id: "$owner", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "username",
            as: "author",
            pipeline: [{ $project: { password: 0, __v: 0 } }],
          },
        },
        { $unwind: "$author" },
        { $limit: 3 },
      ]);
      return res.status(200).json(topContributors);
    } catch (err) {
      console.log(err.message);
    }
  },
  getSpaces: async (req, res) => {
    try {
      const spaces = await Space.find({});
      return res.status(200).json(spaces);
    } catch (err) {
      console.log(err.message);
    }
  },
};
