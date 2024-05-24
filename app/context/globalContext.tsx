"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@/amplifyConfiguration";
export default function GlobalContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
