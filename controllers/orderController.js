const Order = require('../models/Order');
const Meal = require('../models/Meal');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { mealId, cookId, portions, totalPrice, pickupTime } = req.body;

    if (!mealId || !cookId || !portions || !totalPrice || !pickupTime) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const order = new Order({
      mealId,
      customerId: req.user.id,
      cookId,
      portions,
      totalPrice,
      pickupTime,
      status: 'pending'
    });

    const createdOrder = await order.save();

    // Optionally: Update meal portions available
    // const meal = await Meal.findById(mealId);
    // meal.portionsAvailable -= portions;
    // await meal.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get logged in user orders (handles both customers and cooks)
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'cook') {
      orders = await Order.find({ cookId: req.user.id }).populate('mealId').populate('customerId', 'name avatar');
    } else {
      orders = await Order.find({ customerId: req.user.id }).populate('mealId').populate('cookId', 'name avatar');
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.cookId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    const prevStatus = order.status;
    order.status = req.body.status;
    const updatedOrder = await order.save();

    // If order is newly confirmed, reduce portions and auto-reject others if empty
    if (prevStatus === 'pending' && req.body.status === 'confirmed') {
      const meal = await Meal.findById(order.mealId);
      if (meal) {
        meal.portionsAvailable = Math.max(0, meal.portionsAvailable - order.portions);
        await meal.save();

        if (meal.portionsAvailable <= 0) {
          await Order.updateMany(
            { mealId: meal._id, status: 'pending' },
            { $set: { status: 'cancelled' } }
          );
        }
      }
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
