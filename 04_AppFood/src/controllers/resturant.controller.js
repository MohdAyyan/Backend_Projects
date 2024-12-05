import Restaurant from "../models/restaurant.model.js";

const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    const restaurant = await Restaurant.create({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    })
    res.status(201).send({
        success: true,
        message: "New Restaurant Created successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message,
        success: false,
        msg: "Error creating restaurant Api",
      });
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).send({
      success: true,
      message: "All Restaurants",
      data: restaurants,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message,
        success: false,
        msg: "Error getting restaurant Api",
      })
}
}

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      })
    }
    res.status(200).send({
      success: true,
      message: "Restaurant",
      data: restaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message,
        success: false,
})
  }
}

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      })
    }
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message,
        success: false,
        msg:"Error in deleting restaurant Api"
})
  }
}

export{ createRestaurant, getAllRestaurant, getRestaurantById, deleteRestaurant };
