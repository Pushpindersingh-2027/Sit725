const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const mongoURI = "mongodb://127.0.0.1:27017/feedbackApp"; // Or use MongoDB Atlas URL
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error: ", err));

// Define Mongoose Schema and Model
const feedbackSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Handle POST from the form
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(200).send({ message: "Feedback saved!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to save feedback." });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening to port: " + port);
});
