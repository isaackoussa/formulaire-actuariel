# Formulaire Actuariel & Financier — avec barrière email et notifications quotidiennes

145 formules de finance, actuariat (vie et non-vie/assurance), Bâle, statistiques/économétrie, séries temporelles, valeurs extrêmes, portefeuille/risques financiers et prévision actuarielle. Chaque formule est rendue proprement (KaTeX), avec conditions d'application et exemple chiffré. Inclut un mode Quiz (flashcards).

Cette version ajoute :
1. Un écran demandant l'email du visiteur avant d'accéder au formulaire (barrière simple, sans vérification d'authenticité).
2. Un bouton pour recevoir une vraie notification push chaque jour à 18h (heure d'Abidjan = UTC) avec la formule du jour, même quand le site n'est pas ouvert.

⚠️ Utilise des fonctions serveur — déploiement via GitHub connecté à Netlify, pas de glisser-déposer simple.

## Étape 1 — Déployer via GitHub

```bash
git init
git add .
git commit -m "Premier envoi"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/formulaire-actuariel.git
git push -u origin main
```

Puis sur https://app.netlify.com : **Add new project → Import an existing project → GitHub** → choisis le dépôt. Netlify détecte `netlify.toml` automatiquement.

## Étape 2 — Variables d'environnement

Dans **Project configuration → Environment variables**, ajoute ces 4 variables :

| Nom | Valeur |
|---|---|
| `NETLIFY_SITE_ID` | Project ID de ton site (dans Project details) |
| `NETLIFY_AUTH_TOKEN` | Ton jeton d'accès personnel (réutilisable de tes autres projets) |
| `VAPID_PUBLIC_KEY` | `BKtb-y77wWWZjB96m19eI8rLYK7vd9sO2njm8I1KKAztmQfB1LqAOoe6_Fcd1VbLEScUL3ZOTcdE4d2HuHOCbGI` |
| `VAPID_PRIVATE_KEY` | `JbHr1NOHhTYOgzJt1u2HGyfD19AbD-BbyvILD1_9cs4` |

Puis **Deploys → Trigger deploy → Deploy site**.

## Comment ça marche

1. Un visiteur tape son email → accès débloqué et mémorisé sur son appareil.
2. Il clique sur "🔔 Recevoir la formule du jour à 18h" → autorise les notifications.
3. Chaque jour à 18h (UTC), la fonction planifiée envoie automatiquement la formule du jour à tous les abonnés.
4. Un clic sur la notification ouvre le site.

## Limites à connaître

- **iPhone/Safari** : les notifications ne fonctionnent que si le site a été "Ajouté à l'écran d'accueil".
- **Android/Chrome/Desktop** : fonctionne directement.
- La barrière email n'est pas une vraie authentification.
