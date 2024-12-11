

export type LogRegError = {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    phone_number?: string[];
    password?: string[];
    confirm_password?: string[];
};

export type Category = {
    id: number;
    name: string;
    created_at: string;
    user: number;
}

export type User = {
    auth_provider: string;
    date_joined: string;
    email: string;
    first_name: string;
    profile_image: string;
    id: number;
    phone_number: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_supplier: boolean;
    is_verified: boolean;
    last_name: string;
    password:string;
};


export type UserType = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    auth_provider: string;
    date_joined: Date;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_supplier: boolean;
    is_verified: boolean;
};
// biopilate
export type Teache = {
    id: number;
    fullname : string;
    description : string;
    image: string;
    email : string;
    nomber_phone : number;
    specialite : string;
    create_at: Date;
    updated_at: Date;
}
export type TeacherFormType = {
    fullname : string;
    image: File | null;
    email : string;
    nomber_phone : number;
    specialite : string;
    description : string;
    

}
export type TeacherFormEditType = {
    fullname : string;
    image: File | string;
    email : string;
    nomber_phone : number;
    specialite : string;
    description : string;
    

}
export type CreateTeacherErrors = {
    fullname?: string[];
    email?: string[];
    nomber_phone?: string[];
    specialite?: string[];
    image?: string[];
    description?:string[]
   
}
export type Tage = {
    id: number;
    title : string;
    status : string;
    create_at: Date;
    updated_at: Date;
}
export type TagesFormType = {
    title : string;
    status : string;   

}
export type CreateTagesErrors = {
    title?: string[];
    status?: string[];
    
   
}
export type Service = {
    id: number;
    title : string;
    image: string;
    description : string;
    full_text : string;
    status : string;
    instructeur : string;
    create_at: Date;
    updated_at: Date;
}
export type ServiceFormType = {
    title : string;
    image: File | null;
    description : string;
    full_text : string;
    status : string;
    instructeur : string;
    

}
export type CreateServiceErrors = {
    title?: string[];
    image?: string[];
    description?: string[];
    full_text?: string[];
    status?: string[];
    instructeur?: string[];
   
}
export type Planning = {
    id: number;
    title : string;
    duree: string;
    description : string;
    range : number;
    status : string;
    category: number; // category ID
    category_name: string; // category name
    create_at: Date;
    updated_at: Date;
}
export type PlanningFormType = {
    title : string;
    duree: string;
    description : string;
    range : number;
    status : string;
    category : string;
    

}
export type CreatePlanningErrors = {
    title?: string[];
    duree?: string[];
    description?: string[];
    status?: string[];
    range?: string[];
    category?: string[];
   
}
export type Blog = {
    id: number;
    title : string;
    author: string;
    description : string;
    favorites : number;
    status : string;
    image_1 : string;
    image_2: string;
    full_text:string;
    date:Date;
    range:number;
    view:number;
    tages: string[];
    create_at: Date;
    updated_at: Date;
}
export type BlogFormType = {
    title : string;
    author: string;
    description : string;
    status : string;
    image_1 : File | null;
    image_2: File | null;
    full_text:string;
    date: string | Date;
    range:number;
    favorites:number | null;
    tages: string[];
     

}
export type CreateBlogErrors = {
    title?: string[];
    author?: string[];
    description?: string[];
    status?: string[];
    image_1?: string[];
    image_2?: string[];
    full_text?: string[];
    date?: string[];
    range?: string[];
    favorites?: string[];
    tages?: string[];

   
}

export type FAQ = {
    id: number;
    title : string;
    description : string;
    status : string;
    range:number;
    create_at: Date;
    updated_at: Date;
}
export type FAQFormType = {
    title : string;
    description : string;
    status : string;
    range:number;
    

}
export type CreateFAQErrors = {
    title?: string[];
    description?: string[];
    status?: string[];
    range?: string[];
   
}
export type Formation = {
    id: number;
    status: 'pending' | 'approved';  // Reflect the choices from Django
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export type FormationFormType = {
    status: 'pending' | 'approved';  // Reflect the choices from Django
    title: string;
    description: string;
}

export type CreateFormationErrors = {
    status?: string[];
    title?: string[];
    description?: string[];
}

export type Option = {
    id: number;
    name: string;
    created_at: Date;  // Corrected field name
    updated_at: Date;
}

export type OptionFormType = {
    id: number;
    name: string;
}

export type CreateOptionErrors = {
    name?: string[];
}

export type FormationCategory = {
    id: number;
    formation: Formation;
    option: Option;
    price: number;
    created_at: Date;
    updated_at: Date;
}

export type FormationCategoryType = {
    formation: number;  // Formation ID
    option: number;     // Option ID
    price: number;
    created_at: Date;
    updated_at: Date;
}

export type CreateFormationCategoryErrors = {
    formation?: string[];
    option?: string[];
    price?: string[];
}

export type CategoryCours={
    id: number;
    name : string;
}

export type Cours = {
    id: number;
    title : string;
    description : string;
    status : string;
    image: string;
    category: number; // category ID
    category_cours: string; // category name
    created_at: Date;
    updated_at: Date;
}
export type CoursFormType = {
    title : string;
    description : string;
    status : string;
    image: File | null;
    category : string

}
export type CreateCoursErrors = {
    title?: string[];
    description?: string[];
    status?: string[];
    image?: string[];
    category?: string[];
   
}