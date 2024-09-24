

export type LogRegError = {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
};

export type Category = {
    id: number;
    name: string;
    created_at: string;
    user: number;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    category: number;
    created_at: string;
    user: number;
    category_name: string;
}
export type CreateProductFormType = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: File | null;
    category: number;
}
export type CreateProductErrors = {
    name?: string[];
    description?: string[];
    price?: string[];
    quantity?: string[];
    image?: string[];
    category?: string[];
}
export type ProductWithCategory = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    is_approved: boolean;
    category: number;
    category_name: string;
    created_at: Date;
}
export type AllProductsType = {
    category: number;
    created_at: Date;
    description: string;
    id: number;
    image: string;
    is_approved: boolean;
    name: string;
    price: string;
    quantity: number;
    user: number;
    category_name: string;
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
}
export type Order = {
    created_at: Date;
    id: number;
    product: number;
    quantity: number;
    product_category_name: string;
    product_price: number;
    product_name: string;
    approved: string;
    supplier_name: string;
    supplier_email: string;
    product_image: string;
    client_name: string;
    client_email: string;

}
export type OrderTableType = {
    client_email: string;
    created_at: Date,
    id: number;
    product: number;
    product_name: string;
    product_price: number;
    quantity: number;
    client_name: string;
    approved: string;
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
    

}
export type TeacherFormEditType = {
    fullname : string;
    image: File | string;
    email : string;
    nomber_phone : number;
    specialite : string;
    

}
export type CreateTeacherErrors = {
    fullname?: string[];
    email?: string[];
    nomber_phone?: string[];
    specialite?: string[];
    image?: string[];
   
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