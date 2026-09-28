import { useQuery } from "@tanstack/react-query";

import ResponsiveChat from "./ResponsiveChat";
import DesktopChat from "./DesktopChat";

import Userss from "../../core/services/api/userss";
import GetConversations from "../../core/services/api/chats/getConversation";
import { useEffect } from "react";

const getCurrentUser = () => {
  const stored = localStorage.getItem("accounts");

  if (!stored) {
    return null;
  }

  try {
    const accounts = JSON.parse(stored);

    return accounts.find(
      (account) => account.isSelected
    ) ?? null;
  } catch {
    return null;
  }
};

export default function PrivateChat() {
  const currentUser = getCurrentUser();

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: Userss,
  });

  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    isError: conversationsError,
    refetch: refetchConversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: GetConversations,
    refetchInterval: 1000,
  });

  const users = Array.isArray(usersData)
    ? usersData
    : [];

  const conversations =
    conversationsData?.conversations ?? [];

  const isLoading =
    usersLoading || conversationsLoading;

  const isError =
    usersError || conversationsError;

  if (!currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#060b14] text-white">
        <p className="text-sm text-white/40">
          No active account.
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#060b14] text-white">
        <p className="text-sm text-white/40">
          Failed to load chats.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060b14] text-white">

      {/* Mobile + Tablet */}
      <div className="block lg:hidden">
        <ResponsiveChat
          currentUser={currentUser}
          users={users}
          conversations={conversations}
          isLoading={isLoading}
          refetchConversations={refetchConversations}
        />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopChat
          currentUser={currentUser}
          users={users}
          conversations={conversations}
          isLoading={isLoading}
          refetchConversations={refetchConversations}
        />
      </div>

    </main>
  );
}