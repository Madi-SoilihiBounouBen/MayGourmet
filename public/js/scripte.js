function supprimer(id) {
    const routComplet = '/api/equipe/' + id;
    fetch(routComplet, { method: "DELETE" })
        .then((reponse) => {
            if (reponse.redirected) {
                // Redirection classique
                window.location.href = reponse.url;
            } else if (reponse.ok) {
                showToast("Suppression réussie !");
                setTimeout(() => window.location.reload(), 1200);
            } else {
                showToast("Erreur lors de la suppression");
            }
        })
        .catch((erreur) => {
            showToast("Erreur lors de la suppression");
            console.log(erreur);
        });
}