const anime = async (animeUrl) => {
	const options = {
	  method: 'GET',
	  headers: {
	    'X-RapidAPI-Key': 'd2d7016a7fmshdc6fb586f092e73p152925jsneca74751491d',
	    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	  }
	};
	try {
		const response = await fetch(animeUrl, options)
		const data = await response.json();
		return data;
	} catch(e) {
		// statements
		console.log(e);
	}
}

const createEl = (elementName, className, idName) => {
	const El = document.createElement(elementName)
	El.classList = className;
	El.setAttribute("id", idName)
	return El;
}

const createComponent = (image,titles,eps,stat) => {
	const card = createEl("div", "card", "card");
	const card_image = createEl("div", "card-image", "card-image");
	const anime_image = createEl("img", "anime-image", "anime-image");
	const card_body = createEl("div", "card-body", "card-body");
	const card_title = createEl("div", "card-title", "card-title");
	const title = createEl("h2", "card-title-head", "card-title-head");
	const ep = createEl("p", "episodes", "episodes");
	const status = createEl("p", "status", "status");

	anime_image.src = image;
	title.innerHTML = titles;
	ep.innerHTML = eps;
	status.innerHTML = stat;

	card.appendChild(card_image)
	card_image.appendChild(anime_image)
	card.appendChild(card_body);
	card_body.appendChild(card_title);
	card_title.appendChild(title);
	card_title.appendChild(ep);
	card_title.appendChild(status);


	document.querySelector(".container").appendChild(card)
}
const searchBtn = document.querySelector("#animeserchbutton");
const animeName = document.querySelector("#animename");

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const name = animeName.value;
	const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${name}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`;
	const data = anime(url)
	.then(d => {
		for(i = 0; i < d.data.length; i++){
			const title = d.data[i].alternativeTitles[0];
			const ep = d.data[i].episodes;
			const status = d.data[i].status;
			const image = d.data[i].image;
			createComponent(image,title,ep,status);
		}
	});
	const container = document.querySelector(".container");
	let card = document.querySelector(".card");
	while(card){
		container.removeChild(card);
		card = document.querySelector(".card");
	}

})