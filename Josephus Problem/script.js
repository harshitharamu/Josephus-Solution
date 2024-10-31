document.getElementById("start-btn").addEventListener("click", startSimulation);

function startSimulation() {
    const people = parseInt(document.getElementById("people").value);
    const step = parseInt(document.getElementById("step").value);

    const container = document.getElementById("circle-container");
    container.innerHTML = '';
    document.getElementById("result").textContent = '';

    let circle = [];
    for (let i = 1; i <= people; i++) {
        const person = document.createElement("div");
        person.classList.add("person");
        person.textContent = i;
        container.appendChild(person);
        circle.push(person);
    }

    const radius = 200; 
    circle.forEach((person, i) => {
        const angle = (i / people) * 2 * Math.PI;
        const x = 225 + radius * Math.cos(angle) - 25; 
        const y = 225 + radius * Math.sin(angle) - 25; 
        person.style.left = `${x}px`;
        person.style.top = `${y}px`;
    });


    let index = 0;
    let currentCircle = circle.slice();

    function eliminateNext() {
        if (currentCircle.length === 1) {
            currentCircle[0].classList.add('winner');
            document.getElementById("result").textContent = `Survivor: Person ${currentCircle[0].textContent}`;
            return;
        }

        for (let i = 0; i < step - 1; i++) {
            currentCircle.push(currentCircle.shift());
        }

        const eliminatedPerson = currentCircle.shift();
        eliminatedPerson.classList.add("eliminated");

        setTimeout(eliminateNext, 1000);
    }

    eliminateNext();
}