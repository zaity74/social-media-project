import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const iaTreatment = (snapshots) => async (dispatch) => {
    try {
        dispatch({ type: "IA_REQUEST" });

        const formData = new FormData();

        snapshots.forEach((snapshot, index) => {
            // Vérification si snapshot est bien une string en Base64
            if (typeof snapshot !== "string" || !snapshot.startsWith("data:image/jpeg;base64,")) {
                console.error("Snapshot incorrect :", snapshot);
                return;
            }

            // Convertir Base64 en Blob
            const byteCharacters = atob(snapshot.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            // Ajouter chaque image avec une clé spécifique (sans [])
            formData.append(`images`, blob, `snapshot_${index}.jpg`);
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const { data } = await api.post("/predict", formData, config);

        dispatch({
            type: "IA_SUCCESS",
            payload: data,
        });

    } catch (error) {
        console.error("Erreur Axios :", error);
        dispatch({
            type: "IA_FAIL",
            payload: error.response ? error.response.data : error.message,
        });
    }
};
