var http = require('http');
var fs = require("fs");
var qs = require("querystring");

var mongoClient = require("mongodb").MongoClient;
var dbUrl="mongodb://localhost:27017"

//create a server object:
http.createServer(function (req, res) {
    
    if(req.url === "/kcmok"){
		res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
	}else if(req.url === "/orange"){
		sendFileContent(res, "webjquery.html", "text/html");
	}else if(req.url === "/index"){
		sendFileContent(res, "index.html", "text/html");
	}else if(req.url === "/login"){
		sendFileContent(res, "01_loginPage.html", "text/html");
	}else if(req.url === "/register"){
		sendFileContent(res, "02_registerPage.html", "text/html");
	}else if(req.url === "/try"){
		sendFileContent(res, "try.html", "text/html");
	}else if(req.url === "/checkSignin"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){

//DB Connection for Login

			return req.on('data', function(data) {
			console.log(data);	

			    formData='';
				formData+=data;
				console.log(formData);
				
			    var user;
				var data;
				
				data=qs.parse(formData);
				user = data['login'];
				pwd = data['password'];
				console.log(user);			
				console.log(pwd);



						mongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
							var dbo = db.db("apple");
							var query={"username":user,"password":pwd};
							console.log(user);			
							console.log(pwd);			

							console.log(query);
							dbo.collection("cpplecollection").find(query).toArray(function(err, result) {
								if (err) throw err;
								console.log("comment find");
								console.log(JSON.stringify(result));
								db.close();
								return res.end(JSON.stringify(result));
							});
						});
			});
		}else{
			     res.end("Wrong Page A");
			}		

	}else if(req.url === "/checkRegister"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){

//DB Connection for Register

			formData = '';
			return req.on('data', function(data) {
			console.log(data);	

			    formData='';
				formData+=data;
				console.log(formData);
				
			    var user;
				var data;
				
				data=qs.parse(formData);
				user = data['login'];
				email = data['email'];
				pwd = data['pwd'];
				sev1 = data['regSev01'];
				sev2 = data['regSev02'];
				sev3 = data['regSev03'];
				sev4 = data['regSev04'];												 
				console.log(user);			
				console.log(email);
				console.log(pwd);


// Write to the database
				var myobj = {"username":user,"email":email,"password":pwd,"service01":sev1,"service02":sev2,"service03":sev3,"service04":sev4};
				mongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					var dbo = db.db("apple");
							//var myobj = stringMsg;
							dbo.collection("cpplecollection").insertOne(myobj, function(err, res) {
								if (err) throw err;
								console.log("1 document inserted");
								//res.end("Account created!!");
								db.close();
							});
				});

			     res.end("hihi - Register");

			});
		}else{
			     res.end("Wrong Page B");
			}		


	}else if(req.url === "/editFavourite"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){

//DB Connection for editFavourite

			formData = '';
			return req.on('data', function(data) {
			console.log(data);	

			    formData='';
				formData+=data;
				console.log(formData);
				
				var data;
				
				data=qs.parse(formData);
//				user = data['username'];
				ser01 = data['service01'];
				ser02 = data['service02'];
				ser03 = data['service03'];
				ser04 = data['service04'];								

				target = data['username'];
				console.log(target);


	// Write to the database
				var myobj = {"service01":ser01,"service02":ser02,"service03":ser03,"service04":ser04};
				mongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					var dbo = db.db("apple");
							
							var myquery = {"username":target};
							var newvalues = { $set : myobj}
							dbo.collection("cpplecollection").findOneAndUpdate(myquery,newvalues, function(err, res) {
								if (err) throw err;
								console.log("1 document updated");
								//res.end("Account created!!");
								db.close();
							});
							
				});

			     res.end("List added");

			});
		}else{
			     res.end("Wrong Page B");
			}
			



	}else if(req.url === "/addTodolist"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){

//DB Connection for addTodolist

			formData = '';
			return req.on('data', function(data) {
			console.log(data);	

			    formData='';
				formData+=data;
				console.log(formData);
				
				var data;
				
				data=qs.parse(formData);
				todo = data['todo'];
				action = data['action'];
				target = data['target'];

				console.log(todo);			



	// Write to the database
				var myobj = {"jobTodo":todo};
				mongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					var dbo = db.db("apple");
					
					if (action==="add"){
							//var myobj = stringMsg;
							dbo.collection("todolist").insertOne(myobj, function(err, res) {
								if (err) throw err;
								console.log("1 document inserted");
								//res.end("Account created!!");
								db.close();
							});
							} else {
							
							var myquery = {"jobTodo":target};
							var newvalues = { $set : myobj}
							dbo.collection("todolist").updateOne(myquery,newvalues, function(err, res) {
								if (err) throw err;
								console.log("1 document updated");
								//res.end("Account created!!");
								db.close();
							});
							}
								
							
				});

			     res.end("List added");

			});
		}else{
			     res.end("Wrong Page B");
			}
			

	}else if(req.url === "/listTodolist"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="GET"){

				console.log("OKOK");			

//DB Connection for To-do list

						mongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
							var dbo = db.db("apple");
							var query={};
			

							console.log(query);
							dbo.collection("todolist").find().toArray(function(err, result) {
								if (err) throw err;
								console.log("comment find");
								console.log(JSON.stringify(result));
								db.close();
								return res.end(JSON.stringify(result));
							});
						});

			     //res.end("hihi - Sign In");

		}else{
			     res.end("Wrong Page A");
			}		

	}else if(req.url === "/deleteTodolist"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){

//DB Connection for deleteTodolist

			formData = '';
			return req.on('data', function(data) {
//			console.log(data);	

			    formData='';
				formData+=data;
				console.log(formData);
				
//			    var user;
				var data;
				
				data=qs.parse(formData);
				todo = data['todo'];
				console.log(todo);			

// Write to the database
				var myobj = {"jobTodo":todo};
				mongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					var dbo = db.db("apple");
							//var myobj = stringMsg;
							dbo.collection("todolist").deleteOne(myobj, function(err, res) {
								if (err) throw err;
								console.log("1 document deleted");
								//res.end("Record Deleted!!");
								db.close();
							});
				});

			     res.end("List added");

			});
		}else{
			     res.end("Wrong Page B");
			}
			



		
	}else if(/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/css");
	}else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/jpg");
    }else if(/^\/[a-zA-Z0-9\/]*.png$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/png");
    }else if(/^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
    }
}).listen(1234); //the server object listens on port 1234


function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}