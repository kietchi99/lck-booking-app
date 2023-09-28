import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function handlechange(e){
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams)
    }
  return (
    <Select 
        onChange={handlechange} 
        options={options} type="white"
        value={sortBy}
    />
  )
}
