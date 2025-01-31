import * as z from "zod";
import { CategorySchema } from "../../../schemas/CategorySchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CategoryService from "../../../services/CategoryService";
import axios from "axios";
import { ICategory } from "../../../types/Category";

interface CategoryFormProps {
  onSave: (newCategory: ICategory) => void;
  category?: ICategory;
}

export const CategoryForm = ({ onSave, category }: CategoryFormProps) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category_name: category?.category_name,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof CategorySchema>> = async (
    formData
  ) => {
    const validatedFields = CategorySchema.safeParse(formData);

    if (!validatedFields.success) setError("Neteisingi formos laukai");

    try {
      if (category?.category_name) {
        //redaguojam
        console.log("redaguojam");
      } else {
        // pridedam nauja
        const res = await CategoryService.addCategory(formData.category_name);
        const response = {
          id: res.data.id,
          category_name: res.data.category_name,
          menus_count: "0",
        };
        reset();
        onSave(response);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
        return;
      }

      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {errors.category_name ? (
        <span className="text-xs text-rose-500">
          {errors.category_name.message}
        </span>
      ) : error ? (
        <span className="text-xs text-rose-500">{error}</span>
      ) : (
        <span className="text-xs text-emerald-500">
          Kategorijos pavadinimas gali būti sudarytas iš skaičių, raidžių, tarpų
          ir brūkšnio
        </span>
      )}
      <fieldset className="border border-slate-300 p-1 rounded-lg flex gap-2">
        <input
          className="form-input"
          type="text"
          autoComplete="on"
          placeholder="Kategorijos pavadinimas"
          {...register("category_name")}
        />
        <button className="min-w-[200px] border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300">
          {category?.category_name
            ? "Atnaujinti kategoriją"
            : "+ Pridėti kategoriją"}
        </button>
      </fieldset>
    </form>
  );
};
