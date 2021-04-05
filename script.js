// Write your JavaScript code here!
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", () => {
	loadDestination();

	let form = document.querySelector("form");

	form.addEventListener("submit", (event) => {
		document.getElementById("faultyItems").style.visibility = "visible";

		const pilotNameTextField = document.querySelector(
			"input[name=pilotName]"
		);
		const copilotNameTextField = document.querySelector(
			"input[name=copilotName]"
		);
		const fuelLevelTextField = document.querySelector(
			"input[name=fuelLevel]"
		);
		const cargoMassTextField = document.querySelector(
			"input[name=cargoMass]"
		);

		checkForInput(
			event,
			pilotNameTextField.value,
			copilotNameTextField.value,
			fuelLevelTextField.value,
			cargoMassTextField.value
		);
	});
});

function checkForInput(event, pilot, copilot, fuel, cargo) {
	if (pilot === "" || copilot === "" || fuel === "" || cargo === "") {
		alert("All fields required.");
		event.preventDefault();
	} else if (!isNaN(pilot)) {
		alert("Pilot Name must not be a number.");
		event.preventDefault();
	} else if (!isNaN(copilot)) {
		alert("Co-pilot Name must not be a number.");
		event.preventDefault();
	} else if (isNaN(fuel)) {
		alert("Fuel Level must be a number.");
		event.preventDefault();
	} else if (isNaN(cargo)) {
		alert("Cargo Mass must be a number.");
		event.preventDefault();
	} else {
		setLaunchBox(event, pilot, copilot, fuel, cargo);
	}
}

function setLaunchBox(event, pilot, copilot, fuel, cargo) {
	const minFuelLevel = 10000;
	const maxCargo = 10000;

    const launchStatus = document.getElementById("launchStatus");
    document.getElementById("pilotStatus").textContent = `${pilot} Ready`;
    document.getElementById("copilotStatus").textContent = `${copilot} Ready`;

    let fuelText = "";
    let  cargoText = "";

	if (Number(fuel) > minFuelLevel) {
		fuelText = "The fuel level is sufficient for the journey.";
    } else {
        fuelText = "Fuel level is too low for launch.";
    }
	if (Number(cargo) <  maxCargo) {
		cargoText = "Cargo mass low enough for launch."
	} else {
        cargoText = "Cargo has too much mass for liftoff to occur.";
    }
    document.getElementById("fuelStatus").textContent = fuelText;
    document.getElementById("cargoStatus").textContent = cargoText;

    if (fuelText === "The fuel level is sufficient for the journey." && cargoText === "Cargo mass low enough for launch.") {
        launchStatus.textContent = "Shuttle is ready for launch";
    } else {
        launchStatus.textContent = "Shuttle not ready for launch";
    }
    event.preventDefault();
}

function loadDestination() {
	fetch("https://handlers.education.launchcode.org/static/planets.json").then(
		(response) => {
			response.json().then((json) => {
				// select a random element of the response to set as the destination
				let destination = json[Math.floor(Math.random() * json.length)];
				console.log(destination);

				const missionTarget = document.getElementById("missionTarget");
				missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${destination.name}</li>
                  <li>Diameter: ${destination.diameter}</li>
                  <li>Star: ${destination.star}</li>
                  <li>Distance from Earth: ${destination.distance}</li>
                  <li>Number of Moons: ${destination.moons}</li>
               </ol>
               <img src="${destination.image}">
                `;
			});
		}
	);
}
