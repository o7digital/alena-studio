# Instructions pour Codex — Alena Studio

## Objectif

Intégrer le mockup premium **Alena Studio** fourni dans ce projet afin de créer le futur site e-commerce de la cliente, basée à San Diego et spécialisée dans les sacs artisanaux en cuir et crochet.

Le résultat actuel sert de direction artistique validée. Il faut préserver son rendu « quiet luxury » californien : ivoire minéral, espresso, cognac, typographie éditoriale, grands espaces, lumière chaude et animations discrètes.

## Contexte technique

- La référence visuelle et fonctionnelle est dans `app/page.tsx` et `app/globals.css`.
- Les métadonnées sont dans `app/layout.tsx`.
- Les visuels de démonstration sont dans `public/images/`.
- Le mockup est responsive et contient déjà : navigation, menu mobile, sections collection/histoire/fabrication, ajout rapide au panier, compteur panier et newsletter.
- Les noms de produits, les prix, les textes commerciaux et les images actuels sont provisoires.

## Travail demandé

1. Commencer par inspecter le dépôt existant et ses éventuelles instructions `AGENTS.md`.
2. Conserver fidèlement la direction artistique, la hiérarchie visuelle, les espacements, les couleurs, les animations et le comportement mobile du mockup.
3. Si ce code doit être intégré dans un autre dépôt, respecter son framework et son architecture au lieu de remplacer inutilement sa structure.
4. Remplacer progressivement les contenus fictifs par les éléments réels fournis par le client : logo, catalogue, descriptions, prix, variantes, stock, photos, conditions de livraison et coordonnées.
5. Isoler les données produits dans une structure réutilisable ou connecter le CMS / back-office e-commerce déjà choisi. Ne pas disperser les produits en dur dans plusieurs composants.
6. Transformer le panier de démonstration en véritable parcours e-commerce seulement lorsque la plateforme de paiement et le back-office auront été confirmés.
7. Conserver une expérience parfaite sur mobile, tablette et ordinateur. Tester notamment les largeurs 390 px, 768 px, 1440 px et 1920 px.
8. Optimiser les images sans perte visuelle excessive, éviter les décalages de mise en page et maintenir de bonnes performances.
9. Ajouter les balises SEO, données structurées Product/Organization, textes alternatifs pertinents, navigation clavier et états de focus accessibles.
10. Ne pas inventer d’informations commerciales définitives. Tout élément non fourni doit rester clairement identifié comme contenu de démonstration.

## Contraintes importantes

- Ne pas transformer le design en template e-commerce générique.
- Ne pas ajouter de couleurs vives, dégradés artificiels, grosses cartes arrondies ou effets « dashboard ».
- Ne pas remplacer les typographies éditoriales par une apparence technologique.
- Ne pas supprimer les détails premium : micro-typographie, contrastes ivoire/espresso, composition asymétrique, ombres naturelles et respirations généreuses.
- Ne pas publier, connecter un domaine, modifier un environnement de production ou configurer un paiement sans validation explicite.
- Préserver les fonctionnalités déjà opérationnelles et éviter les régressions.

## Validation attendue

Le travail est terminé lorsque :

- le rendu correspond visuellement au mockup de référence ;
- toutes les sections sont responsive et accessibles ;
- le menu mobile, les liens, le panier et le formulaire fonctionnent sans erreur ;
- le projet passe les commandes de build, lint et tests disponibles ;
- Codex a vérifié le résultat dans une preview réelle sur ordinateur et mobile ;
- un résumé final indique les fichiers modifiés, les tests réalisés et les contenus réels encore nécessaires.

Avant toute modification importante de l’architecture ou du design, expliquer brièvement la raison et conserver la version visuelle validée comme référence.
