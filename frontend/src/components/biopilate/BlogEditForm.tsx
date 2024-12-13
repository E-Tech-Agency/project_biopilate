import { useState } from "react";
import { Blog } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";

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

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4">Modifier Blog</h1>
      <div className="mb-4">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="author">Auteur</Label>
        <Input
          id="author"
          name="author"
          type="text"
          value={author}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          type="text"
          value={description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="pending">En attente de publication</option>
          <option value="approved">Publiée</option>
        </select>
      </div>
      <div className="mb-4">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={typeof date === "string" ? date : date.toISOString().split("T")[0]}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="image1">Image 1</Label>
        <Input
          id="image1"
          name="image1"
          type="file"
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
        {blog.image_1 && <img src={blog.image_1} alt={blog.title} className="w-16 h-16 rounded-full mt-2" />}
      </div>
      <div className="mb-4">
        <Label htmlFor="image2">Image 2</Label>
        <Input
          id="image2"
          name="image2"
          type="file"
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
        {blog.image_2 && <img src={blog.image_2} alt={blog.title} className="w-16 h-16 rounded-full mt-2" />}
      </div>
      <div className="mb-4">
        <Label htmlFor="full_text">Texte Complet</Label>
        <ReactQuill
          id="full_text"
          value={fullText}
          onChange={handleQuillChange}
          className="w-full"
          theme="snow"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default BlogEditForm;
