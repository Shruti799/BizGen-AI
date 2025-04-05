import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema(
 {
    userEmail: { type: String, required: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    description: String,
    address: String,
    phone: String,
    email: String,
    website: String,
    hours: String,
    logo: String,
    abn: String,
    slug: { type: String, required: true, lowercase: true, index: true },
    published: { type: Boolean, default: true },
 },
 { timestamps: true }
);

// create a text index on category, name and address fields
BusinessSchema.index({ category: "text", name: "text", address: "text" });


const Business = mongoose.models.Business || mongoose.model("Business", BusinessSchema);

export default Business;