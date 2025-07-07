
const SummaryCard = ({icon,label,number,color}) => {
  return (
    <div>
        <div className='rounded bg-white space-x-2 flex   hover:scale-95 cursor-pointer'>
            <div className={`text-3xl text-white ${color} px-4 flex justify-center items-center`}>
                {icon}
            </div>
            <div className='flex flex-col'>
                <p className='text-lg font-semibold'>{label}</p>
                <p className='text-lg font-bold'>{number}</p>
            </div>
        </div>
    </div>
  )
}

export default SummaryCard