document.addEventListener("DOMContentLoaded", () => {
	const renderEl = document.getElementById("container");
	renderEl.className =
		"font-[cursive] flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-purple-500 to-pink-500";

	const kits = ["crash", "kick", "snare", "tom"];

	function renderTile() {
		const divEl = document.createElement("div");
		divEl.className = "flex flex-col items-center justify-center gap-2";
		renderEl.appendChild(divEl);

		const h1El = document.createElement("h1");
		h1El.className = "text-6xl text-white font-bold flex gap-4";
		h1El.textContent = "Drum Kit";
		divEl.appendChild(h1El);

		const iTagEl = document.createElement("i");
		iTagEl.className = "fa-solid fa-drum";
		h1El.appendChild(iTagEl);

		const verEl = document.createElement("span");
		verEl.className = "text-white text-2xl";
		verEl.textContent = "v2.0 - Big Version";
		divEl.appendChild(verEl);

		const inputEl = document.createElement("input");
		inputEl.className = "text-black p-2 px-5 rounded-md mt-4";
		inputEl.placeholder = "Enter sequence (e.g. 1231234)";
		divEl.appendChild(inputEl);

		const buttonEl = document.createElement("button");
		buttonEl.className =
			"mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300";
		buttonEl.textContent = "Play Sequence";
		divEl.appendChild(buttonEl);

		buttonEl.addEventListener("click", () => {
			let sequence = inputEl.value.replace(/[^1-4]/g, "");
			inputEl.value = sequence;
			if (sequence) {
				playSequence(sequence);
			} else {
				alert("Please enter a valid sequence");
			}
		});
	}

	function renderDrumKit() {
		const divEl = document.createElement("div");
		divEl.className = "flex flex-wrap justify-center items-center gap-4 py-10";
		renderEl.appendChild(divEl);

		kits.forEach((kit, index) => {
			const btnEl = document.createElement("button");
			btnEl.className = "btn-drumKit";
			btnEl.id = `drum-${index + 1}`;
			btnEl.textContent = `${index + 1}: ${kit}`;
			divEl.appendChild(btnEl);

			btnEl.style.backgroundImage = `url(src/images/${kit}.png)`;

			const audioEl = document.createElement("audio");
			audioEl.id = `audio-${index + 1}`;
			audioEl.src = `src/sounds/${kit}.mp3`;
			divEl.appendChild(audioEl);

			btnEl.addEventListener("click", () => {
				audioEl.currentTime = 0;
				audioEl.play();
				addEffect(btnEl);
			});

			window.addEventListener("keydown", (event) => {
				if (event.key === (index + 1).toString()) {
					audioEl.currentTime = 0;
					audioEl.play();
					addEffect(btnEl);
				}
			});
		});
	}

	function addEffect(element) {
		element.style.transform = "scale(.9)";
		setTimeout(() => {
			element.style.transform = "scale(1)";
		}, 100);
	}

	function playSequence(sequence) {
		let index = 0;
		sequence.split("").forEach((item, i) => {
			setTimeout(() => {
				const btnEl = document.getElementById(`drum-${item}`);
				const audioEl = document.getElementById(`audio-${item}`);
				if (btnEl && audioEl) {
					audioEl.currentTime = 0;
					audioEl.play();
					addEffect(btnEl);
				}
			}, i * 500);
		});
	}

	function renderUserGuide() {
		const divEl = document.createElement("div");
		divEl.className =
			"flex flex-col items-center justify-center gap-4 mt-8 text-white p-4 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-md";
		renderEl.appendChild(divEl);

		const h2El = document.createElement("h2");
		h2El.className = "text-4xl font-bold";
		h2El.textContent = "User Guide";
		divEl.appendChild(h2El);

		const ulEl = document.createElement("ul");
		ulEl.className = "list-disc list-inside text-xl";
		divEl.appendChild(ulEl);

		const instructions = [
			"Click on the drum buttons or press the corresponding number keys (1-4) to play a sound.",
			"Enter a sequence of numbers (1-4) in the input field and click 'Play Sequence' to play the sounds in order.",
			"Use the 'Play Sequence' feature to create your own drum patterns and rhythms.",
			"Have fun and experiment with different sequences!",
		];

		instructions.forEach((instruction) => {
			const liEl = document.createElement("li");
			liEl.textContent = instruction;
			ulEl.appendChild(liEl);
		});
	}

	renderTile();
	renderDrumKit();
	renderUserGuide();
});
