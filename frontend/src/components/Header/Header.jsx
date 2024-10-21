import { Button } from "@mui/base";

function Header() {
  return (
    <header className="bg-gradient-to-b from-black via-gray-900 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/assets/image_dd555099.png" alt="Netflix" className="h-8 w-auto mr-4" />
            <img src="/assets/image_ed6555b8.png" alt="Flex" className="h-8 w-auto" />
          </div>
          <Button 
            href="https://www.netflix.com/" 
            className="rounded bg-[#e50914] font-medium text-sm text-white h-8 px-3 py-1.5 hover:bg-[#f40612] transition-colors duration-200"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;