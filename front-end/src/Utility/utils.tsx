
export const getAllNews=async()=>{
    return await fetch("/api/allNews").then(res=>res.json());
}
