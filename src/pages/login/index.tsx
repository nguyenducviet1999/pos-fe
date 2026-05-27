import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SparklesIcon,
} from "lucide-react";

import { Spinner } from "@src/components/ui/spinner";
import { useCustomForm } from "@src/hooks";
import { cn } from "@src/lib/utils";
import {
  EnumLoginProperties,
  EnumLoginUserType,
  ILogin,
} from "@src/models/auth";
import { pathConstants } from "@src/router/path.constants";

const schema: yup.ObjectSchema<ILogin> = yup.object({
  [EnumLoginProperties.EMAIL]: yup
    .string()
    .trim()
    .email("validation.EMAIL_INVALID")
    .required("validation.EMAIL_REQUIRED"),
  [EnumLoginProperties.PASSWORD]: yup
    .string()
    .min(6, "validation.PASSWORD_MIN_LENGTH")
    .required("validation.PASSWORD_REQUIRED"),
});

const tabs: { value: EnumLoginUserType; labelKey: string }[] = [
  { value: EnumLoginUserType.STAFF, labelKey: "login.STAFF_LOGIN" },
  { value: EnumLoginUserType.CUSTOMER, labelKey: "login.CUSTOMER_LOGIN" },
];

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<EnumLoginUserType>(
    EnumLoginUserType.CUSTOMER,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { form } = useCustomForm<ILogin>(schema, {
    defaultValues: {
      [EnumLoginProperties.EMAIL]: "",
      [EnumLoginProperties.PASSWORD]: "",
    },
  });

  const isStaff = userType === EnumLoginUserType.STAFF;

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      // TODO: replace with real login request once API is wired up
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success(
        t(
          isStaff ? "login.WELCOME_BACK_STAFF" : "login.WELCOME_BACK_CUSTOMER",
          { email: values[EnumLoginProperties.EMAIL] },
        ),
      );
    } catch {
      toast.error(t("login.SIGN_IN_FAILED"));
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-primary/15 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <SparklesIcon className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight !text-primary text-center">
            {t("commons.APP_NAME")}
          </h1>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-white p-8 shadow-xl">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setUserType(tab.value)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                  userType === tab.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          <h2 className="mb-1 text-xl font-semibold text-gray-800 text-center">
            {t(isStaff ? "login.STAFF_SIGN_IN" : "login.CUSTOMER_SIGN_IN")}
          </h2>
          {/* <p className="mb-6 text-sm text-gray-500">
            {t(isStaff ? "login.STAFF_SUBTITLE" : "login.CUSTOMER_SUBTITLE")}
          </p> */}

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <Controller
              control={form.control}
              name={EnumLoginProperties.EMAIL}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <div className="text-sm font-medium text-gray-700">
                    {t("commons.EMAIL_ADDRESS")}
                  </div>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <input
                      {...field}
                      id={EnumLoginProperties.EMAIL}
                      type="email"
                      autoComplete="email"
                      placeholder={t("login.EMAIL_PLACEHOLDER")}
                      className={cn(
                        "w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400",
                        "focus:border-primary focus:ring-2 focus:ring-primary/40",
                        fieldState.error ? "border-red-300" : "border-gray-200",
                      )}
                    />
                  </div>
                  {fieldState.error?.message && (
                    <p className="text-xs text-red-500">
                      {t(fieldState.error.message)}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name={EnumLoginProperties.PASSWORD}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={EnumLoginProperties.PASSWORD}
                      className="text-sm font-medium text-gray-700"
                    >
                      {t("commons.PASSWORD")}
                    </label>
                    <Link
                      to="#"
                      className="text-xs font-medium text-primary hover:text-primary/80"
                    >
                      {t("login.FORGOT_PASSWORD")}
                    </Link>
                  </div>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <input
                      {...field}
                      id={EnumLoginProperties.PASSWORD}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={cn(
                        "w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400",
                        "focus:border-primary focus:ring-2 focus:ring-primary/40",
                        fieldState.error ? "border-red-300" : "border-gray-200",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={t(
                        showPassword
                          ? "commons.HIDE_PASSWORD"
                          : "commons.SHOW_PASSWORD",
                      )}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="size-4" />
                      ) : (
                        <EyeIcon className="size-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.error?.message && (
                    <p className="text-xs text-red-500">
                      {t(fieldState.error.message)}
                    </p>
                  )}
                </div>
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold shadow-md transition",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              {isSubmitting && (
                <Spinner className="size-4 text-primary-foreground" />
              )}
              {t("commons.SIGN_IN")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            {t("login.NEED_ACCOUNT")}{" "}
            <Link
              to={pathConstants.SIGNUP}
              className="font-medium text-primary hover:text-primary/80"
            >
              {t("commons.SIGN_UP")}
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          {t("login.COPYRIGHT", {
            year: new Date().getFullYear(),
            name: t("commons.APP_NAME"),
          })}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
