const InputData = ({ type = "text", name = "", title = "", col, ...restprops }) => {

    return <>
      <div className={`flex flex-col gap-2 ${col ? "col-span-2" : "col-span-1"}`}>
        <label htmlFor={name}>{title}</label>
        <input {...restprops} className='outline-none bg-transparent border-2 border-black rounded ' placeholder={title} type={type} name={name} id={name} />
      </div>
    </>
  };

  export default InputData;