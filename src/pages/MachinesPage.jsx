import React from 'react';
import MachineCard from '../components/MachineCard';

function MachinesPage() {
    const machines = [
        {
            vin: '1HGCM82633A123456',
            modelName: 'Model X',
            serialNumber: '123456',
            manufactureDate: '2024-01-15',
            manufacturer: 'Manufacturer A',
            machineType: 'Тип 1',
            partner: 'Партнер А',
            imageUrl: 'https://www.wirtgen-group.com/media/02_wirtgen/01_bilder/01_produkte/kaltfraesen/w_100_f_w130_f_i_/w-120-fi_1200x514.png', // URL изображения
        },
        {
            vin: '5J8TB3H30HL123456',
            modelName: 'Model Y',
            serialNumber: '654321',
            manufactureDate: '2024-02-10',
            manufacturer: 'Manufacturer B',
            machineType: 'Тип 2',
            partner: 'Партнер Б',
            imageUrl: 'https://www.wirtgen-group.com/media/02_wirtgen/01_bilder/01_produkte/kaltfraesen/w_100_f_w130_f_i_/w-120-fi_1200x514.png', // URL изображения
        },
        {
            vin: '1FAFP53U13A123456',
            modelName: 'Model Z',
            serialNumber: '789012',
            manufactureDate: '2024-03-20',
            manufacturer: 'Manufacturer C',
            machineType: 'Тип 3',
            partner: 'Партнер В',
            imageUrl: 'https://www.wirtgen-group.com/media/02_wirtgen/01_bilder/01_produkte/kaltfraesen/w_100_f_w130_f_i_/w-120-fi_1200x514.png', // URL изображения
        },
        // Добавьте больше машин по мере необходимости
    ];

    return (
        <div className="container">
            <h3>Страница Машины</h3>
            <div className="machines-list">
                {machines.map((machine, index) => (
                    <MachineCard
                        key={index}
                        vin={machine.vin}
                        modelName={machine.modelName}
                        serialNumber={machine.serialNumber}
                        manufactureDate={machine.manufactureDate}
                        manufacturer={machine.manufacturer}
                        machineType={machine.machineType}
                        partner={machine.partner}
                        imageUrl={machine.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default MachinesPage;
