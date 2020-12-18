var server = require("express")();
server.all("/", (req, res)=>{
    res.send("It's working!")
});
server.listen(3000, ()=>{console.log("Server is Ready!")});



require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);


bot.on("ready", () => {
	console.log("Logged on!");
	bot.user.setActivity("!hug"); 
});

bot.on("message", msg => {
	if (msg.content.slice(0,4)!="!hug") return; //only do anything if it starts with "!hug"
	if(msg.content == "!hug") return helpPage(msg.channel); //!hug opens up the help page

	var senderNick = msg.member.nickname;
	if(senderNick == null) senderNick = msg.member.user.username;

	var to = msg.content.slice(5);
	if(to.slice(0,2)!="<@" || to.slice(-1)!=">") return incorrectPage(msg,msg.channel);
	
	var id = to.slice(2,-1);
	if(id[0]=="!") id=id.slice(1)
	if(isNaN(id)) return incorrectPage(msg,msg.channel);

	var toNick = msg.guild.members.cache.get(id).nickname;
	if(toNick == null) toNick = msg.guild.members.cache.get(id).user.username;

	hug(senderNick, toNick, msg.channel);
});


var randOf = list=>list[Math.floor(Math.random()*list.length)];

function hug(sender,to,channel){
	var comment = [
		"Aww! You're so cute together!",
		"Don't suffocate them for *too* long!",
		"They really needed it.",
		"They feel better already!",
		"Thanks, "+sender+"!",
		to+", say thank you!",
		"Mwah!",
		"You're welcome!",
		"Adorable!",
		"So sweet!",
		"Such a caring friend!",
		"Such wholesomeness!",
		"I want a hug too!",
		"Adorbs!",
		"That's so kind!",
		"That's so nice!",
		to+", hug back!",
	];
	var pic = [
		"https://i.pinimg.com/originals/2d/41/38/2d4138c7c24d21b9d17f66a54ee7ea03.gif",
		"https://media.tenor.com/images/bf3c9339d174e4c9d8d3dd6ea6cba612/tenor.png",
		"https://media.tenor.com/images/7d3a251e2d7bf9af9925137c37bc1a9d/tenor.gif",
		"https://www.clipartkey.com/mpngs/m/197-1973363_milkandmocha-cute-bears-hug-kawaii-freetoedit-milk-and.png",
		"https://pbs.twimg.com/media/EeLw9t8VAAAzxSi.jpg",
		"https://media.tenor.com/images/884f2d71fd9670f78da7287bc1568267/tenor.gif",
		"https://pbs.twimg.com/profile_images/1031548675078512642/Mdoz8w3X.jpg",
		"https://data.whicdn.com/images/328996735/original.gif",
		"https://pbs.twimg.com/media/EYT23TRVcAMHybk.jpg",
		"https://sdl-stickershop.line.naver.jp/products/0/0/1/1303392/android/stickers/12265831.png",
		"https://www.icegif.com/wp-content/uploads/kissing-icegif.gif",
		"https://ih1.redbubble.net/image.1841450223.3357/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg",
		"https://pbs.twimg.com/media/ENmra-QU4AAIeNV.jpg",
		"https://cdn130.picsart.com/288152949057211.png",
		"https://i.pinimg.com/originals/b7/49/2c/b7492c8996b25e613a2ab58a5d801924.gif",
		"https://www.pngitem.com/pimgs/m/519-5196830_freetoedit-cute-kawaii-cat-couple-love-hug-cuddle.png",
		"https://www.pinclipart.com/picdir/middle/552-5523276_freetoedit-cute-kawaii-cat-couple-love-hug-cuddle.png",
		"https://media.tenor.com/images/e167c5d8a3c018181f77aff84c7ead8d/tenor.gif",
		"https://media.tenor.com/images/64edbf23a5174e751aee50ee3289286e/tenor.gif",
		"https://i.pinimg.com/originals/0c/cd/91/0ccd912ac62159482be3fa6c1024c9a8.gif"
	];

	var chosenPic = randOf(pic);
	const embed = new Discord.MessageEmbed()
		.setColor("#DE3B8F")
		.attachFiles([chosenPic])
		.setDescription("**"+sender+"** hugs **"+to+"**\n"+randOf(comment)+" :heart: :heart: :heart: :heart:")
	channel.send(embed);
}


function helpPage(channel){
	const embed = new Discord.MessageEmbed()
		.setColor("#DE3B8F") //pink for hearts
		.setTitle("Hug Bot Instructions")
		.setDescription("Use **!hug @mention** to hug a friend! Only hug one friend at a time; you cannot hug an entire role."/*+"Available commands include:\n**!hug\n!pat\n!bully\n!tickle**"*/);
	channel.send(embed);
}

function incorrectPage(msg,channel){
	const embed = new Discord.MessageEmbed()
		.setColor("#DE3B8F") //pink for hearts
		.setTitle("Incorrect Arguments")
		.setDescription("Sorry, that command didn't work. Please @mention exactly one user, and you cannot hug an entire role.\n\nDebugging info: You sent `\""+msg.content+"\"`.")
	channel.send(embed);
}
console.log("")
