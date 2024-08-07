export interface IEvent {
    id: number;
    titre: string;
    description: string;
    date_deb: Date;
    date_fin: Date;
    location: string;
    categorie: string;
    status: string;
    transparence: string;
    nbMaj: number;
}