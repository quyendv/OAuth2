function AuthLayout({ children }) {
  return (
    <div className="grid h-screen w-screen place-content-center bg-[#ffffff] p-2">
      <>{children}</>
    </div>
  );
}

export default AuthLayout;
