const $ = (query) => document.querySelector(query);
const $$ = (query) => document.querySelectorAll(query);
let isCustomizing = false;
let Config = {
	defaultPosition: 1,
	defaultDuration: 3000,
	lang: {
		["test-notification"]: "This is a test notification",
		["html"]: {
			["title"]: "Notification Positions",
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
			},
		},
	},
};

let Queue = [];

const positions = {
	1: { x: "0", y: "0", anim: "from-left from-top", name: "top-left" },
	2: { x: "37.5%", y: "0", anim: "from-top", name: "top-middle" },
	3: { x: "75%", y: "0", anim: "from-right from-top", name: "top-right" },
	4: { x: "0", y: "37.5%", anim: "from-left", name: "middle-left" },
	5: { x: "75%", y: "37.5%", anim: "from-right", name: "middle-right" },
	6: { x: "0", y: "75%", anim: "from-left from-bottom", name: "bottom-left" },
	7: { x: "37.5%", y: "75%", anim: "from-bottom", name: "bottom-middle" },
	8: {
		x: "75%",
		y: "75%",
		anim: "from-right from-bottom",
		name: "bottom-right",
	},
};

class Notification {
	constructor(text, type = "info", time = Config.defaultDuration) {
		this.msg = text;
		this.type = type;
		this.time = time;
		this.notification = document.createElement("div");
		this.inScreen = false;
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
				return "fa-circle-exclamation";
			case "error":
				return "fa-circle-xmark";
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
		this.notification.innerHTML = `
			<i class=" fa-solid ${Notification.GetApropiateIcon(this.type)}"></i>
			<p>${this.msg}</p>
		`;
		$(".notifications").appendChild(this.notification);
		this.inScreen = true;

		setTimeout(() => {
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

function createNotification(text, type, time) {
	Queue.push(new Notification(text, type, time));
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

document.addEventListener("DOMContentLoaded", () => {
	let positionsHtml = Object.keys(Config.lang["html"]["positions"])
		.map((pos) => {
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
	`;

	Notification.SetUpPosition(
		Number(window.localStorage.getItem("notificationPosition")) ||
			Config.defaultPosition
	);

	$$(".position").forEach((pos) => {
		pos.addEventListener("click", () => {
			Notification.SetUpPosition(Number(pos.dataset["position"]), pos);
		});
	});

	$$(".buttons button").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			createNotification(Config.lang["test-notification"], e.target.id);
		});
	});

	window.addEventListener("contextmenu", function (e) {
		e.preventDefault();
		if (!isCustomizing) return;
		$(".menu").classList.remove("show");
		isCustomizing = false;
		fetch("https://skys_notifications/close");
	});

	window.addEventListener("keydown", function (e) {
		e.preventDefault();
		if (!isCustomizing) return;
		if (e.key === "Escape" || e.key === "Backspace") {
			$(".menu").classList.remove("show");
			isCustomizing = false;
			fetch("https://skys_notifications/close");
		}
	});

	openCustomization();
});

window.addEventListener("message", (e) => {
	if (e.data.action === "notification") {
		createNotification(e.data.text, e.data.type, e.data.duration);
	} else if (e.data.action === "openCustomization") {
		openCustomization();
	} else if (e.data.action === "config") {
		Config.defaultPosition = e.data.defaultPosition;
		Config.defaultDuration = e.data.defaultDuration;
		Config.lang = e.data.lang;
	}
});
