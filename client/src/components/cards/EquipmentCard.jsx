const EquipmentCard = ({equipment, onClick, status})=>{
    return (
        <div className={`flex flex-col gap-1 w-40 ${onClick?"cursor-pointer":""} ${status?"border-2 border-light-red":""}`} onClick={onClick??null}>
            <img src={equipment.image} alt={equipment.name} className='w-40 h-40 drop-shadow-md'/>
            <p className="bg-white-primary p-4 drop-shadow-md text-center">{equipment.name}</p>
        </div>
    )
}

export default EquipmentCard;