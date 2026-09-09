import Company from "../models/Company.js";

export const getCompanyProfile = async (req, res, next) => {
  try {
    let company = await Company.findOne({ user: req.user.id });

    // Auto-create an empty profile if one doesn't exist yet
    if (!company) {
      company = await Company.create({ user: req.user.id });
    }

    res.status(200).json({ company });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyProfile = async (req, res, next) => {
  try {
    const {
      companyName,
      industry,
      website,
      location,
      companySize,
      hiringEmail,
      contactNumber,
      about,
      hiringDomains,
    } = req.body;

    let company = await Company.findOne({ user: req.user.id });
    if (!company) {
      company = new Company({ user: req.user.id });
    }

    if (companyName !== undefined) company.companyName = companyName;
    if (industry !== undefined) company.industry = industry;
    if (website !== undefined) company.website = website;
    if (location !== undefined) company.location = location;
    if (companySize !== undefined) company.companySize = companySize;
    if (hiringEmail !== undefined) company.hiringEmail = hiringEmail;
    if (contactNumber !== undefined) company.contactNumber = contactNumber;
    if (about !== undefined) company.about = about;
    if (hiringDomains !== undefined) company.hiringDomains = hiringDomains;

    await company.save();

    res.status(200).json({
      message: "Company profile updated successfully",
      company,
    });
  } catch (error) {
    next(error);
  }
};