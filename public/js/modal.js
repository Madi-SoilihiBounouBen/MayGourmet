// Modal ajout membre
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.querySelector("form");
const btnEnregistrer = document.getElementById("btnEnregistrer");

let isModifying = false;
let modifyingId = null;

btn.onclick = function() { 
  isModifying = false;
  modifyingId = null;
  form.reset();
  document.querySelector("#myModal .modal-header h2").textContent = "Ajouter un membre";
  modal.style.display = "block"; 
}

span.onclick = function() { 
  modal.style.display = "none"; 
}

window.onclick = function(event) {
  if (event.target == modal) { 
    modal.style.display = "none"; 
  }
  if (event.target == confirmModal) { 
    confirmModal.style.display = "none"; 
  }
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
  setTimeout(function(){ 
    toast.className = toast.className.replace("show", ""); 
  }, 3000);
}

// Fonction modifier
function modifier(id) {
  isModifying = true;
  modifyingId = id;
  
  document.querySelector("#myModal .modal-header h2").textContent = "Modifier un membre";

  fetch(`/api/equipe/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      const m = data.membre;
      document.getElementById("nom").value = m.nom || "";
      document.getElementById("prenom").value = m.prenom || "";
      document.getElementById("mail").value = m.mail || "";
      document.getElementById("telephone").value = m.telephone || "";
      document.getElementById("poste").value = m.poste || "";
      document.getElementById("adresse").value = m.adress_postale || "";
      document.getElementById("presentation").value = m.presentation || "";
      document.getElementById("dateRecrutement").value = m.date_recrutement || "";
    }
  });

  modal.style.display = "block";
}

// Gérer le submit du formulaire (ajout ou modification)
btnEnregistrer.onclick = function(e) {
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

  if (isModifying) {
    // Mode modification
    fetch(`/api/equipe/${modifyingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(reponse => {
      if (reponse.success) {
        showToast("Modification réussie !");
        modal.style.display = "none";
        setTimeout(() => location.reload(), 1200);
        
        isModifying = false;
        modifyingId = null;
      } else {
        showToast("Erreur lors de la modification");
      }
    })
    .catch(() => showToast("Erreur lors de la modification"));
  } else {
    // Mode ajout
    fetch("/api/equipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(reponse => {
      if (reponse.success) {
        showToast("Membre ajouté avec succès !");
        modal.style.display = "none";
        form.reset();
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de l'ajout");
      }
    })
    .catch(() => showToast("Erreur lors de l'ajout"));
  }
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
      console.error(erreur);
    });
}

// Gestion des boutons modifier
document.addEventListener("DOMContentLoaded", function() {
  const boutonsModifier = document.querySelectorAll(".btn-modifier");
  
  boutonsModifier.forEach(bouton => {
    bouton.addEventListener("click", function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      modifier(id);
    });
  });
});