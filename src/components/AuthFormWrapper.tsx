import { Link } from "react-router-dom";
import  type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerLabel: string;
}

export function AuthFormWrapper({ title, children, footerText, footerLink, footerLabel }: Props) {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      {children}
      <p className="mt-4 text-sm text-center">
        {footerText}{" "}
        <Link to={footerLink} className="text-blue-600 hover:underline">
          {footerLabel}
        </Link>
      </p>
    </div>
  );
}
