import React, { useEffect, useRef, useState } from "react";
import { TfiAngleDown, TfiAngleRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInbox, AiOutlineEdit, AiOutlineSend } from "react-icons/ai";
import { RiDeleteBinLine, RiArchiveLine, RiFolder2Line } from "react-icons/ri";
import { updateFolderList } from "../features/folderSlice";
import useComponentVisible from "./Custom-hooks/useComponentVisible";
import useTraverseTree from "./Custom-hooks/useTraverseTree";
import FolderItemContextMenu from "./FolderItemContextMenu";
import FolderList from "./FolderList";

const folderIcons = {
  Inbox: <AiOutlineInbox />,
  Drafts: <AiOutlineEdit />,
  "Sent Items": <AiOutlineSend />,
  "Deleted Items": <RiDeleteBinLine />,
  Archive: <RiArchiveLine />,
};

const folderCounts = {
  Inbox: 15,
  Drafts: 3,
  "Sent Items": 5,
  "Deleted Items": 1,
  Archive: 4,
};

const FolderItem = ({ item }) => {
  const folderItemRef = useRef(null);
  const subFolderInpRef = useRef(null);
  const subFolderRenameInpRef = useRef(null);

  const dispatch = useDispatch();

  const [toggleMenu, setToggleMenu] = useState(true);
  const [toggleContextMenu, setToggleContextMenu] = useState(false);
  const [toggleInpField, setToggleInpField] = useState(false);
  const [toggleRename, setToggleRename] = useState(false);
  const [subFolderInp, setSubFolderInp] = useState("");

  useComponentVisible(folderItemRef, setToggleContextMenu);
  useComponentVisible(subFolderInpRef, setToggleInpField);
  useComponentVisible(subFolderRenameInpRef, setToggleRename);

  const { folderList } = useSelector((state) => state.folderData);
  useComponentVisible(folderItemRef, setToggleContextMenu);
  useEffect(() => {
    if (toggleInpField && !toggleMenu) {
      setToggleMenu(true), setToggleContextMenu(false);
    }
  }, [toggleInpField]);

  useEffect(() => {
    if (subFolderInpRef.current) {
      subFolderInpRef.current.focus();
    }
  }, [toggleContextMenu]);

  useEffect(() => {
    if (toggleRename) {
      setToggleContextMenu(false);
      setToggleInpField(true);
      setSubFolderInp(item.name);

      setTimeout(() => {
        if (subFolderRenameInpRef.current) {
          subFolderRenameInpRef.current.focus();
        }
      }, 100);
    } else {
      setToggleInpField(false);
    }
  }, [toggleRename]);

  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleSubmit = () => {
    let updatedList = [];
    if (toggleRename) {
      updatedList = renameNode(folderList, item.id, subFolderInp);
    } else {
      const newFolder = {
        id: new Date().getTime(),
        name: subFolderInp,
        items: [],
      };
      updatedList = insertNode(folderList, item, newFolder);
    }
    dispatch(updateFolderList(updatedList));
    setToggleRename(false);
    setSubFolderInp("");
    setToggleInpField(false);
  };

  const handleDelete = () => {
    const updatedList = deleteNode(folderList, item);
    dispatch(updateFolderList(updatedList));
  };

  return (
    <div ref={folderItemRef}>
      <div
        role={"button"}
        className="flex gap-3 items-center w-[100%] hover:bg-slate-200"
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <span
          className={`text-[14px] w-[10%] ${
            item.items.length > 0 ? "visible" : "invisible"
          } `}
        >
          {toggleMenu ? <TfiAngleDown /> : <TfiAngleRight />}
        </span>
        <div
          className="flex relative gap-2 items-center text-[#808080] justify-between w-[90%] "
          onContextMenu={(e) => {
            e.preventDefault();
            setToggleContextMenu(!toggleContextMenu);
          }}
        >
          <span
            className={`text-[14px] w-[10%]${
              ["Folders", "Favorites"].includes(item.name) && "hidden"
            }`}
          >
            {!folderIcons[item.name] ? (
              <RiFolder2Line />
            ) : (
              folderIcons[item.name]
            )}
          </span>
          <span className={`text-[12px] ${
              ["Folders", "Favorites"].includes(item.name) && "font-bold text-slate-600 "
            } w-[80%]`}>
            {toggleRename ? (
              <input
                type={"text"}
                ref={subFolderRenameInpRef}
                autoFocus
                value={subFolderInp}
                onChange={(e) => setSubFolderInp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={`${
                  !toggleInpField && "hidden"
                } border-b-2 border-slate-400 text-black outline-0 w-[90%]`}
              />
            ) : (
              <span>{item.name}</span> 
            )}
          </span>
          <span
            className={`text-[10px] w-[10%] mr-2 text-center`}
          >
            <span className="font-bold">{folderCounts[item.name]}</span>
          </span>
          <FolderItemContextMenu
            toggleContextMenu={toggleContextMenu}
            setToggleInpField={setToggleInpField}
            handleDelete={handleDelete}
            setToggleRename={setToggleRename}
            itemName={item.name}
          />
        </div>
      </div>
      {toggleMenu && !toggleRename && (
        <div className="flex flex-col">
          <input
            type={"text"}
            ref={subFolderInpRef}
            autoFocus
            value={subFolderInp}
            onChange={(e) => setSubFolderInp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={`${
              !toggleInpField && "hidden"
            } border-2 outline-slate-400 border-black rounded w-[90%]`}
          />
          {item.items.length > 0 && <FolderList folderList={item.items} />}
        </div>
      )}
    </div>
  );
};

export default FolderItem;
