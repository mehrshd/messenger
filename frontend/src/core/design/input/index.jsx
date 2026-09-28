const Field = ({ typed, plaz, valued, onChange, imaged }) => {
  return (

    <div className="relative w-full">
     <img src={imaged} alt="" className="w-5 h-5 absolute left-4 top-3.5" />
     <input type={typed} placeholder={plaz} value={valued}  onChange={onChange}
     className=" 
        w-full
        h-12
        text-gray-400
        rounded-xl
        border
        border-white/[0.07]
        bg-white/3
        px-4
        text-sm
        placeholder:text-slate-500
        outline-none
        transition
        focus:border-blue-500
        focus:ring-1
        focus:ring-blue-500/30 pl-13 " />
    </div>
  )
}

export default Field