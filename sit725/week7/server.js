const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

// Express setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const mongoURI = "mongodb://127.0.0.1:27017/feedbackApp";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema and Model
const feedbackSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Feedback API endpoint
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        const savedFeedback = await feedback.save();

        // Emit real-time feedback event to all connected clients
        io.emit("newFeedback", {
            first_name: savedFeedback.first_name,
            email: savedFeedback.email
        });

        res.status(200).send({ message: "✅ Feedback saved!" });
    } catch (error) {
        console.error("❌ Error saving feedback:", error);
        res.status(500).send({ error: "Failed to save feedback." });
    }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
