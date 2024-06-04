import React from 'react';
import "./MachineCard.css"

function MachineCard({ vin, modelName, serialNumber, manufactureDate, manufacturer, machineType, partner, imageUrl }) {
    return (
        <div className="card mb-3" style={{width: "300px"}}>
            <div className="card-body">
                <h5 className="card-title">Партнер: {partner?.shortName}</h5>
                <img src={imageUrl} alt={`${modelName} изображение`} className="card-img-top machine-img mb-3" />
                <p className="card-text">Номер VIN: {vin}</p>
                <p className="card-text">Название модели: {modelName}</p>
                <p className="card-text">Серийный номер: {serialNumber}</p>
                <p className="card-text">Дата изготовления: {new Date(manufactureDate).toLocaleDateString()}</p>
                <p className="card-text">Производитель: {manufacturer?.name}</p>
                <p className="card-text">Тип техники: {machineType?.name}</p>
            </div>
        </div>
    );
}

export default MachineCard;
