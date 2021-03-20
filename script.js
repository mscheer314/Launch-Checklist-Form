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
    let form = document.querySelector("form");
    let pilotNameTextField = document.querySelector("input[name=pilotName]");
    let copilotNameTextField = document.querySelector(
        "input[name=copilotName]"
    );
    let fuelLevelTextField = document.querySelector("input[name=fuelLevel]");
    let cargoMassTextField = document.querySelector("input[name=fuelLevel]");
    confirmFormInputIsValid(
        form,
        pilotNameTextField,
        copilotNameTextField,
        cargoMassTextField,
        fuelLevelTextField,
        cargoMassTextField
    );
    confirmFormInputMeetsRequirements(
        form,
        pilotNameTextField,
        copilotNameTextField,
        cargoMassTextField,
        fuelLevelTextField,
        cargoMassTextField
    );
});

function confirmFormInputIsValid(
    form,
    pilotNameTextField,
    copilotNameTextField,
    cargoMassTextField,
    fuelLevelTextField,
    cargoMassTextField
) {
    form.addEventListener("submit", (event) => {
        if (
            pilotNameTextField.value === "" ||
            copilotNameTextField.value === "" ||
            fuelLevelTextField.value === "" ||
            cargoMassTextField.value === ""
        ) {
            alert("All fields required.");
            event.preventDefault();
        }
        if (!isNaN(pilotNameTextField.value)) {
            alert("Pilot Name must not be a number.");
            event.preventDefault();
        }
        if (!isNaN(copilotNameTextField.value)) {
            alert("Co-pilot Name must not be a number.");
            event.preventDefault();
        }
        if (isNaN(fuelLevelTextField.value)) {
            alert("Fuel Leve must be a number.");
            event.preventDefault();
        }
        if (isNaN(cargoMassTextField.value)) {
            alert("Cargo Mass must be a number.");
            event.preventDefault();
        }
    });
}

function confirmFormInputMeetsRequirements(
    form,
    pilotNameTextField,
    cargoMassTextField,
    fuelLevelTextField,
    cargoMassTextField
) {
    form.addEventListener("submit", (event) => {
        const minFuelLevel = 10000;
        const maxCargo = 10000;
        if (fuelLevelTextField.value < minFuelLevel) {
            setBadLaunchStatus("fuel", event);
        }
        if (cargoMassTextField.value > maxCargo) {
            setBadLaunchStatus("cargo", event);
        }
    });
}

function setBadLaunchStatus(badInput, event) {
   const faultyItemsDiv = document.getElementById("faultyItems");
   faultyItemsDiv.style.visibility = "visible";

   const launchStatus = document.getElementById("launchStatus");
   launchStatus.innerHTML = "Shuttle not ready for launch";
   launchStatus.style.color = "#ff0000";

   if (badInput === "fuel") {
      const fuelStatus = document.getElementById("fuelStatus");
      fuelStatus.innerHTML = "Fuel level is insufficient for the journey.";
   } else if (badInput === "cargo") {
      const cargoStatus = document.getElementById("cargoStatus");
      cargoStatus.innerHTML = "Cargo has too much mass for liftoff to occur.";
   }

   event.preventDefault();
}
