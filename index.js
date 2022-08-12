const express = require("express");
const constants = require("./constants");
// import packages
const mysql = require("mysql");
const app = express();
const bodyparser = require("body-parser");
var geoip = require("geoip-lite");
const multer = require("multer");
var cors = require("cors");
var md5 = require("md5");
const requestIp = require("request-ip");
var geoip = require("geoip-lite");
var rand = require("random-key");
const { validateToken, setUser } = require("./Middlewares/AuthMiddleware");
// middlewares
app.use(setUser);
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var tls = require("tls");
var fs = require("fs");
var options = {
  key: fs.readFileSync("private.pem"),
  cert: fs.readFileSync("mycert.pem"),
};

const https = require("https").Server(options, app);
app.use(express.static("public"));
const io = require("socket.io")(https, {
  cors: {
    origin: [
      `https://192.163.206.200`,
      `http://localhost:3000`,
      `https://192.163.206.200:3000`,
      `https://deluxehouses.ae`,
      `http://deluxehouses.ae`,
      `wss://chat-reply.com:3000/ws`,
      `wss://chat-reply.com:3000/ws`,
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    transports: ["websocket"],
    credentials: true,
  },
});
// NODEMAILER
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hazratanas@jataq.com",
    pass: "jataq112@",
  },
});

// STRIPE
const stripe = require("stripe")(
  "sk_test_51L3c0hEb5uZNNRFpZTxyykXrIbBKLxtcB0Cs3BV4Y6W3Kt7GyRmABvXp8vRVi8jEgycDMoxCdJ88dXBiG6MYHLJl00SPEVSqUl"
);
// import routes
const signInRouter = require("./routes/signin");
const { get } = require("./routes/signin");
const { json } = require("body-parser");
const { application } = require("express");
// constant and variables
const port = 3001;
// create connection to database####
var con = mysql.createConnection({
  host: "192.163.206.200",
  user: "chatrepl_admin",
  database: "chatrepl_chat_service",
  password: "Hunzai1122$$",
});
// images uploads
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});
app.post("/getcurrentplan", (req, res) => {
  con.query(
    `SELECT free_activated FROM registered_users WHERE id = ?`,
    [req.body.id],
    (err, result) => {
      res.json(result);
    }
  );
});
app.post("/imageupload", async (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage }).single("avatar");
    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
      var sql = `UPDATE registered_users SET image = '${req.file.filename}' WHERE id = '${req.body.UID}'`;
      con.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ success: 1 });
      });
    });
  } catch (err) { }
});
// images upload end

// STRIPE
app.post("/deleteStripe", async (req, res) => {
  const deleted = await stripe.subscriptions.del(req.body.customerId);
  res.json(deleted);
});
app.post("/userCustomerId", (req, res) => {
  con.query(
    `SELECT * FROM paying_users WHERE paye_userId = ?`,
    [req.body.userId],
    (err, ress) => {
      if (err) throw err;
      res.json(ress);
    }
  );
});
app.post("/removeCustomerId", (req, res) => {
  console.log("RECEIVED CUSTOMER ID TO DELETE =====> " + req.body.customerID);
  con.query(
    `DELETE FROM paying_users WHERE customer_id = ?`,
    [req.body.customerID],
    (err, ress) => {
      if (err) throw err;
      con.query(
        `UPDATE registered_users SET membership = 0, remaining_leads = 0 WHERE id = ? `,
        [req.body.userId],
        (err, ress) => {
          if (err) throw err;
          res.json(ress);
        }
      );
    }
  );
});

app.post("/getSubDetail", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.body.id);
  const customer = await stripe.customers.retrieve(session.customer);
  // let stripeSub = await stripe.subscriptions.list({
  //   customer: customer,
  // });
  res.json(customer);
});
app.post("/insertPaymentData", (req, res) => {
  con.query(
    `INSERT INTO paying_users (paye_userId, customer_id) VALUES(?, ?)`,
    [req.body.userId, req.body.customerId],
    (err, res) => {
      if (err) throw err;
      console.log("ADDED CUSTOMER SESSION ID ==> " + req.body.customerId);
    }
  );
});
app.post("/getSubList", async (req, res) => {
  let stripeSub = await stripe.subscriptions.list({
    customer: req.body.id,
  });
  res.json(stripeSub);
});
app.post("/create-checkout-session1", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1LUR6GEb5uZNNRFpG0q4OBIc",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url:
      "https://chat-reply.com/dashboard/paymentSuccess?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://chat-reply.com/dashboard/paymentSuccess",
  });

  res.redirect(303, session.url);
});

// get all agents from the database
const getAgents = () => {
  const agents = `SELECT * FROM registered_users  WHERE account_type = 'agent';`;
  con.query(agents, (err, agentsResult) => {
    if (err) throw error;
    else {
    }
  });
};
// function to return image based on user id
app.post("/images", (req, res) => {
  const id = req.body.id;
  const query = `SELECT image FROM registered_users WHERE id='${id}'`;
  con.query(query, (error, result) => {
    res.json(result);
  });
});
// get form data from frontend
// ( get from sign Up form)
const usersArray = [];
const agentsArray = [];
// function to add agent to chat
const ServedBy = (chat_id, agent_id, agent_name) => {
  const query = `UPDATE all_chats SET served_by = '${agent_id}',agent_name='${agent_name}' WHERE customer_id = '${chat_id}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
  });
};
app.post("/chats/checkchat", (req, res) => {
  con.query(
    `select served_by from all_chats where id =?`,
    [req.body.id],
    (error, result) => {
      res.json(result);
    }
  );
});
// function to add active chat to database
const insertChat = (id, origin, address, plateform) => {
  console.log(address);
  ip = "124.109.35.54";
  const ipv4 = address.slice(7);
  var geo = geoip.lookup(ipv4); //for production
  // var geo = geoip.lookup(ip); //for development
  const city = geo.city;
  const country = geo.country;
  const chat_query = `INSERT INTO all_chats (customer_id,origin,address,plateform,city,country) VALUES ('${id}','${origin}','${ipv4}','${plateform}','${city}','${country}')`;
  con.query(chat_query, (error, result) => {
    if (error) throw error;
  });
};
// function to remove chat from active chat from database
const deleteChat = (id) => {
  const deleteChatQuery = `DELETE FROM all_chats  WHERE customer_id = '${id}';`;
  con.query(deleteChatQuery, (error, result) => { });
};
// function to add message to all messages table
const insertMessage = (message, id, source = "customer") => {
  const query = `INSERT INTO all_messages (message,sender,source) VALUES ('${message}', '${id}','${source}' )`;
  con.query(
    `INSERT INTO all_messages (message,sender,source) VALUES (?,?,?)`,
    [message, id, source],
    (error, result) => {
      if (error) throw error;
      else console.log("message storedd to datbase");
    }
  );
};
// function to store tha lead in database
// function to change status to 1/unanswered
const unAnswered = (ID) => {
  const query = `UPDATE all_chats SET status = '2' WHERE customer_id = '${ID}' AND status= '0' `;
  con.query(query, (error, result) => {
    if (error) throw error;
  });
};
// api to get all leads on different dates
app.post("/chats/leadschart", (req, res) => {
  console.log(req.user);

  clientStatus = req.body.client_status;
  switch (clientStatus) {
    case "client":
      const c_name = req.body.c_name;
      const query = `SELECT
  date AS Date,
  COUNT(id ) AS no_of_rows 
 FROM leads
 WHERE c_name='${c_name}'
 GROUP BY date
 ORDER BY date; `;
      con.query(query, (err, result) => {
        //
        res.json(result);
      });
      break;
    case "agent":
      const agentId = req.body.id;
      const query2 = `SELECT
  date AS Date,
  COUNT(id ) AS no_of_rows 
 FROM leads
 WHERE agent_id='${agentId}'
 GROUP BY date
 ORDER BY date; `;
      con.query(query2, (err, result) => {
        //
        res.json(result);
      });
      break;
    case "owner":
      const query3 = `SELECT
  date AS Date,
  COUNT(id ) AS no_of_rows 
 FROM leads
 GROUP BY date
 ORDER BY date; `;
      con.query(query3, (err, result) => {
        //
        res.json(result);
      });
      break;
    default:
    // code block
  }
});
// function to  retrun all active chats
app.post("/signup", (req, res) => {
  const realCode = req.body.realCode.substr(8, 4);
  const enteredCode = req.body.enteredCode;
  if (realCode !== enteredCode) {
    res.json({ Error: "Incorrect Verification Code", success: 0 });
  } else {
    const { fname, lname, email, password, company } = req.body;
    let md5Pasword = md5(password);
    // check if email exists
    const search = `SELECT * FROM registered_users  WHERE email = '${email}';`;
    con.query(
      `SELECT * FROM registered_users  WHERE email = ?;`,
      [email],
      function (err, result) {
        if (err) {
          res.json({ Error: err });
        } else {
          if (result.length > 0) {
            res.send({ Error: "Email Already exist" });
          } else {
            con.query(
              `INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES (?, ?, ?, ?,?)`,
              [fname, lname, email, md5Pasword, company],
              function (err, result) {
                if (err) {
                  res.json({ Error: err });
                } else {
                  res.send({
                    message: "Account Created Successfully",
                    success: 1,
                  });
                }
              }
            );
          }
        }
      }
    );
  }
});

// Reset Password
app.post("/resetPassword", (req, res) => {
  if (req.body.realCode == "") {
    res.json({
      Error: "Please Click Send Verification Button First",
      success: 0,
    });
  }
  const realCode = req.body.realCode.substr(8, 4);
  const enteredCode = req.body.enteredCode;
  if (realCode !== enteredCode) {
    res.json({ Error: "Incorrect Verification Code", success: 0 });
  } else {
    const { email, password } = req.body;
    let md5Pasword = md5(password);
    const search = `SELECT * FROM registered_users  WHERE email = '${email}';`;
    con.query(search, (err, result) => {
      if (err) {
        if (err) res.json({ error: `${err}` });
      } else {
        if (result.length == 0) {
          res.json({
            Error: "Account Does Not Exist, PLease Create Account First",
          });
        } else {
          con.query(
            `UPDATE registered_users SET password =? where email = ?`,
            [md5Pasword, email],
            (err, result) => {
              if (err) throw err;
              res.json({
                success: 1,
                message: "Password Changed Successfully",
              });
            }
          );
        }
      }
    });
  }
});
// ADD AGENT API
app.post("/addagent", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const search = `SELECT * FROM registered_users  WHERE email = '${email}';`;
  con.query(
    `SELECT * FROM registered_users WHERE email = ?`,
    [email],
    function (err, result) {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          res.send({
            success: 0,
            message: "Email already exists!",
          });
        } else {
          let md5AgentPassword = md5(password);
          con.query(
            `INSERT INTO registered_users (f_name, l_name, email, password, c_name, account_type) VALUES (?,?,?,?,?,?)`,
            [firstname, lastname, email, md5AgentPassword, "agent", "agent"],
            function (err, result) {
              var mailOptions = {
                from: "jtqdev@gmail.com",
                to: email,
                subject: "Welcome to Chat-Reply",
                text: `Hi ${firstname},\n You're invited to join the platform as an agent. You can use the following instructions to login to your account. \n Login Url: https://chat-reply.com/signin\n Email: ${email} \n Password: ${password}`,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                } else {
                  res.send({
                    success: 1,
                    message:
                      "Agent added! Email containing the password has been sent to agent email.",
                  });
                }
              });
            }
          );
        }
      }
    }
  );
});
app.use("/signin", signInRouter);
// APIs for chats Messages
// api for unanswered chat
app.get("/chats/unanswered", (req, res) => {
  const query = `SELECT * FROM all_chats WHERE status = '0'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
// api for active chat
app.get("/chats/active", (req, res) => {
  const query = `SELECT * FROM all_chats WHERE status = '1'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
// api for updating user plan
app.post("/updateuserplan", (req, res) => {
  con.query(
    `UPDATE registered_users SET membership = 2 WHERE id = ?`,
    [req.body.id],
    (error, result) => {
      if (error) throw error;
      con.query(
        `SELECT * FROM paying_users WHERE paye_userId = ? `,
        [req.body.id],
        (err, result) => {
          if (err) throw err;
          console.log(result.length);
        }
      );
    }
  );
});
// UPDATE USER AHAD
app.post("/updateuser", (req, res) => {
  const query = `UPDATE registered_users SET f_name='${req.body.firstname}', l_name='${req.body.lastname}', email='${req.body.email}' WHERE id = '${req.body.id}' `;
  con.query(
    `UPDATE registered_users SET f_name=?, l_name=?, email=? WHERE id = ? `,
    [req.body.firstname, req.body.lastname, req.body.email, req.body.id],
    (err, result) => {
      if (err) throw err;
      res.json("1");
    }
  );
});
// UPDATE USER END AHAD
// api for changing status of chat
app.post("/chats/status1", (req, res) => {
  const query = `UPDATE all_chats SET status = '1' WHERE customer_id = '${req.body.id}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.send("updated");
  });
});
// GET LEADS - BY AHAD
async function loadLeads(result) {
  const leadsData = [];
  for (let i = 0; i < result.length; i++) {
    let domain = result[i].domain;
    const getLeads = `SELECT * FROM leads WHERE company_url = '${domain}'`;
    con.query(getLeads, function (err, leadsDetails) {
      leadsData.push(leadsDetails);
    });
  }
}
app.post("/getleads", (req, res) => {
  const c_name = req.body.c_name;

  const leadsData = [];
  con.query(
    ` SELECT CONCAT(registered_users.f_name, ' ', registered_users.l_name) AS agent_name,leads.id,leads.lead_name,leads.lead_email,leads.lead_phone,leads.date,leads.company_url,leads.c_name
  FROM registered_users
  INNER JOIN leads ON registered_users.id=leads.agent_id
  WHERE leads.c_name=?`,
    [c_name],
    function (err, result) {
      if (err) throw err;
      return Promise.all(
        result.map((element) => {
          leadsData.push(result);
        })
      ).then(() => res.json(result));
    }
  );
});
const incrementMessageCount = (id) => {
  con.query(
    `UPDATE all_chats SET count = count+1 WHERE customer_id = ? `,
    [id],
    function (error, result) { }
  );
  con.query(
    `UPDATE all_chats SET new_message = new_message+1   WHERE customer_id =?`,
    [id],
    (error, result) => {
      if (error) throw error;
      else console.log("successfull:" + result);
      //
    }
  );
};

// GET LEADS END - BY AHAD
// Get All messages from the database for a given socket id

app.post("/chats/messages", (req, res) => {
  //
  const query = `SELECT * from all_messages WHERE sender = '${req.body.id}' `;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
app.post("/chats/addmessage", (req, res) => {
  const message = req.body.message;
  const id = req.body.id;
  insertMessage(message, id, "Agent");
  res.json("Message ade=d successfully");
  incrementMessageCount(id);
});
app.post("/chats/servedby", (req, res) => {
  const chatID = req.body.chatID;
  const agentID = req.body.agentID;
  const agent_name = req.body.agentName;

  ServedBy(chatID, agentID, agent_name);
  res.json("served by");
});
//api to get leads for an agent
app.post("/chats/leads_by_id", (req, res) => {
  const clientStatus = req.body.client_status;

  switch (clientStatus) {
    case "owner":
      con.query(`SELECT * from leads `, function (err, result) {
        res.json(result);
      });
      break;
    case "client":
      const companyName = req.body.company_name;
      con.query(
        `SELECT * from leads WHERE c_name= ?`,
        [companyName],
        function (err, result) {
          res.json(result);
        }
      );
      break;
    case "agent":
      const agentId = req.body.id;
      con.query(
        `SELECT * from leads WHERE agent_id= ?`,
        [agentId],
        function (err, result) {
          res.json(result);
        }
      );
      break;
    default:
    // code block
  }
});
// OWNER GET USER LIST AHAD
app.post("/userslist", (req, res) => {
  const usersListOwner = [];
  const role = req.body.role;
  const userslist =
    role == "all"
      ? `SELECT * FROM registered_users`
      : `SELECT * FROM registered_users WHERE account_type = '${role}'`;
  con.query(userslist, (err, result) => {
    return Promise.all(
      result.map((element) => {
        usersListOwner.push(result);
      })
    ).then(() => res.json(result));
  });
});
// OWNER GET USER LIST END
// OWNER DELETE USER LIST AHAD
app.post("/deleteuser", (req, res) => {
  const id = req.body.user_id;
  const deleteuser = `DELETE FROM registered_users WHERE id='${id}'`;
  con.query(deleteuser, (err, result) => {
    res.json(result);
  });
});
// OWNER DELETE USER LIST END
// api for get chat record for a given ID
app.post("/chats/chat", (req, res) => {
  const ID = req.body.id;
  const query = `SELECT * FROM all_chats WHERE customer_id = '${ID}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
// api to get agent name of chat by customer_id(chat_id)
app.post("/chats/chatAgent", (req, res) => {
  const ID = req.body.id;

  con.query(
    `SELECT CONCAT(registered_users.f_name, ' ', registered_users.l_name) AS agent_name,all_chats.customer_id,all_chats.is_end
  FROM registered_users
  INNER JOIN all_chats ON registered_users.id=all_chats.served_by
  WHERE all_chats.customer_id=?`,
    [ID],
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});
// api for get agent info for a given chat ID
app.post("/chats/agent", (req, res) => {
  const ID = req.body.id;
  console.log(ID);
  const query = `SELECT f_name,l_name FROM registered_users WHERE id = '${ID}' LIMIT 1`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
});
// api for getting all the comapnies nam
app.get("/chats/companies", (req, res) => {
  const query = `SELECT DISTINCT c_name from registered_users`;
  con.query(query, (err, result) => {
    res.json(result);
  });
});
const storeLead = (LeadData) => {
  const {
    customer_name,
    email,
    phone,
    agent,
    company_url,
    c_name,
    date,
    agent_id,
  } = LeadData;
  const query = `INSERT INTO leads (lead_name,lead_email,lead_phone,agent_name,company_url,c_name,date,agent_id) VALUES ('${customer_name}', '${email}','${phone}','${agent}','${company_url}', '${c_name}','${date}','${agent_id}' )`;
  con.query(query, (error, result) => {
    if (error) throw error;
  });
};
const DecrementLeads = (COMPANY, res) => {
  con.query(
    `UPDATE registered_users SET remaining_leads = remaining_leads-1 WHERE c_name = ? `,
    [COMPANY],
    function (error, result) {
      console.log("leads decremented");
      res.json({ status: 1 });
    }
  );
};
// function to send generated lead to client
const sendLead = (LeadData) => {
  const companyName = LeadData.c_name;
  const chat = LeadData.chat;
  const chatarray = JSON.parse(chat);
  const messages = chatarray.map((msg) => {
    if (msg.source == "Agent") return "Agent:" + msg.message + "\n";
    else return "customer:" + msg.message + "\n";
  });
  const ChatSend = messages.join("");
  con.query(
    `SELECT email FROM registered_users WHERE c_name= ?`,
    [companyName],
    function (error, result) {
      if (error) throw error;
      else {
        const {
          customer_name,
          email,
          phone,
          agent,
          company_url,
          c_name,
          date,
          agent_id,
        } = LeadData;
        const resultObject = JSON.stringify(result[0]);
        var EmailJson = JSON.parse(resultObject);
        var Email = EmailJson.email;
        console.log(Email);
        const str = "<strong>hello</strong>";
        var mailOptions = {
          from: "hazratanas@jataq.com",
          to: Email,
          subject: "Welcome to Chat-Reply,Lead Added",
          text: `Customer Name: ${customer_name}\n Customer Email: ${email} \n Phone No: ${phone} \n Date: ${date},\n ************* \n Messages:  \n ${ChatSend} `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          console.log(mailOptions);
          if (error) {
            console.log(error);
            // res.json({ error: error })
          } else {
            console.log("Leads Sent to Client");

            // res.json({
            //   in: info,
            //   code: rand.generate(8) + result + rand.generate(8),
            //   success: 1,
            //   message:
            //     "Leads Sent to client",
            // });
          }
        });
      }
    }
  );
};
// api to store the leads in database
app.post("/chats/addleads", (req, res) => {
  const LeadData = req.body;
  console.log("Lead data:" + LeadData);
  storeLead(LeadData);
  sendLead(LeadData);
  DecrementLeads(LeadData.c_name, res);
});
// api to get all chats from database

// get chats for a specific agent
app.post("/chats/chats_by_agent", (req, res) => {
  console.log("req:" + req.body);
  const clientStatus = req.body.client_status;

  switch (clientStatus) {
    case "agent":
      const agent_id = req.body.id;
      con.query(
        `SELECT CONCAT(registered_users.f_name, ' ', registered_users.l_name) AS agent_name,all_chats.id,all_chats.status,all_chats.created_date,all_chats.end_date,all_chats.is_end,all_chats.origin,all_chats.customer_id,all_chats.address,all_chats.plateform,all_chats.country,all_chats.count,all_chats.new_message
        FROM registered_users
        INNER JOIN all_chats ON registered_users.id=all_chats.served_by
        WHERE all_chats.served_by=?`,
        [agent_id],
        (error, result) => {
          if (error) throw error;
          res.json(result);
        }
      );
      break;
    case "owner":
      con.query(
        `SELECT CONCAT(registered_users.f_name, ' ', registered_users.l_name) AS agent_name,all_chats.id,all_chats.status,all_chats.created_date,all_chats.end_date,all_chats.is_end,all_chats.origin,all_chats.customer_id,all_chats.address,all_chats.plateform,all_chats.country,all_chats.count,all_chats.new_message
      FROM registered_users
      INNER JOIN all_chats ON registered_users.id=all_chats.served_by`,
        (error, result) => {
          if (error) throw error;
          res.json(result);
        }
      );
      break;
    case "client":
      const company_url = req.body.company_url;
      con.query(
        `SELECT CONCAT(registered_users.f_name, ' ', registered_users.l_name) AS agent_name,all_chats.id,all_chats.status,all_chats.created_date,all_chats.end_date,all_chats.is_end,all_chats.origin,all_chats.customer_id,all_chats.address,all_chats.plateform,all_chats.country,all_chats.count,all_chats.new_message
        FROM registered_users
        INNER JOIN all_chats ON registered_users.id=all_chats.served_by
        WHERE all_chats.origin=?`,
        [company_url],
        (error, result) => {
          if (error) throw error;
          res.json(result);
        }
      );
      break;
    default:
    // code block
  }
});
//api for returning client compnay name and remaining Leads
app.post("/users/remaining-leads", (req, res) => {
  const company = req.body.c_name;
  console.log("comapnay:" + company);
  con.query(
    `SELECT * from registered_users where c_name=?`,
    [company],
    (error, result) => {
      if (error) res.json(error);
      else res.json(result);
    }
  );
});
// code for socket io
let agents = [];
const chatEnd = (id) => {
  const date = new Date();
  con.query(
    `UPDATE all_chats SET is_end = '1' , end_date=?   WHERE customer_id =?`,
    [date, id],
    (error, result) => {
      if (error) throw error;
      //
    }
  );
};
app.post("/chats/markchatRead", (req, res) => {
  console.log("update:" + req.body.id);
  con.query(
    `UPDATE all_chats SET new_message = 0   WHERE customer_id =?`,
    [req.body.id],
    (error, result) => {
      if (error) throw error;
      else res.json(result);
      //
    }
  );
});
app.post("/users/generateCode", (req, res) => {
  const length = req.body.codeLength;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("generated code:" + result);
  var email = req.body.email;

  var mailOptions = {
    from: "hazratanas@jataq.com",
    to: email,
    subject: "Welcome to Chat-Reply",
    text: `Your verification code is ${result}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    console.log(mailOptions);
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else {
      console.log("secccues");

      res.json({
        in: info,
        code: rand.generate(8) + result + rand.generate(8),
        success: 1,
        message: "Code has sent to your email",
      });
    }
  });
});
io.on("connection", (socket) => {
  const origin = socket.handshake.headers.origin;
  const address = socket.handshake.address;
  // const sql = `INSERT INTO visitors (visited_url,address) VALUES ('${origin}', '${address}')`;
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     throw err;
  //     //
  //   } else {
  //
  //   }
  // });
  socket.on("remove chat from unanswered", (data) => { });
  socket.on("agent active", () => {
    console.log("new:" + socket.id);
    agents.indexOf(socket.id) === -1 ? agents.push(socket.id) : null;
  });
  // notify all the clients when user updates the profile

  socket.on("profile changed", (data) => {
    io.to(data.id).emit("PROFILE UPDATE", data);
  });
  // First Message From Customer
  socket.on("first message", (data, callback) => {
    console.log("hello");
    callback({ status: 1 });
    const origin = socket.handshake.headers.origin;
    const address = socket.handshake.address;
    let OS = "";
    const plateform = socket.handshake.headers["user-agent"];
    console.log(plateform);
    if (plateform.includes("Windows")) OS = "Windows";
    if (plateform.includes("Android")) OS = "Android";
    if (plateform.includes("Linux")) OS = "Linux";
    if (plateform.includes("Mac")) OS = "Mac";

    insertChat(data.id, origin, address, OS);
    insertMessage(data.msg, data.id);
    console.log("agents:" + agents);
    agents.map((agent) => {
      socket
        .to(agent)
        .emit("NEW USER", { id: data.id, msg: data.msg, ip: "::1" });
    });
  });

  socket.on("join room", (data) => {
    socket.join(data.id);
    agents.map((agent) => {
      socket.to(agent).emit("chat with id joined", data.id);
    });
    io.to(data.id).emit("room joined", data);
  });

  socket.on("client join room", (data) => {
    socket.join(data.id);
    // io.to(data.id).emit("room joined", data);
  });
  socket.on("new message", (msg, id, callback) => {
    insertMessage(msg, id);
    callback({
      status: 1,
    });

    incrementMessageCount(id);
    io.to(id).emit("NEW MESSAGE", msg, id);
  });
  socket.on("leave room", (data) => {
    console.log("leaving with id:" + data);
    socket.leave(data);
    chatEnd(data);
    io.to(data).emit("LEAVE ROOM");
    socket.disconnect();
  });
  socket.on("NEW_MESSAGE", (data) => {
    io.to(data.id).emit("new Message", data);

    console.log(data.id);
  });
  socket.on("disconnect", (reason) => {
    if (reason == "client namespace disconnect") {
      unAnswered(socket.id);
      // endChat()
    }
    // socket.disconnect()
    // deleteChat(socket.id)
    // socket.emit('disconnect',('customer ended this chat'))
  });
});
// Requiring module

// Prints the output as an object
console.log("memory:" + process.memoryUsage());
//   listen on port
https.listen(port, () => {
  console.log("Server running on port:" + port);
});
module.exports = con;
