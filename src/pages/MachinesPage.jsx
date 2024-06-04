import React from "react";
import MachineCard from "../components/MachineCard";
import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../main";

const fetchMachines = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/machine/web`); // Adjust the endpoint as per your server setup
  console.log(data);
  return data;
};

const MachinesPage = () => {
  const { data: machines, error, isLoading } = useQuery("machines", fetchMachines);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching clients</div>;

  return (
    <div className="" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 0px)', width: "calc(100vw - 200px)"}}>
      <h3>Страница Машины</h3>
      <div className="">
        {machines.map((machine, index) => (
          <MachineCard
            key={index}
            vin={machine.VINNumber}
            modelName={machine.modelName}
            serialNumber={machine.serialNumber}
            manufactureDate={machine.dateOfManufacture}
            manufacturer={machine.Manufacturer}
            machineType={machine.MachineType}
            partner={machine.Partner}
            imageUrl={`${BASE_URL}${machine.image}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MachinesPage;
