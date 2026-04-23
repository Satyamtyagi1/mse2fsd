import axios from "axios";
import { useEffect,useState } from "react";
import BASE_URL from "./api";

function Dashboard(){
  const [items,setItems]=useState([]);
  const [search,setSearch]=useState("");

  const token = localStorage.getItem("token");

  useEffect(()=>{
  axios.get(`${BASE_URL}/api/items`,{
    headers:{token}
  }).then(res=>setItems(res.data));
},[token]);


  const add=async()=>{
    await axios.post(`${BASE_URL}/api/items`,{
      itemName:"Bag",
      description:"Black bag",
      type:"Lost",
      location:"Library",
      contact:"1234567890"
    },{
      headers:{token}
    });

    window.location.reload();
  };

  const del=async(id)=>{
    await axios.delete(`${BASE_URL}/api/items/${id}`,{
      headers:{token}
    });
    window.location.reload();
  };

  const searchItem=async()=>{
    const res = await axios.get(`${BASE_URL}/api/items/search?name=${search}`,{
      headers:{token}
    });
    setItems(res.data);
  };

  const logout=()=>{
    localStorage.removeItem("token");
    window.location="/login";
  };

  return(
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={add}>Add Item</button>
      <button onClick={logout}>Logout</button>

      <input placeholder="Search"
        onChange={e=>setSearch(e.target.value)}/>

      <button onClick={searchItem}>Search</button>

      {items.map(i=>(
        <p key={i._id}>
          {i.itemName} - {i.type} ({i.location})
          <button onClick={()=>del(i._id)}>Delete</button>
        </p>
      ))}
    </div>
  );
}

export default Dashboard;
