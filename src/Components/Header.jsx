import React from "react";

function Header() {
  return (
    <header class="fixed top-0 z-10 mx-auto flex w-full max-w-full items-center justify-between border-b-[1px] border-b-slate-300 bg-[#121212] p-4 text-white lg:px-10">
      <h1 class="text-xl font-extrabold md:text-3xl">All todos</h1>
    </header>
  );
}

export default Header;
