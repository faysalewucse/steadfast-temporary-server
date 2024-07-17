const mongoose = require("mongoose");
const generateCategorySlug = require("../helper/generateCategorySlug");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    indexNumber: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", async function (next) {
  if (this.isNew) {
    const categoryCount = await mongoose.models.Category.countDocuments();
    this.indexNumber = categoryCount + 1;
  }
  if (this.isModified("name")) {
    this.slug = generateCategorySlug(this.name);
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
