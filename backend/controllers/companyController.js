const Company = require("../models/Company");

// @route   GET /api/company/profile
// @desc    Get the logged-in company's profile
// @access  Private (company only)
const getCompanyProfile = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id }).populate(
      "user",
      "name email role"
    );

    if (!company) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.status(200).json({ company });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/company/profile
// @desc    Update the logged-in company's profile
// @access  Private (company only)
const updateCompanyProfile = async (req, res, next) => {
  try {
    const { companyName, industry, website, contactNumber } = req.body;

    const company = await Company.findOneAndUpdate(
      { user: req.user.id },
      { companyName, industry, website, contactNumber },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.status(200).json({
      message: "Company profile updated successfully",
      company,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCompanyProfile, updateCompanyProfile };