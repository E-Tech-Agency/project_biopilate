import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateFAQErrors, FAQFormType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill

import { useNavigate } from "react-router-dom";

export default function CreateFAQFrom() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const [errors, setErrors] = useState<CreateFAQErrors>({});
  const [faq, setFaq] = useState<FAQFormType>({
    title: "",
    description: "",
    status: "",
    range: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFaq((prevFAQ) => ({
      ...prevFAQ,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", faq.title);
    formData.append("description", faq.description);
    formData.append("status", faq.status);
    formData.append("range", faq.range.toString()); // Convert number to string

    try {
      await apiCreateTeache.post("faqs/", formData);
      setFaq({
        title: "",
        description: "",
        status: "",
        range: 0,
      });
      toast.success("FAQ created");
      navigate("/FAQ-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        console.log(errorsFromDb);
        toast.error(errorsFromDb.error);
        setErrors(errorsFromDb);
      }
    }
  };

  return (
    <div className="justify-evenly items-center m-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">
                  Question <br />
                  {errors.title && (
                    <li className="text-red-500 mt-2">{errors.title}</li>
                  )}
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full"
                  value={faq.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">
                  Response <br />
                  {errors.description && (
                    <li className="text-red-500 mt-2">{errors.description}</li>
                  )}
                </Label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border rounded-md"
                  value={faq.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="range">
                  Movement <br />
                  {errors.range && (
                    <li className="text-red-500 mt-2">{errors.range}</li>
                  )}
                </Label>
                <Input
                  id="range"
                  name="range"
                  type="number"
                  className="w-full"
                  value={faq.range}
                  onChange={(e) =>
                    setFaq({ ...faq, range: Number(e.target.value) })
                  } // Convert string to number
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status">
                  Status
                  {errors.status && (
                    <span className="text-red-500 mt-2">{errors.status}</span>
                  )}
                </Label>
                <select
                  id="status"
                  name="status"
                  value={faq.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending Publication</option>
                  <option value="approved">Published</option>
                </select>
              </div>
              <br />
              <div>
                <Button type="submit" className="w-44" size={"lg"}>
                  Add
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
