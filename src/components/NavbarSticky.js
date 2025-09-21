import React from 'react'

function NavbarSticky() {
  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-full border bg-white/90 backdrop-blur shadow-md
                        h-14 px-4 flex items-center justify-between">
          <a className="font-extrabold tracking-tight text-lg">YourBrand</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about">About</a><a href="#how">How it Works ?</a>
            <a href="#features">Features</a><a href="#support">Contact</a>
          </nav>
          <a href="#" className="hidden sm:inline-flex">
            <button className="h-10 px-5 rounded-full bg-red-500 text-white border border-red-500">Get App</button>
          </a>
        </div>
      </div>
    </header>
  );
}


export default NavbarSticky