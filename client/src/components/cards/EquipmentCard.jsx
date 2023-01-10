const EquipmentCard = ({equipment})=>{
    return (
        <div className='flex flex-col gap-1 w-40'>
            <img src={equipment.image} alt={equipment.name} className='w-40 h-40 drop-shadow-md'/>
            <p className="bg-white-primary p-4 drop-shadow-md">{equipment.name}</p>
        </div>
    )
}

export default EquipmentCard;