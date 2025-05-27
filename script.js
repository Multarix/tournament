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


const codeText = document.getElementById("code");
const ban1 = document.getElementById("ban1");
const ban2 = document.getElementById("ban2");
const ban3 = document.getElementById("ban3");
const ban4 = document.getElementById("ban4");
const picked = document.getElementById("picked");
const output = document.getElementById("output");

const guild1Name = document.getElementById("guild1Name");
const guild2Name = document.getElementById("guild2Name");
const guild1NameLabel = document.getElementById("guild1NameLabel");
const guild2NameLabel = document.getElementById("guild2NameLabel");

const confirm = document.getElementById("g1");
const radioCoinToss = document.getElementById("g1");
const radioPickBan = document.getElementById("pick");



function addOptions(element){
	for(const riftstone of riftstones){
		const option = document.createElement("option");
		option.value = riftstone;
		option.textContent = riftstone;
		element.appendChild(option);
	}
}

addOptions(ban1);
addOptions(ban2);
addOptions(ban3);
addOptions(ban4);
addOptions(picked);

// Generate Code
document.getElementById("generateCode").onclick = () => {
	let string = ""
	for(let i = 0; i < 6; i++){
		string += Math.floor(Math.random() * 10);
	}
	
	codeText.value = string;
}

// Confirm Guild Names
document.getElementById("confirm").onclick = () => {
	guild1NameLabel.innerText = guild1Name.value;
	guild2NameLabel.innerText = guild2Name.value;
}


// Submit
document.getElementById("submit").onclick = () => {
	const array = [];
	array.push("-------------------------------------------------")
	array.push(`Bans: ${[ban1.value, ban2.value, ban3.value, ban4.value].join(", ")}`);
	array.push(`Pick: ${picked.value}`);
	array.push(`Code: ${codeText.value}`);
	
	const coinWinner = (radioCoinToss.checked) ? guild1NameLabel.innerText : guild2NameLabel.innerText;
	const coinLoser = (!radioCoinToss.checked) ? guild1NameLabel.innerText : guild2NameLabel.innerText;
	
	const pickBan = (radioPickBan.checked) ? "Pick" : "Ban";
	const banPick = (radioPickBan.checked) ? "Pick" : "Ban";
	
	array.push("");
	array.push(`${coinWinner} won, Chose ${pickBan}. ${coinLoser} ${banPick}s`);
	array.push("RED: ");
	array.push("YELLOW: ")
	
	output.value = array.join("\n");
}



// Clear
document.getElementById("clear").onclick = () => {
	output.innerText ="";
	guild1Name.value = "";
	guild2Name.value = "";
	codeText.value = "";
	guild1NameLabel.innerText = "Guild 1"
	guild2NameLabel.innerText = "Guild 2"
}