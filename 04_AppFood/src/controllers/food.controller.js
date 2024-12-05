import Food from "../models/food.model.js";
import Order from "../models/order.model.js";

export const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturnat) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    const food = await Food.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });
    res.status(200).send({
      success: true,
      message: "Food Created Successfully",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Creating Food",
      error: error.message,
    });
  }
};

export const getAllFood = async (req, res) => {
  try {
    const food = await Food.find();
    res.status(200).send({
      success: true,
      length: food.length,
      message: "All Food",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Food",
    });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food_id = req.params.id;
    const food = await Food.findById(food_id);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Food Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Found",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Food",
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const food_id = req.params.id;
    const food = await Food.findById(food_id);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Food Not Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    const updateFood = await Food.findByIdAndUpdate(food_id, {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    },{ new: true});
    res.status(200).json({
        success: true,
        message: "Food Updated Successfully",
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updating Food",
    });
  }
};


export const deleteFood = async (req, res) => {
  try {
    const food_id = req.params.id;
    const food = await Food.findById(food_id);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Food Not Found",
      });
    }
    const deleteFood = await Food.findByIdAndDelete(food_id);
    res.status(200).json({
        success: true,
        message: "Food Deleted Successfully",
    })
}
catch(error){
res.status(500).json({
  success: false,
  message: "Error in Deleting Food",
})
}}


export const orderStatusController = async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide valid order id",
        });
      }
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Order Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Order Status API",
        error,
      });
    }
  };


