const express = require("express");
const router = express.Router();
const { createSellerAddress } = require("../service/seller"); // import hàm service

// POST /seller-address
router.post("/", async (req, res) => {
  try {
    const { user_id, ...createSellerAddressDto } = req.body;

    const result = await createSellerAddress(createSellerAddressDto, user_id);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
