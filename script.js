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
        const faultyItemsDiv = document.getElementById("faultyItems");
        faultyItemsDiv.style.visibility = "visible";

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
            "input[name=fuelLevel]"
        );

        checkForInput(
            event,
            pilotNameTextField,
            copilotNameTextField,
            fuelLevelTextField,
            cargoMassTextField
        );
        confirmFuelAndCargoMeetRequirements(
            event,
            pilotNameTextField,
            copilotNameTextField,
            fuelLevelTextField,
            cargoMassTextField
        );
    });
});

function loadDestination() {
   fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then((response) => {
      response.json().then((json) => {
         console.log(json);
      })
   })
}

function checkForInput(event, pilot, copilot, fuel, cargo) {
   console.log("in checkforInput: ", pilot.value);
    if (
        pilot.value === "" ||
        copilot.value === "" ||
        fuel.value === "" ||
        cargo.value === ""
    ) {
        alert("All fields required.");
        event.preventDefault();
    }
    if (!isNaN(pilot.value)) {
        alert("Pilot Name must not be a number.");
        event.preventDefault();
    }
    if (!isNaN(copilot.value)) {
        alert("Co-pilot Name must not be a number.");
        event.preventDefault();
    }
    if (isNaN(fuel.value)) {
        alert("Fuel Leve must be a number.");
        event.preventDefault();
    }
    if (isNaN(cargo.value)) {
        alert("Cargo Mass must be a number.");
        event.preventDefault();
    }
}

function confirmFuelAndCargoMeetRequirements(event, pilot, copilot, fuel, cargo) {
    const minFuelLevel = 10000;
    const maxCargo = 10000;
    if (fuel.value < minFuelLevel) {
        setLaunchStatus("fuel", event, pilot, copilot);
    } else if (cargo.value > maxCargo) {
        setLaunchStatus("cargo", event, pilot, copilot);
    } else {
        setLaunchStatus("allGood", event, pilot, copilot);
    }
}

function setLaunchStatus(input, event, pilot, copilot) {
    const launchStatus = document.getElementById("launchStatus");

    if (!input === "allGood") {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "#ff0000";
        if (input === "fuel") {
            const fuelStatus = document.getElementById("fuelStatus");
            fuelStatus.innerHTML =
                "Fuel level is insufficient for the journey.";
        }
        if (input === "cargo") {
            const cargoStatus = document.getElementById("cargoStatus");
            cargoStatus.innerHTML =
                "Cargo has too much mass for liftoff to occur.";
        }
    } else {
        launchStatus.innerHTML = "Shuttle is ready for launch";
    }
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");

    pilotStatus.innerHTML = `${pilot.value} Ready`;
    copilotStatus.innerHTML = `${copilot.value} Ready`;

    console.log("right by preventDefault()");
    event.preventDefault();
}
