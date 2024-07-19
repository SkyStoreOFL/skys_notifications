const $ = (query) => document.querySelector(query);
const $$ = (query) => document.querySelectorAll(query);

let Queue = [];

const positions = {
	1: { x: "0", y: "0", anim: "from-left from-top" },
	2: { x: "37.5%", y: "0", anim: "from-top" },
	3: { x: "75%", y: "0", anim: "from-right from-top" },
	4: { x: "0", y: "37.5%", anim: "from-left" },
	5: { x: "75%", y: "37.5%", anim: "from-right" },
	6: { x: "0", y: "75%", anim: "from-left from-bottom" },
	7: { x: "37.5%", y: "75%", anim: "from-bottom" },
	8: { x: "75%", y: "75%", anim: "from-right from-bottom" },
};

class Notification {
	constructor(text, type = "info", time = 3000) {
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
		}, 3000);
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

function testNotify(type = "info") {
	createNotification("This is an info notification", type, 2000);
}

function openCustomization() {
	$(".menu").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
	Notification.SetUpPosition(
		Number(window.localStorage.getItem("notificationPosition")) || 1
	);

	$$(".position").forEach((pos) => {
		pos.addEventListener("click", () => {
			Notification.SetUpPosition(Number(pos.dataset["position"]), pos);
		});
	});

	$$(".buttons button").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			createNotification("Esto es una prueba", e.target.id);
		});
	});
});
