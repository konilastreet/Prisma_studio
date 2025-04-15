# Mini-Studio de Production Audiovisuelle avec IA

Cette application est un mini-studio de production audiovisuelle assisté par IA qui automatise différentes étapes du processus créatif. L'application utilise une interface nodale intuitive où chaque nœud représente une étape de création différente et utilise des modèles d'IA pour aider à générer du contenu.

## Concept

Le mini-studio permet de transformer une simple idée initiale en divers éléments de production concrets :
- Synopsis
- Storyboard (découpage en scènes)
- Prompts pour génération d'images
- Images générées par IA
- Suggestions de mouvements de caméra

## Fonctionnalités principales

- Interface nodale intuitive avec React Flow
- Génération de contenu assistée par IA via l'API OpenAI
- Workflow complet du développement d'idée jusqu'aux aspects visuels
- Possibilité d'éditer manuellement chaque étape de la création
- Sauvegarde et chargement de projets

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install` ou `yarn install`
3. Créez un fichier `.env.local` à la racine du projet avec votre clé API OpenAI :
   ```
   OPENAI_API_KEY=votre_clé_api_openai_ici
   ```
4. Lancez l'application en mode développement avec `npm run dev` ou `yarn dev`
5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Technologies utilisées

- Next.js
- React
- React Flow (pour l'interface nodale)
- TailwindCSS (pour le style)
- API OpenAI (GPT-4 et DALL-E)

## Architecture

L'application suit une architecture orientée composants avec:
- Une interface principale (`StudioWorkspace`) qui gère l'état global
- Des nœuds spécialisés pour chaque étape du workflow créatif
- Des endpoints API pour communiquer avec les services d'IA
- Un système de sauvegarde locale des projets

## Limitations actuelles

- L'application nécessite une clé API OpenAI valide
- La génération d'images peut être lente selon la charge des serveurs OpenAI
- La sauvegarde est uniquement locale pour le moment
- Les options d'exportation avancées ne sont pas encore implémentées

## Roadmap future

- Support pour d'autres modèles d'IA
- Exportation des projets dans différents formats
- Interface collaborative en temps réel
- Ajout de nœuds pour la génération audio et musicale
- Support pour l'animation et le montage vidéo basique
