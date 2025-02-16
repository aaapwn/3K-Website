export type SportEvent = {
    id: string;
    startDatetime: Date;
    endDatetime: Date;
    Sport: {
        name: string;
        category: string;
    }
    location: string;
    result: Object;
}

export type UserProfile = {
    id: string;
    qr_key: string;
    email: string;
    studentID: string;
    prefix_th: string;
    firstname_th: string;
    lastname_th: string;
    prefix_en: string;
    firstname_en: string;
    lastname_en: string;
    college: string;
    shirtNumber: number;
    sportEvents: SportEvent[];
}

export type User = {
    id: string
    email: string | null
    qr_key: string
    studentId: string
    prefix_th: string
    firstname_th: string
    lastname_th: string
    prefix_en: string
    firstname_en: string
    lastname_en: string
    shirtNumber: number
    college: string
    createdAt: string
  }
  
export type College = 'KMITL' | 'KMUTNB' | 'KMUTT' 