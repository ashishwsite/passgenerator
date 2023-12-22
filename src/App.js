import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const passwordref = useRef(null);
  //USEREF HOOK IS used to make create refernce  between two unreleated elememnt /tag/component
  // in this  project we want related copy button with input field so we can copy using clicking copy button
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [pass, setpass] = useState("");
  // USECALLBACK HOOK  1: it help to update state whenever any change occer in Ui
  // 2: Ui can chage due to many varible / state are know as dependency of hook
  // 3: multiple variable can change same thing in that situation UseCALLBACK is used
  //useCallback(fn,dependece){dependency can be array of variable ,function,number etc.}
  // CALLBACK HOOK IS UPDATE WHENEVER ITS ANY DEPEDENCY IS  CHANGE
  const passgenerator = useCallback(() => {
    let password = "";
    let str = "abcdefghijkl?nopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      let Characters = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(Characters);
    }
    setpass(password);
    // console.log("pass--", pass);
  }, [length, char, number, setpass]);

  //

  //
  const copytoclip = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);
  //
  useEffect(() => {
    passgenerator();
  }, [number, char, length, passgenerator]);

  return (
    <>
      <div className="m-4 rounded-xl bg-cyan-600">
        <h1 className="text-4xl text-center p-2 text-white">
          Password Generator
        </h1>
        <div className="continer w-full p-1 text-center">
          <input
            ref={passwordref}
            className="rounded-md border-s-violet-50"
            value={pass}
          ></input>
          <button
            onClick={copytoclip}
            className="px-2 mx-2 rounded-xl text-center  bg-blue-600"
          >
            copy
          </button>
        </div>
        <div className="slider flex justify-center gap-x-3 ">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer my-2"
            //  e.trget.valu = jo value event ke karn target par use le lo
            onChange={(e) => setlength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex justify-center gap-x-2">
          <label htmlFor="numberInput">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={(e) => {
              setnumber((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
          <input
            type="checkbox"
            defaultChecked={char}
            id="characterInput"
            onChange={(e) => {
              setchar((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
