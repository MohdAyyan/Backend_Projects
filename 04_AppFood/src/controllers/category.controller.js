import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const category = await Category.create({ title, imageUrl });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getALlCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Category updated successfully",
        category,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Category id is required" })
        }
        const is_available = await Category.findById(id)
        if (!is_available) {
            return res.status(404).json({ message: "Category not found" })
        }
        const category = await Category.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Category deleted successfully", category })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
