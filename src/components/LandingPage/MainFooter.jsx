const MainFooter = () => {
  return <div className="container border-t-1 border-default-200 p-4 mt-10 mx-auto flex flex-row justify-between items-center gap-4">
    <div className="">
      © <a href="https://github.com/Alejandro-Figueiras" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Alejandro Figueiras</a>, GD Cuba Community. 2024 All Rights Reserved.
    </div>
    <div className="flex flex-row gap-4 min-w-10">
      <a href="https://github.com/Alejandro-Figueiras/GDCuba-Rank" target="_blank" rel="noopener noreferrer">
        <img src="/assets/ui/github-mark-white.svg" className="w-8 hover:scale-125 transition" alt="GitHub Repo"/>
      </a>
    </div>
  </div>
}

export default MainFooter;