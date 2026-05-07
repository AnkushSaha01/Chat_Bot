import React, { useState } from 'react';
import { Menu, Plus, MessageSquare, Settings, HelpCircle, Activity } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChatId } from '../../chats/chat.slice';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const { chats, currentChatId } = useSelector((state) => state.chat);
  
  // Convert chats object to an array and sort by most recent if possible
  // Using Object.values(chats) since it's stored as a dictionary
  const chatList = Object.values(chats).reverse(); // simple reverse to show newest first if keys are sequential, or can map timestamp

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    // on mobile we might want to close sidebar after selection
  };

  const handleSelectChat = (id) => {
    dispatch(setCurrentChatId(id));
  };

  return (
    <div 
      className={`h-screen bg-[#1e1f20] text-neutral-200 flex flex-col transition-all duration-300 ${
        isOpen ? 'w-64 sm:w-[280px]' : 'w-[68px]'
      } shrink-0`}
    >
      {/* Top section */}
      <div className="flex flex-col gap-6 pt-4 px-3 pb-2">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2.5 hover:bg-[#2e2f30] rounded-full w-fit transition-colors text-neutral-300 ml-1"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <button 
          onClick={handleNewChat}
          className={`flex items-center gap-3 bg-[#1a1a1c] hover:bg-[#2e2f30] text-neutral-300 p-[9px] rounded-full transition-colors ${
            isOpen ? 'w-full pr-5' : 'w-fit ml-[2px]'
          } group`}
        >
          <div className={`p-1 ${isOpen ? 'bg-[#2e2f30] group-hover:bg-[#1a1a1c]w-full' : 'bg-transparent text-neutral-300'} rounded-full transition-colors`}>
            <Plus size={20} />
          </div>
          {isOpen && <span className="font-semibold text-[14px] whitespace-nowrap">New chat</span>}
        </button>
      </div>

      {/* Middle section (Recent) */}
      <div className="flex-1 mt-4 overflow-y-auto px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isOpen && chatList.length > 0 && (
          <div className="pl-3 mb-2 mt-2">
            <span className="text-[13px] font-medium text-neutral-400">Recent</span>
          </div>
        )}
        <div className="flex flex-col gap-[2px]">
          {chatList.map((chat) => (
            <button 
              key={chat.id} 
              onClick={() => handleSelectChat(chat.id)}
              className={`flex items-center gap-3 p-2.5 rounded-full hover:bg-[#2e2f30] text-neutral-300 transition-colors w-full ${
                !isOpen ? 'justify-center w-11 h-11 mx-auto' : ''
              } ${currentChatId === chat.id ? 'bg-[#282a2c] text-neutral-100' : ''}`}
              title={!isOpen ? chat.title || 'Chat' : undefined}
            >
              <MessageSquare size={18} className="shrink-0" />
              {isOpen && (
                <span className="text-[14px] truncate text-left w-full">
                  {chat.title || 'Previous chat'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-[2px] mt-auto pb-4 px-3 pt-2">
        <button 
          className={`flex items-center gap-3 p-2.5 rounded-full hover:bg-[#2e2f30] text-neutral-300 transition-colors w-full ${
            !isOpen ? 'justify-center w-11 h-11 mx-auto' : ''
          }`}
          title={!isOpen ? "Help" : undefined}
        >
          <HelpCircle size={20} className="shrink-0" />
          {isOpen && <span className="text-[14px] font-medium">Help</span>}
        </button>
        <button 
          className={`flex items-center gap-3 p-2.5 rounded-full hover:bg-[#2e2f30] text-neutral-300 transition-colors w-full ${
            !isOpen ? 'justify-center w-11 h-11 mx-auto' : ''
          }`}
          title={!isOpen ? "Activity" : undefined}
        >
          <Activity size={20} className="shrink-0" />
          {isOpen && <span className="text-[14px] font-medium">Activity</span>}
        </button>
        <button 
          className={`flex items-center gap-3 p-2.5 rounded-full hover:bg-[#2e2f30] text-neutral-300 transition-colors w-full ${
            !isOpen ? 'justify-center w-11 h-11 mx-auto' : ''
          }`}
          title={!isOpen ? "Settings" : undefined}
        >
          <Settings size={20} className="shrink-0" />
          {isOpen && <span className="text-[14px] font-medium">Settings</span>}
        </button>
      </div>
    </div>
  );
}
