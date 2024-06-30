export const NB_PAGE_HEADER_BEGIN=4;

export const NB_PAGE_DROPDOWN_LEFT=2;

export const API_BACK_URL='http://127.0.0.1:8000';

export const NB_COLUMN_USERS_TABLE=3;

export const isTokenExpired = () => {
    // Récupérer la date d'expiration depuis le localStorage
    const expirationDate = sessionStorage.getItem('expiration_date');

    if (expirationDate) {
        // Convertir la date d'expiration en objet Date
        const expiration = new Date(expirationDate);

        // Obtenir l'heure actuelle
        const now = new Date();

        // Vérifier si la date d'expiration est inférieure à l'heure actuelle
        if (expiration < now) {
            return true;
        }
        return false;
    }
    return true;
}