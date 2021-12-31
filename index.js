const express = require("express");
const newConn = require("./DBConnections");

const app = express();

//static content
app.use(express.static("static"));
//dynamic handling

//login for admin
app.get("/login", (req, res) => {
  let conn = newConn();
  conn.connect();

  conn.query(`select * from SignIn`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      let signIn = rows;
      if (
        req.query.username == signIn[0].Username && //compare to pass and username held on db
        req.query.password == signIn[0].Password
      )
        res.redirect("/admin-page");
      //redirect if password is correct
      else res.redirect("/adminSignIn.html"); //or refresh this page
    }
  });

  conn.end();
});

//show admin page
app.get("/admin-page", (req, res) => {
  let conn = newConn();
  conn.connect();
  //display header content (times to be selected from)
  conn.query("select * from Times", (err, rows, fields) => {
    let content = "";
    content += `<table style = 'border: 1px solid black'>`;
    let headers = rows;
    content += "<tr>";
    content += `<th>${headers[0].Header}</th>`;
    content += `<th>${headers[0].Time1}</th>`;
    content += `<th>${headers[0].Time2}</th>`;
    content += `<th>${headers[0].Time3}</th>`;
    content += `<th>${headers[0].Time4}</th>`;
    content += `<th>${headers[0].Time5}</th>`;
    content += `<th>${headers[0].Time6}</th>`;
    content += `<th>${headers[0].Time7}</th>`;
    content += `<th>${headers[0].Time8}</th>`;
    content += `<th>${headers[0].Time9}</th>`;
    content += `<th>${headers[0].Time10}</th>`;
    content += "</tr>";
    res.write(content);
    if (err) console.log(err);
  });

  //display user content, times selected and users
  conn.query("select * from Doodle", (err, rows, fields) => {
    let data = rows;
    let content = "";
    for (d of data) {
      //if stored value is true, change color to green
      content += "<tr>";
      content += `<td>${d.Name}</td>`;
      content += `<td style = 'background-color: ${
        d.Time1 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time2 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time3 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time4 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time5 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time6 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time7 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time8 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time9 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time10 ? "green" : "grey"
      }'></td>`;
      content += "</tr>";
    }
    content += "</table>";
    //link to change timing
    content += "<a href='/time-change'>Click Here To Change Times</a>";

    res.write(content);
    res.end();
  });

  conn.end();
});

//change times forms
app.get("/time-change", (req, res) => {
  let conn = newConn();
  conn.connect();

  //create page to change data values
  conn.query("select * from Times", (err, rows, fields) => {
    let content = "";
    let times = rows;
    //display time values
    content += "<form action = '/change-time'>";
    content += `First Time Slot: <input name = 'time1' value = "${times[0].Time1}"/></br>`;
    content += `Second Time Slot: <input name = 'time2' value = "${times[0].Time2}"/></br>`;
    content += `Third Time Slot: <input name = 'time3' value = "${times[0].Time3}"/></br>`;
    content += `Fourth Time Slot: <input name = 'time4' value = "${times[0].Time4}"/></br>`;
    content += `Fifth Time Slot: <input name = 'time5' value = "${times[0].Time5}"/></br>`;
    content += `Sixth Time Slot: <input name = 'time6' value = "${times[0].Time6}"/></br>`;
    content += `Seventh Time Slot: <input name = 'time7' value = "${times[0].Time7}"/></br>`;
    content += `Eighth Time Slot: <input name = 'time8' value = "${times[0].Time8}"/></br>`;
    content += `Ninth Time Slot: <input name = 'time9' value = "${times[0].Time9}"/></br>`;
    content += `Tenth Time Slot: <input name = 'time10' value = "${times[0].Time10}"/></br>`;
    content += `<input type='submit' value = 'save'>`;
    content += "</form>";
    res.send(content);
  });

  conn.end();
});

//update table command
app.get("/change-time", (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(`UPDATE Times set Header = 'Name'`, (err, rows, fields) => {
    if (err) console.log(err);
  });
  //take values from the fields and update table
  conn.query(
    `UPDATE Times set Time1 = "${req.query.time1}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time2 = "${req.query.time2}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time3 = "${req.query.time3}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time4 = "${req.query.time4}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time5 = "${req.query.time5}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time6 = "${req.query.time6}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time7 = "${req.query.time7}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time8 = "${req.query.time8}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time9 = "${req.query.time9}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );
  conn.query(
    `UPDATE Times set Time10 = "${req.query.time10}"`,
    (err, rows, fields) => {
      if (err) console.log(err);
      res.redirect("/admin-page"); //redirect to admin page after
    }
  );

  conn.end();
});

//guest page
app.get("/mainPage", (req, res) => {
  let conn = newConn();
  conn.connect();
  //creating headers for tables
  conn.query("select * from Times", (err, rows, fields) => {
    let content = "";
    //displaying time headers
    content += `<table style = 'border: 1px solid black'>`;
    let headers = rows;
    content += "<tr>";
    content += `<th>${headers[0].Header}</th>`;
    content += `<th>${headers[0].Time1}</th>`;
    content += `<th>${headers[0].Time2}</th>`;
    content += `<th>${headers[0].Time3}</th>`;
    content += `<th>${headers[0].Time4}</th>`;
    content += `<th>${headers[0].Time5}</th>`;
    content += `<th>${headers[0].Time6}</th>`;
    content += `<th>${headers[0].Time7}</th>`;
    content += `<th>${headers[0].Time8}</th>`;
    content += `<th>${headers[0].Time9}</th>`;
    content += `<th>${headers[0].Time10}</th>`;
    content += "</tr>";
    res.write(content);
    if (err) console.log(err);
  });

  //display all data of users
  conn.query("select * from Doodle", (err, rows, fields) => {
    let data = rows;
    let content = "";
    for (d of data) {
      content += "<tr>";
      content += `<td>${d.Name}</td>`;
      //change color to green based on db
      content += `<td style = 'background-color: ${
        d.Time1 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time2 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time3 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time4 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time5 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time6 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time7 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time8 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time9 ? "green" : "grey"
      }'></td>`;
      content += `<td style = 'background-color: ${
        d.Time10 ? "green" : "grey"
      }'></td>`;
      content += "</tr>";
    }
    //form within the table to ubdate from
    content += "<tr>";
    content += `<form action = '/add-data' id = 'form'>
                  <td><input name = "name"/></td>
                  <td><input type = "checkbox" name = "time1" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time2" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time3" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time4" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time5" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time6" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time7" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time8" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time9" form = 'form'/></td>
                  <td><input type = "checkbox" name = "time10" form = 'form'/></td>
                </form>`;
    content += "</tr>";
    content += "</table>";
    content += "<input type = 'submit' value = 'save' form = 'form'/>";
    res.write(content);

    res.end();
  });

  conn.end();
});

//update values in db
app.get("/add-data", (req, res) => {
  let conn = newConn();
  conn.connect();

  conn.query(
    //if value exists it is 1 or true else it is false or 0
    `insert into Doodle values ('${req.query.name}',${
      req.query.time1 ? 1 : 0
    },'${req.query.time2 ? 1 : 0}','${req.query.time3 ? 1 : 0}','${
      req.query.time4 ? 1 : 0
    }','${req.query.time5 ? 1 : 0}','${req.query.time6 ? 1 : 0}','${
      req.query.time7 ? 1 : 0
    }','${req.query.time8 ? 1 : 0}','${req.query.time9 ? 1 : 0}','${
      req.query.time10 ? 1 : 0
    }')`,
    (err, rows, fields) => {
      res.redirect("/mainPage");
      if (err) console.log(err);
    }
  );

  conn.end();
});

app.listen(80);
