const express = require('express');
const app = express();

// memory setup
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors setup
const cors = require('cors');
const corsOptions = {
  origin: ["https://www.daeyanging.com/", "https://daeyanging.com/"]
}
// app.use(cors(corsOptions));
app.use(cors());

// mailer setup
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yeou914@gmail.com',
    pass: 'xmww rgyx nbit cdhe'
  }
});

// get methods
app.get('/', (req, res) => {
  res.send('BackBurger! Server :)');
});

// post methods
app.post('/postRequest', async (req, res) => {
  const { name, contact, detail, files } = req.body;
  // const { name, contact, detail, files } = JSON.parse(req.body);

  interface fileDictionaryProps {
    filename: string
    path: string
  }

  let filesDictionary: Array<fileDictionaryProps> = [];
  files && files.map((file) => {
    filesDictionary.push({
      filename: file.name,
      path: file.path
    });
  });

  const mailOptions = {
    from: 'yeou914@gmail.com',
    to: 'yeou914@gmail.com',
    subject: `${name}님의 요청사항입니다.`,
    html: `
      <p>연락처: ${contact}</p>
      <br />
      <p>${detail && detail.replace(/\n/g, '<br />')}</p>
    `,
    attachments: filesDictionary
  }

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      status: 200,
      message: 'completed'
    })
  }
  catch (Exception) {
    res.json({
      status: 200,
      message: 'failed'
    })
  }
});

module.exports = app;