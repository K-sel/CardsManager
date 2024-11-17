"use strict";

const participants = [
  { name: "Alice Anderson", age: 24, role: "Employee" },
  { name: "Brian Brown", age: 35, role: "Volunteer" },
  { name: "Cynthia Carter", age: 28, role: "Audience" },
  { name: "David Davis", age: 45, role: "Employee" },
  { name: "Emily Evans", age: 32, role: "Volunteer" },
  { name: "Franklin Fisher", age: 38, role: "Audience" },
  { name: "Grace Green", age: 22, role: "Employee" },
  { name: "Henry Harris", age: 29, role: "Volunteer" },
  { name: "Isabella Ingram", age: 31, role: "Audience" },
  { name: "John Johnson", age: 42, role: "Employee" },
  { name: "Karen King", age: 27, role: "Volunteer" },
  { name: "Liam Lee", age: 36, role: "Audience" },
  { name: "Mia Miller", age: 21, role: "Employee" },
  { name: "Noah Nelson", age: 46, role: "Volunteer" },
  { name: "Olivia Owens", age: 19, role: "Audience" },
  { name: "Peter Parker", age: 34, role: "Employee" },
  { name: "Quincy Quinn", age: 30, role: "Volunteer" },
  { name: "Rachel Robinson", age: 26, role: "Audience" },
  { name: "Steven Smith", age: 41, role: "Employee" },
  { name: "Tracy Turner", age: 23, role: "Volunteer" },
  { name: "Ursula Underwood", age: 39, role: "Audience" },
  { name: "Victor Vance", age: 37, role: "Employee" },
  { name: "Wendy Watson", age: 25, role: "Volunteer" },
  { name: "Xavier Xanders", age: 33, role: "Audience" },
  { name: "Yvonne Young", age: 40, role: "Employee" },
  { name: "Zachary Zane", age: 44, role: "Volunteer" },
];

const createCards = (name, age, role) => {
  let html = `<div class="card" data-role="${role}">
      <div class="card--delete"></div>
      <p class="card--role">${role}</p>
      <p class="card--name">${name}</p>
      <p class="card--age">${age} years old</p>
     </div>`;
  document.querySelector("main").insertAdjacentHTML("afterbegin", html);
  setSummary();
};

const checkInputs = (name, age) => {
  let ageIsOk = age && age > 0 ? true : false;
  let nameIsOk = name ? true : false;

  if (!ageIsOk) {
    document.getElementsByName("age")[0].classList.add("error");
  }

  if (!nameIsOk) {
    document.getElementsByName("name")[0].classList.add("error");
  }

  return ageIsOk && nameIsOk;
};

const setSummary = () => {
  let displayedCards = [...document.querySelectorAll("p.card--age")];

  

  let ageAverage = Math.trunc(
    displayedCards.reduce(
      (total, e) => (total += +e.innerHTML.slice(0, 2)),
      0
    ) / displayedCards.length
  );

  document.querySelector("p.summary--average").textContent = `Age average : ${ageAverage}`;
  document.querySelector("p.summary--participants").textContent = `Participants : ${displayedCards.length}`;
};


document.querySelector("main").replaceChildren();
participants
  .filter((el) => el.age < 35)
  .forEach((el) => createCards(el.name, el.age, el.role));

//Soumission de nouveaux candidat
document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();

  //stockage dans les variables pour que soit plus lisible
  let inputName = document.getElementsByName("name")[0].value;
  let inputAge = document.getElementsByName("age")[0].value;
  let inputRole = document.getElementsByName("role")[0].value;

  //création de carte si les inputs sont corrects
  if (checkInputs(inputName, inputAge)) {
    createCards(inputName, +inputAge, inputRole);

    participants.push({
      name: inputName,
      age: +inputAge,
      role: inputRole,
    });

    document.getElementsByName("name")[0].classList.remove("error");
    document.getElementsByName("age")[0].classList.remove("error");
  }
});

//Supprimer les cartes
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("card--delete")) {
    e.target.parentElement.remove();
    setSummary();
  }
});
