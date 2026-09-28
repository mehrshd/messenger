import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Message } from "../../../core/design/message";

function ContactList({ contacts, onSelect }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col"
    >
      {/* Header */}
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.035] text-white/50 transition hover:bg-white/[0.07] md:h-11 md:w-11"
        >
          <Search size={18} />
        </button>
      </header>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto px-3 py-3 md:px-6 md:py-5">
        <div className="space-y-1.5 md:space-y-2">
          {contacts.map((contact, index) => (
            <motion.button
              key={contact.id}
              type="button"
              onClick={() => onSelect(contact)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-left transition hover:border-white/6 hover:bg-white/[0.035] md:gap-4 md:rounded-3xl md:px-4 md:py-4"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
                />

                {contact.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#060b14] bg-emerald-400 md:h-3.5 md:w-3.5" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="truncate text-sm font-semibold md:text-base">
                    {contact.name}
                  </h2>

                  <span className="shrink-0 text-[10px] text-white/25 md:text-xs">
                    {contact.time}
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-white/35 md:text-sm">
                  {contact.lastMessage}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ChatView({ user, currentUser, onBack }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col"
    >
      {/* Chat Header */}
      <header className="flex shrink-0 items-center gap-3 border-b border-white/6 px-4 py-3 md:px-6 md:py-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/5 hover:text-white md:h-10 md:w-10"
        >
          <ArrowLeft size={20} />
        </button>

        <img
          src={user.image}
          alt={user.name}
          className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold md:text-base">
            {user.name}
          </h2>

          <p className="truncate text-[11px] text-white/30 md:text-xs">
            {user.online ? "Online" : user.username}
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 hover:bg-white/5 md:h-10 md:w-10"
        >
          <MoreHorizontal size={19} />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-8">
        <div className="flex flex-col gap-2.5 md:gap-3">
          <Message
            text="Hey 👋"
            time="22:38"
            own={false}
          />

          <Message
            text="Hey, what's up?"
            time="22:39"
            own
          />

          <Message
            text="Everything is good."
            time="22:40"
            own={false}
          />

          <Message
            text="See you later 👋"
            time="22:41"
            own
          />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/6 p-3 md:p-5">
        <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1.5 backdrop-blur-xl md:rounded-3xl md:p-2">
          <input
            type="text"
            placeholder="Write a message..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/20 md:px-4 md:text-sm"
          />

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-white/60 transition hover:bg-white/13 hover:text-white md:h-10 md:w-10 md:rounded-2xl"
          >
            <Send size={17} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export { ContactList, ChatView }