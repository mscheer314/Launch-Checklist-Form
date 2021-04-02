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
            "input[name=cargoMass]"
        );

        checkForInput(
            event,
            pilotNameTextField.value,
            copilotNameTextField.value,
            fuelLevelTextField.value,
            cargoMassTextField.value
        );
        confirmFuelAndCargoMeetRequirements(
            event,
            pilotNameTextField.value,
            copilotNameTextField.value,
            fuelLevelTextField.value,
            cargoMassTextField.value
        );
    });
});

function loadDestination() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(
        (response) => {
            response.json().then((json) => {
                // select a random element of the response to set as the destination
                let destination =
                    json[Math.floor(Math.random() * json.length)];
                    console.log(destination);

                const missionTarget = document.getElementById("missionTarget");
                missionTarget.innerHTML = 
                `
                <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${destination.name}</li>
                  <li>Diameter: ${destination.diameter}</li>
                  <li>Star: ${destination.star}</li>
                  <li>Distance from Earth: ${destination.distance}</li>
                  <li>Number of Moons: ${destination.moons}</li>
               </ol>
               <img src="${destination.image}">
                `
            });
        }
    );
}

function checkForInput(event, pilot, copilot, fuel, cargo) {
    if (
        pilot === "" ||
        copilot === "" ||
        fuel === "" ||
        cargo === ""
    ) {
        resetLaunchMessage();
        alert("All fields required.");
        event.preventDefault();
    }
    if (!isNaN(pilot)) {
        resetLaunchMessage();
        alert("Pilot Name must not be a number.");
        event.preventDefault();
    }
    if (!isNaN(copilot)) {
        resetLaunchMessage();
        alert("Co-pilot Name must not be a number.");
        event.preventDefault();
    }
    if (isNaN(fuel)) {
        resetLaunchMessage();
        alert("Fuel Level must be a number.");
        event.preventDefault();
    }
    if (isNaN(cargo)) {
        
        alert("Cargo Mass must be a number.");
        event.preventDefault();
        resetLaunchMessage();
    }
}

function confirmFuelAndCargoMeetRequirements(
    event,
    pilot,
    copilot,
    fuel,
    cargo
) {
    console.log("cargo: ", cargo);
    console.log("fuel: ", fuel);
    const minFuelLevel = 10000;
    const maxCargo = 10000;
    if (Number(fuel) < minFuelLevel) {
        console.log("in setLaunchStatus for fuel");
        setLaunchStatus("fuel", event, pilot, copilot);
    } else if (Number(cargo) > maxCargo) {
        console.log("in setLaunchStatus for cargo");
        setLaunchStatus("cargo", event, pilot, copilot);
    } else {
        setLaunchStatus("allGood", event, pilot, copilot);
    }
}

function resetLaunchMessage() {
    const launchStatus = document.getElementById("launchStatus");
    launchStatus.innerHTML = "Awaiting Information Before Launch";
    const fuelStatus = document.getElementById("fuelStatus");
    fuelStatus.innerHTML = "";
    const cargoStatus = document.getElementById("cargoStatus");
    cargoStatus.innerHTML = "";
}

function setLaunchStatus(input, event, pilot, copilot) {
    const launchStatus = document.getElementById("launchStatus");

    console.log("input: ", input)
    if (input !== "allGood") {
        console.log("in notAllGood");
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

    pilotStatus.innerHTML = `${pilot} Ready`;
    copilotStatus.innerHTML = `${copilot} Ready`;

    event.preventDefault();
}
