// types/formation.ts

// Type for a single level in the formation
export interface FormationLevel {
    name: string;
    price: number;
  }
  
  // Type for file uploads
  export interface FormationFiles {
    image: File | null;
    pdf_document: File | null;
  }
  
  // Type for creation/form data
  export interface CreateFormation {
    title: string;
    description: string;
    levels: FormationLevel[];
    image: File | null;
    pdf_document: File | null;
    status : string;
    formation_line : string;
  }
  export interface FormationShow {
    // id: number;
    title: string;
   
    image: string;
    pdf_document: string;
    levels: FormationLevel[];
    status : string;
    formation_line : string;
  }
  // Type for API response
  export interface FormationResponse {
    id: number;
    title: string;
    description: string;
    image: string;
    pdf_document: string;
    levels: FormationLevel[];
    status : string;
    formation_line : string;
  }
  
  // Type for form state
  export interface FormationFormState {
    id: number;
    title: string;
    description: string;
    levels: FormationLevel[];
    image: string;
    pdf_document: string;
    formation_line : string;
    status : string;
    created_at: Date;
    updated_at: Date;
  }
  
  // Optional: Type for API error response
  export type CreateFormationErrors = {
    title?: string[];
    description?: string[];
    levels?: string[];
    image?: string[];
    pdf_document?: string[];
    formation_line ? : string[];
}