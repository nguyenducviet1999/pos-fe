import { useState, type PropsWithChildren } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface IBaseLayoutProps {
  notificationCount?: number;
  userName?: string;
  userRole?: string;
}

export const BaseLayout: React.FC<PropsWithChildren<IBaseLayoutProps>> = ({
  children,
  notificationCount,
  userName,
  userRole,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-svh w-full flex-col bg-background">
      <Header
        onOpenMenu={() => setMenuOpen(true)}
        notificationCount={notificationCount}
        userName={userName}
        userRole={userRole}
      />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default BaseLayout;
