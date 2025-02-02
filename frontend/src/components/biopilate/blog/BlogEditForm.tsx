import { useState } from "react";
import { Blog } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
interface BlogEditFormProps {
  blog: Blog;
  onUpdate: (data: FormData, id: number) => void;
}

const BlogEditForm: React.FC<BlogEditFormProps> = ({ blog, onUpdate }) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [status, setStatus] = useState(blog.status);
  const [fullText, setFullText] = useState(blog.full_text);
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [author, setAuthor] = useState(blog.author);
  const [date, setDate] = useState<string | Date>(blog.date);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "date":
        setDate(value);
        break;
      default:
        break;
    }
  };

  const handleQuillChange = (value: string) => {
    setFullText(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "image1") {
        setImage1(files[0]);
      } else if (name === "image2") {
        setImage2(files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("full_text", fullText);
    formData.append("author", author);
    formData.append("date", typeof date === "string" ? date : date.toISOString());

    if (image1) {
      formData.append("image_1", image1);
    }
    if (image2) {
      formData.append("image_2", image2);
    }

    onUpdate(formData, blog.id);
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/blog-biopilates");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border-b pb-6">
          <h1 className="text-2xl font-bold mb-6">Modifier Blog</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Titre</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">Auteur</Label>
              <Input
                id="author"
                name="author"
                value={author}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="pending">En attente de publication</option>
                <option value="approved">Publiée</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={typeof date === "string" ? date : date.toISOString().split("T")[0]}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-b py-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="image1" className="text-sm font-medium">Image 1</Label>
              <div className="border rounded-lg p-4">
                <Input
                  id="image1"
                  name="image1"
                  type="file"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {blog.image_1 && (
                  <img 
                    src={blog.image_1} 
                    alt="Preview 1" 
                    className="mt-2 h-32 w-full object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image2" className="text-sm font-medium">Image 2</Label>
              <div className="border rounded-lg p-4">
                <Input
                  id="image2"
                  name="image2"
                  type="file"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {blog.image_2 && (
                  <img 
                    src={blog.image_2} 
                    alt="Preview 2" 
                    className="mt-2 h-32 w-full object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_text" className="text-sm font-medium">Contenu</Label>
          <div className="border rounded-lg">
            <ReactQuill
              id="full_text"
              value={fullText}
              onChange={handleQuillChange}
              theme="snow"
              className="h-64"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            className="px-6"
            onClick={handleCancel}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"

          >
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditForm;