function Header() {
  return (
    <header className="flex h-16 w-full items-center bg-purple-500 px-12">
      {/* Logo */}
      <span className="text-xl font-bold text-white">Q App</span>

      {/* TODO: Nav */}

      {/* User */}
      <div className="ml-auto flex items-center space-x-3 font-semibold text-white">
        {/* Avatar */}
        <div>
          <img
            src="https://avatars.githubusercontent.com/u/80147846?s=40&v=4"
            alt="avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        {/* Name */}
        <div>quyendv</div>

        {/* SignIn/SignOut */}
        <button>SignOut</button>
      </div>
    </header>
  );
}

export default Header;
