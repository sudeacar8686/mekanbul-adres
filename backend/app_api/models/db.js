var mongoose=require('mongoose');
//Cloud mongodb için aşağıdaki adresi cloud adresiyle değiştirin.
var dbURI="mongodb+srv://sudeacar86:05509192@cluster0.necps.mongodb.net/mekanbul?retryWrites=true&w=majority"
//var dbURI="mongodb://localhost/mekanbul";
mongoose.connect(dbURI);
mongoose.connection.on("connected",function(){
    console.log(dbURI+" adresine bağlandı");
});
mongoose.connection.on("disconnected",function(){
    console.log(dbURI+" bağlantısı koptu");
});

process.on("SIGINT",function(){
    mongoose.connection.close();
    console.log("Bağlantı kapatıldı");
    process.exit(0);
});
require("./venue");