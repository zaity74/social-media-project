# Y
# 📌 Projet Social Media avec Node.js, React & Redux

Bienvenue dans ce projet de réseau social développé avec **Node.js, Express, MongoDB, React et Redux**. Ce projet permet aux utilisateurs de créer des publications (posts), d'ajouter des images, des hashtags, d'interagir avec d'autres utilisateurs (likes, commentaires), et bien plus encore.

---

## 🚀 Fonctionnalités principales

- **Création et suppression de posts** ✅
- **Ajout d'images et hashtags aux posts** 🏷️
- **Affichage dynamique des posts sans rechargement** 🔄
- **Système de commentaires et de likes** 💬❤️
- **Profil utilisateur avec comptage dynamique des posts** 👤
- **Filtrage des posts par hashtags** #️⃣
- **Mode sombre et clair** 🌙☀️
- **Stockage MongoDB avec Mongoose** 🗄️

---

## 🛠️ Installation et configuration

### 1️⃣ **Cloner le projet**
```sh
# Cloner le projet depuis GitHub
git clone https://github.com/ton-repo.git

# Aller dans le dossier du projet
cd ton-projet
```

### 2️⃣ **Installer les dépendances**
#### 🔹 Backend (Node.js / Express)
```sh
cd backend  # Aller dans le dossier backend
npm install  # Installer les dépendances
```

#### 🔹 Frontend (React / Redux)
```sh
cd frontend  # Aller dans le dossier frontend
npm install  # Installer les dépendances
```

### 3️⃣ **Configurer les variables d'environnement**
Crée un fichier **`.env`** dans le dossier **backend/** avec les paramètres suivants :
```env
PORT=8081
MONGO_URI=mongodb://localhost:27017/ton_projet
JWT_SECRET=ton_secret_jwt
```

---

## ▶️ Démarrer le projet

### **Démarrer le serveur backend**
```sh
cd backend
npm start
```
Le backend tournera sur `http://127.0.0.1:8081`

### **Démarrer le frontend**
```sh
cd frontend
npm start
```
Le frontend sera disponible sur `http://localhost:5173/`

---

## 📂 Architecture du projet

```
📦 Structure du projet front
 ┃
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components  # Composants UI réutilisables
 ┃ ┃ ┣ 📂 pages       # Pages principales (Home, Profil...)
 ┃ ┃ ┣ 📂 redux       # Actions et reducers Redux
 ┃ ┃ ┣ App.js        # Point d'entrée React
 ┃ ┣ .env           # Variables d'environnement frontend
 ┃ ┗ package.json   # Dépendances frontend
```

---

## 📌 API Routes Backend

### 🔹 **Posts**
| Méthode  | Route                     | Description                  |
|----------|---------------------------|------------------------------|
| `GET`    | `/posts`                   | Récupérer tous les posts      |
| `GET`    | `/posts/:id`               | Récupérer un post par ID     |
| `POST`   | `/posts`                   | Créer un nouveau post        |
| `DELETE` | `/posts/:id`               | Supprimer un post            |

### 🔹 **Utilisateurs**
| Méthode  | Route                     | Description                  |
|----------|---------------------------|------------------------------|
| `POST`   | `/users/register`          | Inscription utilisateur      |
| `POST`   | `/users/login`             | Connexion utilisateur        |
| `GET`    | `/users/:id`               | Récupérer un utilisateur     |

---

## 📦 Technologies utilisées

### **Backend :**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT) pour l'authentification

### **Frontend :**
- React.js + Redux
- Material-UI (MUI) pour le design
- Axios pour les requêtes API

---

## 🛠 Commandes utiles

### 🔹 **Backend**
```sh
npm run dev   # Démarrer le serveur avec Nodemon
npm start     # Démarrer le serveur en mode production
```

### 🔹 **Frontend**
```sh
npm start     # Lancer le projet React
npm run build # Générer une version optimisée pour la production
```

### 🔹 **Base de données MongoDB**
```sh
mongod      # Démarrer le serveur MongoDB
mongo       # Ouvrir la console MongoDB
```

---

## ✅ Contributions
Si tu veux contribuer :
1. Fork le projet 🍴
2. Crée une branche (`git checkout -b feature-nouvelle-feature`)
3. Commit tes modifications (`git commit -m "Ajout de la fonctionnalité"`)
4. Push (`git push origin feature-nouvelle-feature`)
5. Crée une Pull Request ✅


