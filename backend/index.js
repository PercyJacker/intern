const bodyParser=require("body-parser")
const express=require("express")
const app=express();
const path=require("path")
const cors=require("cors");
const connectDB=require("./db.js")
const router=require("./Routes/index")
const nodemailer = require('nodemailer')
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const moment = require('moment-timezone'); // Import moment-timezone
const port =4000
const ffmpegPath = require('ffmpeg-static');
const crypto = require("crypto");

// const path = require('path')
const Razorpay = require('razorpay')
require('dotenv').config();
// const { instance } = require('./path-to-this-file');



ffmpeg.setFfmpegPath(ffmpegPath);


app.use(cors())

app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(express.json())
const buildPath = path.join(__dirname, '..', 'frontend', 'build'); // Correctly point to the build directory
app.use(express.static(buildPath));



app.get("/",(req,res)=>{
    res.send("Hello This is My backend")
})
app.use("/api",router)
connectDB();
 app.use((req,res,next)=>{
    req.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Origin","*")
    next()
 })

 let otpStore = {};

 app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;
  
    // Check if email is provided
    if (!email) {
      return res.status(400).send('Email is required');
    }
  
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
  
    // Store OTP in memory with a timestamp
    otpStore[email] = {
      otp: otp,
      timestamp: Date.now(),
    };
  
    // Send OTP to the user's email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'percyjacker2002@gmail.com', // Use your email here
        pass: 'eafu pftl dldt ovto', // Use your email password or App Password
      },
    });
  
    const mailOptions = {
      from: 'percyjacker2002@gmail.com',
      to: email,
      subject: 'Your OTP for authentication',
      text: `Your OTP is: ${otp}`,
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).send('OTP sent to your email');
    } catch (err) {
      console.error('Error sending OTP:', err);
      return res.status(500).send('Error sending OTP');
    }
  });

  // Verify the OTP
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
  
    // Check if email and OTP are provided
    if (!email || !otp) {
      return res.status(400).send('Email and OTP are required');
    }
  
    // Retrieve the stored OTP and timestamp
    const storedData = otpStore[email];
  
    // Check if OTP exists in store
    if (!storedData) {
      return res.status(400).send('No OTP sent to this email');
    }
  
    // Check if OTP is expired (5 minutes expiration time)
    const currentTime = Date.now();
    const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  
    if (currentTime - storedData.timestamp > expirationTime) {
      delete otpStore[email]; // Delete expired OTP
      return res.status(400).send('OTP has expired');
    }
  
    const authenticated = storedData.otp === parseInt(otp)
    // Check if OTP matches
    if (authenticated) {
      
      console.log('Request received:', req.body); // Log incoming data

      // OTP is valid, clear the OTP from memory
      delete otpStore[email];
      //!frontend aur backend dono mein redirect krna hoga then only redirect hoga
      // return res.send("ho gya vro")
      return res.status(200).json({ success: true, redirectUrl: '/uploadvideo' });


      // return res.redirect(`http://localhost:3000/uploadvideo`)
    } else {
      return res.status(400).send('Invalid OTP');
    }

    

  });

  // Serve React's index.html for the '/uploadvideo' route
//   app.get('/uploadvideo', (req, res) => {
//     // Ensure that the upload page is part of the React app and built correctly
//     res.sendFile(path.join(__dirname,'..', 'frontend', 'build', 'index.html'));
    
// });
  
//   // Catch-all route to handle other frontend routes
//   app.get('*', (req, res) => {
//     // Make sure res is not undefined and send the file correctly
//     res.sendFile(path.join(buildPath, 'index.html'), (err) => {
//       if (err) {
//         // Handle any errors while serving the file
//         console.log('Error serving index.html:', err);
//         res.status(500).send('Something went wrong!');
//       }
//     });
//   });
  
  
  

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory where files are saved
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  });

  const upload = multer({ storage });


  const isValidUploadTime = () => {
    const now = moment().tz("Asia/Kolkata"); // Get current time in IST
    console.log(`Current time (IST): ${now.format('YYYY-MM-DD HH:mm:ss')}`); // Log current time in IST

    const startTime = moment().tz("Asia/Kolkata").set({ hour: 14, minute: 0, second: 0 }); // 2 PM IST
    const endTime = moment().tz("Asia/Kolkata").set({ hour: 19, minute: 0, second: 0 }); // 7 PM IST
  
    return now.isBetween(startTime, endTime, null, '[)');
  };


  const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.post('/api/uploadvideo', upload.single('video'), (req, res) => {
  console.log(`Request received at: ${moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss')}`);

    // Check if the current time is within the allowed range
if (!isValidUploadTime()) {
  return res.status(400).send('Uploads are only allowed between 2 PM and 7 PM IST.');
}
  console.log('File uploaded:', req.file); // Logs file details
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
});


app.get('/api/get-videos', (req, res) => {
    const videoDirectory = 'uploads/';
    fs.readdir(videoDirectory, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading video directory');
      }
  
      // Filter for video files (e.g., mp4, mov)
      const videoFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.mp4' || ext === '.mov' || ext === '.avi'; // Add other video formats if needed
      });
  
      if (videoFiles.length === 0) {
        return res.status(404).send('No videos found');
      }
  
      // Send the list of video files to the client
      res.status(200).json(videoFiles);
    });
  });

  console.log(path.join(__dirname,'..', 'frontend', 'build', 'index.html'));

  module.exports.instance = new Razorpay({
    key_id: process.env.API_KEY,
    key_secret: process.env.KEY_SECRET,
    headers: {
      "X-Razorpay-Account": "<merchant_account_id>"
    },
  });


  app.post('/api/checkout',async(req,res)=>{
    try {
      // Initialize Razorpay instance
      const instance = new Razorpay({
        key_id: process.env.API_KEY,
        key_secret: process.env.KEY_SECRET,
      });
  
      // Create a new order with Razorpay
      const order = await instance.orders.create({
        amount: 5000, // Convert amount to smallest currency unit (paise)
        currency: "INR",
      });
  
      // Respond with success and order details
      res.status(200).json({
        success: true,
        order,
      });
      console.log("API Key:", process.env.API_KEY);
console.log("Key Secret:", process.env.KEY_SECRET);
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error in Razorpay order creation:", error);
  
      // Send error response
      res.status(500).json({
        success: false,
        message: "Failed to create Razorpay order",
        error: error.message,
      });
    }


    app.post("/api/paymentVerification", async (req, res) => {
      try {
        console.log(req.body);
    
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
        const body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto
          .createHmac("sha256", process.env.KEY_SECRET)
          .update(body.toString())
          .digest("hex");
    
        if (expectedSignature === razorpay_signature) {
          console.log("Payment is successful");
          return res.status(200).json({ success: true, message: "Payment is verified" });
        } else {
          console.log("Payment verification failed");
          return res.status(400).json({ success: false, message: "Invalid signature" });
        }
      } catch (error) {
        console.error("Error in payment verification:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });
  })
  app.get("/api/getkey",(req, res)=>res.status(200).json({key:process.env.API_KEY}))

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })