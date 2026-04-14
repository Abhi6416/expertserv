/**
 * models/Lead.js — Lead Schema
 * emailSent field removed — email notification disabled.
 */
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Valid email required"],
    },
    phone: {
      type: String,
      required: [true, "Phone required"],
      match: [/^[6-9]\d{9}$/, "Valid 10-digit mobile number required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name required"],
      trim: true,
      maxlength: 200,
    },
    state: {
      type: String,
      required: [true, "State required"],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, "Solution required"],
      enum: {
        values: ["IVR", "RCS", "SMS", "OTP"],
        message: "Must be IVR, RCS, SMS, or OTP",
      },
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time required"],
    },
    agreedToPolicy: {
      type: Boolean,
      required: true,
      validate: {
        validator: (v) => v === true,
        message: "Must agree to policy",
      },
    },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
    ipAddress: {
      type: String,
      default: null,
    },
    // emailSent removed — email notifications disabled
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ solution: 1 });
leadSchema.index({ state: 1 });

module.exports = mongoose.model("Lead", leadSchema);