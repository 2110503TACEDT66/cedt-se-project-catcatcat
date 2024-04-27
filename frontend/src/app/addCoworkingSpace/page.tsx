import CwsSchema from "@/db/models/CoworkingSpace";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import authOptions from '@/libs/auth/authOptions';

export default async function AddCoworkingSpace() {

    const session = await getServerSession(authOptions)

    const addCws = async (addCwsForm:FormData) => {
        'use server'
        const name = addCwsForm.get("name")
        const address = addCwsForm.get("address")
        const district = addCwsForm.get("district")
        const province = addCwsForm.get("province")
        const image = addCwsForm.get("image")
        const tel = addCwsForm.get("tel")
        const opentime = addCwsForm.get("opentime")
        const closetime = addCwsForm.get("closetime")
    
        try {
          await dbConnect()
          const cws = await CwsSchema.create({
            "name": name,
            "address": address,
            "district": district,
            "province": province,
            "image": image,
            "tel": tel,
            "opentime": opentime,
            "closetime": closetime
          })
          await cws.save()
        } catch (error) {
          console.log(error)
        }
        revalidateTag("cwSpaces")
        redirect("/coworkingspace")
      }

      return (
        session?.user.role === 'admin'?
        <main className="p-5 bg-amber-50">
            <div className="text-3xl font-bold font-serif text-center mt-5">Create A New Co-working Space</div>

            <form action={addCws} className="flex flex-col items-center justify-center my-10 mx-1">
                <div className="bg-sky-100 p-10 rounded-lg justify-center flex flex-col w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 space-y-5" >
                    <div className="flex flex-col space-y-5">
                        <TextField variant="outlined" label="Name of Co-working Space" type="text" required id="name" name="name" placeholder="Please enter co-working space name" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-slate-700" />
                        <TextField variant="outlined" type="text" label="Address of Co-working Space" required id="address" name="address" placeholder="Please enter address" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-slate-700" />
                    </div>
                    <div className="w-full flex flex-row space-x-5">
                        <TextField variant="outlined" type="text" label="District" required id="district" name="district" placeholder="Please enter district" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-slate-700 w-full" />
                        <TextField variant="outlined" type="text" label="Province" required id="province" name="province" placeholder="Please enter province" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-slate-700 w-full" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <TextField variant="outlined" type="text" label="Co-working Space Image" required id="image" name="image" placeholder="Please enter image URL" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-slate-700" />
                        <TextField variant="outlined" type="text" label="Telephone Number" required id="tel" name="tel" placeholder="Please enter telephone number" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-slate-700" />
                    </div>
                    <div className="w-full flex flex-row space-x-5">
                        <TextField variant="outlined" label="Opening Time" type="text" required id="opentime" name="opentime" placeholder="00:00" className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400 w-full" inputProps={{ pattern:"([01]?[0-9]|2[0-3]):[0-5][0-9]"}}/>
                        <TextField variant="outlined" label="Closing Time" type="text" required id="closetime" name="closetime" placeholder="00:00" className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400 w-full" inputProps={{ pattern:"([01]?[0-9]|2[0-3]):[0-5][0-9]"}}/>
                    </div>
                </div>
                <button type="submit" className="mt-8 bg-sky-500 hover:bg-slate-700 text-white p-3 pl-5 pr-5 rounded-full">Add Co-working Space</button>
            </form>
        </main>
        :   <main>
                <div className="text-center text-xl font-bold">
                    You cannot access this route
                </div>
            </main>
    );
}