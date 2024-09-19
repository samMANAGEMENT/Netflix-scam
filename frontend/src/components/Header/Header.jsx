import { Button } from "@mui/base";

function Header() {
  return (
    <div href="/" className="bg-gradient-to-b from-black via-gray-900 to-transparent flex items-center h-16 px-4 sm:px-6 lg:px-8">
      <img src="/assets/image_dd555099.png" alt="" className="h-6 w-auto" />
      <div className="flex items-center ml-20 space-x-4 sm:ml-6 lg:ml-8">
        <img src="/assets/image_ed6555b8.png" alt="" className="h-8 w-auto" />
        <Button href="https://www.netflix.com/" className="rounded bg-[#e50914] font-medium text-sm text-white min-w-[76px] h-8 px-3 py-1.5 sm:px-4 sm:py-2">
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default Header;
