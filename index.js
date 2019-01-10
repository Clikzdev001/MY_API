const mysqli     = require('mysql');
const express    = require('express');
var  app         = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');


   // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false, // true for 465, false for other ports
	auth: {
	    user: 'darlingtondamola@gmail.com', // generated ethereal user
	    pass: 'darlin007' // generated ethereal password
  },
	tls:{
		rejectUnauthorized: false
  }

});






app.use(bodyparser.json());

var mysqlcon = mysqli.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'eventblog'
});


mysqlcon.connect((err)=>{
	 if(!err)
	 console.log('DB connection succeded');
	 else{
	 	console.log('DB connection faled: \n Error' + JSON.stringify(err,undefined,2));
	 }	
})


app.listen(3000,()=>{
	 console.log('Express server is running at port number 3000');
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/posts',(req,res)=>{
	mysqlcon.query(" SELECT * FROM `post` ORDER BY id DESC",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})

app.get('/post/:id',(req,res)=>{
	var id = req.params.id;
	mysqlcon.query(" SELECT * FROM `post` WHERE `id`= "+id,(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.get('/postcat/:cat',(req,res)=>{
	var category = req.params.cat;
	mysqlcon.query("SELECT * FROM `post` WHERE `category`='"+category+"'",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})



app.get('/events',(req,res)=>{
	mysqlcon.query("SELECT * FROM `events` ORDER BY id  DESC",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.get('/event/:id',(req,res)=>{
	var id = req.params.id;
	mysqlcon.query("SELECT * FROM `events` WHERE `ename`='"+id+"'",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})

app.get('/eventcat/:cat',(req,res)=>{
	var category = req.params.cat;
	mysqlcon.query("SELECT * FROM `events` WHERE `ecategory`='"+category+"'",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})



app.get('/movies',(req,res)=>{
	mysqlcon.query("SELECT * FROM `movies` ORDER BY id  DESC",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.get('/movies/:id',(req,res)=>{
	var id = req.params.id;
	mysqlcon.query("SELECT * FROM `movies` WHERE `name`='"+id+"'",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})

app.get('/moviescat/:category',(req,res)=>{
	var category = req.params.category;
	mysqlcon.query("SELECT * FROM `movies` WHERE `category`='"+category+"'",(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.patch('/updateEvent/:id',(req,res)=>{
	var id = req.params.id;
	mysqlcon.query("UPDATE `events` SET `counts`= counts + 1 WHERE `id`="+id,(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.patch('/updateMovies/:id',(req,res)=>{
	var id = req.params.id;
	mysqlcon.query("UPDATE `movies` SET `counts`= counts + 1 WHERE `id`="+id,(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.patch('/updateBlog/:id',(req,res)=>{
	var id = req.params.id;
	mysqlcon.query("UPDATE `post` SET `counts`= counts + 1 WHERE `id`="+id,(err,rows,fields)=>{
		if(!err){
			 res.send(rows);
			 return rows;
		}else{
			console.log(err);
		}
	})
})


app.post('/InsertRequestEvents',(req,res)=>{
	 var data = req.body;
	 if (data) {
	 	var name         =  data.Reqfname 
		var email        =  data.Reqemail
		var number       =  data.Reqphone
		var event        =  data.ReqEvent
		var eventname    =  data.ReqName
		var ticket_type  =  data.ReqType.type
		var ticket_price =  data.ReqType.price
		var MiCode       =  data.Reqcode //data.code
		var quantity     =  data.Reqqyt
		var d            =  new Date();
		var date         =  d+':'+d.getMonth()+':'+d.getDay()
        
         

             output = '<div style="height: 200px;font-family: verdana;color: black;">'
					  	 +'<div style="height: 50px;">'
					  	 	+'<span style="font-size: 30px;font-weight: lighter;">Order Summary</span>  <span style="float: right;font-size: 14px;">30, November 2018</span>'
					  	 	+'<hr>'
					  	 	 +'<p>Hello '+ name +' we are so happy for having you on our platform. <br> We would love if you can spread us to all your friends<br> <strong>Thanks</strong></p>'
					  	 	 +'<p>TIcket for  <strong>'+eventname+' </strong></p>'
					  	 	 +'<table style="font-family: verdana;border-collapse: collapse;width: 100%; ">'
					  	 	 	+'<thead style="padding-top: 12px; padding-bottom: 12px; text-align: left;">'
					  	 	 		+'<tr>'
					  	 	 			+'<td><strong>Name</strong></td>'
					  	 	 			+'<td><strong>Type</strong></td>'
					  	 	 			+'<td><strong>Price</strong></td>'
					  	 	 			+'<td><strong>Quantity</strong></td>'
					  	 	 		+'</tr>'
					  	 	 	+'</thead>'
					  	 	 	+'<tbody  style="width: 300px;height: 50px;">'
					  	 	 		+'<tr>'
					  	 	 			+'<td>'+ name + '</td>'
					  	 	 			+'<td>' + ticket_type + '</td>'
					  	 	 			+'<td> &#x20a6;'+  new Intl.NumberFormat().format(ticket_price) +' </td>'
					  	 	 			+'<td> '+  quantity +' </td>'
					  	 	 		+'</tr>'

					  	 	 	+'</tbody>'
					  	 	 +'</table>'
					  	 +'</div>'
					  +'</div>'
					  +'<div style="padding: 10px;text-align: center;">'
 						+ '<p>&copy; All right reserved <a href="eventia.com.ng"> Eventia </a> </p>'
				      +'</div>'
        	

						   var retunedcode = name+'/'+email+'/'+number+'/'+MiCode;
                
           var sql = "INSERT INTO `allticket`(name, email, event_id , number, ticket_type, ticket_price, MiCode, quantity, date) VALUES ?";
             var values = [
                   [name , email , event ,  number , ticket_type , ticket_price , retunedcode , quantity , date ] 
                   ];
           mysqlcon.query(sql,[values],(err,result)=>{
          	    	 	if(err){
          	    	 		res.send({status: 'Error'});
          	    	 	}else{

                           var qr = require('qr-image');											
							   qr.image(retunedcode,{type: 'pdf', size: 10})
							      .pipe(require('fs').createWriteStream('images/'+email+'.pdf'));


						    // setup email data with unicode symbols
						    let mailOptions = {
						        from: '"Ticket details 👻" <pick@gmail.com>', // sender address
						        to: email, // list of receivers
						        subject: 'Ticket Booking', // Subject line
						        text:  name +' here is your order' , // plain text body
						        html: output, // html body
						        attachments: [{   // stream as an attachment
								               filename: email+'.pdf',
								               content: require('fs').createReadStream('images/'+email+'.pdf')
								        }]
						    };

						    // send mail with defined transport object
						    transporter.sendMail(mailOptions, (error, info) => {
						        if (error) {
						            return console.log(error);
						        }
          	    	 		    res.send({status: 'Success', message: 'Inserted a row',code: retunedcode});
						        console.log('Message sent: %s', info.messageId);
						        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

						    });

          	    	 	 }
          	    })
	  }else{
	 	res.send({status: 'Error'})
	  }
})


app.post('/InsertRequestMovies',(req,res)=>{
	 var data = req.body;

	 if (data) {
	    var name         = data.ReqName
		var email        = data.ReqEmail
		var phone        = data.ReqPhone
		var qyt          = data.ReqQyt
	    var movie        = data.ReqMovie
		var code         = data.ReqCode
		var ticket_price = data.ReqPrice
		var Mname        = data.ReqMname
		var d            =  new Date();
		var date         =  d+':'+d.getMonth()+':'+d.getDay()

		
         var Mycode = name+ '/'+email+'/'+code
	    var sql = "INSERT INTO `movierequest`(`name`, `email`, `phone`, `movie_id`, `price`, `Micode`, `quantity`, `date`) VALUES ?";
             var values = [
                   [name , email , phone ,  movie , ticket_price , Mycode , qyt , date ] 
                   ];
           mysqlcon.query(sql,[values],(err,result)=>{
          	    	 	if(err){
          	    	 		throw err
          	    	 		res.send({status: 'Error'});
          	    	 	}else{

          	    	 		  output = '<div style="height: 200px;font-family: verdana;color: black;">'
									  	 +'<div style="height: 50px;">'
									  	 	+'<span style="font-size: 30px;font-weight: lighter;">Order Summary</span>  <span style="float: right;font-size: 14px;">30, November 2018</span>'
									  	 	+'<hr>'
									  	 	+' '
									  	 	 +'<p>Hello '+ name +' we are so happy for having you on our platform. <br> We would love if you can spread us to all your friends<br> <strong>Thanks</strong></p>'
									  	 	 +'<p>TIcket for  <strong>'+Mname+' </strong></p>'
									  	 	  +'<div style="margin: 0 auto;padding: 20px;">'
									  	 	    +'<table style="font-family: verdana;border-collapse: collapse;width: 100%; ">'
									  	 	 	+'<thead style="padding-top: 12px; padding-bottom: 12px; text-align: left;background: black;color;white;">'
									  	 	 		+'<tr>'
									  	 	 			+'<td><strong>Name</strong></td>'
									  	 	 			+'<td><strong>Price</strong></td>'
									  	 	 			+'<td><strong>Quantity</strong></td>'
									  	 	 		+'</tr>'
									  	 	 	+'</thead>'
									  	 	 	+'<tbody  style="width: 300px;height: 50px;">'
									  	 	 		+'<tr>'
									  	 	 			+'<td>'+ name + '</td>'
									  	 	 			+'<td> &#x20a6;'+  new Intl.NumberFormat().format(ticket_price) +' </td>'
									  	 	 			+'<td> '+  qyt +' </td>'
									  	 	 		+'</tr>'

									  	 	 	+'</tbody>'
									  	 	 +'</table></div>'
									  	 +'</div>'
									  +'</div>'
									  +'<div style="padding: 10px;text-align: center;">'
				 						+ '<p>&copy; All right reserved <a href="eventia.com.ng"> Eventia </a> </p>'
								      +'</div>'

                           var qr = require('qr-image');											
							   qr.image(Mycode,{type: 'pdf', size: 10})
							      .pipe(require('fs').createWriteStream('Movies/'+email+'.pdf'));
                          
                                  // setup email data with unicode symbols
						    let mailOptions = {
						        from: '"Ticket details " <pick@gmail.com>', // sender address
						        to: email, // list of receivers
						        subject: name +' here is your order', // Subject line
						        text:  'Ticket Booking' , // plain text body
						        html: output, // html body
						        attachments: [{   // stream as an attachment
								               filename: email+'.pdf',
								               content: require('fs').createReadStream('Movies/'+email+'.pdf')
								        }]
						    };

						    	 // send mail with defined transport object
						    transporter.sendMail(mailOptions, (error, info) => {
						        if (error) {
						            return console.log(error);
						        }
          	    	 		     res.send({status: 'Success', message: 'Inserted a row'});
						        console.log('Message sent: %s', info.messageId);
						        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

						    });

          	    	 	 }
          	    }) 

	 }



})






