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

/**
 * @param {0|1|2} matchNumber
 */
function passPickedBanForward(matchNumber){
	if(matchNumber === 2) return; // Nothing to pass forwards, last match
	const perma = [];
	const picks = [pick1, pick2, pick3];
	const allBanElements = [
		[ban1, ban2, ban3, ban4],
		[ban5, ban6, ban7, ban8],
		[ban9, ban10, ban11, ban12]
	]
	
	if(matchNumber === 0) perma.push(pick1.value);
	if(matchNumber === 1) perma.push(pick1.value, pick2.value);
	
	const selectElement = picks[matchNumber + 1];
	const banElements = allBanElements[matchNumber + 1];
	
	for(const option of selectElement.children) option.disabled = false;
	for(const banElement of banElements){
		for(const option of banElement.children) option.disabled = false;
	}
	
	for(const pick of perma){
		for(const option of selectElement.children){
			if(option.value === pick) option.disabled = true;
		}
		
		for(const banElement of banElements){
			for(const option of banElement.children){
				if(option.value === pick) option.disabled = true;
			}
		}
	}
}


function passBans(banSelect1, banSelect2, banSelect3, banSelect4, matchNumber){
	let picker = pick1;
	if(matchNumber === 1) picker = pick2;
	if(matchNumber === 2) picker = pick3;
	
	const selectors = [banSelect1, banSelect2, banSelect3, banSelect4, picker];
	for(const selector of selectors){
		for(const option of selector){
			const value = option.value;
			
			if(matchNumber === 1 && pick1.value === value){
				option.disabled = true;
				continue;
			}
			if(matchNumber === 2 && pick1.value === value || pick2.value === value){
				option.disabled = true;
				continue;
			}
			
			if(banSelect1.value === value || banSelect2.value === value || banSelect3.value === value || banSelect4.value === value){
				option.disabled = true;
				continue;
			}
			
			option.disabled = false;
		}
	}
}



/**
 * @param {HTMLDivElement} element
 */
function populateItems(element){
	for(const riftstone of riftstones){
		const option = document.createElement("option");
		option.value = riftstone;
		option.innerText = riftstone;
		
		element.appendChild(option);
	}
}

function generateCode(element){
	let string = ""
	for(let i = 0; i < 6; i++){
		string += Math.floor(Math.random() * 10);
	}
	
	element.value = string;
}

/**
 * @param {0|1|2} matchNumber
 */
function submitMatch(matchNumber){
	const permaBans = [];
	
	const coinWinners = [coinTossWinner1.value, coinTossWinner2.value, coinTossWinner3.value];
	const pickBans = [pickBan1.value, pickBan2.value, pickBan3.value];
	const bans = [
		[ban1.value, ban2.value, ban3.value, ban4.value],
		[ban5.value, ban6.value, ban7.value, ban8.value],
		[ban9.value, ban10.value, ban11.value, ban12.value]
	];
	const picks = [pick1, pick2, pick3];
	const code = [match1Code, match2Code, match3Code];
	const output = [output1, output2, output3];
	
	const coinWinner = coinWinners[matchNumber];
	const coinLoser = (coinWinner === guildNameCoin1.value) ? guildNameCoin2.value : guildNameCoin1.value;
	
	const winnerChose = pickBans[matchNumber]
	const LoserChose = (winnerChose === "pick") ? "ban" : "pick";
	
	const winnerPickBan =  `${winnerChose}${(winnerChose === "ban") ? "n" : ""}ing.`
	const loserPickBan = `${LoserChose}${(LoserChose === "ban") ? "n" : ""}ing.`
	
	switch(matchNumber){
		case 0:
			break;
		case 1:
			permaBans.push(pick1.value);
			break;
		default:
			permaBans.push(pick1.value, pick2.value);
			break;
	}
	
	if(code[matchNumber].value === "") generateCode(code[matchNumber]);
	
	const array = [];
	array.push("-------------------------------------------------")
	array.push(`Title: ${coinWinner} vs ${coinLoser}`);
	array.push(`Bans: ${(permaBans.length > 0) ? `*${permaBans.join("*, *")}*, ` : ""}${bans[matchNumber].join(", ")}`);
	array.push(`Pick: ${picks[matchNumber].value}`);
	array.push(`Code: ${code[matchNumber].value}`);
	array.push("");
	array.push(`\`${coinWinner}\` won, they are ${winnerPickBan} \`${coinLoser}\` is ${loserPickBan}`);
	array.push("RED: ");
	array.push("YELLOW: ");
	array.push("");
	array.push(`\`${coinWinner}\` Cordy: player & player`);
	array.push(`\`${coinLoser}\` Cordy: player & player`);
	
	output[matchNumber].value = array.join("\n");
	
	passPickedBanForward(matchNumber);
}

const match1Button = document.getElementById("match1Button");
const match2Button = document.getElementById("match2Button");
const match3Button = document.getElementById("match3Button");

const match1Content = document.getElementById("match1Content");
const match2Content = document.getElementById("match2Content");
const match3Content = document.getElementById("match3Content");

match1Button.disabled = true;

match1Button.addEventListener("click", () => {
	match1Button.disabled = true;
	match2Button.disabled = false;
	match3Button.disabled = false;
	
	match1Content.style.display = "flex";
	match2Content.style.display = "none";
	match3Content.style.display = "none";
});


match2Button.addEventListener("click", () => {
	match1Button.disabled = false;
	match2Button.disabled = true;
	match3Button.disabled = false;
	
	match1Content.style.display = "none";
	match2Content.style.display = "flex";
	match3Content.style.display = "none";
});


match3Button.addEventListener("click", () => {
	match1Button.disabled = false;
	match2Button.disabled = false;
	match3Button.disabled = true;
	
	match1Content.style.display = "none";
	match2Content.style.display = "none";
	match3Content.style.display = "flex";
});


const guildName1 = document.getElementById("guildName1");
const guildName2 = document.getElementById("guildName2");

const guildName3 = document.getElementById("guildName3");
const guildName4 = document.getElementById("guildName4");
const guildName5 = document.getElementById("guildName5");
const guildName6 = document.getElementById("guildName6");

const coinTossWinner1 = document.getElementById("coinTossWinner1");
const coinTossWinner2 = document.getElementById("coinTossWinner2");
const coinTossWinner3 = document.getElementById("coinTossWinner3");

const guildNameCoin1 = document.getElementById("coin1");
const guildNameCoin2 = document.getElementById("coin2");
const guildNameCoin3 = document.getElementById("coin3");
const guildNameCoin4 = document.getElementById("coin4");
const guildNameCoin5 = document.getElementById("coin5");
const guildNameCoin6 = document.getElementById("coin6");

guildName1.addEventListener("keyup", () => {
	let newValue = guildName1.value.trim();
	guildName3.value = newValue;
	guildName5.value = newValue;
	
	if(newValue === "") newValue = "Guild 1";
	guildNameCoin1.value = newValue;
	guildNameCoin3.value = newValue;
	guildNameCoin5.value = newValue;
	
	guildNameCoin1.innerText = newValue;
	guildNameCoin3.innerText = newValue;
	guildNameCoin5.innerText = newValue;
});

guildName2.addEventListener("keyup", () => {
	let newValue = guildName2.value.trim();
	guildName4.value = newValue;
	guildName6.value = newValue;
	
	if(newValue === "") newValue = "Guild 2";
	guildNameCoin2.value = newValue;
	guildNameCoin4.value = newValue;
	guildNameCoin6.value = newValue;
	
	guildNameCoin2.innerText = newValue;
	guildNameCoin4.innerText = newValue;
	guildNameCoin6.innerText = newValue;
});

// Ensure empty on site reload
guildName1.value = "";
guildName2.value = "";

const pickBan1 = document.getElementById("pickBan1");
const pickBan2 = document.getElementById("pickBan2");
const pickBan3 = document.getElementById("pickBan3");

const ban1 = document.getElementById("ban1");
const ban2 = document.getElementById("ban2");
const ban3 = document.getElementById("ban3");
const ban4 = document.getElementById("ban4");

const ban5 = document.getElementById("ban5");
const ban6 = document.getElementById("ban6");
const ban7 = document.getElementById("ban7");
const ban8 = document.getElementById("ban8");

const ban9 = document.getElementById("ban9");
const ban10 = document.getElementById("ban10");
const ban11 = document.getElementById("ban11");
const ban12 = document.getElementById("ban12");

const pick1 = document.getElementById("pick1");
const pick2 = document.getElementById("pick2");
const pick3 = document.getElementById("pick3");


const banners = [ban1, ban2, ban3, ban4, ban5, ban6, ban7, ban8, ban9, ban10, ban11, ban12, pick1, pick2, pick3];
banners.forEach(item => {
	populateItems(item);
});

ban1.onchange = passBans.bind(null, ban1, ban2, ban3, ban4, 0);
ban2.onchange = passBans.bind(null, ban1, ban2, ban3, ban4, 0);
ban3.onchange = passBans.bind(null, ban1, ban2, ban3, ban4, 0);
ban4.onchange = passBans.bind(null, ban1, ban2, ban3, ban4, 0);

ban5.onchange = passBans.bind(null, ban5, ban6, ban7, ban8, 1);
ban6.onchange = passBans.bind(null, ban5, ban6, ban7, ban8, 1);
ban7.onchange = passBans.bind(null, ban5, ban6, ban7, ban8, 1);
ban8.onchange = passBans.bind(null, ban5, ban6, ban7, ban8, 1);

ban9.onchange = passBans.bind(null, ban9, ban10, ban11, ban12, 2);
ban10.onchange = passBans.bind(null, ban9, ban10, ban11, ban12, 2);
ban11.onchange = passBans.bind(null, ban9, ban10, ban11, ban12, 2);
ban12.onchange = passBans.bind(null, ban9, ban10, ban11, ban12, 2);

const generateMatch1Code = document.getElementById("generateMatch1Code");
const generateMatch2Code = document.getElementById("generateMatch2Code");
const generateMatch3Code = document.getElementById("generateMatch3Code");

const match1Code = document.getElementById("match1Code");
const match2Code = document.getElementById("match2Code");
const match3Code = document.getElementById("match3Code");

generateMatch1Code.onclick = generateCode.bind(null, match1Code);
generateMatch2Code.onclick = generateCode.bind(null, match2Code);
generateMatch3Code.onclick = generateCode.bind(null, match3Code);

const submit1 = document.getElementById("submit1");
const submit2 = document.getElementById("submit2");
const submit3 = document.getElementById("submit3");

const output1 = document.getElementById("match1Output");
const output2 = document.getElementById("match2Output");
const output3 = document.getElementById("match3Output");

submit1.onclick = submitMatch.bind(null, 0);
submit2.onclick = submitMatch.bind(null, 1);
submit3.onclick = submitMatch.bind(null, 2);

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
	const confirmation = confirm("This will reset everything, are you sure you wish to do this?");
	if(!confirmation) return;
	
	output1.value = "";
	output2.value = "";
	output3.value = "";
	
	match1Code.value = "";
	match2Code.value = "";
	match3Code.value = "";
	
	pick1.value ="Not Chosen";
	pick2.value ="Not Chosen";
	pick3.value ="Not Chosen";
	
	ban1.value = "Ban1"
	ban2.value = "Ban2"
	ban3.value = "Ban3"
	ban4.value = "Ban4"
	ban5.value = "Ban1"
	ban6.value = "Ban2"
	ban7.value = "Ban3"
	ban8.value = "Ban4"
	ban9.value = "Ban1"
	ban10.value = "Ban2"
	ban11.value = "Ban3"
	ban12.value = "Ban4"
	
	pickBan1.value = "pick"
	pickBan2.value = "pick"
	pickBan3.value = "pick"
	
	guildName1.value = "";
	guildName2.value = "";
	guildName3.value = "";
	guildName4.value = "";
	guildName5.value = "";
	guildName6.value = "";
	
	guildNameCoin1.value = "Guild_1";
	guildNameCoin3.value = "Guild_1";
	guildNameCoin4.value = "Guild_1";
	guildNameCoin2.value = "Guild_2";
	guildNameCoin4.value = "Guild_2";
	guildNameCoin6.value = "Guild_2";
	
	coinTossWinner1.value = "Guild_1";
	coinTossWinner2.value = "Guild_1";
	coinTossWinner3.value = "Guild_1";
	
	
	for(const banner of banners){
		for(const option of banner){
			option.disabled = false;
		}
	}
});