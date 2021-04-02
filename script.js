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
    // combine into else ifs
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
    else if (!isNaN(pilot)) {
        resetLaunchMessage();
        alert("Pilot Name must not be a number.");
        event.preventDefault();
    }
    else if (!isNaN(copilot)) {
        resetLaunchMessage();
        alert("Co-pilot Name must not be a number.");
        event.preventDefault();
    }
    else if (isNaN(fuel)) {
        resetLaunchMessage();
        alert("Fuel Level must be a number.");
        event.preventDefault();
    }
    else if (isNaN(cargo)) {
        resetLaunchMessage();
        alert("Cargo Mass must be a number.");
        event.preventDefault();
    } else {
        confirmFuelAndCargoMeetRequirements(
            event,
            pilot,
            copilot,
            fuel,
            cargo
        );
    }
    
}

function confirmFuelAndCargoMeetRequirements(
    event,
    pilot,
    copilot,
    fuel,
    cargo
) {
    const minFuelLevel = 10000;
    const maxCargo = 10000;
    if (Number(fuel) < minFuelLevel) {
        setLaunchStatus("fuel", event, pilot, copilot);
    } else if (Number(cargo) > maxCargo) {
        setLaunchStatus("cargo", event, pilot, copilot);
    } else {
        setLaunchStatus("allGood", event, pilot, copilot);
    }
}

function resetLaunchMessage() {
    console.log("before call",launchStatus.innerHTML);
     document.getElementById("launchStatus").textContent = "Awaiting Information Before Launch";

    document.getElementById("faultyItems").style.visibility = 'hidden';
    console.log("after call",launchStatus.textContent);
}

function setLaunchStatus(input, event, pilot, copilot) {
    const launchStatus = document.getElementById("launchStatus");

    console.log("input: ", input)
    if (input !== "allGood") {
        console.log("in notAllGood");
        launchStatus.textContent = "Shuttle not ready for launch";
        launchStatus.style.color = "#ff0000";
        if (input === "fuel") {
            document.getElementById("fuelStatus").textContent =
                "Fuel level is insufficient for the journey.";
        }
        if (input === "cargo") {
            document.getElementById("cargoStatus").textContent =
                "Cargo has too much mass for liftoff to occur.";
        }
    } else {
        launchStatus.textContent = "Shuttle is ready for launch";
    }
    document.getElementById("pilotStatus").textContent = `${pilot} Ready`;
    document.getElementById("copilotStatus").textContent = `${copilot} Ready`;

    event.preventDefault();
}