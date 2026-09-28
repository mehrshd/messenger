import { motion } from "framer-motion";
import { Avatar, Loading } from "./designChat";
import { Search } from "lucide-react";
import formatTime from "../../services/api/chats/formatTime";

function ChatList({
  users,
  conversations,
  currentUser,
  isLoading,
  onSelectUser,
  onSelectConversation,
}) {
  if (isLoading) {
    return <Loading />;
  }

  const otherUsers = users.filter(
    (user) => user.id !== currentUser.id
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col"
    >

      <header className="flex items-center justify-between border-b border-white/6 px-4 py-4 md:px-7 md:py-6">

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 md:text-sm">
            Messages
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            Chats
          </h1>
        </div>

        <button
          type="button"
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border border-white/[0.07]
            bg-white/[0.035]
            text-white/40
            transition
            hover:bg-white/[0.07]
            md:h-11 md:w-11
          "
        >
          <Search size={18} />
        </button>

      </header>


      <div className="flex-1 overflow-y-auto px-3 py-3 md:px-6 md:py-5">

        <div className="space-y-6">

          {conversations.length > 0 && (
            <section>

              <p className="mb-2 px-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
                Conversations
              </p>

              <div className="space-y-1.5 md:space-y-2">

            {conversations.map(
               (conversation, index) => (
                <motion.button
                    key={
                    conversation.conversation_id
                    }
                    type="button"
                    onClick={() =>
                    onSelectConversation(
                        conversation
                    )
                    }
                    initial={{
                    opacity: 0,
                    y: 8,
                    }}
                    animate={{
                    opacity: 1,
                    y: 0,
                    }}
                    transition={{
                    delay: index * 0.04,
                    }}
                    className="
                    flex w-full items-center gap-3
                    rounded-2xl
                    border border-transparent
                    px-3 py-3
                    text-left
                    transition
                    hover:border-white/6
                    hover:bg-white/[0.035]
                    md:gap-4
                    md:rounded-3xl
                    md:px-4 md:py-4
                    "
                >

                    <Avatar
                    src={conversation.avatar ? `${import.meta.env.VITE_API_URL}${conversation.avatar}` : ""}
                    name={conversation.fullname}
                    />

                    <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-3">

                        <h2 className="truncate text-sm font-semibold md:text-base">
                        {conversation.fullname}
                        </h2>

                        <span className="shrink-0 text-[10px] text-white/25 md:text-xs">
                        {formatTime(
                            conversation.last_message_at
                        )}
                        </span>

                    </div>

                    <p className="mt-1 truncate text-xs text-white/35 md:text-sm">
                        {conversation.last_message}
                    </p>

                    </div>

                </motion.button>
                )
            )}

              </div>

            </section>
          )}


          <section>

            <p className="mb-2 px-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
              People
            </p>

            <div className="space-y-1.5 md:space-y-2">

              {otherUsers.map(
                (user, index) => (
                  <motion.button
                    key={user.id}
                    type="button"
                    onClick={() =>
                      onSelectUser(user)
                    }
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    className="
                      flex w-full items-center gap-3
                      rounded-2xl
                      border border-transparent
                      px-3 py-3
                      text-left
                      transition
                      hover:border-white/6
                      hover:bg-white/[0.035]
                      md:gap-4
                      md:rounded-3xl
                      md:px-4 md:py-4
                    "
                  >

                    <Avatar
                      src={user.avatar ? `${import.meta.env.VITE_API_URL}${user.avatar}` : ""}
                      name={user.fullname}
                    />

                    <div className="min-w-0 flex-1">

                      <h2 className="truncate text-sm font-semibold md:text-base">
                        {user.fullname}
                      </h2>

                      <p className="mt-1 truncate text-xs text-white/35 md:text-sm">
                        {user.username
                          ? `@${user.username}`
                          : user.email}
                      </p>

                    </div>

                  </motion.button>
                )
              )}

            </div>

          </section>

        </div>

      </div>

    </motion.section>
  );
}

export default ChatList