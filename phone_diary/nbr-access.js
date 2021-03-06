
var express=require('express');
var bodyparser=require('body-parser');



var app=express();
app.use(bodyparser.json());
//.....inserting data into database-------
/*var insertData=(con,name,nbr)=>{
	sql="INSERT INTO mobile_nbrs (name,nbr) VALUES ?";
	var values=[
	[name,nbr]
	];
	con.query(sql,[values],(err,result)=>{
		if (err) throw err;
		console.log("inserted "+ name);
	});

}*/

var insertData = (con) =>{
     app.post('/mobile_nbrs',(req,res)=>{
     	sql="INSERT INTO mobile_nbrs (name,nbr) VALUES = ?";
        var name=req.body.name;
        var nbr=req.body.nbr;
     	var values=[
     	[name,nbr]
     	];
     	con.query(sql,[values],(err,result)=>{
             if(err) throw err;
             console.log("inserted "+name);
     	});
     });
}

  app.listen(3000,()=>{
   console.log("running on port 3000")
});


//----------deleting data from database--------....
var deleteData=(con,name)=>{
	sql="DELETE FROM mobile_nbrs WHERE name = ?";
	var name=name; 
	con.query(sql,name,(err,result)=>{
		if(err)throw err;
		console.log("Deleted: "+ name);
	});
}


//------finding data from database.............
var findData=(con,name)=>{
	if(name==="all"){
		sql='SELECT name,nbr FROM mobile_nbrs';
		con.query(sql,(err,result,fields)=>{
			if(err) throw err;
			length=result.length;
			for(i=0;i<length;i++){
				nbr_value=Object.values(result[i]);
				nbr_value.forEach((values)=>{
					console.log(values);
				});

			}
		});
		
	}else{
		sql="SELECT nbr FROM mobile_nbrs where name= ?";

		var name=name;
		con.query(sql,name,(err,result,fields)=>{
			if(err) throw err;
			nbr_value=Object.values(result[0]);


			nbr_value.forEach((value)=>{
				console.log(value)
			});
		});
	}
}

//----------exporting module--------..
module.exports={
	insertData,
	deleteData,
	findData

}
