import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'


function App() {
  const [length , setlength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) {
      str += "0123456789"
    }

    if(charAllowed)
    {
      str += "!@#$%^&*-+[]{}~'"
    }

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
      
  }, [length , numberAllowed , charAllowed ])

  const copyPasswordToClip = useCallback(() => {passwordRef.current?.select() , passwordRef.current?.setSelectionRange(0,length); window.navigator.clipboard.writeText(password)} ,[password])

  useEffect(() => {passwordGenerator()} ,[length , numberAllowed , charAllowed , passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-md px-4 my-80 mx-90 py-6 
      text-orange-600 bg-gray-800 bg-center'>
        <h1 className='text-center text-white text-4xl my-3 mx-3'>Pasword Generator</h1>
      <div className='className = flex shadow rounded-l 
      overflow-hidden mb-4'>
        <br />
           <input type="text"
             value={password}
             className='outline-none w-full py-1 px-3 bg-slate-50'
             placeholder='password'
             readOnly 
             ref = {passwordRef}
            />

            <button 
            onClick={copyPasswordToClip}
            className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'>copy</button>
          </div>
          <br />
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
               type="range" 
               min={6}
               max ={100}
               value = {length}
               className='cursor-pointer'
               onChange={(e) => {setlength(e.target.value)}}
              />
              <label>Length : {length}</label>
            </div>

            <div className='flex items-center gap-x-x1'>
              <input 
              type="checkbox"
              defaultChecked = {numberAllowed}
              id = "numberInput"

              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
               />
               <label htmlFor='numberInput'>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
               type="checkbox" 
               defaultChecked = {charAllowed}
               id='characterInput'
               onChange={()=> {setCharAllowed((prev) => !prev)}}
               />
               <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
     </div>
    </>
  )
}

export default App
