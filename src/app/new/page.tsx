import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/db";

async function createTodo(data : FormData){
  "use server"
  console.log(data);
  const title1 = data.get("title_name")?.valueOf();
  if(typeof title1 !== "string" || title1.length===0){
    throw new Error ("Invalid title");
  }
  await prisma.todo.create({data : {title: title1, complete: false}});
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input type="text" name="title_name" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" autoFocus />
        <div className=" mt-2 flex gap-1 justify-end">
          <Link href="./" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 foucs-within:bg-slate-700 outline-none">Cancel</Link>
          <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 foucs-within:bg-slate-700 outline-none">Create</button>
        </div>
      </form>
    </>
  )
}