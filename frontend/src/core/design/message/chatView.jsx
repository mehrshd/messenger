import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import GetMessage from "../../services/api/chats/getMessage";
import { motion } from "framer-motion";
import SendMessage from "../../services/api/chats/sendMessage";
import DeleteChat from "../../services/api/chats/deleteChat";
import { ArrowLeft } from "lucide-react";
import Message from "./Message";
import { Avatar, Loading, SendIcon, TrashIcon } from "./designChat";
import formatTime from "../../services/api/chats/formatTime";

const ChatView =({
  user,
  currentUser,
  conversationId,
  onBack,
  onConversationCreated,
  refetchConversations,
}) => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "messages",
      conversationId,
    ],
    queryFn: () =>
    GetMessage(conversationId),
    enabled: Boolean(conversationId),
    refetchInterval: 1000,
  });

  const sendMutation = useMutation({
    mutationFn: SendMessage,

    onSuccess: async (result) => {
      if (!result?.success) {
        return;
      }

      setText("");

      if (!conversationId) {
        await onConversationCreated(user.id);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });

      await refetchConversations();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DeleteChat,

    onSuccess: async (result) => {
      if (!result?.success) {
        return;
      }

      await refetchConversations();

      onBack();
    },
  });

  const messages =
    data?.messages ??
    data ??
    [];

  const handleSend = () => {
    const content = text.trim();

    if (!content || sendMutation.isPending) {
      return;
    }

    const payload = {
      targetUserId: user.id,
      message: content,
    };

    sendMutation.mutate(payload);
  };

  const handleDelete = () => {
    if (
      !conversationId ||
      deleteMutation.isPending
    ) {
      return;
    }

    deleteMutation.mutate(
      conversationId
    );
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 20,
      }}
      transition={{
        duration: 0.25,
      }}
      className="flex h-full flex-col"
    >


      <header className="flex shrink-0 items-center gap-3 border-b border-white/6 px-4 py-3 md:px-6 md:py-4">

        <button
          type="button"
          onClick={onBack}
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full
            text-white/45
            transition
            hover:bg-white/5
            hover:text-white
            md:h-10 md:w-10
          "
        >
          <ArrowLeft size={20} />
        </button>

        <Avatar
          src={user.avatar ? `${import.meta.env.VITE_API_URL}${user.avatar}` : ""}
          name={user.fullname}
        />

        <div className="min-w-0 flex-1">

          <h2 className="truncate text-sm font-semibold md:text-base">
            {user.fullname}
          </h2>

          <p className="truncate text-[11px] text-white/30 md:text-xs">
            {user.username
              ? `@${user.username}`
              : user.email}
          </p>

        </div>

        {conversationId && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={
              deleteMutation.isPending
            }
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              text-white/35
              transition
              hover:bg-red-500/10
              hover:text-red-400
              disabled:opacity-30
              md:h-10 md:w-10
            "
            title="Delete chat"
          >
            <TrashIcon />
          </button>
        )}

      </header>



      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-8">

        {!conversationId ? (
          <div className="flex h-full items-center justify-center">

            <p className="text-sm text-white/20">
              Start a conversation
            </p>

          </div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2.5 md:gap-3">

            {messages.map((item) => (
              <Message
                key={item.id}
                text={
                  item.content ??
                  item.message ??
                  item.text
                }
                time={formatTime(item.created_at)}
                own={item.sender_id === currentUser.userId}
              />
            ))}

          </div>
        )}

      </div>


      <div className="shrink-0 border-t border-white/6 p-3 md:p-5">

        <div className="
          flex items-center gap-2
          rounded-2xl
          border border-white/[0.07]
          bg-white/[0.035]
          p-1.5
          backdrop-blur-xl
          md:rounded-3xl
          md:p-2
        ">

          <input
            type="text"
            value={text}
            onChange={(event) =>
              setText(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSend();
              }
            }}
            disabled={
              sendMutation.isPending
            }
            placeholder="Write a message..."
            className="
              min-w-0 flex-1
              bg-transparent
              px-3 py-2
              text-sm text-white
              outline-none
              placeholder:text-white/20
              md:px-4
            "
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={
              !text.trim() ||
              sendMutation.isPending
            }
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              bg-white/8
              text-white/60
              transition
              hover:bg-white/13
              hover:text-white
              disabled:opacity-30
              md:h-10 md:w-10
              md:rounded-2xl
            "
          >
            <SendIcon />
          </button>

        </div>

      </div>

    </motion.section>
  );
}

export default ChatView