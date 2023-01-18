const Checkbox = ({name, onChange, checked})=>{
    return <div className="flex items-center text-sm md:text-base">
        <input type="checkbox" name={name} className="ring-0 ring-red focus:ring-0 rounded border-red border text-red" onChange={onChange} checked={checked}/>
        <label htmlFor={name} className='text-red font-semibold ml-2'>{name}</label>
    </div>
}

export default Checkbox;