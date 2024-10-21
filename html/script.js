const $ = (query) => document.querySelector(query);
const $$ = (query) => document.querySelectorAll(query);
let isCustomizing = false;
let soundEnabled =
	window.localStorage.getItem("notificationSoundEnabled") || true;
let soundVolume = window.localStorage.getItem("notificationSoundVolume") || 0.4;

let notifyTypes = {
	info: "#3d8ff5",
	success: "#35ab26",
	warning: "#d3a042",
	error: "#bd2828",
	bank: "#adff2f",
};

let Config = {
	defaultPosition: 1,
	defaultDuration: 3000,
	lang: {
		["test-notification"]: "This is a test notification",
		["html"]: {
			["title"]: "Notification Positions",
			["sounds-title"]: "Sounds Settings:",
			["sound-button"]: {
				["enable"]: "Enable",
				["disable"]: "Disable",
			},
			["positions"]: {
				1: "Top Left",
				2: "Top Center",
				3: "Top Right",
				4: "Middle Left",
				5: "Middle Right",
				6: "Bottom Left",
				7: "Bottom Center",
				8: "Bottom Right",
			},
			["test-title"]: "Test Notification",
			["test-buttons"]: {
				["info"]: "Information",
				["success"]: "Success",
				["warning"]: "Warning",
				["error"]: "Error",
				["bank"]: "Bank",
			},
		},
	},
};

let Queue = [];

const positions = {
	1: { x: "0", y: "0", anim: "from-left from-top", name: "top-left" },
	2: { x: "40%", y: "0", anim: "from-top", name: "top-middle" },
	3: { x: "80%", y: "0", anim: "from-right from-top", name: "top-right" },
	4: { x: "0", y: "27.5%", anim: "from-left", name: "middle-left" },
	5: { x: "80%", y: "27.5%", anim: "from-right", name: "middle-right" },
	6: { x: "0", y: "65%", anim: "from-left from-bottom", name: "bottom-left" },
	7: { x: "40%", y: "65%", anim: "from-bottom", name: "bottom-middle" },
	8: {
		x: "80%",
		y: "65%",
		anim: "from-right from-bottom",
		name: "bottom-right",
	},
};

class Notification {
	constructor(
		text,
		type = "info",
		time = Config.defaultDuration,
		title = null,
		icon = null,
		options = {}
	) {
		this.title = title;
		this.msg = text;
		this.type = Notification.NormalizeType(type);
		this.time = time;
		this.notification = document.createElement("div");
		this.icon = icon;
		this.options = options;
		this.inScreen = false;
	}

	static NormalizeType(type) {
		if (
			type === "info" ||
			type === "success" ||
			type === "warning" ||
			type === "error" ||
			type === "bank"
		) {
			return type;
		}
		return "info";
	}

	static SetUpPosition(pos) {
		if (typeof pos !== "number" || Number.isNaN(pos)) return;
		if (pos < 1 || pos > 8) return;

		$$(".position").forEach((pos) => {
			pos.classList.remove("active");
		});
		$(`.position[data-position="${pos}"]`).classList.add("active");

		window.localStorage.setItem("notificationPosition", pos);

		$(".notifications").classList.remove("from-left");
		$(".notifications").classList.remove("from-right");
		$(".notifications").classList.remove("from-top");
		$(".notifications").classList.remove("from-bottom");

		const POSITION = positions[pos];
		$(".notifications").style.left = POSITION.x;
		$(".notifications").style.top = POSITION.y;
		POSITION.anim.split(" ").forEach((anim) => {
			$(".notifications").classList.add(anim);
		});
	}

	static GetApropiateIcon(type) {
		switch (type) {
			case "info":
				return "fa-circle-info";
			case "success":
				return "fa-circle-check";
			case "warning":
				return "fa-triangle-exclamation";
			case "error":
				return "fa-circle-xmark";
			case "bank":
				return "fa-sack-dollar";
			default:
				return "fa-circle-info";
		}
	}

	static Next() {
		const showing = $$(".notification").length;
		if (showing < 4 && Queue.length > 0) {
			Queue[0].show();
			Queue.shift();
		}
	}

	show() {
		this.notification.classList.add("notification");
		this.notification.classList.add("show");
		this.notification.classList.add(this.type);
		this.notification.style.color = notifyTypes[this.type];
		this.notification.innerHTML = `
			<div class="decor-lat"></div>
			<div class="decor-top">
				<li></li>
				<li></li>
				<li></li>
			</div>
			<i class=" fa-solid ${
				this.icon ?? Notification.GetApropiateIcon(this.type)
			}"></i>
			<span>
				<h2>${this.title || Config.lang["html"]["test-buttons"][this.type]}</h2>
				<p>${this.msg}</p>
			</span>
		`;
		$(".notifications").appendChild(this.notification);
		this.inScreen = true;
		if (soundEnabled) {
			const sound = new Audio(`./sounds/${this.type}.mp3`);
			sound.volume = soundVolume;
			sound.play();
		}

		setTimeout(() => {
			if (this.options && this.options.persistent) return;
			this.remove();
		}, this.time);
	}

	remove() {
		this.notification.classList.remove("show");
		this.notification.classList.add("out");
		setTimeout(() => {
			this.inScreen = false;
			this.notification.remove();
			Notification.Next();
		}, 600);
	}
}

function createNotification(text, type, time, title, icon, options) {
	Queue.push(new Notification(text, type, time, title, icon, options));
	const showing = $$(".notification").length;
	if (showing < 4) {
		Queue[0].show();
		Queue.shift();
	}
}

function openCustomization() {
	$(".menu").classList.add("show");
	isCustomizing = true;
}

function test() {
	createNotification(
		"This is a test notification",
		"info",
		5000,
		null,
		null,
		{
			persistent: true,
		}
	);
	createNotification(
		"This is a test notification",
		"success",
		5000,
		null,
		null,
		{
			persistent: true,
		}
	);
	createNotification(
		"This is a test notification",
		"warning",
		5000,
		null,
		null,
		{
			persistent: true,
		}
	);
	createNotification(
		"This is a test notification",
		"error",
		5000,
		null,
		null,
		{
			persistent: true,
		}
	);
	createNotification(
		"This is a test notification",
		"bank",
		5000,
		null,
		null,
		{
			persistent: true,
		}
	);

	document.addEventListener("keydown", (e) => {
		if (e.key === "F1") {
			openCustomization();
		}
	});
}

document.addEventListener("DOMContentLoaded", resetNui);

function resetNui() {
	let positionsHtml = Object.keys(Config.lang["html"]["positions"])
		.map((pos) => {
			if (pos < 1 || pos > 8) return;
			return `
				<div class="position" data-position="${pos}">
					<img src="images/${positions[pos].name}.png" />
					<h3>${Config.lang["html"]["positions"][pos]}</h3>
				</div>
			`;
		})
		.join("");

	let testButtons = Object.keys(Config.lang["html"]["test-buttons"])
		.map((btn) => {
			return `
			<button id="${btn}">${Config.lang["html"]["test-buttons"][btn]}</button>
		`;
		})
		.join("");

	$(".menu").innerHTML = `
		<h1>${Config.lang["html"]["title"]}</h1>
		<div class="positions">
			${positionsHtml}
		</div>
		<div class="buttons">
			<h3>${Config.lang["html"]["test-title"]}</h3>
			${testButtons}
		</div>
		<div class="volume">
			<h3>${Config.lang["html"]["sounds-title"]}</h3>
			<button id="togglesound">${
				soundEnabled
					? Config.lang["html"]["sound-button"]["disable"]
					: Config.lang["html"]["sound-button"]["enable"]
			}</button>
			<div class="volumeindicator">
				<input
					type="range"
					min="0"
					max="100"
					value="${soundVolume * 100}"
					id="volume" />
				<input id="volumetext" type="number" min="0" max="100" value="${
					soundVolume * 100
				}" />
			</div>
		</div>
	`;

	Notification.SetUpPosition(
		Number(window.localStorage.getItem("notificationPosition")) ||
			Config.defaultPosition
	);

	$$(".position").forEach((pos) => {
		pos.addEventListener("click", () => {
			if (!isCustomizing) return;
			Notification.SetUpPosition(Number(pos.dataset["position"]), pos);
		});
	});

	$$(".buttons button").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			if (!isCustomizing) return;
			createNotification(Config.lang["test-notification"], e.target.id);
		});
	});

	$("#volume").addEventListener("input", (e) => {
		soundVolume = e.target.value / 100;
		$("#volumetext").value = e.target.value;
		window.localStorage.setItem("notificationSoundVolume", soundVolume);
	});

	$("#volumetext").addEventListener("input", (e) => {
		if (e.target.value < 0 || e.target.value === "") e.target.value = 0;
		if (e.target.value > 100) e.target.value = 100;
		soundVolume = e.target.value / 100;
		$("#volume").value = e.target.value;
		window.localStorage.setItem("notificationSoundVolume", soundVolume);
	});

	$("#togglesound").addEventListener("click", (e) => {
		soundEnabled = !soundEnabled;
		e.target.innerText = soundEnabled
			? Config.lang["html"]["sound-button"]["disable"]
			: Config.lang["html"]["sound-button"]["enable"];
		window.localStorage.setItem("notificationSoundEnabled", soundEnabled);
	});

	window.addEventListener("contextmenu", function (e) {
		if (!isCustomizing) return;
		$(".menu").classList.remove("show");
		isCustomizing = false;
		fetch("https://skys_notifications/close");
	});

	window.addEventListener("keydown", function (e) {
		if (!isCustomizing) return;
		if (e.key === "Escape") {
			e.preventDefault();
			$(".menu").classList.remove("show");
			isCustomizing = false;
			fetch("https://skys_notifications/close");
		}
	});

	// test();
	// openCustomization();
}

window.addEventListener("message", (e) => {
	if (e.data.action === "notification") {
		createNotification(
			e.data.text,
			e.data.type,
			e.data.duration,
			e.data.title,
			e.data.icon
		);
	} else if (e.data.action === "openCustomization") {
		openCustomization();
	} else if (e.data.action === "config") {
		Config.defaultPosition = e.data.defaultPosition;
		Config.defaultDuration = e.data.defaultDuration;
		Config.lang = e.data.lang;
		resetNui();
	}
});
