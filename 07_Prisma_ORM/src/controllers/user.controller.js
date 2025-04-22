import prisma from "../DB/db.config.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const findUser = await prisma.user.findUnique({ where: { email } });
    
    if (findUser) {
      res.status(400).json({ message: "User already exists with these email" });
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    })
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


const updateUser = async (req, res) => {
  try {
    // Extract id from req.params
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    // Convert string id to integer for Prisma
    const userId = parseInt(id);
    
    // Validate id is a number
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const user = await prisma.user.update({
      where: {
        id: userId  // Now passing a number, not an object
      },
      data: {
        name,
        email,
        password,
      },
    });
    
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        post: {
          select: {
            id: true,
            title: true,
            description: true,
            comment_count: true,
          }
        },
      }
    });
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const currentUser = async (req, res) => {
  try {
    const { id } = req.params; // Using 'id' to match the route parameter
    
    // Convert string id to integer for Prisma
    const userId = parseInt(id);
    
    // Validate id is a number
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    const user = await prisma.user.delete({
      where: { id: userId },
    });


    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
     createUser,
     updateUser,
      getUsers,
      currentUser,
      deleteUser
     };
