import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ChatView from "../../core/design/message/chatView";
import ChatList from "../../core/design/message/chatlist";

const ResponsiveChat = ({
  currentUser,
  users,
  conversations,
  isLoading,
  refetchConversations,
}) => {
  const [selectedChat, setSelectedChat] = useState(null);

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
      conversationId: conversation.conversation_id,
    });
  };

  const handleConversationCreated = async (userId) => {
    const result = await refetchConversations();

    const updatedConversations =
      result.data?.conversations ?? [];

    const conversation =
      updatedConversations.find(
        (item) => item.user_id === userId
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
    <div className="mx-auto h-screen w-full max-w-3xl overflow-hidden">

      <AnimatePresence mode="wait">

        {!selectedChat ? (
          <ChatList
            key="chat-list"
            users={users}
            conversations={conversations}
            currentUser={currentUser}
            isLoading={isLoading}
            onSelectUser={selectUser}
            onSelectConversation={selectConversation}
          />
        ) : (
          <ChatView
            key={
              selectedChat.conversationId ??
              `user-${selectedChat.user.id}`
            }
            user={selectedChat.user}
            currentUser={currentUser}
            conversationId={selectedChat.conversationId}
            onBack={() => setSelectedChat(null)}
            onConversationCreated={
              handleConversationCreated
            }
            refetchConversations={
              refetchConversations
            }
          />
        )}

      </AnimatePresence>

    </div>
  );
}

export default ResponsiveChat