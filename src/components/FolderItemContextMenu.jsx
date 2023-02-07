import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFolderAdd } from "react-icons/ai";

const restrictedFolders = [
  "Inbox",
  "Drafts",
  "Sent Items",
  "Deleted Items",
  "Archive",
];

const FolderItemContextMenu = ({
  toggleContextMenu,
  setToggleInpField,
  handleDelete,
  setToggleRename,
  itemName
}) => {
  return (
    <div
      className={`absolute text-[12px] ${
        !toggleContextMenu && "hidden"
      } max-h-[10em] bg-white border z-50 min-w-[12em] top-1 left-[8em]  rounded flex flex-col shadow-md`}
    >
      <a
        role={"button"}
        disable
        className={`px-2 flex items-center gap-2 hover:bg-slate-200`}
        onClick={() => setToggleInpField(true)}
      >
        <span><AiOutlineFolderAdd /></span>Create sub-folder 
      </a>
      <a
        role={"button"}
        className={`px-2 flex items-center gap-2 hover:bg-slate-200 ${restrictedFolders.includes(itemName) && "text-slate-300 hover:bg-white"}`}
        onClick={() => !restrictedFolders.includes(itemName) && setToggleRename(true)}
      >
         <span><AiOutlineEdit /></span>Rename
      </a>
      <a
        role={"button"}
        className={`px-2 flex items-center gap-2 hover:bg-slate-200 ${restrictedFolders.includes(itemName) && "text-slate-300 hover:bg-white"}`}
        onClick={() => !restrictedFolders.includes(itemName) && handleDelete()}
      >
        <span><AiOutlineDelete /></span>Delete
      </a>
    </div>
  );
};

export default FolderItemContextMenu;
