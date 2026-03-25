/*/ scripte.js - Gestion des clics sur les boutons modifier
document.addEventListener("DOMContentLoaded", function() {
  const boutonsModifier = document.querySelectorAll(".btn-modifier");
  
  boutonsModifier.forEach(bouton => {
    bouton.addEventListener("click", function() {
      const id = this.dataset.id;
      
      // Récupérer les données du serveur
      fetch(`/api/equipe/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const m = data.membre;
          modifier(id, m.nom, m.prenom, m.mail, m.telephone, m.poste, m.adress_postale, m.presentation, m.date_recrutement);
        } else {
          showToast("Erreur lors du chargement");
        }
      })
      .catch(() => showToast("Erreur lors du chargement"));
    });
  });
});*/