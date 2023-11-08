import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    email: {type: String, required: true},
    pass: {type: String, required: true}
})

export default mongoose.models.Profiles || mongoose.model("Profiles", profileSchema, "Profiles")