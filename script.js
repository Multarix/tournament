const riftstones = [
	"Adentus",
	"Ahzreil",
	"Morokai",
	"Grand Aelon",
	"Talus",
	"Kowazan",
	"Malakar",
	"Chernobog",
	"Daigon",
	"Leviathan",
	"Pakilo",
	"Manticus"
]


const guild1Name = document.getElementById("guild1Name");
const guild2Name = document.getElementById("guild2Name");
const confirmNames = document.getElementById("confirmNames");

const coinTossWinner = document.getElementById("coinTossWinner");
const coinTossGuild1Name = document.getElementById("coinTossGuild1Name");
const coinTossGuild2Name = document.getElementById("coinTossGuild2Name");

const pickBan = document.getElementById("pickBan");

const ban1 = document.getElementById("ban1");
const ban2 = document.getElementById("ban2");
const ban3 = document.getElementById("ban3");
const ban4 = document.getElementById("ban4");
const picked = document.getElementById("picked");

const code = document.getElementById("code");
const generateCode = document.getElementById("generateCode");

const submit = document.getElementById("submit");
const clear = document.getElementById("clear");
const output = document.getElementById("output");

function addOptions(element){
	for(const riftstone of riftstones){
		const option = document.createElement("option");
		option.value = riftstone;
		option.textContent = riftstone;
		element.appendChild(option);
	}
}

function generateCodeFn() {
	let string = ""
	for(let i = 0; i < 6; i++){
		string += Math.floor(Math.random() * 10);
	}
	
	code.value = string;
}

addOptions(ban1);
addOptions(ban2);
addOptions(ban3);
addOptions(ban4);
addOptions(picked);

generateCode.onclick = generateCodeFn

// Confirm Guild Names
confirmNames.onclick = () => {
	coinTossGuild1Name.innerText = guild1Name.value;
	coinTossGuild2Name.innerText = guild2Name.value;
	coinTossGuild1Name.value = guild1Name.value;
	coinTossGuild2Name.value = guild2Name.value;
}


// Clear
clear.onclick = () => {
	output.value = "";
	guild1Name.value = "";
	guild2Name.value = "";
	code.value = "";
	coinTossGuild1Name.innerText = "Guild 1"
	coinTossGuild2Name.innerText = "Guild 2"
	coinTossGuild1Name.value = "Guild1"
	coinTossGuild2Name.value = "Guild2"
	
	ban1.value = "select";
	ban2.value = "select";
	ban3.value = "select";
	ban4.value = "select";
	picked.value = "select";
	coinTossWinner.value = "Guild1";
	pickBan.value = "pick";
}



// Submit
document.getElementById("submit").onclick = () => {
	if(!code.value) generateCodeFn();
	const array = [];
	array.push("-------------------------------------------------")
	array.push(`Bans: ${[ban1.value, ban2.value, ban3.value, ban4.value].join(", ")}`);
	array.push(`Pick: ${picked.value}`);
	array.push(`Code: ${code.value}`);
	
	const coinWinner = coinTossWinner.value;
	const coinLoser = (coinTossWinner.value === coinTossGuild1Name.value) ? coinTossGuild2Name.value : coinTossGuild1Name.value;
	
	const winnerChose = pickBan.value
	const LoserChose = (winnerChose === "pick") ? "ban" : "pick";
	
	array.push("");
	array.push(`${coinWinner} won, Chose ${winnerChose}. ${coinLoser} ${LoserChose}s`);
	array.push("RED: ");
	array.push("YELLOW: ")
	array.push("");
	array.push(`${coinWinner} Cordy: player & player`);
	array.push(`${coinLoser} Cordy: player & player`);
	
	output.value = array.join("\n");
}


