import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BellIcon, MenuIcon } from "lucide-react";

import { cn } from "@src/lib/utils";
import { EnumStoreProperties } from "@src/models/store";
import { getSelectedStore } from "@src/utils";

interface IHeaderProps {
  onOpenMenu: () => void;
  notificationCount?: number;
  userName?: string;
  userRole?: string;
}

const getInitials = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export const Header: React.FC<IHeaderProps> = ({
  onOpenMenu,
  notificationCount = 0,
  userName = "Vu A",
  userRole = "Owner",
}) => {
  const { t } = useTranslation();

  const storeName = useMemo(() => {
    const selected = getSelectedStore();
    return selected?.[EnumStoreProperties.NAME] ?? "";
  }, []);

  const initials = useMemo(() => getInitials(userName), [userName]);
  const badge =
    notificationCount > 99 ? "99+" : String(Math.max(0, notificationCount));
  const showBadge = notificationCount > 0;

  return (
    <header
      className={cn(
        "flex h-[54px] min-h-[54px] items-center justify-between border-b border-gray-200 bg-white px-5",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={t("layouts.base.OPEN_MENU")}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <MenuIcon className="size-5" />
        </button>
        {storeName && (
          <p className="truncate text-sm font-semibold text-gray-900">
            {storeName}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={t("layouts.base.NOTIFICATIONS")}
          className="relative inline-flex size-9 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <BellIcon className="size-5" />
          {showBadge && (
            <span
              className={cn(
                "absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground",
                "tabular-nums",
              )}
            >
              {badge}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {initials}
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
