import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { Avatar, Loading } from "../../core/design/message/designChat";
import formatTime from "../../core/services/api/chats/formatTime";
import ChatView from "../../core/design/message/chatView";

const DesktopChat = ({
  currentUser,
  users,
  conversations,
  isLoading,
  refetchConversations,
}) => {
  const [selectedChat, setSelectedChat] =
    useState(null);

  const selectUser = (user) => {
    setSelectedChat({
      user,
      conversationId: null,
    });
  };

  const selectConversation = (conversation) => {
    setSelectedChat({
      user: {
        id: conversation.user_id,
        fullname: conversation.fullname,
        username: conversation.username,
        avatar: conversation.avatar,
      },
      conversationId:
        conversation.conversation_id,
    });
  };

  const handleConversationCreated =
    async (userId) => {
      const result =
        await refetchConversations();

      const updated =
        result.data?.conversations ?? [];

      const conversation =
        updated.find(
          (item) =>
            item.user_id === userId
        );

      if (conversation) {
        setSelectedChat((current) => ({
          ...current,
          conversationId:
            conversation.conversation_id,
        }));
      }
    };

  return (
   <div className="h-screen overflow-hidden p-2">

    <div className="
      mx-auto
      flex h-full
      max-w-7xl
      overflow-hidden
      rounded-4xl
      border border-white/[0.07]
      bg-[#0a101b]/80
      shadow-2xl shadow-black/40
      backdrop-blur-3xl
  ">

    {/* Sidebar */}

    <aside className="
      flex h-full w-[320px]
      shrink-0 flex-col
      border-r border-white/6
    ">

      <header className="
        shrink-0
        border-b border-white/6
        px-5 py-4
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>
            <p className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-white/25
            ">
              Messages
            </p>

            <h1 className="
              mt-1
              text-xl
              font-semibold
            ">
              Chats
            </h1>
          </div>

          <button
            type="button"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-white/6
              bg-white/2.5
              text-white/40
              transition
              hover:bg-white/6
            "
          >
            <Search size={17} />
          </button>

        </div>

      </header>


      <div className="
        min-h-0
        flex-1
        overflow-y-auto
        p-3
      ">

        {isLoading ? (
          <Loading />
        ) : (
          <div className="space-y-5">

            {/* Conversations */}

            {conversations.length > 0 && (
              <section>

                <p className="
                  mb-2 px-2
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-white/20
                ">
                  Conversations
                </p>

                <div className="space-y-1">

                  {conversations.map(
                    (conversation) => {

                      const active =
                        selectedChat?.conversationId ===
                        conversation.conversation_id;

                      return (
                        <motion.button
                          key={
                            conversation.conversation_id
                          }
                          type="button"
                          onClick={() =>
                            selectConversation(
                              conversation
                            )
                          }
                          whileTap={{
                            scale: 0.99,
                          }}
                          className={`
                            flex w-full
                            items-center gap-3
                            rounded-2xl
                            p-3
                            text-left
                            transition
                            ${
                              active
                                ? "bg-white/[0.07]"
                                : "hover:bg-white/[0.035]"
                            }
                          `}
                        >

                          <Avatar
                            src={
                              conversation?.avatar ?
                              `${import.meta.env.VITE_API_URL}${conversation?.avatar}`
                              :
                              ""
                            }
                            name={
                              conversation.fullname
                            }
                          />

                          <div className="
                            min-w-0
                            flex-1
                          ">

                            <div className="
                              flex
                              items-center
                              justify-between
                              gap-3
                            ">

                              <span className="
                                truncate
                                text-sm
                                font-medium
                              ">
                                {
                                  conversation.fullname
                                }
                              </span>

                              <span className="
                                shrink-0
                                text-[10px]
                                text-white/25
                              ">
                                {formatTime(
                                  conversation.last_message_at
                                )}
                              </span>

                            </div>

                            <p className="
                              mt-1
                              truncate
                              text-xs
                              text-white/30
                            ">
                              {
                                conversation.last_message
                              }
                            </p>

                          </div>

                        </motion.button>
                      );
                    }
                  )}

                </div>

              </section>
            )}

            <section>

              <p className="
                mb-2 px-2
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/20
              ">
                People
              </p>

              <div className="space-y-1">

                {users
                  .filter(
                    (user) =>
                      user.id !==
                      currentUser.id
                  )
                  .map((user) => {

                    const active =
                      !selectedChat?.conversationId &&
                      selectedChat?.user?.id ===
                        user.id;

                    return (
                      <motion.button
                        key={user.id}
                        type="button"
                        onClick={() =>
                          selectUser(user)
                        }
                        whileTap={{
                          scale: 0.99,
                        }}
                        className={`
                          flex w-full
                          items-center gap-3
                          rounded-2xl
                          p-3
                          text-left
                          transition
                          ${
                            active
                              ? "bg-white/[0.07]"
                              : "hover:bg-white/[0.035]"
                          }
                        `}
                      >

                        <Avatar
                          src={user.avatar ? `${import.meta.env.VITE_API_URL}${user.avatar}` : ""}
                          name={user.fullname}
                        />

                        <div className="
                          min-w-0 flex-1
                        ">

                          <span className="
                            block
                            truncate
                            text-sm
                            font-medium
                          ">
                            {user.fullname}
                          </span>

                          <p className="
                            mt-1
                            truncate
                            text-xs
                            text-white/30
                          ">
                            {user.username
                              ? `@${user.username}`
                              : user.email}
                          </p>

                        </div>

                      </motion.button>
                    );
                  })}

              </div>

            </section>

          </div>
        )}

      </div>

    </aside>

    <section className="
      flex
      min-h-0
      min-w-0
      flex-1
      flex-col
    ">

      {selectedChat ? (
        <ChatView
          user={selectedChat.user}
          currentUser={currentUser}
          conversationId={
            selectedChat.conversationId
          }
          onBack={() =>
            setSelectedChat(null)
          }
          onConversationCreated={
            handleConversationCreated
          }
          refetchConversations={
            refetchConversations
          }
        />
      ) : (
        <div className="
          flex
          flex-1
          items-center
          justify-center
        ">
          <p className="
            text-sm
            text-white/20
          ">
            Select a conversation
          </p>
        </div>
      )}

    </section>

    </div>

   </div>
  );
}

export default DesktopChat