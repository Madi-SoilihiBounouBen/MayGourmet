// Modal ajout membre
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() { 
  document.querySelector("form").reset();
  document.querySelector(".modal-header h2").textContent = "Ajouter un membre";
  modal.style.display = "block"; 
}

span.onclick = function() { modal.style.display = "none"; }

window.onclick = function(event) {
  if (event.target == modal) { modal.style.display = "none"; }
  if (event.target == confirmModal) { confirmModal.style.display = "none"; }
}

// Modal confirmation suppression
const confirmModal = document.getElementById("confirmModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
let idToDelete = null;

function demanderConfirmation(id) {
  idToDelete = id;
  confirmModal.style.display = "block";
}

cancelDeleteBtn.onclick = function() {
  confirmModal.style.display = "none";
  idToDelete = null;
}

confirmDeleteBtn.onclick = function() {
  if (idToDelete) {
    supprimer(idToDelete);
    confirmModal.style.display = "none";
    idToDelete = null;
  }
}

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Fonction modifier
function modifier(id, nom, prenom, mail, telephone, poste, adresse, presentation, date_recrutement) {
  // Changer le titre du modal
  document.querySelector(".modal-header h2").textContent = "Modifier un membre";

  // Pré-remplir le formulaire
  document.getElementById("nom").value = nom || "";
  document.getElementById("prenom").value = prenom || "";
  document.getElementById("mail").value = mail || "";
  document.getElementById("telephone").value = telephone || "";
  document.getElementById("poste").value = poste || "";
  document.getElementById("adresse").value = adresse || "";
  document.getElementById("presentation").value = presentation || "";
  document.getElementById("dateRecrutement").value = date_recrutement || "";

  // Ouvrir le modal
  modal.style.display = "block";

  // Gérer le submit du formulaire
  const form = document.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
    
    const data = {
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      mail: document.getElementById("mail").value,
      telephone: document.getElementById("telephone").value,
      poste: document.getElementById("poste").value,
      adresse: document.getElementById("adresse").value,
      presentation: document.getElementById("presentation").value,
      dateRecrutement: document.getElementById("dateRecrutement").value
    };

    fetch(`/api/equipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de la modification");
      }
    })
    .catch(() => showToast("Erreur lors de la modification"));
  };
}

// Fonction supprimer
function supprimer(id) {
  const routComplet = '/api/equipe/' + id;
  fetch(routComplet, { method: "DELETE" })
    .then((reponse) => {
      if (reponse.ok) {
        showToast("Suppression réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de la suppression");
      }
    })
    .catch((erreur) => {
      showToast("Erreur lors de la suppression");
      console.log(erreur);
    });
}

/* Modal modification membre
const boutonsModifierMembre = document.querySelectorAll("#boutonModifierMembre");

boutonsModifierMembre.forEach(bouton => {
  bouton.addEventListener("click", function(e) {
    e.preventDefault();
    
    const id = this.dataset.id;
    const nom = this.dataset.nom;
    const prenom = this.dataset.prenom;
    const mail = this.dataset.mail;
    const telephone = this.dataset.telephone;
    const poste = this.dataset.poste;
    const adresse = this.dataset.adresse;
    const presentation = this.dataset.presentation;
    const daterecrutement = this.dataset.daterecrutement;

    modifier(id, nom, prenom, mail, telephone, poste, adresse, presentation, daterecrutement);
  });
});*/
