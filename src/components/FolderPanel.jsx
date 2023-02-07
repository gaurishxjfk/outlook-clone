import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFolderList } from "../features/folderSlice";
import useComponentVisible from "./Custom-hooks/useComponentVisible";
import useTraverseTree from "./Custom-hooks/useTraverseTree";
import FolderList from "./FolderList";

const FolderPanel = () => {
  const dispatch = useDispatch();

  const resizableRef = useRef(null);
  const subFolderInpRef = useRef(null);

  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [toggleInputField, setToggleInputField] = useState(false);
  const [subFolderInp, setSubFolderInp] = useState("");

  const { folderList, favoriteFolder } = useSelector(
    (state) => state.folderData
  );

  useEffect(() => {
    if (resizableRef?.current) {
      resizableRef.current.style.minWidth = "13em";
    }
  }, [resizableRef]);

  useComponentVisible(subFolderInpRef, setToggleInputField);

  const initial = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(resizableRef.current.offsetWidth);
  };

  const resize = (e) => {
    resizableRef.current.style.width = `${
      parseInt(initialSize) + parseInt(e.clientX - initialPos)
    }px`;
  };

  const { insertNode } = useTraverseTree();

  const handleSubmit = () => {
    const newFolder = {
      id: new Date().getTime(),
      name: subFolderInp,
      items: [],
    };
    let updatedList = insertNode(folderList, folderList[0], newFolder);

    dispatch(updateFolderList(updatedList));
    setToggleInputField(false);
    setSubFolderInp("");
  };

  return (
    <div className="h-[70vh]">
      <div id="Resizable" ref={resizableRef} className={`relative`}>
        <div className={`mb-[.1em] min-w-[10vh] text-slate-600`}>
          <FolderList folderList={favoriteFolder} />
          <FolderList folderList={folderList} />
          <div className="ml-5">
            {toggleInputField ? (
              <input
                type={"text"}
                ref={subFolderInpRef}
                autoFocus
                value={subFolderInp}
                onChange={(e) => setSubFolderInp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={`${
                  !toggleInputField && "hidden"
                } border-2 border-black`}
              />
            ) : (
              <a
                role="button"
                className="text-[12px] text-[#0000D7]"
                onClick={() => setToggleInputField(true)}
              >
                Create new folder
              </a>
            )}
          </div>
        </div>

        <div
          draggable="true"
          onDragStart={initial}
          onDrag={resize}
          className={`border-r-2 cursor-col-resize border-0 border-r-1 rounded-[5px] border-slate-100 w-0 absolute top-0 right-0 min-h-[70vh]`}
        />
      </div>
    </div>
  );
};

export default FolderPanel;
