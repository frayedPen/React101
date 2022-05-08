const {db} = require("../admin");
const express = require("express");
const router = express.Router();

const addMessage = async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await db.collection('users').add({name: "original", age:10});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
};

const getUsers = async(req, res) => {
    const usersRef = db.collection('users');

    try {
        usersRef.get().then(
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log(data);

                return res.status(201).json(data);
            }
        )
    } catch (error) {
        return res.status(500).json({text: "RIP"});
    }

}

router.get("/", getUsers);

module.exports = router;