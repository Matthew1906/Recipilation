const EquipmentCard = ({equipment, onClick, status})=>{
    return (
        <div className={`flex flex-col gap-1 w-28 md:w-40 ${onClick?"cursor-pointer":""} ${status?"border-2 border-light-red":""}`} onClick={onClick??null}>
            <img src={equipment.image} alt={equipment.name} className='w-28 md:w-40 h-28 md:h-40 drop-shadow-md'/>
            <p className="bg-white-primary p-4 drop-shadow-md text-center text-sm md:text-base">{equipment.name}</p>
        </div>
    )
}

export default EquipmentCard;